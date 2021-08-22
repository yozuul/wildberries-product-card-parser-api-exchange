import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      console.log(url);
      const browser = await puppeteer.launch({
         headless: false,
         devtools: true
      })
      const page = await browser.newPage();
      const dimensions = await page.evaluate(() => {
         return {
           width: document.documentElement.clientWidth,
           height: document.documentElement.clientHeight,
           deviceScaleFactor: window.devicePixelRatio,
         };
       })
       return dimensions
//       await page.goto(url, {
//          waitUntil: 'networkidle2',
//       });
//
//       page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
//       await page.evaluate(() => console.log(`url is ${location.href}`));

      // await page.screenshot({ path: 'example.png' });
      // await browser.close();
   }
}

export { Louncher }