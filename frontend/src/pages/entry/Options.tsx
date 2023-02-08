import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Row, Stack } from 'react-bootstrap'
import { pricePerItem } from '../../constants'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import AlertBanner from '../common/AlertBanner'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

export enum OptionType {
   Scoops = 'scoops',
   Toppings = 'toppings',
}

type Option = {
   name: string
   imagePath: string
}

type OptionsProps = {
   optionType: OptionType
}

export function capitalizeFirstLetter(string: string) {
   return string.charAt(0).toUpperCase() + string.slice(1)
}

function Options({ optionType }: OptionsProps) {
   const [options, setOptions] = useState<Option[]>([])
   const [isError, setIsError] = useState<boolean>(false)

   const { totals } = useOrderDetailsContext()

   useEffect(() => {
      const controller = new AbortController()

      const getData = async () => {
         try {
            const response = await axios.get<Option[]>(
               `http://localhost:3030/${optionType}`,
               { signal: controller.signal }
            )

            setOptions(response.data)
         } catch (error: any) {
            if (error.name !== 'CanceledError') setIsError(true)
         }
      }

      getData()

      return () => {
         controller.abort()
      }
   }, [optionType])

   const OptionItem = useMemo(() => {
      switch (optionType) {
         case OptionType.Scoops:
            return ScoopOption

         case OptionType.Toppings:
            return ToppingOption

         default:
            return ScoopOption
      }
   }, [optionType])

   const capitalizedOptionType = capitalizeFirstLetter(optionType)
   const subtotal = totals[optionType].toFixed(2)

   return (
      <Stack className='mb-4'>
         <h3>{capitalizedOptionType}</h3>
         <p>${pricePerItem[optionType]} each</p>
         <p>
            {capitalizedOptionType} total: ${subtotal}
         </p>
         {isError ? (
            <AlertBanner />
         ) : (
            !!options.length && (
               <Row
                  xs={1}
                  sm={2}
                  md={3}
                  lg={4}
                  className='g-4'
               >
                  {options.map(({ name, imagePath }) => (
                     <OptionItem
                        key={name}
                        name={name}
                        imagePath={imagePath}
                     />
                  ))}
               </Row>
            )
         )}
      </Stack>
   )
}

export default Options
