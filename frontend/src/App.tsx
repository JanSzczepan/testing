import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import OrderSummary from './pages/summary/OrderSummary'
import OrderEntry from './pages/entry/OrderEntry'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'
import { useOrderPhaseContext } from './contexts/OrderPhaseContext'

function App() {
   const { orderPhase } = useOrderPhaseContext()

   const Item = useMemo(() => {
      switch (orderPhase) {
         case 'inProgress':
            return OrderEntry
         case 'review':
            return OrderSummary
         case 'complete':
            return OrderConfirmation
         default:
            return OrderEntry
      }
   }, [orderPhase])

   return (
      <Container>
         <Item />
      </Container>
   )
}

export default App
