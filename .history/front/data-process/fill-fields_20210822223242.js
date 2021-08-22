import { element, input, select, textarea} from '../queries'
import { query, show, hide, queryAll } from '../utils/query-helpers'
import { DynamicSearch } from '../utils/index'

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

   async category(data) {
      if(!data.result.founded) {
         this.attachDynmaicSearch()
      } else {
         console.log(element.productExtras_wrapper);
         // show()
      }
   }

   async attachDynmaicSearch() {
      const search = new DynamicSearch()
      show(element.productExtrasNotFound_wrapper)
      search.watchField(input.searchProductCategory)
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

      this.button.saveCard.classList.remove('dn')
      this.toggleSpinner('off')
   }
}

export { FillFields }