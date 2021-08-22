class typeURL {
   constructor(url) {
      this.url = url
   }
   check() {

   }
}

export { typeURL }




import { Louncher } from '.'

class GetProductCard {
   async checkURL(url) {

      const currentPage = await new Louncher().parseURL(url)
   }
}

export default new GetProductCard()