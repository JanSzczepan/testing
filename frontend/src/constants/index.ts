export type Totals = {
   scoops: number
   toppings: number
}

type Options = 'scoops' | 'toppings'

export const pricePerItem: Totals = {
   scoops: 2,
   toppings: 1.5,
}

export const optionsArr: Options[] = ['scoops', 'toppings']
