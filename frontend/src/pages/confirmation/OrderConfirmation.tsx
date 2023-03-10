import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import { useOrderPhaseContext } from '../../contexts/OrderPhaseContext'

type OrderData = {
   orderNumber: number
}

function OrderConfirmation() {
   const [orderNumber, setOrderNumber] = useState<number | null>(null)
   const [isLoading, setIsLoading] = useState<boolean>(true)
   const { resetOrderDetails } = useOrderDetailsContext()
   const { changeOrderPhase } = useOrderPhaseContext()

   useEffect(() => {
      const controller = new AbortController()

      const getOrderData = async () => {
         try {
            setIsLoading(true)
            const response = await axios.post<OrderData>(
               'http://localhost:3030/order',
               { signal: controller.signal }
            )
            setOrderNumber(response.data.orderNumber)
            setIsLoading(false)
         } catch (error) {
            setIsLoading(false)
         }
      }

      getOrderData()

      return () => {
         controller.abort()
      }
   }, [])

   const handleNewOrder = () => {
      resetOrderDetails()
      changeOrderPhase('inProgress')
   }

   return (
      <section className='p-4'>
         <h3>Thank you!</h3>
         {isLoading ? (
            <Spinner
               variant='primary'
               animation='border'
               role='status'
            >
               <span className='visually-hidden'>Loading...</span>
            </Spinner>
         ) : (
            <>
               <h5>Your order number is {orderNumber}</h5>
               <p>As per our terms and conditions nothing will happen now</p>
               <Button
                  variant='primary'
                  onClick={handleNewOrder}
               >
                  Create new order
               </Button>
            </>
         )}
      </section>
   )
}

export default OrderConfirmation
