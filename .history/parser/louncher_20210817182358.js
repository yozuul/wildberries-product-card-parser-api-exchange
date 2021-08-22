import puppeteer from 'puppeteer';

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

      let bodyHTML = await page.evaluate(() => {
         return new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML;
         // const wrapper = document.querySelector('.sw-slider-kt-mix')
         // return wrapper
      });

      console.log(bodyHTML);
   //    await page.evaluate("document.querySelector('.sw-slider-kt-mix')").then(function(result) {
   //       console.info(result);
   //       // browser.close();
   //   });

      // await browser.close();
    }

    getHTML() {

    }
}

export { Louncher }