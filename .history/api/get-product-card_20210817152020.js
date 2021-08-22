import { Louncher } from '../parser'

class GetProductCard {
   checkURL(url) {
      new Louncher().parseURL(url)
   }
}

export default new GetProductCard()