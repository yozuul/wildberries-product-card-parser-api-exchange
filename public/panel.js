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
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
   productColor: query('#productColor'),
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
   productImages: query('#productImages'),
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

// ФОРМИРУЕМ СПИСКИ ДАННЫХ ИЗ ОБЪЕКТОВ

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

const fetchSpinner = (mode) => {
   if(mode == 'on') {
      element.parseCard_inactive.classList.add('dn');
      button.parseCard.setAttribute('disbale', '');
      element.parseCard_active.classList.remove('dn');
   } else {
      element.parseCard_active.classList.add('dn');
      button.parseCard.removeAttribute('disbale');
      element.parseCard_inactive.classList.remove('dn');
   }
};

// ОЧИСТКА ДАННЫХ ПОЛЕЙ, ВОССТАНОВЛЕНИЕ РАЗМЕТКИ

class FieldsCleaner {
   restoreMarkup() {
      // Восстанавливаем поля
      const restoreElement = [
         input.cardProductName, input.cardProductBrand, input.cardProductPrice, textarea.cardProductDesc
      ];
      restoreElement.map((el) => {
         el.value = '';
         el.setAttribute('readonly', '');
      });

      // Очищаем поля
      const cleanElement = [
         input.productConsist, input.productColor, input.watchSelectedCategory, textarea.cardProductDesc
      ];
      cleanElement.map((el) => el.value = '');

      // Элементы которые надо спрятать
      const hideElement = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper, element.productConsist_wrapper, element.productColor_wrapper, element.productExtrasNotFound_wrapper
      ];
      hideElement.map((el) => hide(el));

      // Элементы у которых надо удалить дочерние элементы
      const cleanChilds = [
         element.productImages, element.productParams_table, select.productCategory, select.productTnved, select.searchProductTnved
      ];
      cleanChilds.map((parent) => {
         if(parent.firstChild) {
            while(parent.firstChild) {
               parent.firstChild.remove();
            }
         }
      });

      textarea.cardProductDesc.classList.remove('max_height_desc');
   }
}

var FieldsCleaner$1 = new FieldsCleaner();

// ДИНАМИЧЕСКИЙ ПОИСК ПО API WILDBERRIES

class DynamicSearch {
   // Следим за фокусом и набором текста в полях
   watchField(searchField) {
      // Если пользователь набирает текст
      searchField.oninput = async () => {
         const word = searchField.value;
         // Если больше трёх букв
         const canFind = this.checkLettersNumber(word);
         if(canFind) {
            // Ищем паттерн по API
            const isFind = await API$1.searchCategory(word);
            // Проверяем результат и показываем результат
            this.checkResult(isFind.result);
         }
      };
      // Если с поля поиска убран фокус
      searchField.onblur = async () => {
         hide(element.searchResultList);
         input.searchProductCategory.value = input.watchSelectedCategory.value;
         this.tryFoundTvend(input.watchSelectedCategory.value);
         this.cleanResult(element.searchResultList);
      };
      // Если поле в фокусе
      searchField.onfocus = async () => {
         const word = searchField.value;
         const canFind = this.checkLettersNumber(word);
         if(canFind) {
            const isFind = await API$1.searchCategory(word);
            this.checkResult(isFind.result);
         }
      };
   }

   // Формируем отображение результатов поиска
   checkResult(searchResult) {
      // Если что-то нашли
      if(searchResult.data) {
      // Очищаем выпадающий список
         this.cleanResult(element.searchResultList);
         // Добавляем в список найденные результаты
         const pushedData = new ChildsPush(element.searchResultList);
         for(let foundedCat in searchResult.data) {
            const item = searchResult.data[foundedCat];
            pushedData.collect(
               `<li class="list-group-item" data-cat-name="${foundedCat}"><span>${foundedCat}</span><em>${item.parent}</em></li>`
            );
         }
         // Вставляем список в select
         pushedData.insert();
         // Показываем список пользователю
         show(element.searchResultList);
         // Следим за его выбором
         this.watchSearchItemClick(element.searchResultList);
      } else {
         // Если не нашли, убеждаемся что список скрыт
         hide(element.searchResultList);
         // Очищаем ранее найденные данные, если были
         input.watchSelectedCategory.value = '';
      }
   }

   // Формируем список ТВЭНД
   async tryFoundTvend(foundedResult) {
      // Если категория выбрана, ищем ТВЭНД по её наименованию
      if(foundedResult) {
         const tnved = await API$1.searchTnved(foundedResult);
         if(tnved) {
            // если нашли ТВЭНД, формируем выпадающий список
            const pushedData = new ChildsPush(select.searchProductTnved);
            const searchResult = tnved.result.data;
            if(select.searchProductTnved.firstChild) {
               this.cleanResult(select.searchProductTnved);
            }
            for(let foundedTnvd of searchResult) {
               const code = foundedTnvd.tnvedCode;
               pushedData.collect(
                  `<option data-tnved-num="${code}">${code} ${foundedTnvd.description}</option>`
               );
            }
            // Вставляем список в select
            pushedData.insert();
            // Показываем список пользователю
            show(element.searchProductTnved_wrapper);
         }
      }
   }

   watchSearchItemClick(parent) {
      for(let foundedCategory of parent.children) {
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

// ЗАПОЛНЕНИЕ ПОЛЕЙ ПОЛУЧЕННЫМИ ДАННЫМИ

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

// СОБИРАЕМ ОТРЕДАКТИРОВАННЫЕ В ПАНЕЛИ ДАННЫЕ

class ChangedData {
   constructor(params) {
      this.params = params;
   }
   get collect() {

   }

   inputFields() {

   }
}

// УПРАВЛЕНИЕ НАНЕЛЬЮ ПАРСИНГА

class ParsePanel {
   // Подключаем кнопки Спарсить и Добавить
   registerButtons() {
      this.parseButtonControl();
      this.addProductButtonControl();
   }

   // Кнопка парсинга
   parseButtonControl() {
      button.parseCard.onclick = async () => {
         // Убеждаемся что предыдущий данные очищены
         FieldsCleaner$1.restoreMarkup();
         // Включаем спиннер
         fetchSpinner('on');
         // Парсим карточку
         let parseData = await API$1.parseCard(input.cardProductURL.value);
         // Заполняем полученными данными поля в панели
         new FillFields(parseData).passData();
         // Показываем кнопку добавления карточки
         button.saveCard.classList.remove('dn');
         // Выключаем спиннер
         fetchSpinner('off');
      };
   }

   // Кнопка сохранения карточки
   addProductButtonControl() {
      button.saveCard.onclick = async () => {
         new ChangedData().collect;
         // const updatedFields = this.getUpdatedFields()
         // const objectData = this.prepareObjectData(this.parseData, updatedFields)
         // const addCard = await this.apiFetch(this.api.addCard, objectData)
         // console.log(objectData);
      };
   }
}


new ParsePanel().registerButtons();
