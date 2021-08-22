import {} from 'dotenv/config'
import axios from 'axios'

import { uuid } from '../../utils'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test(data) {
      // console.log(data);
      this.createCard(data)
   }

   createCard(data) {
      console.log(uuid());
      const url = 'https://suppliers-api.wildberries.ru/card/create'
      const prepareData = {
         // Идентификатор отправляемого запроса. Служит для сопоставления ответа отправленному запросу. Необходимо генерировать уникальные идентификаторы для каждого запроса. Во избежание пересечений с другими поставщиками, рекомендуется избегать простых идентификаторов, таких как 1, 2, 3 и т.д.
         "id": "8a41f7a8-6ed1-4910-bbd3-ac83e214ec81",
         // Версия протокола. Всегда должна быть "2.0".
         "jsonrpc": "2.0",
         // Параметры.
         "params": {
            "card": {
               // Страна проиводитель.
               "countryProduction": "string",
               // Категория товара (Джинсы, Книги и другие).
               "object": "string",
               // Артикул поставщика.
               "supplierVendorCode": "string",
               // Структура, содержащая характеристики карточки, общие для всех номенклатур и размеров.
               "addin": [{
                  // Название характеристики. Пример: "Бренд"
                  "type": "string",
                  // Массив значений характеристики. У характеристик, содержащих одно значение, массив будет содержать только 1 элемент. Пример: "{"type": "Бренд", "params": [{"value": "Имя_бренда"}]}".
                  "params": [{
                     // Численное значение характеристики.
                     "count": 0,
                     // Единицы измерения характеристики ("см", "%" и другие).
                     "units": "string",
                     // Текстовое значение характеристики ("Имя_бренда").
                     "value": "string"
                  }]
               }],
               // Массив номенклатур товара.
               "nomenclatures": [{
                  // Артикул товара.
                  "vendorCode": "string",
                  // Массив вариаций товара. Одна цена - один размер - одна вариация.
                  "variations": [{
                     // Штрихкод товара.
                     "barcode": "string",
                     // Структура, содержащая характеристики конкретной вариации товара.
                     "addin": [{
                        // Название характеристики.
                        "type": "string",
                        // Массив значений характеристики. У характеристик, содержащих одно значение, массив будет содержать только 1 элемент. Пример: "{"type": "Размер", "params": [{"value": "S"}]}".
                        "params": [{
                           // Численное значение характеристики.
                           "count": 0,
                           // Единицы измерения характеристики.
                           "units": "string",
                           // Текстовое значение характеристики.
                           "value": "string"
                        }]
                     }]
                  }],
                  // Структура, содержащая характеристики конкретной номенклатуры.
                  "addin": [{
                     // Название характеристики
                     "type": "string",
                     // Массив значений характеристики. У характеристик, содержащих одно значение, массив будет содержать только 1 элемент. Пример: "{"type": "Основной цвет", "params": [{"value": "Красный"}]}".
                     "params": [{
                        // Численное значение характеристики.
                        "count": 0,
                        // Единицы измерения характеристики.
                        "units": "string",
                        // Текстовое значение характеристики.
                        "value": "string"
                     }]
                  }]
               }]
            }
         }
      }
      // this.axios(data).post(url)
   }

   axios(data) {
      return {
         post: async (url) => {
            try {
               const response = await axios.get(url, {
                  headers: {
                     Authorization: `Bearer ${process.env.WD_TOKEN}`
                  }
               }, data)
               console.log(response);
            } catch (error) {
               console.error(error);
            }
         }
      }
   }
}

export {
   WildberriesAPI
}



// async checkFetch(token) {
// const instance = axios.get({
//    baseURL: 'https://suppliers-api.wildberries.ru/public/api/v1/info',
//    timeout: 1000,
//    headers: { 'Authorization': `Bearer ${token}` }
//  });

// const url = 'https://suppliers-api.wildberries.ru/public/api/v1/info'
//    try {
//       const response = await axios.get(url, {
//          headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log(response);
//    } catch (error) {
//       console.error(error);
//    }
// }