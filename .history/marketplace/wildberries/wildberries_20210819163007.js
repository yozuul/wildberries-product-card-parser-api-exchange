import {} from 'dotenv/config'
import axios from 'axios'
import LanguageDetect from 'languagedetect'

import { uuid } from '../../utils'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }

   connect(data) {
     this.apiPath = 'https://suppliers-api.wildberries.ru'
     this.token = process.env.WD_TOKEN

      // this.getBarCode()
      // this.getPattern('игр')
      this.getDirectoryList(data.name)
   }

   async getDirectoryList(pattern) {
    // https://suppliers-api.wildberries.ru/api/v1/config/get/object/list?pattern=%D0%A5%D1%83%D0%B4%D0%B8&lang=ru
    const lngDetector = new LanguageDetect();
    console.log(lngDetector.detect(pattern));
    // const encode = encodeURI(pattern)
    // const url = `https://suppliers-api.wildberries.ru/api/v1/config/get/object/parent/list`
    // try {
    //    const response = await axios.get(url, {
    //       headers: {
    //          Authorization: `Bearer ${process.env.WD_TOKEN}`,
    //          'Content-Type': 'application/json',
    //       }
    //    })
    //    console.log(response.data)
    //    return response.data
    // } catch (error) {
    //    console.error(error);
    // }

   }
   getBarCode() {
      this.axios().get({
         url: `${this.wd}/card/getBarcodes`,
         data: {
            id: uuid(),
            params: { quantity: 1 },
         },
      })
   }

   async getPattern(key) {
     const encode = encodeURI(key)
     this.axios().get({
       url: `${this.wd}/v1/config/get/object/list?pattern`
     })
   }

   axios() {
      const json = { jsonrpc: '2.0' }
      return {
         post: async (req) => {
            try {
               const response = await axios.post(req.url, {...req.data, ...json}, {
                  headers: {
                     Authorization: `Bearer ${process.env.WD_TOKEN}`,
                     'Content-Type': 'application/json',
                  }
               })
               console.log(response.data)
               return response.data
            } catch (error) {
               console.error(error);
            }
         },
         get: async (req) => {
            try {
               const response = await axios.post(req.url, {...req.data, ...json}, {
                  headers: {
                     Authorization: `Bearer ${process.env.WD_TOKEN}`,
                     'Content-Type': 'application/json',
                  }
               })
               console.log(response.data.toJSON())
               return response.data
            } catch (error) {
               console.error(error);
            }
         }
      }
   }
}

export { WildberriesAPI }


function test() {
   return {
      "params": {
        "card": {
          "countryProduction": "Россия",
          "object": "Джинсы",
          "addin": [
            {
              "type": "Состав",
              "params": [
                {
                  "value": "хлопок",
                  "count": 100
                }
              ]
            },
            {
              "type": "Бренд",
              "params": [
                {
                  "value": "ЛОГОС"
                }
              ]
            },
            {
              "type": "Комплектация",
              "params": [
                {
                  "value": "Джинсы - 1 шт"
                }
              ]
            },
            {
              "type": "Тнвэд",
              "params": [
                {
                  "value": "6203411000"
                }
              ]
            },
            {
              "type": "Пол",
              "params": [
                {
                  "value": "Мужской"
                }
              ]
            }
          ],
          "nomenclatures": [
            {
              "vendorCode": "bluee-123",
              "variations": [
                {
                  "barcode": "2001925979004",
                  "addin": [
                    {
                      "type": "Розничная цена",
                      "params": [
                        {
                          "count": 2222
                        }
                      ]
                    },
                    {
                      "type": "Размер",
                      "params": [
                        {
                          "value": "56"
                        }
                      ]
                    },
                    {
                      "type": "Рос. размер",
                      "params": [
                        {
                          "value": "42"
                        }
                      ]
                    }
                  ]
                }
              ],
              "addin": [
                {
                  "type": "Фото",
                  "params": []
                }
              ]
            }
          ]
        }
      },
      "jsonrpc": "2.0",
      "id": uuid()
    }
}

// const prepareData = {
//    id: uuid(),
//    // Параметры.
//    params: {
//       card: {
//          countryProduction: 'Россия',
//          object: 'Одежда',
//          // supplierVendorCode: '115525',
//          addin: [
//             {
//               "type": "Состав",
//               "params": [
//                 {
//                   "value": "хлопок",
//                   "count": 100
//                 }
//               ]
//             },
//             {
//                type: 'Бренд',
//                params: [{
//                   value: data.brand
//                }]
//             },
//             {
//                type: "Пол",
//                params: [{
//                   value: "Мужской"
//                }]
//             }
//          ],
//          "nomenclatures": [
//            {
//              "vendorCode": "bluee-123",
//              "variations": [
//                {
//                  "barcode": "2001925979004",
//                  "addin": [
//                    {
//                      "type": "Розничная цена",
//                      "params": [
//                        {
//                          "count": 2222
//                        }
//                      ]
//                    },
//                    {
//                      "type": "Размер",
//                      "params": [
//                        {
//                          "value": "56"
//                        }
//                      ]
//                    },
//                    {
//                      "type": "Рос. размер",
//                      "params": [
//                        {
//                          "value": "42"
//                        }
//                      ]
//                    }
//                  ]
//                }
//              ],
//              "addin": [
//                {
//                  "type": "Фото",
//                  "params": []
//                },
//                {
//                  "type": "Фото360",
//                  "params": []
//                },
//                {
//                  "type": "Видео",
//                  "params": []
//                }
//              ]
//            }
//          ]
//       }
//    },
//    jsonrpc: "2.0",
//    id: "json-rpc_8"
// }
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