import puppeteer from 'puppeteer';
import { TypeURL } from './check-url-type'

class Louncher {

   checkURL(url) {
      const urlType = new TypeURL().check(url)
      console.log(urlType);
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