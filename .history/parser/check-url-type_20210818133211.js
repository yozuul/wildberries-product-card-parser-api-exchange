class TypeURL {
   constructor(url) {
      this.url = url
   }
   check() {

   }
}

export { TypeURL }




import { Louncher } from '.'

class GetProductCard {
   async checkURL(url) {

      const currentPage = await new Louncher().parseURL(url)
   }
}

export default new GetProductCard()