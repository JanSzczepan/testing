import { render, screen } from '@testing-library/react'
import Options, { OptionType } from '../Options'

test('displays image for each scoop option from the server', async () => {
   render(<Options optionType={OptionType.Scoops} />)

   const scoopImages: HTMLImageElement[] = await screen.findAllByRole('img', {
      name: /scoop$/i,
   })
   expect(scoopImages).toHaveLength(4)

   const altTexts = scoopImages.map((image) => image.alt)

   expect(altTexts).toEqual([
      'Chocolate scoop',
      'Vanilla scoop',
      'Mint scoop',
      'Caramel scoop',
   ])
})

test('displays image for each topping option from the server', async () => {
   render(<Options optionType={OptionType.Toppings} />)

   const toppingImages: HTMLImageElement[] = await screen.findAllByRole('img', {
      name: /topping/i,
   })
   expect(toppingImages).toHaveLength(3)

   const altTexts = toppingImages.map((image) => image.alt)
   expect(altTexts).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
   ])
})
