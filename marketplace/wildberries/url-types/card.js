class Wildberries {
   constructor(browser) {
      this.browser = browser
   }

   async parseCard(url) {
      const browser = await this.browser
      const page = await browser.newPage()
      await page.goto(url)

      const fields = {
         // Название товара
         cardProductName: await page.evaluate(() => {
            const query = '[data-link="text{:productCard^goodsName}"]'
            return document.querySelector(query).innerText
         }),
         // Цена товара
         cardProductBrand: await page.evaluate(() => {
            const query = '[data-link="text{:productCard^brandName}"]'
            return document.querySelector(query).innerText
         }),
         // Бренд
         cardProductPrice: await page.evaluate(() => {
            const query = '.price-block__final-price'
            return document.querySelector(query).innerText
         }),
         // Цвет
         cardProductColor: await page.evaluate(() => {
            const query = '.same-part-kt__color .color'
            const chekcColor = document.querySelector(query)
            if(chekcColor) {
               return chekcColor.innerText
            } else {
               return false
            }
         }),
         // Изображения
         cardProductImages: await page.evaluate(() => {
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

               for(let param of data.params) {
                  const rowClass = `rowNum_${rowNum}`
                  param.classList.add(rowClass)

                  const paramName = document.querySelector(`.${rowClass} th`).innerText
                  const paramValue = document.querySelector(`.${rowClass} td`).innerText

                  details.params[paramName] = paramValue
                  rowNum++
               }
            }

            return details
         })
      }

      if(fields) {
         return this.dataProcess(fields)
      } else {
         return false
      }
    }

    dataProcess(fields) {
      const price = fields.cardProductPrice
      const deleteSpaces = price.replace(/\s/g, '')
      const deleteCurrency = deleteSpaces.replace(/₽/g, '')
      fields.cardProductPrice = deleteCurrency
      return fields
    }
}

export { Wildberries }