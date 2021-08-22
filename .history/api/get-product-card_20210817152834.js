import { Louncher } from '../parser'

class GetProductCard {
   async checkURL(url) {
      const data = await new Louncher().parseURL(url)
   }
}

export default new GetProductCard()