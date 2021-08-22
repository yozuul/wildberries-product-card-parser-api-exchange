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



      const dimensions = await page.evaluate((page) => {
        console.log(page.querySelector('.sw-slider-kt-mix'));
      });
//
//       console.log('Dimensions:', dimensions);

      // await browser.close();
      function attachFrame() {
         console.log(document.body);
      }
    }

    getHTML() {

    }
}

export { Louncher }