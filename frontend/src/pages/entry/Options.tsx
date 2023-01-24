import axios, { AxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Row, Stack } from 'react-bootstrap'
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

   useEffect(() => {
      const getData = async () => {
         try {
            const response = await axios.get<Option[]>(
               `http://localhost:3030/${optionType}`
            )

            setOptions(response.data)
         } catch (error) {
            const err = error as AxiosError
            throw err
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
      <Stack>
         <h3>{capitalizeFirstLetter(optionType)}</h3>
         {!!options.length && (
            <Row
               xs={1}
               sm={2}
               md={3}
               lg={4}
            >
               {options.map(({ name, imagePath }) => (
                  <OptionItem
                     key={name}
                     name={name}
                     imagePath={imagePath}
                  />
               ))}
            </Row>
         )}
      </Stack>
   )
}

export default Options
