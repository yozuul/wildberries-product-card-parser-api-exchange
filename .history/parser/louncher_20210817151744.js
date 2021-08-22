import { launch } from 'puppeteer';

class Parser {
   constructor(params) {
      this.params = params
   }
   async parseURL(url) {
      const browser = await launch();
      const page = await browser.newPage();
      await page.goto(url);

      // await page.screenshot({ path: 'example.png' });
      // await browser.close();
   }
}

export default new Parser()