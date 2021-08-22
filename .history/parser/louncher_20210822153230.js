import puppeteer from 'puppeteer';
import { TypeURL } from './check-url-type'
import { Wildberries } from '../marketplace'

class Louncher {

   async checkURL(url) {
      const urlType = new TypeURL().check(url)
      const { donorName, urlType }
      if(donorName) {
         if(donorName == 'wildberries') {
            if(urlType == 'product_card') {
               return await Wildberries.parseCard(url)
            }
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


}

export { Louncher }