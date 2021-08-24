'use strict';

class API {

   get apiURL() {
      const apiHost = 'http://localhost:3000';
      return {
         parseCard: `${apiHost}/parseCard`,
         createCard: `${apiHost}/createCard`,
         searchCategory: `${apiHost}/searchCategory`,
         searchTnved: `${apiHost}/searchTnved`,
         genBarcodes: `${apiHost}/genBarcodes`,
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
   productURL: query('#productURL'),
   productName: query('#productName'),
   productBrand: query('#productBrand'),
   productPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
   productColor: query('#productColor'),
   currentUUID: query('#currentUUID'),
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
   productSizes_wrapper: query('#productSizes_wrapper'),
   productSizes: query('#productSizes'),
   notify: query('#notify'),
   notifyHeader: query('#notifyHeader'),
   notifyText: query('#notifyText'),
};
const textarea = {
   productDesc: query('#productDesc')
};
// Кнопки
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
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
         input.productConsist, input.productColor, input.watchSelectedCategory, textarea.productDesc
      ];
      cleanElement.map((el) => el.value = '');

      // Элементы которые надо спрятать
      const hideElement = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper, element.productConsist_wrapper, element.productColor_wrapper, element.productExtrasNotFound_wrapper, element.productSizes_wrapper
      ];
      hideElement.map((el) => hide(el));

      // Элементы у которых надо удалить дочерние элементы
      const cleanChilds = [
         element.productImages, element.productParams_table, select.productCategory, select.productTnved, select.searchProductTnved, element.productSizes
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
      await this.category(data.extras.direcoryList);
      // Размеры
      this.sizes(data.source.nomenclatures);
      input.currentUUID.value = this.parseData.extras.uuid;
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
         this.watchCatChanged(select.productCategory.options[0]);
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
      let variationNum = 0;
      for (let product in data) {
         if (variationNum < 1) {
            const productItem = data[product];
           let sizeNum = 0;
            for (let foundedSize in productItem.sizes) {
               const item = productItem.sizes[foundedSize];
               if ((item.sizeName !== 0) && (item.quantity !== 0)) {
                  const sizeItem = `<div class="col form-control sizeCol" data-ru-size="${item.sizeNameRus}">${item.sizeName}</div>`;
                  insert(sizeItem).after.begin(element.productSizes);
               }
               if(sizeNum > 0) {
                  show(element.productSizes_wrapper);
               }
               sizeNum++;
            }
            variationNum++;
         }
      }
   }

   // Наименование / бренд / цена / описание
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
      if(productColor !== 'null') {
         show(element.productColor_wrapper);
         input.productColor.value = productColor;
      } else {
         hide(element.productColor_wrapper);
      }
   }

   // Характеристики
   features(data) {
      const detailParams = data.details.params;
      if(detailParams) {
         show(element.productParams_wrapper);
         for(let name in detailParams) {
            const paramRow = `<tr><th contenteditable="true">${name}</th><td contenteditable="true">${detailParams[name]}</td></tr>`;
            element.productParams_table.insertAdjacentHTML('afterbegin', paramRow);
         }
      } else {
         hide(element.productParams_wrapper);
      }
   }

   // Если меняется категория, ищем новый ТВЭНД
   async watchCatChanged(currentCat) {
      const currentCatTnved = await API$1.searchTnved(currentCat.getAttribute('data-cat-name'));
      this.tnved(currentCatTnved);
      select.productCategory.addEventListener('change', async () => {
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
    // console.log(this.parseData);
    // console.log(this.updates);
    // console.log(this.bodyObject());
    return this.bodyObject()
  }


 checkMultiple(value) {
    let multipleParams = [];
    const trySplit = value.split('; ');
    if(trySplit[1]) {
      let index = 1;
      for(let item of trySplit) {
        if(index < 3) {
          multipleParams.push({value: item});
        }
        index++;
      }
      return multipleParams
    } else {
      return value
    }
 }

 checkUnits(value) {
     const patternName = {
       sm: ' см', sm2: ' см', gr: ' г', kg: ' кг', mm: ' мм', mp: ' Мп', mhz: ' МГц'
     };
     const unitCheck = (str) => {
       return {
        sm: str.slice(-3), sm2: str.slice(-3), gr: str.slice(-2), kg: str.slice(-3),
        mm: str.slice(-3), mp: str.slice(-3), mhz: str.slice(-4)
       }
     };
     for (let unit in patternName) {
       const pattern = unitCheck(value)[unit];
       if (pattern == patternName[unit]) {
         const unitValue = value.split(pattern)[0];
         if(parseInt(unitValue)) {
          //  console.log('value', value);
          //  console.log('unitValue', unitValue);
            return unitValue
         }
       }
     }
 }

 collectFeautures(data) {
   const paramsData = [];
   const feauturesData = data;

   let feauturesParams = {};
   for (const feauture in feauturesData) {
     if ((feauture !== 'Страна производства') && (feauture)) {
       console.log(feauture);
       const value = feauturesData[feauture];
       // console.log('value', value);
       const checked = this.checkType(value);
       // console.log('checked', checked);
       if (checked) {
         feauturesParams[feauture] = {
           type: feauture,
           params: checked
         };
       }
     }
   }
   for (let param in feauturesParams) {
     paramsData.push(feauturesParams[param]);
   }
   // console.log('paramsData', paramsData);
   // console.log(paramsData);
   return paramsData
 }

 checkType(value) {
    let result = [];
    // Если есть единицы измерения
    const isUnit = this.checkUnits(value);
    // console.log(value);
    if(isUnit) {
      result.push({value: isUnit});
      return result
      // console.log('isUnit result', result);
    }
    // // Если значений несколько
    const isMultiply = this.checkMultiple(value);
    if(isMultiply) {
      if(typeof isMultiply !== 'string') {
        result = isMultiply;
        return result
        // console.log('isMultiply', isMultiply)
      } else {
        result.push({ value: value});
        return result
      }
    }
    // console.log('value', value);
    // console.log('result', result);
 }

  bodyObject() {
    const vendorCode = Math.floor(Math.random() * 1000000000);
    const { inputsData, feautures, selectData, sizesData, barcodes } = this.updates;
    const body = {
      params: {
        card: {
          countryProduction: feautures['Страна производства'],
          object: selectData.productCategory,
          addin: [{...this.getConsist(inputsData.productConsist)},
            { type: "Бренд",
              params: [{ value: inputsData.productBrand}]
            },
            { type: "Тнвэд",
              params: [{ value: selectData.productTnved }]
            },
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
       {
       type: "Розничная цена",
       params: [{ count: parseInt(data.price) }]
      }
    ]
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
      return {
         inputsData: this.inputsValue(),
         selectData: this.selectValue(),
         feautures: this.feautures(),
         sizesData: sizes,
         barcodes: await API$1.genBarcodes(barcodeNums.toString())
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
      for(let feauture of element.productParams_table.children) {
         feauturesData[feauture.children[0].innerText] = feauture.children[1].innerText;
      }
      // console.log(feauturesData)
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
         element.notifyText.classList.remove('error');
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
         // Заполняем полученными данными поля в панели
         new FillFields(parseData).passData();
         // // Показываем кнопку добавления карточки
         show(button.saveCard);
         // // Выключаем спиннер
         fetchSpinner('off');
         // Передаём данные парсинга для добавления
         this.addProductButtonControl(parseData);
      };
   }
   // Кнопка сохранения карточки
   addProductButtonControl(parseData) {
      button.saveCard.onclick = async () => {
         if(this.checkCategory()) {
            // Собираем изменённые данные с полей
            const updatedFields = await new ChangedData().collect();
            // Формируем тело запроса
            const postData = new PrepareData(parseData, updatedFields).collect();
            console.log('updatedFields', updatedFields);
            console.log('postData', postData);
            // Отправляем карточку в Wildberries
            const response = await API$1.createCard(postData);
            this.notifiers.wdError(response);
         } else {
            this.notifiers.error('Добавьте категорию');
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
