import puppeteer from 'puppeteer';
import { TypeURL } from './check-url-type'
import { Wildberries, WildberriesExtras } from '../marketplace'

class Louncher {

   async checkURL(url) {
      const checked = new TypeURL().check(url)
      if(checked.donorName) {
         return await this.checkDonor(url, checked)
      } else {
         return this.error.noDonor
      }
   }

   async checkDonor(url, checked) {
      const browser = await this.startBrowser()
      if(checked.donorName == 'wildberries') {
         const data = await this.checkWildberriesURL(url, browser, checked.urlType)
         await browser.close()
         return data
      }
   }

   async checkWildberriesURL(url, browser, urlType) {
      if(urlType == 'product_card') {
         let parseResult = await new Wildberries(browser).parseCard(url)
         if(parseResult) {
            parseResult.extras = await new WildberriesExtras(parseResult).cardData()
            return parseResult
         } else {
            return this.error.parseEror
         }
      } else {
         return this.error.wildberries.cardNotFound
      }
   }

   async startBrowser(notHeadless) {
      return await puppeteer.launch(notHeadless ? this.windowProps : '')
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

   get windowProps() {
      return {
         headless: false,
         devtools: true,
         args: [`--window-size=1920,1080`],
         defaultViewport: {
           width:1920,
           height:1080
         },
      }
   }
}

export { Louncher }