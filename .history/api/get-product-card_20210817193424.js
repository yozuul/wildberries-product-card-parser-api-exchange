import { Louncher } from '../parser'

class GetProductCard {
   async checkURL(url) {
      const field = {
         brand: {
            query: '[data-link="text{:productCard^brandName}"]',
            data: 'innerText'
         }
      }

      const currentPage = await new Louncher(field).parseURL()
   }
}

export default new GetProductCard()