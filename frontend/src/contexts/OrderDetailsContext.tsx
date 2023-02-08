import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useMemo,
   useState,
} from 'react'
import { Totals, pricePerItem } from '../constants'

type OrderDetailsType = {
   scoops: Partial<{
      [index: string]: number
   }>
   toppings: Partial<{
      [index: string]: number
   }>
}

type OptionType = 'scoops' | 'toppings'

type OrderDetailsContextType = {
   orderDetails: OrderDetailsType
   totals: Totals
   updateOrderDetails: (
      itemName: string,
      newItemCount: number,
      optionType: OptionType
   ) => void
   resetOrderDetails: () => void
}

const OrderDetailsContext = createContext<OrderDetailsContextType>({
   orderDetails: { scoops: {}, toppings: {} },
   totals: { scoops: 0, toppings: 0 },
   updateOrderDetails: () => {},
   resetOrderDetails: () => {},
})

export const useOrderDetailsContext = () => {
   const context = useContext(OrderDetailsContext)

   if (!context) {
      throw new Error('OrderDetailsContext can only be used within provider')
   }

   return context
}

type ProvierProps = {
   children: ReactNode
}

export function OrderDetailsContextProvider({ children }: ProvierProps) {
   const [orderDetails, setOrderDetails] = useState<OrderDetailsType>({
      scoops: {},
      toppings: {},
   })

   function updateOrderDetails(
      itemName: string,
      newItemCount: number,
      optionType: OptionType
   ) {
      setOrderDetails((prevState) => ({
         ...prevState,
         [optionType]: { ...prevState[optionType], [itemName]: newItemCount },
      }))
   }

   function resetOrderDetails() {
      setOrderDetails({
         scoops: {},
         toppings: {},
      })
   }

   const calculateTotal = useCallback(
      (optionType: OptionType) => {
         const countsArray = Object.values(orderDetails[optionType])

         const totalCount = countsArray.reduce((total, value) => {
            if (!total) return value
            if (!value) return total

            return total + value
         }, 0)

         return totalCount! * pricePerItem[optionType]
      },
      [orderDetails]
   )

   const totals = useMemo(
      () => ({
         scoops: calculateTotal('scoops'),
         toppings: calculateTotal('toppings'),
      }),
      [calculateTotal]
   )

   const value = useMemo(
      () => ({
         orderDetails,
         totals,
         updateOrderDetails,
         resetOrderDetails,
      }),
      [orderDetails, totals]
   )

   return (
      <OrderDetailsContext.Provider value={value}>
         {children}
      </OrderDetailsContext.Provider>
   )
}
