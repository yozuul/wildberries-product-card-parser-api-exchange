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
      console.log(queryAll('#productImages div'));
   }

   parseButtonControl() {
      this.button.parseCard.onclick = async () => {
         this.cleanMultipleBlock()
         // Кнопка сохранения
         this.button.saveCard.classList.add('dn')
         // Блок изображений
         this.element.productImages_wrapper.classList.add('dn')
         // Включение спиннера парсинга
         this.element.parseCardInactive.classList.add('dn')
         this.button.parseCard.setAttribute('disbale', '')
         this.element.parseCardActive.classList.remove('dn')
         // Получение данных
         let parseData = await this.apiFetch(this.api.parseCard, {data: input.cardProductURL.value})
         parseData.extras = await this.apiFetch(this.api.getAdditionalCardData, parseData)

         this.passDataToFields(parseData)
      }
   }

   passDataToFields(data) {
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
      if(data.images) {
         data.images.reverse()
         const imageWrapperBlock = query('.productImagesDiv')
         imageWrapperBlock.classList.remove('dn')
         const imagesBlock = query('#productImages')

         let imgNum = 0
         for(let image of data.images) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }

         // this.element.productImages_wrapper.classList.remove('dn')
      }
//       // Состав
//       const detailConsist = data.details.consist
//       if(detailConsist) {
//          query('.productConsistDiv').classList.remove('dn')
//          params.consist.value = detailConsist
//       } else {
//          query('.productConsistDiv').classList.add('dn')
//       }
//       // Описание
//       const detailDesc = data.details.desc
//       if(detailDesc) {
//          params.desc.removeAttribute('readonly')
//          params.desc.value = detailDesc
//       }
//       // Характеристики
//       const detailParams = data.details.params
//       if(detailParams) {
//          const paramsTable = query('#productParamsTable')
//          const paramsWrapper = query('#productParamsDiv')
//
//          paramsWrapper.classList.remove('dn')
//          for(let name in detailParams) {
//             const paramRow = `<tr><th>${name}</th><td>${detailParams[name]}</td></tr>`
//             paramsTable.insertAdjacentHTML('afterbegin', paramRow)
//          }
//       } else {
//          paramsWrapper.classList.add('dn')
//       }
      // Категория

      this.button.saveCard.classList.remove('dn')
      // Включение спиннера парсинга
      this.element.parseCardActive.classList.add('dn')
      this.button.parseCard.removeAttribute('disbale')
      this.element.parseCardInactive.classList.remove('dn')

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
   saveCard: 'http://localhost:3000/saveCard',
   getAdditionalCardData: 'http://localhost:3000/getAdditionalCardData',
}
// Поля формы
const input = {
   cardProductURL: query('#cardProductURL'),
   cardProductName: query('#productName'),
   cardProductBrand: query('#productBrand'),
   cardProductPrice: query('#productPrice'),
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
   parseCardInactive: query('#parseCard_inactive'),
   parseCardActive: query('#parseCard_active'),
   saveCardInactive: query('#saveCard_inactive'),
   saveCardActive: query('#saveCard_active'),
   productExtras: query('.productExtras'),
   productImages_wrapper: query('#productImages_wrapper'),
}
const textarea = {
   consist: query('#productConsist'),
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