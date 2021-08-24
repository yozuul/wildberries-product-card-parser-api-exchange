import API from '../services/api'
import { DynamicSearch } from '../services/dynamic-search'
import { button, element, input, select, textarea } from './queries'
import { query, show, hide, ChildsPush, insert } from '../utils/index'

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
      await this.category(data.extras.direcoryList)
      // Размеры
      this.sizes(data.source.nomenclatures)
      input.currentUUID.value = this.parseData.extras.uuid
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
         const pushedData = new ChildsPush(select.productCategory)
         for (let foundedCat in searchResult) {
            const item = searchResult[foundedCat]
            pushedData.collect(
               `<option data-cat-name="${foundedCat}">${item.name} -- ${item.parent}</option>`
            )
         }
         pushedData.insert()
         show(element.productExtras_wrapper)
         // Следим за изменением активной категории
         this.watchCatChanged(select.productCategory.options[0])
         // Открыть поиск категорий
         this.showDynamicSearch()
         return true
      }
   }

   // ТНВЭД
   async tnved(data) {
      const searchResult = data.result.data
      const pushedData = new ChildsPush(select.productTnved)
      if(searchResult.length > 0) {
         for(let foundedTnvd of searchResult) {
            const code = foundedTnvd.tnvedCode
            pushedData.collect(
               `<option data-tnved-num="${code}">${code} ${foundedTnvd.description}</option>`
            )
         }
         pushedData.insert()
      } else {
         console.log(searchResult);
      }
   }

   // Размеры
   sizes(data) {
      let variationNum = 0
      for (let product in data) {
         if (variationNum < 1) {
            const productItem = data[product]
           let sizeNum = 0
            for (let foundedSize in productItem.sizes) {
               const item = productItem.sizes[foundedSize]
               if ((item.sizeName !== 0) && (item.quantity !== 0)) {
                  const sizeItem = `<div class="col form-control sizeCol" data-ru-size="${item.sizeNameRus}">${item.sizeName}</div>`
                  insert(sizeItem).after.begin(element.productSizes)
               }
               if(sizeNum > 0) {
                  show(element.productSizes_wrapper)
               }
               sizeNum++
            }
            variationNum++
         }
      }
   }

   // Наименование / бренд / цена / описание
   defaultField(data) {
      const commonDataFields = {
         productName: input.productName,
         productBrand: input.productBrand,
         productPrice: input.productPrice
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
      textarea.productDesc.removeAttribute('readonly')
      if(detailDesc) {
         textarea.productDesc.value = detailDesc
         textarea.productDesc.classList.add('max_height_desc')
      }
   }

   // Изображения
   images(data) {
      if(data.productImages) {
         show(element.productImages_wrapper)
         data.productImages.reverse()
         const imagesBlock = query('#productImages')
         for(let image of data.productImages) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
         }
      }
   }

   // Состав
   consist(data) {
      const detailConsist = data.details.consist
      if(detailConsist !== 'null') {
         show(element.productConsist_wrapper)
         input.productConsist.value = detailConsist
      } else {
         hide(element.productConsist_wrapper)
      }
   }

   // Цвет
   color(data) {
      const productColor = data.productColor
      if(productColor !== 'null') {
         show(element.productColor_wrapper)
         input.productColor.value = productColor
      } else {
         hide(element.productColor_wrapper)
      }
   }

   // Характеристики
   features(data) {
      const detailParams = data.details.params
      if(detailParams) {
         show(element.productParams_wrapper)
         for(let name in detailParams) {
            const paramRow = `<tr><th contenteditable="true">${name}</th><td contenteditable="true">${detailParams[name]}</td></tr>`
            element.productParams_table.insertAdjacentHTML('afterbegin', paramRow)
         }
      } else {
         hide(element.productParams_wrapper)
      }
   }

   // Если меняется категория, ищем новый ТВЭНД
   async watchCatChanged(currentCat) {
      const currentCatTnved = await API.searchTnved(currentCat.getAttribute('data-cat-name'))
      this.tnved(currentCatTnved)
      select.productCategory.addEventListener('change', async () => {
         const categoryOptions = select.productCategory.options
         for(let cat of categoryOptions) {
            if(cat.selected) {
               const searchPattern = cat.getAttribute('data-cat-name')
               const findedTvend = await API.searchTnved(searchPattern)
               this.cleanSelect(select.productTnved)
               this.tnved(findedTvend)
            }
         }
      })
   }

   // Если надо изменить автоматичеки найденную категорию
   showDynamicSearch() {
      button.changeAutoFindedCategory.onclick = () => {
         hide(element.productExtras_wrapper)
         this.cleanSelect(select.productTnved)
         this.cleanSelect(select.productCategory)
         const search = new DynamicSearch()
         show(element.productExtrasNotFound_wrapper)
         search.watchField(input.searchProductCategory)
      }
   }

   // Очищаем дочерние элементы
   cleanSelect(parent) {
      if(parent.firstChild) {
         while(parent.firstChild) {
            parent.firstChild.remove()
         }
      }
   }
}

export { FillFields }