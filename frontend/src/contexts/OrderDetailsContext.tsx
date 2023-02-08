import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useMemo,
   useState,
} from 'react'
import { Totals, pricePerItem, optionsArr } from '../constants'

type OrderDetailsType = {
   scoops: Partial<{
      [index: string]: number
   }>
   toppings: Partial<{
      [index: string]: number
   }>
}

type OptionType = 'scoops' | 'toppings'

type List = {
   scoops: string[]
   toppings: string[]
}

type OrderDetailsContextType = {
   orderDetails: OrderDetailsType
   totals: Totals
   total: number
   list: List
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
   total: 0,
   list: {
      scoops: [],
      toppings: [],
   },
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

   const updateOrderDetails = useCallback(
      (itemName: string, newItemCount: number, optionType: OptionType) => {
         if (newItemCount) {
            setOrderDetails((prevState) => ({
               ...prevState,
               [optionType]: {
                  ...prevState[optionType],
                  [itemName]: newItemCount,
               },
            }))
         } else {
            const { [itemName]: i, ...newState } = orderDetails[optionType]

            setOrderDetails((prevState) => ({
               ...prevState,
               [optionType]: {
                  ...newState,
               },
            }))
         }
      },
      [orderDetails]
   )

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

   const total = useMemo(
      () =>
         Object.values(totals).reduce(
            (totalValue, value) => totalValue + value,
            0
         ),
      [totals]
   )

   const list: List = useMemo(() => {
      const l: List = {
         scoops: [],
         toppings: [],
      }

      for (let i = 0; i < optionsArr.length; i += 1) {
         Object.keys(orderDetails[optionsArr[i]]).forEach((key) => {
            l[optionsArr[i]].push(
               optionsArr[i] === 'toppings'
                  ? key
                  : `${orderDetails[optionsArr[i]][key]} ${key}`
            )
         })
      }

      return l
   }, [orderDetails])

   const value = useMemo(
      () => ({
         orderDetails,
         totals,
         total,
         list,
         updateOrderDetails,
         resetOrderDetails,
      }),
      [orderDetails, updateOrderDetails, totals, total, list]
   )

   return (
      <OrderDetailsContext.Provider value={value}>
         {children}
      </OrderDetailsContext.Provider>
   )
}
