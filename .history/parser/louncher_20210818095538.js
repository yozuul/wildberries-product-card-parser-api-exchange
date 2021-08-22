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
      })

      const page = await browser.newPage();
      await page.goto(url);


      const fields = {
         itemName: {
            query: '[data-link="text{:productCard^goodsName}"]',
            type: 'one',
            data: 'innerText'
         },
         price: {
            query: '.price-block__final-price',
            type: 'one',
            data: 'innerText'
         },
         brand: {
            query: '[data-link="text{:productCard^brandName}"]',
            type: 'one',
            data: 'innerText',
         },
         images: {
            query: '.swiper-wrapper .slide__content img',
            type: 'all',
            data: 'src',
         },
      }

      let data = {}

      for(let field in fields) {
         const fieldData = fields[field]
         data[field] = await page.evaluate((fieldData) => {

            let domItem = false

            if(fieldData.type = 'one') {
               domItem = document.querySelector(fieldData.query)
            }

            if(fieldData.type = 'all') {
               let values = []
               const itemsArray = document.querySelectorAll(fieldData.query)
               for(let item of itemsArray) {
                  if(fieldData.data == 'src') {
                     values.push('https:' + item.getAttribute('src'))
                  }
               }
               return values
            }

            if(fieldData.data == 'innerText') {
               return domItem.innerText
            }
            if(fieldData.data == 'innerHTML') {
               return domItem.innerHTML
            }

         }, fieldData);
      }

      console.log(data);
    }
    getHTML() {
      //images.wbstatic.net/big/new/13240000/13243476-1.jpg
      //images.wbstatic.net/tm/new/13240000/13243476-1.jpg

      //images.wbstatic.net/tm/new/13240000/13243476-2.jpg
    }
}

export { Louncher }