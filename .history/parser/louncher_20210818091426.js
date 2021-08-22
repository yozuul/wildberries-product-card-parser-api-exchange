import puppeteer from 'puppeteer';

function test() {
   console.log('dddf');
}

class Louncher {
   constructor(params) {
      this.params = params
   }

   getFields() {
      const fields = {
         brand: {
            query: '[data-link="text{:productCard^brandName}"]',
            data: 'innerText'
         }
      }
      return fields
   }

   async parseURL(url) {
      const browser = await puppeteer.launch({
         // headless: false,
         // devtools: true,
         // args: [`--window-size=1920,1080`],
         // defaultViewport: {
         //   width:1920,
         //   height:1080
         // },
      })

      const page = await browser.newPage();
      await page.goto(url);


      const fields = {
         brand: {
            query: '[data-link="text{:productCard^brandName}"]',
            data: 'innerText',
         }
      }

      let data = {}

      for(let field in fields) {
         const fieldData = fields[field]
         data[field] = await page.evaluate((fieldData) => {
            const domItem = document.querySelector(fieldData.query)
            return `${domItem}.${fieldData.data}`
         }, fieldData);
      }

    }
    getHTML() {

    }
}

export { Louncher }