import puppeteer from 'puppeteer';
import { TypeURL } from './check-url-type'
import { Wildberries, WildberriesExtras } from '../marketplace'

class Louncher {

   async checkURL(url) {
      const checkResult = new TypeURL().check(url)
      if(checkResult.donorName) {
         return await this.tryParseURL(url, checkResult.urlType)
      } else {
         return this.error.noDonor
      }
   }

   async tryParseURL(url, urlType) {
      const browser = await this.startBrowser()
      const data = await new Wildberries(browser).parseCard(url)
      return { data: true }
      // if(donorName == 'wildberries') {
      //    if(urlType == 'product_card') {
      //       let parseResult = await new Wildberries(browser).parseCard(url)
      //       console.log(parseResult);
      //       // if(parseResult) {
      //       //    parseResult.extras = new WildberriesExtras(parseResult).cardData()
      //       //    return parseResult
      //       // } else {
      //       //    return this.error.parseEror
      //       // }
      //       return parseResult
      //    } else {
      //       return this.error.wildberries.cardNotFound
      //    }
      // }
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