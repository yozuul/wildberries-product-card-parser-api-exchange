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
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {
         waitUntil: 'networkidle2',
      });

      // await page.screenshot({ path: 'example.png' });
      await browser.close();
   }
}

export { Louncher }