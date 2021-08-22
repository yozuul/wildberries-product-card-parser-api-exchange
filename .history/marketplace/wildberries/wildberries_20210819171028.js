import {} from 'dotenv/config'
import axios from 'axios'

import { fetchData, uuid } from '../../utils'

class WildberriesAPI {
  constructor(data) {
    this.data = data
  }

  connect(data) {
    this.apiPath = 'https://suppliers-api.wildberries.ru/api'
    this.token = process.env.WD_TOKEN

    // this.getBarCode()
    this.getDirectoryList(data.name)
  }

  async getDirectoryList(pattern) {
    let lang = 'ru'
    let encode = ''

    const cyrillicPattern = /^\p{Script=Cyrillic}+$/u

    if(!cyrillicPattern.test(pattern.split(' ')[0])) {
      lang = 'en'
      encode = pattern
    } else {
      encode = encodeURI(pattern)
    }

    const url = `${this.apiPath}/v1/config/get/object/list?pattern=${encode}&lang=${lang}`
    console.log(fetchData);
    // const ddd = await fetchData(url).get()

  }
  getBarCode() {
    this.axios().get({
      url: `${this.wd}/card/getBarcodes`,
      data: {
        id: uuid(),
        params: {
          quantity: 1
        },
      },
    })
  }
}

export { WildberriesAPI }



// axios() {
//   const json = {
//     jsonrpc: '2.0'
//   }
//   return {
//     post: async (req) => {
//       try {
//         const response = await axios.post(req.url, {
//           ...req.data,
//           ...json
//         }, {
//           headers: {
//             Authorization: `Bearer ${process.env.WD_TOKEN}`,
//             'Content-Type': 'application/json',
//           }
//         })
//         console.log(response.data)
//         return response.data
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     get: async (req) => {
//       try {
//         const response = await axios.post(req.url, {
//           ...req.data,
//           ...json
//         }, {
//           headers: {
//             Authorization: `Bearer ${process.env.WD_TOKEN}`,
//             'Content-Type': 'application/json',
//           }
//         })
//         console.log(response.data.toJSON())
//         return response.data
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }
// }
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