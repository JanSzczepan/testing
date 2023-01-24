import Options, { OptionType } from './Options'

function OrderEntry() {
   return (
      <section>
         <Options optionType={OptionType.Scoops} />
      </section>
   )
}

export default OrderEntry
