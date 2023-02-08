import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../test-utils/testing-library-utils'
import Options, { OptionType } from '../Options'
import OrderEntry from '../OrderEntry'

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

describe('grand total', () => {
   test('grand total start at $0.00', () => {
      render(<OrderEntry />)

      const grandTotal = screen.getByText('Grand total: $', { exact: false })

      expect(grandTotal).toHaveTextContent('0.00')
   })
   test('grand total updates properly if scoops are added first', async () => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const vanillaInput = await screen.findByRole('spinbutton', {
         name: 'Vanilla',
      })
      const chocolateInput = await screen.findByRole('spinbutton', {
         name: 'Chocolate',
      })
      const cherriesCheckbox = await screen.findByRole('checkbox', {
         name: 'Cherries',
      })

      await user.clear(vanillaInput)
      await user.type(vanillaInput, '1')
      await user.clear(chocolateInput)
      await user.type(chocolateInput, '1')
      await user.click(cherriesCheckbox)

      const grandTotal = screen.getByText('Grand total: $', { exact: false })

      expect(grandTotal).toHaveTextContent('5.50')
   })
   test('grand total updates properly if toppings are added first', async () => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const cherriesCheckbox = await screen.findByRole('checkbox', {
         name: 'Cherries',
      })
      const hotFudgeCheckbox = await screen.findByRole('checkbox', {
         name: 'Hot fudge',
      })
      const vanillaInput = await screen.findByRole('spinbutton', {
         name: 'Vanilla',
      })

      await user.click(cherriesCheckbox)
      await user.click(hotFudgeCheckbox)
      await user.clear(vanillaInput)
      await user.type(vanillaInput, '1')

      const grandTotal = screen.getByText('Grand total: $', { exact: false })

      expect(grandTotal).toHaveTextContent('5.00')
   })
   test('grand total updates properly if items are removed', async () => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const vanillaInput = await screen.findByRole('spinbutton', {
         name: 'Vanilla',
      })
      const chocolateInput = await screen.findByRole('spinbutton', {
         name: 'Chocolate',
      })
      const cherriesCheckbox = await screen.findByRole('checkbox', {
         name: 'Cherries',
      })
      const hotFudgeCheckbox = await screen.findByRole('checkbox', {
         name: 'Hot fudge',
      })

      await user.clear(vanillaInput)
      await user.type(vanillaInput, '2')
      await user.clear(chocolateInput)
      await user.type(chocolateInput, '2')
      await user.click(cherriesCheckbox)
      await user.click(hotFudgeCheckbox)

      await user.type(vanillaInput, '0')
      await user.click(cherriesCheckbox)

      const grandTotal = screen.getByText('Grand total: $', { exact: false })

      expect(grandTotal).toHaveTextContent('5.50')
   })
})
