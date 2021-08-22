import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      const browser = await puppeteer.launch({
         headless: false,
         devtools: true
      });

      const page = await browser.newPage();
      await page.goto(url);


      page.evaluate("querySelector('.sw-slider-kt-mix')").then(function(result) {
         console.info(result);
         // browser.close();
     });

      // await browser.close();
    }

    getHTML() {

    }
}

export { Louncher }