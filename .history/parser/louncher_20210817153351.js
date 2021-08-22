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


      const dimensions = await page.evaluate(() => {
        return document;
      });

      console.log('Dimensions:', dimensions);

      // await browser.close();
    }
}

export { Louncher }