import Options, { OptionType } from './Options'

function OrderEntry() {
   return (
      <section>
         <Options optionType={OptionType.Scoops} />
         <Options optionType={OptionType.Toppings} />
      </section>
   )
}

export default OrderEntry
