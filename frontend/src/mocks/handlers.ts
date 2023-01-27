import { rest } from 'msw'

const handlers = [
   rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(
         ctx.json([
            { name: 'Chocolate', imagePath: '/images/chocolate.png' },
            { name: 'Vanilla', imagePath: '/images/vanilla.png' },
            { name: 'Mint', imagePath: '/images/mint.png' },
            { name: 'Caramel', imagePath: '/images/caramel.png' },
         ])
      )
   }),
]

export default handlers
