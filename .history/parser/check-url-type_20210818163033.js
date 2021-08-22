class TypeURL {

   check(url) {
      const wd = this.checkDonor(url)
      console.log(wd);

   }

   checkDonor(url) {
      const donors = {
         wildberries: 'wildberries.ru'
      }
      for (const website in donors) {
         const checked = this.checkWebsiteURL(url, donors[website])
         if(checked) {
            if(website == 'wildberries') {
               return this.wildberriesTypeURL(url)
            }
         } else {
            return {
               response: false,
               reason: 'Введите корректный URL сайта - донора'
            }
         }
      }
   }

   wildberriesTypeURL(url) {
      if(url.split('urldetail.aspx')[1]) {
         return 'valid_product_card'
      } else {
         return 'not_card_url'
      }
   }

   checkWebsiteURL(url, donor) {
      if(url.split(donor)[0]) {
         return true
      } else { return false }
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