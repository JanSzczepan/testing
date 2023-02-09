import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderConfirmation from '../OrderConfirmation'

test('order number is displayed properly', async () => {
   render(<OrderConfirmation />)

   const orderNumberText = await screen.findByText('Your order number is', {
      exact: false,
   })

   expect(orderNumberText).toHaveTextContent('1234567890')
})
