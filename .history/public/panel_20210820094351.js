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
      this.addProductButtonControl()
   }

   addProductButtonControl() {
      this.button.saveCard.onclick = async () => {
         const updatedFields = this.getUpdatedFields()
         const objectData = this.this.parseData(this.parseData, updatedFields)
         console.log(updatedFields);
      }
   }

   prepareObjectData(parseData, updatedFields) {

      const cardData = {
         params: {
          card: [
           {
            countryProduction: parseData['Страна производства:'],
            supplierVendorCode: 'qwe-112',
            object: parseData[cardProductName],
            addin: [
             {
              type: Состав,
              params: [
               {
                value: 'Хлопок',
                count: 80
               }
              ]
             },
             {
              type: 'Тнвэд',
              params: [
               {
                value: "6101209000"
               }
              ]
             },
             {
              "type": "Бренд",
              "params": [
               {
                "value": "SNOB ARMY"
               }
              ]
             },
             {
              "type": "Комплектация",
              "params": [
               {
                "value": "куртка"
               }
              ]
             },
             {
              "type": "Пол",
              "params": [
               {
                "value": "Мужской"
               }
              ]
             },
             {
              "type": "Описание",
              "params": [
               {
                "value": "Описание"
               }
              ]
             },
              {
                "type": "Ключевые слова",
                "params": [
                  {
                    "value": "Слово1"
                  },
                  {
                    "value": "слово2"
                  }
                ]
              }
            ],
            "nomenclatures": [
             {
              "vendorCode": "black-123",
              "variations": [
               {
                "barcode": "2001092382003",
                "addin": [
                 {
                  "type": "Розничная цена",
                  "params": [
                   {
                    "count": 17000
                   }
                  ]
                 },
                 {
                  "type": "Размер",
                  "params": [
                   {
                    "value": "56"
                   }
                  ]
                 },
                 {
                  "type": "Рос. размер",
                  "params": [
                   {
                    "value": "56"
                   }
                  ]
                 }
                ]
               }
              ],
              "addin": [
               {
                "type": "Основной цвет",
                "params": [
                 {
                  "value": "черный"
                 }
                ]
               },
               {
                "type": "Коллекция",
                "params": [
                 {
                  "value": "Осень-Зима 2021-2022"
                 }
                ]
               },
               {
                "type": "Фото",
                "params": []
               },
               {
                "type": "Фото360",
                "params": []
               },
               {
                "type": "Видео",
                "params": []
               }
              ]
             }
            ]
           }
          ]
         },
         "jsonrpc": "2.0",
         "id": "8a41f7a8-6ed1-4910-bbd3-ac83e214ec81"
        }
      console.log(parseData);
   }

   getUpdatedFields() {
      const category =  select.productCategory
      const activeCategory = category.options[category.selectedIndex].text

      const tnved =  select.productTnved
      const activeTnved = tnved.options[category.selectedIndex].text

      const fields = {
         cardProductName: input.cardProductName.value,
         productCategory: activeCategory,
         productTnved: activeTnved,
         cardProductBrand: input.cardProductBrand.value,
         cardProductPrice: input.cardProductPrice.value,
         productConsist: input.productConsist.value,
         cardProductDesc: textarea.cardProductDesc.value,
         productColor: input.productColor.value
      }

      return fields
   }

   parseButtonControl() {
      this.button.parseCard.onclick = async () => {
         this.cleanHideDynamicBlocks()
         this.toggleSpinner('on')
         // Получение данных
         let parseData = await this.apiFetch(this.api.parseCard, {data: input.cardProductURL.value})
         console.log(parseData);
         parseData.extras = await this.apiFetch(this.api.getAdditionalCardData, parseData)
         this.parseData = parseData
         this.passDataToFields(parseData)
      }
   }

   passDataToFields(data) {
      // console.log(data);
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
         textarea.cardProductDesc.removeAttribute('readonly')
         textarea.cardProductDesc.classList.add('max_height_desc')
         textarea.cardProductDesc.value = detailDesc
      }
      // Цвет
      const productColor = data.cardProductColor
      if(productColor) {
         element.productColor_wrapper.classList.remove('dn')
         input.productColor.value = productColor
      } else {
         element.productColor_wrapper.classList.add('dn')
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
      const direcoryList = data.extras.direcoryList
      if(direcoryList) {
         let num = 1
         for(let direcory in direcoryList) {
            const dirOptionRow = `<option value="${num}">${direcory}</option>`
            select.productCategory.insertAdjacentHTML('afterbegin', dirOptionRow)
            num++
         }
         element.productExtras.classList.remove('dn')
      }
      // ТВЭНД
      const tvendList = data.extras.tnvedList
      if(tvendList) {
         let num = 1
         for(let tvend of tvendList) {
            const tvendOptionRow = `<option value="${num}">${tvend.tnvedCode}${tvend.description}</option>`
            select.productTnved.insertAdjacentHTML('afterbegin', tvendOptionRow)
            num++
         }
         element.productExtras.classList.remove('dn')
      }

      this.button.saveCard.classList.remove('dn')
      this.toggleSpinner('off')
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

   cleanHideDynamicBlocks() {
      // Кнопка сохранения
      this.button.saveCard.classList.add('dn')
      // Блок изображений
      this.element.productImages_wrapper.classList.add('dn')
      // Блок характеристик
      this.element.productParams_wrapper.classList.add('dn')
      // Блок категорий
      this.element.productExtras.classList.add('dn')
      // Удаляем изображения и характеристики
      const cleanInside = [
         queryAll('#productImages div'),
         queryAll('#productParams_table tr'),
         queryAll('#productExtras_wrapper option')
      ]
      for(let items of cleanInside) {
         if(items.length > 0) {
            Array.from(items).map((i) => i.remove())
         }
      }
   }

   toggleSpinner(mode) {
      if(mode == 'on') {
         this.element.parseCard_inactive.classList.add('dn')
         this.button.parseCard.setAttribute('disbale', '')
         this.element.parseCard_active.classList.remove('dn')
      } else {
         this.element.parseCard_active.classList.add('dn')
         this.button.parseCard.removeAttribute('disbale')
         this.element.parseCard_inactive.classList.remove('dn')
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
   productColor: query('#productColor'),
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
   productExtras: query('#productExtras_wrapper'),
   productImages_wrapper: query('#productImages_wrapper'),
   productConsist_wrapper: query('#productConsist_wrapper'),
   productParams_wrapper: query('#productParams_wrapper'),
   productColor_wrapper: query('#productColor_wrapper'),
   productParams_table: query('#productParams_table'),
}
const textarea = {
   cardProductDesc: query('#cardProductDesc')
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