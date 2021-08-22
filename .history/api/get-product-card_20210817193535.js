import { Louncher } from '../parser'

class GetProductCard {
   async checkURL(url) {
      const field = {
         brand: {
            query: '[data-link="text{:productCard^brandName}"]',
            data: 'innerText'
         }
      }

      const currentPage = await new Louncher(field.brand).parseURL(url)
   }
}

export default new GetProductCard()