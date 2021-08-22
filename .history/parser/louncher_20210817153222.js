import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      const browser = await puppeteer.launch({
         headless: false
      });
      const page = await browser.newPage();

      await page.goto(url);

      const getProductData = await page.evaluate(() => {
         console.log(document);
      })
//       const dimensions = await page.evaluate(() => {
//         return {
//           width: document.documentElement.clientWidth,
//           height: document.documentElement.clientHeight,
//           deviceScaleFactor: window.devicePixelRatio,
//         };
//       });

      console.log('Dimensions:', dimensions);

      await browser.close();
    }
}

export { Louncher }