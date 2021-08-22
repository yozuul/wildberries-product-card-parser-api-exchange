import puppeteer from 'puppeteer';

class Louncher {

   async parseCardURL(url) {

      const browser = await puppeteer.launch({
         headless: false,
         devtools: true,
         args: [`--window-size=1920,1080`],
         defaultViewport: {
           width:1920,
           height:1080
         },
      })

      const page = await browser.newPage()
      await page.goto(url)

      const fields = {
         // Название товара
         name: await page.evaluate(() => {
            const query = '[data-link="text{:productCard^goodsName}"]'
            return document.querySelector(query).innerText
         }),
         // Описание товара
         desc: await page.evaluate(() => {
            const query = '[property="og:description"]'
            return document.querySelector(query).content
         }),
         // Бренд
         brand: await page.evaluate(() => {
            const query = '.price-block__final-price'
            return document.querySelector(query).innerText
         }),
         // Цена товара
         price: await page.evaluate(() => {
            const query = '[data-link="text{:productCard^brandName}"]'
            return document.querySelector(query).innerText
         }),
         // Изображения
         images: await page.evaluate(() => {
            const domItem = []

            const query = '.swiper-wrapper .slide__content img'
            const itemsArray = document.querySelectorAll(query)
            for(let item of itemsArray) {
               domItem.push('https:' + item.getAttribute('src'))
            }
            return domItem
         }),
         // Описания и характеристики
         details: await page.evaluate(() => {
            const details = {}

            const query = {
               consist: '[data-link="text{:productCard.consist}"]',
               desc: '[data-link="text{:productCard.description}"]',
               params: '.product-params__table .product-params__row'
            }
            const data = {
               consist: document.querySelector(query.consist),
               desc: document.querySelector(query.desc),
               params: document.querySelectorAll(query.params)
            }

            if(data.consist.innerText) {
               details.consist = data.consist.innerText
            }
            if(data.desc.innerText) {
               details.desc = data.desc.innerText
            }
            if(data.params) {
               let rowNum = 0
               details.params = {}

               console.log(data.params);
               for(let param of data.params) {
                  const rowClass = `rowNum_${rowNum}`
                  param.classList.add(rowClass)

                  const paramName = document.querySelector(`.${rowClass} th`).innerText
                  const paramValue = document.querySelector(`.${rowClass} td`).innerText

                  details.params[paramName] = paramValue
                  rowNum++
               }
            }
         })
      }

      console.log(fields);
    }
}

export { Louncher }