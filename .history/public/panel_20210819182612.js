const query = (el) => document.querySelector(el)
const queryAll = (el) => document.querySelectorAll(el)


class Panel {
   constructor(api, button, element, inputs) {
      this.api = api
      this.button = button
      this.element = element
      this.inputs = inputs
   }

   waitParse() {
      this.parseButton()

   }

   parseButton() {
      this.button.parseCard.onclick = async () => {
         // Кнопка сохранения
         this.button.saveCard.classList.add('dn')
         // Включение спиннера парсинга
         this.element.parseCardInactive.classList.add('dn')
         this.button.parseCard.setAttribute('disbale', '')
         this.element.parseCardActive.classList.remove('dn')
         // Получение данных
         // const parseData = await this.apiFetch(this.api.parseCard, {data: inputs.cardProductURL.value})
         // const extraData = await this.apiFetch(this.api.getAdditionalCardData, parseData)



         console.log(extraData);
      }
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

   passDataToFields(data) {
      // Определение полей
      const field = {
         name: this.query('#productName'),
         brand: this.query('#productBrand'),
         price: this.query('#productPrice'),
      }
      const params = {
         consist: this.query('#productConsist'),
         desc: this.query('#productDesc')
      }
      // Добавление данных в поля
      // Основные данные товара
      for(let input in field) {
         field[input].removeAttribute('readonly')
         field[input].value = data[input]
      }
      // Изображения
      if(data.images) {
         data.images.reverse()
         const imageWrapperBlock = this.query('.productImagesDiv')
         imageWrapperBlock.classList.remove('dn')
         const imagesBlock = this.query('#productImages')

         let imgNum = 0
         for(let image of data.images) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }
      }
      // Описание
      const detailDesc = data.details.desc
      if(detailDesc) {
         params.desc.removeAttribute('readonly')
         params.desc.value = detailDesc
      }
      // Состав
      const detailConsist = data.details.consist
      if(detailConsist) {
         this.query('.productConsistDiv').classList.remove('dn')
         params.consist.value = detailConsist
      } else {
         this.query('.productConsistDiv').classList.add('dn')
      }
      // Характеристики
      const detailParams = data.details.params
      if(detailParams) {
         const paramsTable = this.query('#productParamsTable')
         const paramsWrapper = this.query('#productParamsDiv')

         paramsWrapper.classList.remove('dn')
         for(let name in detailParams) {
            const paramRow = `<tr><th>${name}</th><td>${detailParams[name]}</td></tr>`
            paramsTable.insertAdjacentHTML('afterbegin', paramRow)
         }
      } else {
         paramsWrapper.classList.add('dn')
      }
   }
}

// Запросы на внутренний API
const api = {
   parseCard: 'http://localhost:3000/parseCard',
   getAdditionalCardData: 'http://localhost:3000/getAdditionalCardData',
   saveCard: 'http://localhost:3000/saveCard',
}
// Кнопки управления формой
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
}
// Интерактивные элементы
const element = {
   parseCardInactive: query('#parseCardInactive'),
   parseCardActive: query('#parseCardActive'),
   saveCardInactive: query('#saveCardInactive'),
   saveCardActive: query('#saveCardActive')
}
// Поля формы
const inputs = {
   cardProductURL: query('#cardProductURL')
}

new Panel(api, button, element, inputs).waitParse()



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