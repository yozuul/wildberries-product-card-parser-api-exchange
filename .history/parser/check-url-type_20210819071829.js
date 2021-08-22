import { Louncher } from './louncher'

class TypeURL {
   async check(data) {
      const { cardURL } = data
      const wd = this.checkDonor(cardURL)
      if(wd == 'valid_product_card') {
         const data = await new Louncher().parseCardURL(cardURL)
         console.log(data);
      }
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
      if(url.split('detail.aspx')[1]) {
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