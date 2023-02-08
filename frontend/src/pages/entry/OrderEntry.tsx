import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import Options, { OptionType } from './Options'

function OrderEntry() {
   const { totals } = useOrderDetailsContext()

   const totalValue = Object.values(totals)
      .reduce((total, value) => total + value, 0)
      .toFixed(2)

   return (
      <section className='p-4'>
         <Options optionType={OptionType.Scoops} />
         <Options optionType={OptionType.Toppings} />
         <h3>Grand total: ${totalValue}</h3>
      </section>
   )
}

export default OrderEntry
