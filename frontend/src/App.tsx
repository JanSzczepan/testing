import { Container } from 'react-bootstrap'
import './App.css'
import OrderSummary from './pages/summary/OrderSummary'
import OrderEntry from './pages/entry/OrderEntry'

function App() {
   return (
      <Container>
         <OrderEntry />
         <OrderSummary />
      </Container>
   )
}

export default App
