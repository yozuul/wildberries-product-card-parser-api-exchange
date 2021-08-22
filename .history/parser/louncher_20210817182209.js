import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      const browser = await puppeteer.launch({
         headless: false,
         devtools: true,
         defaultViewport: null,
      });

      const page = await browser.newPage();
      await page.goto(url);

      let bodyHTML = await page.evaluate(() => {
         const wrapper = document.querySelector('.sw-slider-kt-mix')
         return wrapper
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