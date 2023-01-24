import { render, screen } from '@testing-library/react'
import Options, { OptionType } from '../Options'

test('displays image for each scoop option from the server', async () => {
   render(<Options optionType={OptionType.Scoops} />)

   const scoopImages: HTMLImageElement[] = await screen.findAllByRole('img', {
      name: /scoop$/i,
   })
   expect(scoopImages).toHaveLength(2)

   const altTexts = scoopImages.map((image) => image.alt)
   expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
