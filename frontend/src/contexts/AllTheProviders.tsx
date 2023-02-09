import { ReactNode } from 'react'
import { OrderDetailsContextProvider } from './OrderDetailsContext'
import { OrderPhaseContextProvider } from './OrderPhaseContext'

type ProviderProps = {
   children: ReactNode
}

function AllTheProviders({ children }: ProviderProps) {
   return (
      <OrderPhaseContextProvider>
         <OrderDetailsContextProvider>{children}</OrderDetailsContextProvider>
      </OrderPhaseContextProvider>
   )
}

export default AllTheProviders
