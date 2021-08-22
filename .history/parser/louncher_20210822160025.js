import puppeteer from 'puppeteer';
import { TypeURL } from './check-url-type'
import { Wildberries, WildberriesExtras } from '../marketplace'

class Louncher {

   async checkURL(url) {
      const checkResult = new TypeURL().check(url)
      const { donorName, urlType } = checkResult
      if(donorName) {
         return await this.tryParseURL()
      } else {
         return this.error.noDonor
      }
   }

   async tryParseURL() {
      const browser = await this.startBrowser()
      if(donorName == 'wildberries') {
         if(urlType == 'product_card') {
            let parseResult = await new Wildberries(browser).parseCard(url)
            if(parseResult) {
               parseResult.extras =
            } return this.error.parseEror
         } else {
            return this.error.wildberries.cardNotFound
         }
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
            type: 'error',
            text: 'Указанная ссылка не соотвествует донору'
         },
         parseEror: {
            type: 'error',
            text: 'Ошибка парсинга. Донор не отвечает'
         },
         wildberries: {
            cardNotFound: {
               type: 'error',
               text: 'По указанной ссылке карточка товара не найдена'
            }
         }
      }
   }

}

export { Louncher }