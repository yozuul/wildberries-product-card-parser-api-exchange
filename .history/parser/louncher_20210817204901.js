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
         headless: false,
         devtools: true,
         args: [`--window-size=1920,1080`],
         defaultViewport: {
           width:1920,
           height:1080
         },
         env: {
            tag: process.env.TAG
         }
      });

      console.log(process.env.TAG);

      const page = await browser.newPage();
      await page.goto(url);

      await page.evaluateOnNewDocument(() => {
         window.addEventListener('DOMContentLoaded', () => {

            function test() {
               console.log('dddf');
            }

            console.log(test());
            console.log(document.querySelector(env).innerText);
         });
      });

      // console.log('sd');
      // await browser.close();

      // const page = await browser.newPage();
      // await page.evaluateOnNewDocument(() => {
      //    window.addEventListener('DOMContentLoaded', () => {
      //       const fields = this.getFields()
      //       console.log(document.querySelector(fields.brand.query).innerText);
      //    });
      // });
      // page.on('console', msg => console.log(msg.text()));
      // await page.goto(url);

      // await browser.close();

//       browser.newPage({
//          preload: '../test.js'
//       })
//
//         // or something like this which will execute in order or async
//         browser.newPage({
//          preload: ["this.js"],
//          preloadAsync: true
//         })
//
//
//       const page = await browser.newPage();
//       await page.goto(url);
//       let bodyHTML = await page.evaluate(async () => {
//          const wrapper = await document.querySelector(`[data-link="text{:productCard^brandName}"]`).innerText
//          return wrapper
//       // console.log(field.brand.query);
//       })
//
//       console.log(bodyHTML);
      // await browser.close();
    }
    getHTML() {

    }
}

export { Louncher }