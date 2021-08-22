import { DynamicSearch } from '../services/dynamic-search'
import { element, input, select, textarea } from './queries'
import { query, show, ChildsPush } from '../utils/query-helpers'

// ЗАПОЛНЕНИЕ ПОЛЕЙ ПОЛУЧЕННЫМИ ДАННЫМИ

class FillFields {
   constructor(parseData) {
      this.parseData = parseData
   }

   async passData() {
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
      const isCatFound = await this.category(data.extras.direcoryList)
      // Если категория найдена автоматически, подгружаем список ТНВЭД
      if(isCatFound) this.tnved(data.extras.tnvedList)
   }

   // Категории
   async category(data) {
      // Если не нашли сразу, подключаем поиск
      if(!data.result.founded) {
         const search = new DynamicSearch()
         show(element.productExtrasNotFound_wrapper)
         search.watchField(input.searchProductCategory)
         return false
      } else {
         // Если нашли, заполняем данные
         const searchResult = data.result.data
         show(element.productExtras_wrapper)
         const pushedData = new ChildsPush(select.productCategory)
         for (let foundedCat in searchResult) {
            const item = searchResult[foundedCat]
            pushedData.collect(
               `<option data-cat-name="${foundedCat}">${item.name} -- ${item.parent}</option>`
            )
         }
         pushedData.insert()
         return true
      }
   }

   // ТНВЭД
   async tnved(data) {
      const searchResult = data.result.data
      const pushedData = new ChildsPush(select.productTnved)
      for(let foundedTnvd of searchResult) {
         const code = foundedTnvd.tnvedCode
         pushedData.collect(
            `<option data-tnved-num="${code}">${code} ${foundedTnvd.description}</option>`
         )
      }
      pushedData.insert()
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