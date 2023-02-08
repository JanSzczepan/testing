import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import Options, { OptionType } from './Options'

function OrderEntry() {
   const { total } = useOrderDetailsContext()

   return (
      <section className='p-4'>
         <Options optionType={OptionType.Scoops} />
         <Options optionType={OptionType.Toppings} />
         <h3>Grand total: ${total.toFixed(2)}</h3>
      </section>
   )
}

export default OrderEntry
