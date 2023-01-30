import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Row, Stack } from 'react-bootstrap'
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

function Options({ optionType }: OptionsProps) {
   const [options, setOptions] = useState<Option[]>([])
   const [isError, setIsError] = useState<boolean>(false)

   useEffect(() => {
      const getData = async () => {
         try {
            const response = await axios.get<Option[]>(
               `http://localhost:3030/${optionType}`
            )

            setOptions(response.data)
         } catch (error) {
            setIsError(true)
         }
      }

      getData()
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

   function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
   }

   return (
      <Stack className='p-4'>
         <h3>{capitalizeFirstLetter(optionType)}</h3>
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
