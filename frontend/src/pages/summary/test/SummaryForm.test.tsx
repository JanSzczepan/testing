import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderSummary from '../OrderSummary'

test('initial condition - checkbox is unchecked and button is disabled', () => {
   render(<OrderSummary />)

   const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
   })
   const confirmButton = screen.getByRole('button', { name: 'Confirm order' })

   expect(checkbox).not.toBeChecked()
   expect(confirmButton).toBeDisabled()
})

test('checkbox enables button on first click and disables on second click', async () => {
   const user = userEvent.setup()

   render(<OrderSummary />)

   const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
   })
   const confirmButton = screen.getByRole('button', { name: 'Confirm order' })

   await user.click(checkbox)

   expect(confirmButton).toBeEnabled()

   await user.click(checkbox)

   expect(confirmButton).toBeDisabled()
})

test('popover is hidden by default and responds to hover', async () => {
   const user = userEvent.setup()

   render(<OrderSummary />)

   // before
   const nullPopover = screen.queryByText(
      'No ice cream will actually be delivered'
   )

   expect(nullPopover).not.toBeInTheDocument()

   // hover
   const termsAndConditionsSpan = screen.getByText('Terms and Conditions')
   await user.hover(termsAndConditionsSpan)

   const popover = screen.getByText('No ice cream will actually be delivered')
   expect(popover).toBeInTheDocument()

   // unhover
   await user.unhover(termsAndConditionsSpan)

   expect(popover).not.toBeInTheDocument()
})
