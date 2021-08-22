class typeURL {
   constructor(params) {
      this.params = params
   }
   check() {

   }
}







import { Louncher } from '.'

class GetProductCard {
   async checkURL(url) {

      const currentPage = await new Louncher().parseURL(url)
   }
}

export default new GetProductCard()