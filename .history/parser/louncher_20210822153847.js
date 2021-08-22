import puppeteer from 'puppeteer';
import { TypeURL } from './check-url-type'
import { Wildberries } from '../marketplace'

class Louncher {

   async checkURL(url) {
      const checkResult = new TypeURL().check(url)
      const { donorName, urlType } = checkResult
      if(donorName) {
         const browser = await this.startBrowser()
         if(donorName == 'wildberries') {
            if(urlType == 'product_card') {
               return await new Wildberries(browser).parseCard(url)
            } else {
               return this.error.wildberries.cardNotFound
            }
         }
      } else {
         return this.error.noDonor
      }
   }

   async startBrowser() {
      return await puppeteer.launch({
         // headless: false,
         // devtools: true,
         // args: [`--window-size=1920,1080`],
         // defaultViewport: {
         //   width:1920,
         //   height:1080
         // },
      })
   }

   get error() {
      return {
         noDonor: {
            response: 'Указанная ссылка не соотвествует донору'
         },
         wildberries: {
            cardNotFound: {
               response: 'По указанной ссылке карточка товара не найдена'
            }
         }
      }
   }

}

export { Louncher }