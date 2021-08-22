import { apiFetch } from './api-fetch'
import { api, button, element, input, select } from './queries'
import { query, queryAll } from './helpers'


class Panel {
   constructor(api, button, element, input) {
      this.api = api
      this.button = button
      this.element = element
      this.input = input
   }

   registerButtons() {
      this.parseButtonControl()


      // this.addProductButtonControl()
   }

   parseButtonControl() {
      this.button.parseCard.onclick = async () => {
         this.cleanHideDynamicBlocks()
         this.toggleSpinner('on')
         // Получение данных
         let parseData = await new apiFetch(this.api.parseCard).getData(input.cardProductURL.value)

         // let parseData = await apiFetch(this.api.parseCard, {data: input.cardProductURL.value})
         // console.log(parseData);
         // parseData.extras = await apiFetch(this.api.getAdditionalCardData, parseData)
         // this.parseData = parseData
         // this.passDataToFields(parseData)
      }
   }

   addProductButtonControl() {
      this.button.saveCard.onclick = async () => {
         const updatedFields = this.getUpdatedFields()
         const objectData = this.prepareObjectData(this.parseData, updatedFields)
         const addCard = await this.apiFetch(this.api.addCard, objectData)
         console.log(objectData);
      }
   }

   getUpdatedFields() {
      const category =  select.productCategory
      let activeCategory = 'nocat'
      if(category.options[category.selectedIndex]) {
         activeCategory = category.options[category.selectedIndex].text
      }

      const tnved =  select.productTnved
      let activeTnved = 'notnved'
      if(tnved.options[category.selectedIndex]) {
         activeTnved = tnved.options[category.selectedIndex].text
      }

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


new Panel(api, button, element, input, select).registerButtons()