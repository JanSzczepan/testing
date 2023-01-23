import { fireEvent, render, screen } from '@testing-library/react'
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

test('checkbox enables button on first click and disables on second click', () => {
   render(<OrderSummary />)

   const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
   })
   const confirmButton = screen.getByRole('button', { name: 'Confirm order' })

   fireEvent.click(checkbox)

   expect(confirmButton).toBeEnabled()

   fireEvent.click(checkbox)

   expect(confirmButton).toBeDisabled()
})
