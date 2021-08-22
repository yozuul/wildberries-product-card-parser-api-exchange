import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      console.log(url);
      const browser = await puppeteer.launch({
         headless: false
      })
      console.log(browser);
      const page = await browser.newPage();
      await page.goto(url, {
         waitUntil: 'networkidle2',
      });

      // await page.screenshot({ path: 'example.png' });
      // await browser.close();
   }
}

export { Louncher }