import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      const browser = await puppeteer.launch({
         headless: false,
         devtools: true
      })

      const openPage = await page.goto(url);

      // Get the "viewport" of the page, as reported by the page.
      const dimensions = await openPage.evaluate(() => {
         return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
         };
      });

      console.log(openPage);

      console.log('Dimensions:', dimensions);
   }
}

export { Louncher }