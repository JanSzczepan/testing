import userEvent from '@testing-library/user-event'
import App from '../App'
import { render, screen } from '../test-utils/testing-library-utils'

test('order phases for happy path', async () => {
   const user = userEvent.setup()
   render(<App />)

   // add scoops
   const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
   })
   const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
   })

   await user.clear(vanillaInput)
   await user.type(vanillaInput, '2')
   await user.clear(chocolateInput)
   await user.type(chocolateInput, '1')

   // add toppings
   const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
   })
   const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
   })

   await user.click(cherriesCheckbox)
   await user.click(hotFudgeCheckbox)

   // click order button
   const orderButton = screen.getByRole('button', { name: 'Order' })

   await user.click(orderButton)

   // check summary info
   const orderSummaryText = screen.getByText('Order Summary')
   expect(orderSummaryText).toBeInTheDocument()

   const vanillaInfo = screen.getByText('2 Vanilla')
   const cherriesInfo = screen.getByText('Cherries')
   expect(vanillaInfo).toBeInTheDocument()
   expect(cherriesInfo).toBeInTheDocument()

   const scoopsSubtotal = screen.getByText('Scoops: $', { exact: false })
   const toppingsSubtotal = screen.getByText('Toppings: $', { exact: false })
   const total = screen.getByText('Total: $', { exact: false })

   expect(scoopsSubtotal).toHaveTextContent('6.00')
   expect(toppingsSubtotal).toHaveTextContent('3.00')
   expect(total).toHaveTextContent('9.00')

   // click confirm order button
   const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
   })
   const confirmOrderButton = screen.getByRole('button', {
      name: 'Confirm order',
   })

   await user.click(termsAndConditionsCheckbox)
   await user.click(confirmOrderButton)

   // check if loader works
   const loader = screen.getByRole('status')
   expect(loader).toBeInTheDocument()

   // check if order number is correct
   const thankYouText = screen.getByText('Thank you!')
   expect(thankYouText).toBeInTheDocument()

   const orderNumberText = await screen.findByText('Your order number is', {
      exact: false,
   })
   expect(orderNumberText).toHaveTextContent('1234567890')

   // check if loader is not in the document
   const notLoader = screen.queryByRole('status')
   expect(notLoader).not.toBeInTheDocument()

   // click new order button
   const newOrderButton = screen.getByRole('button', {
      name: 'Create new order',
   })

   await user.click(newOrderButton)

   // check if totals have been reset
   const scoopsTotal = screen.getByText('Scoops total: $', { exact: false })
   const toppingsTotal = screen.getByText('Toppings total: $', { exact: false })
   const allTotal = screen.getByText('Grand total: $', { exact: false })

   expect(scoopsTotal).toHaveTextContent('0.00')
   expect(toppingsTotal).toHaveTextContent('0.00')
   expect(allTotal).toHaveTextContent('0.00')
})
