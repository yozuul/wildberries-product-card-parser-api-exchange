'use strict';

class API {

   get apiURL() {
      const apiHost = 'http://localhost:3000';
      return {
         parseCard: `${apiHost}/parseCard`,
         createCard: `${apiHost}/createCard`,
         searchCategory: `${apiHost}/searchCategory`,
         searchFeautures: `${apiHost}/searchFeautures`,
         searchTnved: `${apiHost}/searchTnved`,
         genBarcodes: `${apiHost}/genBarcodes`,
         saveToken: `${apiHost}/saveToken`,
      }
   }

   async saveToken(data) {
      const saveToken = this.apiURL.saveToken;
      await this.fetch(data).post(saveToken);
      return {save: 'ok'}
      // return await this.requestResult(response, saveToken)
   }
   async searchFeautures(data) {
      const searchFeautures = this.apiURL.searchFeautures;
      const response = await this.fetch(data).post(searchFeautures);
      return await this.requestResult(response, searchFeautures)
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
   async parseCard(data) {
      const parseCard = this.apiURL.parseCard;
      const response = await this.fetch(data).post(parseCard);
      return this.requestResult(response, parseCard)
   }
   async createCard(data) {
      const createCard = this.apiURL.createCard;
      const response = await this.fetch(JSON.stringify(data)).post(createCard);
      return this.requestResult(response, createCard)
   }
   async genBarcodes(quantity) {
      const genBarcodes = this.apiURL.genBarcodes;
      const response = await this.fetch(quantity).post(genBarcodes);
      return this.requestResult(response, genBarcodes)
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
            parent.insertAdjacentHTML('afterbegin', el);
         }
      },
      before: {
         end: (parent) => {
            parent.insertAdjacentHTML('beforeend', el);
         }
      }
   }
};

// Поля форм
const input = {
   productURL: query('#productURL'),
   productName: query('#productName'),
   productBrand: query('#productBrand'),
   productPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   productCountry: query('#productConsist'),
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
   productColor: query('#productColor'),
   currentUUID: query('#currentUUID'),
   saveSelectedCat: query('#saveSelectedCat'),
   productBarcode: query('#productBarcode'),
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
   productParams_table: query('#productParams_table tbody'),
   searchResultList: query('#searchResultList'),
   searchResultListInner: queryAll('#searchResultList li'),
   productSizes_wrapper: query('#productSizes_wrapper'),
   productSizes: query('#productSizes'),
   notify: query('#notify'),
   notifyHeader: query('#notifyHeader'),
   notifyText: query('#notifyText'),
   productFeaut_wrapper: query('#productFeaut_wrapper'),
   productFeautRequire_block: query('#productFeautRequire_block'),
   productFeautOther_block: query('#productFeautOther_block'),
   productFeautVariat_block: query('#productFeautVariat_block'),
   productFeautInputs: queryAll('#productFeaut_wrapper input'),
   parsedFeautures_wrapper: query('#parsedFeautures_wrapper'),
   productBarcode_wrapper: query('#productBarcode_wrapper'),
   addedFeautures: queryAll('.addedFeautures'),
};
const textarea = {
   productDesc: query('#productDesc'),
   token: query('#token')
};
// Кнопки
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
   saveToken: query('#saveToken'),
   closeModal: query('#closeModal'),
   changeAutoFindedCategory: query('#changeAutoFindedCategory'),
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
         input.productName, input.productBrand, input.productPrice, textarea.productDesc
      ];
      restoreElement.map((el) => {
         el.value = '';
         el.setAttribute('readonly', '');
      });

      // Очищаем поля
      const cleanElement = [
         input.productConsist, input.productColor, input.watchSelectedCategory, textarea.productDesc, input.searchProductCategory
      ];
      cleanElement.map((el) => el.value = '');

      // Элементы которые надо спрятать
      const hideElement = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper, element.productConsist_wrapper, element.productColor_wrapper, element.productExtrasNotFound_wrapper, element.productSizes_wrapper, element.productFeaut_wrapper
      ];
      hideElement.map((el) => hide(el));

      // Элементы у которых надо удалить дочерние элементы
      const cleanChilds = [
         element.productImages, element.productParams_table, select.productCategory, select.productTnved, select.searchProductTnved, element.productSizes, element.parsedFeautures_wrapper, element.productFeautRequire_block, element.productFeautOther_block
      ];
      cleanChilds.map((parent) => {
         if(parent.firstChild) {
            while(parent.firstChild) {
               parent.firstChild.remove();
            }
         }
      });

      textarea.productDesc.classList.remove('max_height_desc');
   }
}

var FieldsCleaner$1 = new FieldsCleaner();

class FeautureData {
   constructor(data) {
      this.data = data;
   }

   push() {
      this.clean();
      const pushedDataNotRequire = new ChildsPush(element.productFeautOther_block);
      const pushedDataRequire = new ChildsPush(element.productFeautRequire_block);
      let idData = {};
      let index = 0;
      for (let common of this.data.addin) {
         if((common.type !== 'Бренд') && (common.type !== 'Тнвэд') && (common.type !== 'Описание') && (common.type !== 'Состав') && (common.type !== 'Наименование')) {
            const feautureID = `feautureNum_${index}`;
            const pushedDataString = `
            <div class="row uploadedFeautureFields" feautre-name="${common.type}" id="${feautureID}">
               <div class="col-10">
                  <input type="text" class="form-control" placeholder="${common.type}">
               </div>
               <div class="col-2">
                  <button class="btn btn-primary mb-3 addFeauture">+</button>
               </div>
               <ul class="col-12"></ul>
            </div>`;
            if ((common.required)) {
               pushedDataRequire.collect(pushedDataString);
            } else {
               pushedDataNotRequire.collect(pushedDataString);
            }
            idData[common.type] = feautureID;
            index++;
         }
      }
      pushedDataRequire.insert();
      pushedDataNotRequire.insert();
      this.compareData(this.parsedFeautures, idData);
      this.addListeneres();
      show(element.productFeaut_wrapper);
   }

   addListeneres() {
      const addFeautureButtons = document.querySelectorAll('#productFeaut_wrapper .addFeauture');
      for(let addFeautureButton of addFeautureButtons) {
         addFeautureButton.onclick = () => {
            const blockID = addFeautureButton.parentElement.parentElement.id;
            const blockInput = document.querySelector(`#${blockID} input`);
            const blockFeautData = document.querySelector(`#${blockID} ul`);
            if(blockInput.value) {
               const template = `
               <li class="addedFeautures">
                  <small class="text-muted">${blockInput.value}</small>
                  <button class="removeFeauture" onclick="this.parentElement.remove()">-</button>
               </li>`;
               insert(template).after.begin(blockFeautData);
               blockInput.value = '';
            }
         };
      }
   }

   compareData(parsedFeautures, idData) {
      console.log(parsedFeautures);
      for(let feautureName in parsedFeautures) {
         const existFeautureFieldID = idData[feautureName];
         if(existFeautureFieldID) {
            const existFeutureBlock = document.querySelector(`#${existFeautureFieldID} ul`);
            const parsedFeautureItem = parsedFeautures[feautureName];
            const fillData = {
               dest: existFeutureBlock,
               value: parsedFeautureItem.value,
            };
            if(parsedFeautureItem.type == 'multiple') {
               this.fillDataMultiple(fillData);
            } else {
               this.fillDataOnce(fillData);
            }
         }
      }
   }

   fillDataMultiple(data) {
      const checkSplit = data.value.split(';');
      if(checkSplit)
      for(let item of data.value.split(';')) {
         const template = `
         <li class="addedFeautures">
            <small class="text-muted">${item}</small>
            <button class="removeFeauture" onclick="this.parentElement.remove()">-</button>
         </li>`;
         insert(template).after.begin(data.dest);
      }
   }

   fillDataOnce(data) {
      const template = `
      <li class="addedFeautures">
         <small class="text-muted">${data.value}</small>
         <button class="removeFeauture" onclick="this.parentElement.remove()">-</button>
      </li>`;
      insert(template).after.begin(data.dest);
   }

   get parsedFeautures() {
      let data = {};
      const parsedFeautures = document.querySelectorAll('#parsedFeautures_wrapper input');
      for(let item of parsedFeautures) {
         data[item.getAttribute('feauture-name')] = {
            value: item.value,
            type: item.classList.contains('multiple') ? 'multiple' : 'one'
         };
      }
      return data
   }

   clean() {
      const fondedLoad = document.querySelectorAll('.uploadedFeautureFields');
      if(fondedLoad.length > 0) {
         for(let item of fondedLoad) {
            item.remove();
         }
      }
   }
}

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
         foundedCategory.onclick = async () => {
            input.searchProductCategory.value = foundedCategory.getAttribute('data-cat-name');
            await this.tryFoundTvend(input.searchProductCategory.value);
            this.cleanResult(element.searchResultList);
            let data = await API$1.searchFeautures(input.searchProductCategory.value);
            new FeautureData(data.result.data).push();
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

class NormalizeFeauture {
   checkUnits(value) {
      const patternName = {
         sm: ' см', gr: ' г', kg: ' кг', mm: ' мм', mp: ' Мп', mhz: ' МГц', min: ' мин', h: ' час', qu: ' шт.', grad: ' градусов', temp: ' C', noize: ' дБ', ml: ' мл', kkal: ' ккал', plot: ' г/кв.м'
      };
      const unitCheck = (str) => {
         return {
            sm: str.slice(-3), gr: str.slice(-2), kg: str.slice(-3), mm: str.slice(-3), mp: str.slice(-3), mhz: str.slice(-4), min: str.slice(-4), h: str.slice(-4), qu: str.slice(-4), grad: str.slice(-9), temp: str.slice(-2), noize: str.slice(-3), ml: str.slice(-3), kkal: str.slice(-5), plot: str.slice(-7)
         }
      };
      for(let item in patternName) {
         const pattern = unitCheck(value)[item];
         if(patternName[item] == pattern) {
            const unitValue = value.split(pattern)[0];
            if (parseInt(unitValue)) {
               return unitValue
            }
         }
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
      this.features(data.details.params);
      // ЧТО ПОЛУЧИЛИ ПО API:
      // Категория
      await this.category(data.extras.direcoryList);
      // Размеры
      this.sizes(data.source.nomenclatures);
      input.currentUUID.value = this.parseData.extras.uuid;
   }

   features(params) {
      const normalizer = new NormalizeFeauture();
      let objectNum = 'one';
      for(let paramName in params) {
         let pasteData = params[paramName];
         const normalized = normalizer.checkUnits(params[paramName]);
         normalized ? pasteData = normalized : '';
         if(pasteData.split(';').length > 0) objectNum = 'multiple';
         const input = `<input class="${objectNum}" type="text" feauture-name="${paramName}" value="${pasteData}">`;
         insert(input).after.begin(element.parsedFeautures_wrapper);
      }
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
         const pushedData = new ChildsPush(select.productCategory);
         for (let foundedCat in searchResult) {
            const item = searchResult[foundedCat];
            pushedData.collect(
               `<option data-cat-name="${foundedCat}">${item.name} -- ${item.parent}</option>`
            );
         }
         pushedData.insert();
         show(element.productExtras_wrapper);
         // Следим за изменением активной категории
         const activeCat = select.productCategory.options[0];
         this.watchCatChanged(activeCat);
         // Подгружаем данные характеристик
         const loadedFeautures = await API$1.searchFeautures(activeCat.getAttribute('data-cat-name'));
         new FeautureData(loadedFeautures.result.data).push();
         // Открыть поиск категорий
         this.showDynamicSearch();
         return true
      }
   }

   // ТНВЭД
   async tnved(data) {
      const searchResult = data.result.data;
      const pushedData = new ChildsPush(select.productTnved);
      if(searchResult.length > 0) {
         for(let foundedTnvd of searchResult) {
            const code = foundedTnvd.tnvedCode;
            pushedData.collect(
               `<option data-tnved-num="${code}">${code} ${foundedTnvd.description}</option>`
            );
         }
         pushedData.insert();
      } else {
         console.log(searchResult);
      }
   }

   // Размеры
   sizes(data) {
      let filterSizes = {};
      for (let product in data) {
         const sizes = data[product].sizes;
         const firstItemID = Object.keys(sizes)[0];
         const firsItemSize = sizes[firstItemID].sizeName;
         if(firsItemSize !== 0) {
            for(let item in sizes) {
               const size = sizes[item];
               filterSizes[size.sizeName] = size.sizeNameRus;
            }
         }
      }
      for(let sizeName in filterSizes) {
         const sizeItem = `<div class="col form-control sizeCol" data-ru-size="${filterSizes[sizeName]}">${sizeName}</div>`;
         insert(sizeItem).after.begin(element.productSizes);
      }
      show(element.productSizes_wrapper);
   }

   // Наименование / бренд / цена / описание / Страна
   defaultField(data) {
      const commonDataFields = {
         productName: input.productName,
         productBrand: input.productBrand,
         productPrice: input.productPrice
      };
      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly');
         commonDataFields[input].value = data[input];
      }

      const detailDesc = data.details.desc;
      textarea.productDesc.removeAttribute('readonly');
      if(detailDesc) {
         textarea.productDesc.value = detailDesc;
         textarea.productDesc.classList.add('max_height_desc');
      }
   }

   // Изображения
   images(data) {
      if(data.productImages) {
         show(element.productImages_wrapper);
         data.productImages.reverse();
         const imagesBlock = query('#productImages');
         for(let image of data.productImages) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`;
            imagesBlock.insertAdjacentHTML('afterbegin', divTag);
         }
      }
   }

   // Состав
   consist(data) {
      const detailConsist = data.details.consist;
      if(detailConsist !== 'null') {
         show(element.productConsist_wrapper);
         input.productConsist.value = detailConsist;
      } else {
         hide(element.productConsist_wrapper);
      }
   }

   // Цвет
   color(data) {
      const productColor = data.productColor;
      if((productColor) && (productColor !== 'null')) {
         show(element.productColor_wrapper);
         input.productColor.value = productColor;
      } else {
         hide(element.productColor_wrapper);
      }
   }

   // Если меняется категория, ищем новый ТВЭНД
   async watchCatChanged(currentCat) {
      const currentCatTnved = await API$1.searchTnved(currentCat.getAttribute('data-cat-name'));
      this.tnved(currentCatTnved);
      select.productCategory.addEventListener('change', async () => {
         const changedCategory = select.productCategory.value.split(' --')[0];
         const loadedFeautures = await API$1.searchFeautures(changedCategory);
         new FeautureData(loadedFeautures.result.data).push();

         const categoryOptions = select.productCategory.options;
         for(let cat of categoryOptions) {
            if(cat.selected) {
               const searchPattern = cat.getAttribute('data-cat-name');
               const findedTvend = await API$1.searchTnved(searchPattern);
               this.cleanSelect(select.productTnved);
               this.tnved(findedTvend);
            }
         }
      });
   }

   // Если надо изменить автоматичеки найденную категорию
   showDynamicSearch() {
      button.changeAutoFindedCategory.onclick = () => {
         hide(element.productExtras_wrapper);
         this.cleanSelect(select.productTnved);
         this.cleanSelect(select.productCategory);
         const search = new DynamicSearch();
         show(element.productExtrasNotFound_wrapper);
         search.watchField(input.searchProductCategory);
      };
   }

   // Очищаем дочерние элементы
   cleanSelect(parent) {
      if(parent.firstChild) {
         while(parent.firstChild) {
            parent.firstChild.remove();
         }
      }
   }
}

// ПОДГОТОВКА ДАННЫХ ДЛЯ ДОБАВЛЕНИЕ КАРТОЧКИ

class PrepareData {
  constructor(parseData, updates) {
    this.parseData = parseData;
    this.updates = updates;
  }
  collect() {
    return this.bodyObject()
  }

  bodyObject() {
    const vendorCode = Math.floor(Math.random() * 1000000000);
    const { inputsData, feautures, selectData, sizesData, barcodes } = this.updates;
    const country = this.parseData.details.params['Страна производства'];
    const body = {
      params: {
        card: {
          name: inputsData.productName,
          countryProduction: country || 'Россия',
          object: selectData.productCategory,
          addin: [
            { type: "Бренд",
              params: [{ value: inputsData.productBrand}]
            },
            { type: "Наименование",
              params: [{ value: inputsData.productName}]
            },
            { type: "Описание",
              params: [{ value: this.parseData.details.desc}]
            },
            { type: "Тнвэд",
              params: [{ value: selectData.productTnved }]
            },
            {...this.getConsist(inputsData.productConsist)},
            ...this.collectFeautures(feautures)
          ],
          nomenclatures: [{
            vendorCode:  vendorCode.toString(),
            variations: this.getVariations({
                barcodes: barcodes,
                name: inputsData.productName,
                price: inputsData.productPrice,
                sizes: sizesData
              }),
              addin: [{...this.getImages(this.parseData.productImages)}]
            }
          ]
        }
      },
      id: this.parseData.extras.uuid,
      jsonrpc: '2.0'
    };
    return body
  }

  // Состав
  getConsist(data) {
    const consist = { type: "Состав", params: [] };
    if (data) {
       const multipleConsists = data.split(', ');
        for (let item of multipleConsists) {
           const spaceIndex = item.lastIndexOf(' ');
           consist.params.push({
              value: item.slice(0, spaceIndex),
              count: parseInt(item.slice(spaceIndex + 1, -1))
           });
        }
        return consist
    } else {
       return {}
    }
  }

  collectFeautures(data) {
    const feauturesParams = {};
    const paramsData = [];

    for (const feauture in data) {
      const value = data[feauture];
      feauturesParams[feauture] = {
        type: feauture, params: []
      };
      for(let feautureValues of value) {
        feauturesParams[feauture].params.push({
          value: feautureValues
        });
      }
    }

    for(let item in feauturesParams) {
      paramsData.push(feauturesParams[item]);
    }

    return paramsData
  }

  // Размеры
  getVariations(data) {
    let variationsData = '';
    if (data.sizes) {
       variationsData = this.sizeVariation(data);
    } else {
       variationsData = this.defaultVariation(data);
    }
    return variationsData
 }

 defaultVariation(data) {
   const product = [{
     barcode: data.barcodes[0],
     addin: [
       { type: "Розничная цена",
       params: [{ count: parseInt(data.price) }] }]
   }];
   return product
 }

 sizeVariation(data) {
   let variationsData = [];
   let index = 0;
   for (let size in data.sizes) {
     variationsData.push(
      { barcode: data.barcodes[index],
        addin: [
          { type: "Розничная цена",
            params: [{ count: parseInt(data.price) }]
          },
          { type: 'Размер',
            params: [{ value: size.toUpperCase() }]
          },
          { type: "Рос. размер",
            params: [{ value: data.sizes[size] }]
          },
        ]
      });
     index++;
   }
   return variationsData
 }

  // Фотки
  getImages(data) {
    const images = { type: 'Фото', params: [] };
    for (let image of data.reverse()) {
      images.params.push({ value: image });
    }
    return images
  }
}

// СОБИРАЕМ ОТРЕДАКТИРОВАННЫЕ В ПАНЕЛИ ДАННЫЕ

class ChangedData {

   async collect() {
      const sizes = this.sizes();
      const sizeNum = Object.keys(sizes).length;
      let barcodeNums = 1;
      if(sizeNum > 0) {
         barcodeNums = sizeNum;
      }
      const barcodeGen = await API$1.genBarcodes(barcodeNums.toString());
      input.productBarcode.value = barcodeGen;
      return {
         inputsData: this.inputsValue(),
         selectData: this.selectValue(),
         feautures: this.feautures(),
         sizesData: sizes,
         barcodes: barcodeGen
      }
   }

   inputsValue() {
      const inputFields = [
         input.productName, input.productBrand, input.productPrice, input.productConsist, textarea.productDesc, input.productColor, input.searchProductCategory
      ];

      let inputData = {};
      for(let input of inputFields) {
         if(input.value) {
            const inputID = input.getAttribute('id');
            inputData[inputID] = input.value;
         }
      }
      // console.log(inputData)
      return inputData
   }

   selectValue() {
      let selectData = {};
      if(this.visible(element.productExtras_wrapper)) {
         selectData.productCategory = this.cleanOption.category(select.productCategory.value);
         selectData.productTnved = this.cleanOption.tnved(select.productTnved.value);
      }
      if(this.visible(element.productExtrasNotFound_wrapper)) {
         selectData.productCategory = this.cleanOption.category(input.searchProductCategory.value);
         selectData.productTnved = this.cleanOption.tnved(select.searchProductTnved.value);
      }
      // console.log(selectData)
      return selectData
   }

   feautures() {
      let feauturesData = {};
      const addedFeautures = document.querySelectorAll('.addedFeautures');
      for(let feauture of addedFeautures) {
         const parent = feauture.parentElement.parentElement;
         const feautureName = parent.getAttribute('feautre-name');
         feauturesData[feautureName] = [];
      }
      for(let feauture of addedFeautures) {
         const parent = feauture.parentElement.parentElement;
         const feautureName = parent.getAttribute('feautre-name');
         feauturesData[feautureName].push(feauture.children[0].innerText);
      }
      return feauturesData
   }

   sizes() {
      let sizesData = {};
      if(this.visible(element.productSizes_wrapper)) {
         for(let size of element.productSizes.children) {
            sizesData[size.innerText] = size.getAttribute('data-ru-size');
         }
         return sizesData
      } else {
         return false
      }
   }

   get cleanOption() {
      return {
         category: (val) => val.split(' --')[0],
         tnved: (val) => val.split(' -')[0]
      }
   }

   visible(el) {
      if(el.classList.contains('dn')) {
         return false
      } else {
         return true
      }
   }
}

class Notifier {
   error(data) {
      this.toggle('error');
      element.notifyHeader.innerText = `Код ошибки: ${data.head}`;
      element.notifyText.innerText = `Wildberries response: \n${data.body}`;
   }
   correct(text) {
      element.notifyText.classList.remove('error');
      this.toggle();
      element.notifyHeader.innerText = `Операция выполнена`;
      element.notifyText.innerText = text;
   }
   toggle(type) {
      let timeOut = 3000;
      if(type == 'error') {
         hide(button.parseCard);
         hide(button.saveCard);
         timeOut = 4000;
         element.notifyText.classList.add('error');
      }
      const popup = () => {
         element.notify.classList.remove('show');
         show(button.parseCard);
         show(button.saveCard);
      };
      setTimeout(popup, timeOut);
      element.notify.classList.add('show');
   }
}

const Notify = new Notifier();

// УПРАВЛЕНИЕ НАНЕЛЬЮ ПАРСИНГА

class ParsePanel {
   // Подключаем кнопки Спарсить и Добавить
   async registerButtons() {
      button.parseCard.onclick = async () => {
         // Убеждаемся что предыдущий данные очищены
         FieldsCleaner$1.restoreMarkup();
         // Включаем спиннер
         fetchSpinner('on');
         // Парсим карточку
         const parseData = await API$1.parseCard(input.productURL.value);
         this.checkParse(parseData);
         // Заполняем полученными данными поля в панели
         new FillFields(parseData).passData();
         // Показываем кнопку добавления карточки
         show(button.saveCard);
         // // Выключаем спиннер
         fetchSpinner('off');
         // Передаём данные парсинга для добавления
         this.addProductButtonControl(parseData);
      };
      this.saveToken();
   }
   // Кнопка сохранения карточки
   addProductButtonControl(parseData) {
      button.saveCard.onclick = async () => {
         if(this.checkCategory()) {
            // Собираем изменённые данные с полей
            const updatedFields = await new ChangedData().collect();
            // Формируем тело запроса
            const postData = new PrepareData(parseData, updatedFields).collect();
            console.log('parseData', parseData);
            // console.log('updatedFields', updatedFields);
            console.log('postData', postData);
            // Отправляем карточку в Wildberries
            const response = await API$1.createCard(postData);
            this.notifiers.wdError(response);
         } else {
            this.notifiers.error('Добавьте категорию');
         }
      };
   }

   saveToken() {
      button.saveToken.onclick = async () => {
         const response = await API$1.saveToken(textarea.token.value);
         if(response.save == 'ok') {
            button.closeModal.click();
            this.notifiers.correct('Токен успешно обновлен');
         }
      };
   }

   get notifiers() {
      return {
         error: (reason) => {
            Notify.error({ head: 'Ошибка', body: reason });
         },
         correct: (reason) => {
            Notify.correct(reason);
         },
         wdError(response) {
            if(response.error) {
               Notify.error({
                  head: response.error.code.toString(),
                  body: response.error.data.cause.err
               });
            }
            if(!response.error) {
               Notify.correct('Wildberries response: карточка успешно добавлена');
            }
         }
      }
   }

   checkParse(parseData) {
      if(parseData.type) {
         this.notifiers.error(parseData.text);
      }
   }

   checkCategory() {
      const visible = (el) => {
         if(el.classList.contains('dn')) {
            return false
         } else { return true }
      };
      if(visible(element.productExtrasNotFound_wrapper)) {
         if(!input.searchProductCategory.value) {
            input.searchProductCategory.classList.add('error-require');
            return false
         } else { return true }
      } else { return true }
   }
}



new ParsePanel().registerButtons();
