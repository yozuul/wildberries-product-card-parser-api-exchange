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
         productName: await page.evaluate(() => {
            const query = '[data-link="text{:productCard^goodsName}"]'
            return document.querySelector(query).innerText
         }),
         // Цена товара
         productBrand: await page.evaluate(() => {
            const query = '[data-link="text{:productCard^brandName}"]'
            return document.querySelector(query).innerText
         }),
         // Бренд
         productPrice: await page.evaluate(() => {
            const query = '.price-block__final-price'
            return document.querySelector(query).innerText
         }),
         // Цвет
         productColor: await page.evaluate(() => {
            const query = '.same-part-kt__color .color'
            const chekcColor = document.querySelector(query)
            if(chekcColor) {
               return chekcColor.innerText
            } else {
               return false
            }
         }),
         // Изображения
         productImages: await page.evaluate(() => {
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
         }),

         source: await page.evaluate(() => {
            const sourceCode = document.body.innerHTML
            const splitLeft = sourceCode.split('ssrModel:')[1]
            const splitRight = splitLeft.split('appVersion:')[0].trim()

            const jsonData = splitRight.replace(/\,$/, "")
            return JSON.parse(jsonData)
         })

      }

      if(fields) {
         return this.dataProcess(fields)
      } else {
         return false
      }
    }

    dataProcess(fields) {
      const price = fields.productPrice
      const deleteSpaces = price.replace(/\s/g, '')
      const deleteCurrency = deleteSpaces.replace(/₽/g, '')
      fields.productPrice = deleteCurrency
      return fields
    }
}

export { Wildberries }