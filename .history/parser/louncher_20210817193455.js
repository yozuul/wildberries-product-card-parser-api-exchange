import puppeteer from 'puppeteer';
import jsdom from 'jsdom'
const { JSDOM } = jsdom;




class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      const browser = await puppeteer.launch({
         headless: false,
         devtools: true,
         args: [`--window-size=1920,1080`],
         defaultViewport: {
           width:1920,
           height:1080
         }
      });

      const page = await browser.newPage();
      await page.goto(url);

      let bodyHTML = await page.evaluate(async () => {
         const wrapper = await document.querySelector(this.params.query).innerText
         return wrapper
      // console.log(field.brand.query);
      })

      console.log(await bodyHTML);
      // await browser.close();
    }

    getHTML() {

    }
}

export { Louncher }