import { DynamicSearch } from '../services/index'
import {
   query, show, hide, queryAll , element, input, select, textarea, childsPush
} from '../utils/index'

class FillFields {
   constructor(parseData) {
      this.parseData = parseData
   }

   passData() {
      const data = this.parseData
      // ЧТО СПАРСИЛИ:
      // Наименование / бренд / цена / описание
      this.defaultField(data)
      // Изображения
      this.images(data)
      // Состав
      this.consist(data)
      // Цвет
      this.color(data)
      // Характеристики
      this.features(data)
      // ЧТО ПОЛУЧИЛИ ПО API:
      // Категория
      this.category(data.extras.direcoryList)
   }

   other() {
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

   }

   // Категории
   async category(data) {
      // Если не нашли сразу, подключаем поиск
      if(!data.result.founded) {
         const search = new DynamicSearch()
         show(element.productExtrasNotFound_wrapper)
         search.watchField(input.searchProductCategory)
      } else {
         // Если нашли, заполняем данные
         const searchResult = data.result.founded
         show(element.productExtras_wrapper)
         const push = new childsPush(select.productCategory)
         for (let foundedCat in searchResult) {
            const item = searchResult[foundedCat]
            push.collect(
               `<option data-cat-name="foundedCat">${item.name} -- <em>${item.parent}<em></option>`
            )
         }
      }
   }

   // Наименование / бренд / цена / описание
   defaultField(data) {
      const commonDataFields = {
         cardProductName: input.cardProductName,
         cardProductBrand: input.cardProductBrand,
         cardProductPrice: input.cardProductPrice
      }
      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly')
         commonDataFields[input].value = data[input]
      }

      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly')
         commonDataFields[input].value = data[input]
      }
      const detailDesc = data.details.desc
      if(detailDesc) {
         textarea.cardProductDesc.removeAttribute('readonly')
         textarea.cardProductDesc.classList.add('max_height_desc')
         textarea.cardProductDesc.value = detailDesc
      }
   }

   // Изображения
   images(data) {
      if(data.cardProductImages) {
         element.productImages_wrapper.classList.remove('dn')
         data.cardProductImages.reverse()
         const imagesBlock = query('#productImages')
         let imgNum = 0
         for(let image of data.cardProductImages) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }
      }
   }

   // Состав
   consist(data) {
      const detailConsist = data.details.consist
      if(detailConsist) {
         element.productConsist_wrapper.classList.remove('dn')
         input.productConsist.value = detailConsist
      } else {
         element.productConsist_wrapper.classList.add('dn')
      }
   }

   // Цвет
   color(data) {
      const productColor = data.cardProductColor
      if(productColor) {
         element.productColor_wrapper.classList.remove('dn')
         input.productColor.value = productColor
      } else {
         element.productColor_wrapper.classList.add('dn')
      }
   }

   // Характеристики
   features(data) {
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
   }

}

export { FillFields }