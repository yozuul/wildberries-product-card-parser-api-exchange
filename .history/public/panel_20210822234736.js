'use strict';

class API {

   get apiURL() {
      const apiHost = 'http://localhost:3000';
      return {
         parseCard: `${apiHost}/parseCard`,
         searchCategory: `${apiHost}/searchCategory`,
         searchTnved: `${apiHost}/searchTnved`,
         addCard: `${apiHost}/addCard`,
      }
   }

   async parseCard(data) {
      const parseCard = this.apiURL.parseCard;
      const response = await this.fetch(data).post(parseCard);
      return this.requestResult(response, parseCard)
   }

   async searchCategory(data) {
      const searchCategory = this.apiURL.searchCategory;
      const response = await this.fetch(data).post(searchCategory);
      return this.requestResult(response, searchCategory)
   }

   async searchTnved(data) {
      const searchTnved = this.apiURL.searchTnved;
      const response = await this.fetch(data).post(searchTnved);
      return this.requestResult(response, searchTnved)
   }

   fetch(data) {

      let contentType = 'text/plain; charset=UTF-8';
      if(typeof data == 'object') contentType = 'application/json; charset=utf-8';

      const common = {
         headers: { 'Content-Type': contentType }
      };

      let body = {};
      if(data) body = { body: data };

      let options = common;
      if(data) options = {...options, ...body};

      return {
         post: async (url) => {
            const request = { ...options, ...{ method: 'POST' }};
            try {
               return await fetch(url, request)
            } catch (error) {
               console.error(error);
               console.error('Error POST:', url);
            }
         },
         get: async (url) => {
            try {
               return await fetch(url)
            } catch (error) {
               console.error(error);
               console.error('Error GET:', url);
            }
         }
      }
   }

   requestResult(response, apiURL) {
      if(response.status == 200) {
         return response.json()
      } else {
         console.log(`Ошибка получения данных по API: ${apiURL}`);
         return
      }
   }
}

var API$1 = new API();

const query = (el) => document.querySelector(el);
const queryAll = (el) => document.querySelectorAll(el);
const hide = (el) => el.classList.add('dn');
const show = (el) => el.classList.remove('dn');
const insert = (el) => {
   return {
      after: {
         begin: (parent) => {
            parent.insertAdjacentHTML('afterBegin', el);
         }
      }
   }
};

// Поля форм
const input = {
   cardProductURL: query('#cardProductURL'),
   cardProductName: query('#productName'),
   cardProductBrand: query('#productBrand'),
   cardProductPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   productDesc: query('#productDesc'),
   productColor: query('#productColor'),
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
};
// Селекты
const select = {
   productCategory: query('#productCategory'),
   productTnved: query('#productTnved'),
   searchProductTnved: query('#searchProductTnved'),
};
// Блочные элементы
const element = {
   parseCard_inactive: query('#parseCard_inactive'),
   parseCard_active: query('#parseCard_active'),
   saveCard_inactive: query('#saveCard_inactive'),
   saveCard_active: query('#saveCard_active'),
   productExtras_wrapper: query('#productExtras_wrapper'),
   productExtrasNotFound_wrapper: query('#productExtrasNotFound_wrapper'),
   productImages_wrapper: query('#productImages_wrapper'),
   productConsist_wrapper: query('#productConsist_wrapper'),
   productParams_wrapper: query('#productParams_wrapper'),
   productColor_wrapper: query('#productColor_wrapper'),
   searchProductTnved_wrapper: query('#searchProductTnved_wrapper'),
   productParams_table: query('#productParams_table'),
   searchResultList: query('#searchResultList'),
};
const textarea = {
   cardProductDesc: query('#cardProductDesc')
};
// Кнопки
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
};

class ChildsPush {
   constructor(parent) {
      this.parent = parent;
      this.items = [];
   }
   collect(item) {
      this.items.push(item);
   }
   insert() {
      this.items.reverse().map((i) => insert(i).after.begin(this.parent));
      const firstElement = this.parent.firstChild;
      if(firstElement.tagName == 'OPTION') {
         firstElement.setAttribute('selected', 'selected');
      }
   }
}

class DynamicSearch {
   watchField(searchField) {
      searchField.oninput = async () => {
         const word = searchField.value;
         const canFind = this.checkLettersNumber(word);
         if(canFind) {
            const isFind = await API$1.searchCategory(word);
            this.checkResult(isFind.result);
         }
      };
      searchField.onblur = async () => {
         hide(element.searchResultList);
         input.searchProductCategory.value = input.watchSelectedCategory.value;
         this.tryFoundTvend(input.watchSelectedCategory.value);
         this.cleanResult(element.searchResultList);
      };
      searchField.onfocus = async () => {
         const word = searchField.value;
         const canFind = this.checkLettersNumber(word);
         if(canFind) {
            const isFind = await API$1.searchCategory(word);
            this.checkResult(isFind.result);
         }
      };
   }

   async tryFoundTvend(foundedResult) {
      if(foundedResult) {
         const tnved = await API$1.searchTnved(foundedResult);
         if(tnved) {
            const tvnedResult = tnved.result.data;
            const foundedTvned = [];
            for (const tvend in tvnedResult) {
               foundedTvned.push(`${tvnedResult[tvend].tnvedCode} ${tvnedResult[tvend].description}`);
            }
            const latestFounded = select.searchProductTnved.getElementsByClassName('tvendItem');
            if(latestFounded.length > 0) {
               this.cleanResult(select.searchProductTnved);
            }
            foundedTvned.reverse().map((item, index) => {
               const selectOption = `<option class="tvendItem" data-tvend-num="${index}" value="${index}">${item}</option>`;
               insert(selectOption).after.begin(select.searchProductTnved);
            });
            show(element.searchProductTnved_wrapper);
         }
      }
   }

   checkResult(searchResult) {
      if(searchResult.data) {
         this.cleanResult(element.searchResultList);
         show(element.searchResultList);
         this.pushResultToList(searchResult.data);
         this.watchSearchItemClick(element.searchResultList);
      } else {
         hide(element.searchResultList);
         input.watchSelectedCategory.value = '';
      }
   }

   pushResultToList(data) {
      const searchElements = [];
      for(let foundedCat in data) {
         const object = data[foundedCat];
         searchElements.push(
            `<li class="list-group-item" data-cat-name="${foundedCat}"><span>${foundedCat}</span><em>${object.parent}</em></li>`
         );
      }
      searchElements.reverse().map((item) => {
         insert(item).after.begin(element.searchResultList);
      });
   }

   watchSearchItemClick(parent) {
      const itemsArr = parent.getElementsByClassName('list-group-item');
      for(let foundedCategory of itemsArr) {
         foundedCategory.onmouseover = () => {
            input.watchSelectedCategory.value = foundedCategory.getAttribute('data-cat-name');
         };
      }
   }

   cleanResult(parent) {
      while (parent.firstChild) {
         parent.removeChild(parent.firstChild);
       }
   }

   checkLettersNumber(word) {
      if(word.split('').length < 3) {
         hide(element.searchResultList);
         return false
      } else {
         return true
      }
   }
}

class FillFields {
   constructor(parseData) {
      this.parseData = parseData;
   }

   async passData() {
      const data = this.parseData;
      // ЧТО СПАРСИЛИ:
      // Наименование / бренд / цена / описание
      this.defaultField(data);
      // Изображения
      this.images(data);
      // Состав
      this.consist(data);
      // Цвет
      this.color(data);
      // Характеристики
      this.features(data);
      // ЧТО ПОЛУЧИЛИ ПО API:
      // Категория
      const isCatFound = await this.category(data.extras.direcoryList);
      // Если категория найдена автоматически, подгружаем список ТНВЭД
      if(isCatFound) this.tnved(data.extras.tnvedList);
   }

   // Категории
   async category(data) {
      // Если не нашли сразу, подключаем поиск
      if(!data.result.founded) {
         const search = new DynamicSearch();
         show(element.productExtrasNotFound_wrapper);
         search.watchField(input.searchProductCategory);
         return false
      } else {
         // Если нашли, заполняем данные
         const searchResult = data.result.data;
         show(element.productExtras_wrapper);
         const pushedData = new ChildsPush(select.productCategory);
         for (let foundedCat in searchResult) {
            const item = searchResult[foundedCat];
            pushedData.collect(
               `<option data-cat-name="${foundedCat}">${item.name} -- ${item.parent}</option>`
            );
         }
         pushedData.insert();
         return true
      }
   }

   // ТНВЭД
   async tnved(data) {
      const searchResult = data.result.data;
      const pushedData = new ChildsPush(select.productTnved);
      for(let foundedTnvd of searchResult) {
         const code = foundedTnvd.tnvedCode;
         pushedData.collect(
            `<option data-tnved-num="${code}">${code} ${foundedTnvd.description}</option>`
         );
      }
      pushedData.insert();
   }

   // Наименование / бренд / цена / описание
   defaultField(data) {
      const commonDataFields = {
         cardProductName: input.cardProductName,
         cardProductBrand: input.cardProductBrand,
         cardProductPrice: input.cardProductPrice
      };
      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly');
         commonDataFields[input].value = data[input];
      }

      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly');
         commonDataFields[input].value = data[input];
      }
      const detailDesc = data.details.desc;
      if(detailDesc) {
         textarea.cardProductDesc.removeAttribute('readonly');
         textarea.cardProductDesc.classList.add('max_height_desc');
         textarea.cardProductDesc.value = detailDesc;
      }
   }

   // Изображения
   images(data) {
      if(data.cardProductImages) {
         element.productImages_wrapper.classList.remove('dn');
         data.cardProductImages.reverse();
         const imagesBlock = query('#productImages');
         for(let image of data.cardProductImages) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`;
            imagesBlock.insertAdjacentHTML('afterbegin', divTag);
         }
      }
   }

   // Состав
   consist(data) {
      const detailConsist = data.details.consist;
      if(detailConsist) {
         element.productConsist_wrapper.classList.remove('dn');
         input.productConsist.value = detailConsist;
      } else {
         element.productConsist_wrapper.classList.add('dn');
      }
   }

   // Цвет
   color(data) {
      const productColor = data.cardProductColor;
      if(productColor) {
         element.productColor_wrapper.classList.remove('dn');
         input.productColor.value = productColor;
      } else {
         element.productColor_wrapper.classList.add('dn');
      }
   }

   // Характеристики
   features(data) {
      const detailParams = data.details.params;
      if(detailParams) {
         element.productParams_wrapper.classList.remove('dn');

         for(let name in detailParams) {
            const paramRow = `<tr><th>${name}</th><td>${detailParams[name]}</td></tr>`;
            element.productParams_table.insertAdjacentHTML('afterbegin', paramRow);
         }
      } else {
         element.productParams_wrapper.classList.add('dn');
      }
   }

}

class Panel {
   constructor(button, element, input) {
      this.button = button;
      this.element = element;
      this.input = input;
   }

   registerButtons() {
      this.parseButtonControl();
      // this.addProductButtonControl()
   }

   parseButtonControl() {
      this.button.parseCard.onclick = async () => {
         this.cleanHideDynamicBlocks();
         this.toggleSpinner('on');
         // Получаем данные и заполняем поля
         let parseData = await API$1.parseCard(input.cardProductURL.value);
         new FillFields(parseData).passData();
         // Показываем кнопку добавления карточки
         this.button.saveCard.classList.remove('dn');
         this.toggleSpinner('off');
      };
   }


   cleanHideDynamicBlocks() {
      // Кнопка сохранения
      this.button.saveCard.classList.add('dn');
      // Блок изображений
      this.element.productImages_wrapper.classList.add('dn');
      // Блок характеристик
      this.element.productParams_wrapper.classList.add('dn');
      // Блок категорий
      this.element.productExtras_wrapper.classList.add('dn');
      // Удаляем изображения и характеристики
      const cleanInside = [
         queryAll('#productImages div'),
         queryAll('#productParams_table tr'),
         queryAll('#productExtras_wrapper option')
      ];
      for(let items of cleanInside) {
         if(items.length > 0) {
            Array.from(items).map((i) => i.remove());
         }
      }
   }

   toggleSpinner(mode) {
      if(mode == 'on') {
         this.element.parseCard_inactive.classList.add('dn');
         this.button.parseCard.setAttribute('disbale', '');
         this.element.parseCard_active.classList.remove('dn');
      } else {
         this.element.parseCard_active.classList.add('dn');
         this.button.parseCard.removeAttribute('disbale');
         this.element.parseCard_inactive.classList.remove('dn');
      }
   }
}


new Panel(button, element, input, select).registerButtons();
