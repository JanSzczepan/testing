import { Button } from 'react-bootstrap'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import { useOrderPhaseContext } from '../../contexts/OrderPhaseContext'
import Options, { OptionType } from './Options'

function OrderEntry() {
   const { changeOrderPhase } = useOrderPhaseContext()
   const { total, orderDetails } = useOrderDetailsContext()

   const isOrderReady: boolean =
      !!total && !!Object.keys(orderDetails.scoops).length

   const handleOrder = () => {
      if (isOrderReady) changeOrderPhase('review')
   }

   return (
      <section className='p-4'>
         <Options optionType={OptionType.Scoops} />
         <Options optionType={OptionType.Toppings} />
         <h3 className='mb-4'>Grand total: ${total.toFixed(2)}</h3>
         <Button
            onClick={handleOrder}
            variant='primary'
            disabled={!isOrderReady}
         >
            Order
         </Button>
      </section>
   )
}

export default OrderEntry
