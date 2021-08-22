import { Louncher } from './louncher'

class TypeURL {

   check(sendURL) {
      const { data } = sendURL
      return this.checkDonor(data)
      // if(wd == 'valid_product_card') {
      //    return await new Louncher().parseCardURL(data)
      // }
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