import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type OrderPhase = 'inProgress' | 'review' | 'complete'

type OrderPhaseContextType = {
   orderPhase: OrderPhase
   changeOrderPhase: (phase: OrderPhase) => void
}

const OrderPhaseContext = createContext<OrderPhaseContextType>({
   orderPhase: 'inProgress',
   changeOrderPhase: () => {},
})

export const useOrderPhaseContext = () => {
   const context = useContext(OrderPhaseContext)

   if (!context) {
      throw new Error(
         'OrderPhaseContext can only be used within OrderPhaseContextProvider'
      )
   }

   return context
}

type ProviderProps = {
   children: ReactNode
}

export function OrderPhaseContextProvider({ children }: ProviderProps) {
   const [orderPhase, setOrderPhase] = useState<OrderPhase>('inProgress')

   const changeOrderPhase = (phase: OrderPhase) => setOrderPhase(phase)

   const value = useMemo(() => ({ orderPhase, changeOrderPhase }), [orderPhase])

   return (
      <OrderPhaseContext.Provider value={value}>
         {children}
      </OrderPhaseContext.Provider>
   )
}
