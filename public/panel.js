'use strict';

class API {

   async parseCard(data) {
      const response = await this.fetch(data).post(this.apiURL.parseCard);
      if(response.status == 200) {
         return response.json()
      } else {
         console.log(`Ошибка получения жанных по API ${this.apiURL.parseCard}`);
      }
   }


   get apiURL() {
      const apiHost = 'http://localhost:3000';
      return {
         parseCard: `${apiHost}/parseCard`,
         getAdditionalCardData: `${apiHost}/getAdditionalCardData`,
         addCard: `${apiHost}/addCard`,
      }
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
}

var API$1 = new API();

const query = (el) => document.querySelector(el);
const queryAll = (el) => document.querySelectorAll(el);
const show = (el) => el.classList.remove('dn');

// Поля формы
const input = {
   cardProductURL: query('#cardProductURL'),
   cardProductName: query('#productName'),
   cardProductBrand: query('#productBrand'),
   cardProductPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   productDesc: query('#productDesc'),
   productColor: query('#productColor'),
   searchProductCategory: query('#searchProductCategory'),
};
// Кнопки управления формой
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
};
// Селекты
const select = {
   productCategory: query('#productCategory'),
   productTnved: query('#productTnved'),
};
// Интерактивные элементы
const element = {
   parseCard_inactive: query('#parseCard_inactive'),
   parseCard_active: query('#parseCard_active'),
   saveCard_inactive: query('#saveCard_inactive'),
   saveCard_active: query('#saveCard_active'),
   productExtras: query('#productExtras_wrapper'),
   productExtrasNotFound_wrapper: query('#productExtrasNotFound_wrapper'),
   productImages_wrapper: query('#productImages_wrapper'),
   productConsist_wrapper: query('#productConsist_wrapper'),
   productParams_wrapper: query('#productParams_wrapper'),
   productColor_wrapper: query('#productColor_wrapper'),
   productParams_table: query('#productParams_table'),
};
const textarea = {
   cardProductDesc: query('#cardProductDesc')
};

class DynamicSearch {

   watchField(element) {
      console.log(element);
   }
}

class FillFields {
   constructor(parseData) {
      this.parseData = parseData;
   }

   passData() {
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
      this.category(data.extras.direcoryList);
   }

   async category(data) {
      if(!data.result.founded) {
         const search = new DynamicSearch();
         show(element.productExtrasNotFound_wrapper);
         search.watchField(input.searchProductCategory);
      }
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

   other() {
      // Категория
      const direcoryList = data.extras.direcoryList;
      if(direcoryList) {
         let num = 1;
         for(let direcory in direcoryList) {
            const dirOptionRow = `<option value="${num}">${direcory}</option>`;
            select.productCategory.insertAdjacentHTML('afterbegin', dirOptionRow);
            num++;
         }
         element.productExtras.classList.remove('dn');
      }
      // ТВЭНД
      const tvendList = data.extras.tnvedList;
      if(tvendList) {
         let num = 1;
         for(let tvend of tvendList) {
            const tvendOptionRow = `<option value="${num}">${tvend.tnvedCode}${tvend.description}</option>`;
            select.productTnved.insertAdjacentHTML('afterbegin', tvendOptionRow);
            num++;
         }
         element.productExtras.classList.remove('dn');
      }

      this.button.saveCard.classList.remove('dn');
      this.toggleSpinner('off');
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
         // Получение данных
         let parseData = await API$1.parseCard(input.cardProductURL.value);
         new FillFields(parseData).passData();
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
      this.element.productExtras.classList.add('dn');
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
