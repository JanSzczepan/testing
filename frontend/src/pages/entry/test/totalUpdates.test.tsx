import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../test-utils/testing-library-utils'
import Options, { OptionType } from '../Options'

test('update scoop subtotal when scoop changes', async () => {
   const user = userEvent.setup()
   render(<Options optionType={OptionType.Scoops} />)

   const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false })
   expect(scoopSubtotal).toHaveTextContent('0.00')

   const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
   })

   await user.clear(vanillaInput)
   await user.type(vanillaInput, '1')

   expect(scoopSubtotal).toHaveTextContent('2.00')

   const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
   })

   await user.clear(chocolateInput)
   await user.type(chocolateInput, '2')

   expect(scoopSubtotal).toHaveTextContent('6.00')
})
