import { Container } from 'react-bootstrap'
import './App.css'
import OrderSummary from './pages/summary/OrderSummary'
import OrderEntry from './pages/entry/OrderEntry'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

function App() {
   return (
      <Container>
         <OrderEntry />
         <OrderSummary />
         <OrderConfirmation />
      </Container>
   )
}

export default App
