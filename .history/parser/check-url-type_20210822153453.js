class TypeURL {

   check(sendURL) {
      return this.checkDonor(sendURL)
   }

   checkDonor(url) {

      let checkResult = {
         donorName: false,
         urlType: false
      }
      const donors = {
         wildberries: 'wildberries.ru'
      }

      for (const website in donors) {
         const checked = this.checkWebsiteURL(url, donors[website])
         if(checked) {
            if(website == 'wildberries') {
               checkResult.donorName = 'wildberries'
               checkResult.urlType = this.wildberriesTypeURL(url)
            }
         }
      }
      return checkResult
   }

   wildberriesTypeURL(url) {
      if(url.split('detail.aspx')[1]) {
         return 'product_card'
      } else {
         return false
      }
   }

   checkWebsiteURL(url, donor) {
      if(url.split(donor)[0]) {
         return true
      } else { return false }
   }
}

export { TypeURL }