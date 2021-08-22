import puppeteer from 'puppeteer';


class Louncher {
   constructor(params) {
      this.params = params
   }


   async getFields() {
      return {
         brand: {
            query: '[data-link="text{:productCard^brandName}"]',
            data: 'innerText'
         }
      }
   }

   async parseURL(url) {
      const browser = await puppeteer.launch({
         // headless: false,
         devtools: true,
         args: [`--window-size=1920,1080`],
         defaultViewport: {
           width:1920,
           height:1080
         }
      });

      const page = await browser.newPage();
      await page.goto(url);

      let bodyHTML = await page.evaluate(async () => {
         const fields = await this.getFields()
         const wrapper = await document.querySelector(fields.brand.query).innerText
         return wrapper
      // console.log(field.brand.query);
      })

      console.log(bodyHTML);
      // await browser.close();
    }
    getHTML() {

    }
}

export { Louncher }