import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../test-utils/testing-library-utils'
import Options, { OptionType } from '../Options'

test('update scoops subtotal when scoop changes', async () => {
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

test('update toppings subtotal when topping changes', async () => {
   const user = userEvent.setup()
   render(<Options optionType={OptionType.Toppings} />)

   const toppingsSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
   })
   expect(toppingsSubtotal).toHaveTextContent('0.00')

   const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
   })
   const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
   })

   await user.click(cherriesCheckbox)
   await user.click(hotFudgeCheckbox)

   expect(cherriesCheckbox).toBeChecked()
   expect(hotFudgeCheckbox).toBeChecked()
   expect(toppingsSubtotal).toHaveTextContent('3.00')

   await user.click(cherriesCheckbox)

   expect(cherriesCheckbox).not.toBeChecked()
   expect(hotFudgeCheckbox).toBeChecked()
   expect(toppingsSubtotal).toHaveTextContent('1.50')
})
