class TypeURL {

   check(url) {
      const wd = this.checkDonor(url)

   }

   checkDonor(url) {
      const donors = {
         wildberries: 'wildberries.ru'
      }
      for (const website in donors) {
         const checked = this.checkURL(url, donors[website])
         if(checked) {
            if(website == 'wildberries') {
               const urlType = this.wildberriesTypeURL(url)
            }
         }
      }
   }

   wildberriesTypeURL(url) {
      console.log(url);
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