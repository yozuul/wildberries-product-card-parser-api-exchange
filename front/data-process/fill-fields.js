import API from '../services/api'
import { DynamicSearch } from '../services/dynamic-search'
import { FeautureData } from '../data-process/fetch-features'
import { button, element, input, select, textarea } from './queries'
import { query, show, hide, ChildsPush, insert } from '../utils/index'
import { NormalizeFeauture } from './feautures-normalizer'

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
      this.features(data.details.params)
      // ЧТО ПОЛУЧИЛИ ПО API:
      // Категория
      await this.category(data.extras.direcoryList)
      // Размеры
      this.sizes(data.source.nomenclatures)
      input.currentUUID.value = this.parseData.extras.uuid
   }

   features(params) {
      const normalizer = new NormalizeFeauture()
      let objectNum = 'one'
      for(let paramName in params) {
         let pasteData = params[paramName]
         const normalized = normalizer.checkUnits(params[paramName])
         normalized ? pasteData = normalized : ''
         if(pasteData.split(';').length > 0) objectNum = 'multiple'
         const input = `<input class="${objectNum}" type="text" feauture-name="${paramName}" value="${pasteData}">`
         insert(input).after.begin(element.parsedFeautures_wrapper)
      }
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
         const activeCat = select.productCategory.options[0]
         this.watchCatChanged(activeCat)
         // Подгружаем данные характеристик
         const loadedFeautures = await API.searchFeautures(activeCat.getAttribute('data-cat-name'))
         new FeautureData(loadedFeautures.result.data).push()
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
      let filterSizes = {}
      for (let product in data) {
         const sizes = data[product].sizes
         const firstItemID = Object.keys(sizes)[0]
         const firsItemSize = sizes[firstItemID].sizeName
         if(firsItemSize !== 0) {
            for(let item in sizes) {
               const size = sizes[item]
               filterSizes[size.sizeName] = size.sizeNameRus
            }
         }
      }
      for(let sizeName in filterSizes) {
         const sizeItem = `<div class="col form-control sizeCol" data-ru-size="${filterSizes[sizeName]}">${sizeName}</div>`
         insert(sizeItem).after.begin(element.productSizes)
      }
      show(element.productSizes_wrapper)
   }

   // Наименование / бренд / цена / описание / Страна
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
      if((productColor) && (productColor !== 'null')) {
         show(element.productColor_wrapper)
         input.productColor.value = productColor
      } else {
         hide(element.productColor_wrapper)
      }
   }

   // Если меняется категория, ищем новый ТВЭНД
   async watchCatChanged(currentCat) {
      const currentCatTnved = await API.searchTnved(currentCat.getAttribute('data-cat-name'))
      this.tnved(currentCatTnved)
      select.productCategory.addEventListener('change', async () => {
         const changedCategory = select.productCategory.value.split(' --')[0]
         const loadedFeautures = await API.searchFeautures(changedCategory)
         new FeautureData(loadedFeautures.result.data).push()

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