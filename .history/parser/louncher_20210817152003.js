import puppeteer from 'puppeteer';

class Louncher {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      console.log(url);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      // await page.screenshot({ path: 'example.png' });
      // await browser.close();
   }
}

export { Louncher }