import { Louncher } from '../parser'

class GetProductCard {
   async checkURL(url) {
      const currentPage = await new Louncher().parseURL(url)
   }
}

export default new GetProductCard()