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

      await page.goto(url);

      // Get the "viewport" of the page, as reported by the page.
      const dimensions = await page.evaluate(() => {
         return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
         };
      });

      console.log(page);

      console.log('Dimensions:', dimensions);
   }
}

export { Louncher }