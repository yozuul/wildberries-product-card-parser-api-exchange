const query = (el) => document.querySelector(el)
const queryAll = (el) => document.querySelectorAll(el)

class Panel {
   constructor(api, button, element, input) {
      this.api = api
      this.button = button
      this.element = element
      this.input = input
   }

   waitParse() {
      this.parseButtonControl()

   }

   cleanMultipleBlock() {
      const cleanInside = [
         queryAll('#productImages div'),
         queryAll('#productParams_table tr')
      ]
      for(let items of cleanInside) {
         if(items.length > 0) {
            Array.from(items).map((i) => i.remove())
         }
      }
   }

   parseButtonControl() {
      this.button.parseCard.onclick = async () => {
         this.cleanMultipleBlock()
         // Кнопка сохранения
         this.button.saveCard.classList.add('dn')
         // Блок изображений
         this.element.productImages_wrapper.classList.add('dn')
         // Включение спиннера парсинга
         this.element.parseCard_inactive.classList.add('dn')
         this.button.parseCard.setAttribute('disbale', '')
         this.element.parseCard_active.classList.remove('dn')
         // Получение данных
         let parseData = await this.apiFetch(this.api.parseCard, {data: input.cardProductURL.value})
         parseData.extras = await this.apiFetch(this.api.getAdditionalCardData, parseData)

         this.passDataToFields(parseData)
      }
   }

   passDataToFields(data) {
      console.log(data);
      // Основные данные товара
      const commonDataFields = {
         cardProductName: input.cardProductName,
         cardProductBrand: input.cardProductBrand,
         cardProductPrice: input.cardProductPrice
      }
      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly')
         commonDataFields[input].value = data[input]
      }

      // Изображения
      if(data.cardProductImages) {
         this.element.productImages_wrapper.classList.remove('dn')
         data.cardProductImages.reverse()
         const imagesBlock = query('#productImages')
         let imgNum = 0
         for(let image of data.cardProductImages) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }
      }
      // Состав
      const detailConsist = data.details.consist
      if(detailConsist) {
         element.productConsist_wrapper.classList.remove('dn')
         input.productConsist.value = detailConsist
      } else {
         element.productConsist_wrapper.classList.add('dn')
      }
      // Описание
      const detailDesc = data.details.desc
      if(detailDesc) {
         textarea.desc.removeAttribute('readonly')
         textarea.desc.value = detailDesc
      }
      // Характеристики
      const detailParams = data.details.params
      if(detailParams) {
         element.productParams_wrapper.classList.remove('dn')

         for(let name in detailParams) {
            const paramRow = `<tr><th>${name}</th><td>${detailParams[name]}</td></tr>`
            element.productParams_table.insertAdjacentHTML('afterbegin', paramRow)
         }
      } else {
         element.productParams_wrapper.classList.add('dn')
      }
      // Категория

      this.button.saveCard.classList.remove('dn')
      // Включение спиннера парсинга
      this.element.parseCard_active.classList.add('dn')
      this.button.parseCard.removeAttribute('disbale')
      this.element.parseCard_inactive.classList.remove('dn')

   }

   async apiFetch(apiURL, jsonData) {
      try {
         const response = await fetch(apiURL, {
            method: 'POST',
            body: JSON.stringify(jsonData),
            headers: { 'Content-Type': 'application/json' }
         })
         return await response.json()
      } catch (error) {
         console.error('Error fetching:', error);
      }
   }
}
// Запросы на внутренний API
const api = {
   parseCard: 'http://localhost:3000/parseCard',
   getAdditionalCardData: 'http://localhost:3000/getAdditionalCardData',
   saveCard: 'http://localhost:3000/saveCard',
}
// Поля формы
const input = {
   cardProductURL: query('#cardProductURL'),
   cardProductName: query('#productName'),
   cardProductBrand: query('#productBrand'),
   cardProductPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   productDesc: query('#productDesc'),
}
// Кнопки управления формой
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
}
// Селекты
const select = {
   productCategory: query('#productCategory'),
   productTnved: query('#productTnved'),
}
// Интерактивные элементы
const element = {
   parseCard_inactive: query('#parseCard_inactive'),
   parseCard_active: query('#parseCard_active'),
   saveCard_inactive: query('#saveCard_inactive'),
   saveCard_active: query('#saveCard_active'),
   productExtras: query('.productExtras'),
   productImages_wrapper: query('#productImages_wrapper'),
   productConsist_wrapper: query('#productConsist_wrapper'),
   productParams_wrapper: query('#productParams_wrapper'),
   productParams_table: query('#productParams_table'),
}
const textarea = {
   desc: query('#productDesc')
}

new Panel(api, button, element, input, select).waitParse()



// sendData(data, field, params) {
//    let newData = this.jsonData()
//    data.name = field.name.value
//    data.brand = field.brand.value
//    data.price = field.price.value
//    data.details.consist = params.consist.value
//    data.details.desc = params.desc.value
//
//    const saveCardButton = this.query('#saveCard')
//    saveCardButton.onclick = () => {
//       this.fetchData(this.api.parseCard, data)
//    }
// }
// // const parseQuery = '#passCardURL'
// const urlPassCardButton = this.query(parseButtonQuery)
// this.parseButtonClick(parseButtonQuery, urlPassCardButton)
// // Кнопка парсинга
// const parseInactive = query(`.parseInactive`)
// const parseActive = this.query(`${parseButtonQuery} .parseActive`)
//
// const inputCardURL = this.query('#cardProductURL').value
// // Кнопка добавления
// const saveCardButton = this.query('#saveCard')
// const saveCardInactive = this.query('#saveCardInactive')
// const saveCardActive = this.query('#saveCardActive')