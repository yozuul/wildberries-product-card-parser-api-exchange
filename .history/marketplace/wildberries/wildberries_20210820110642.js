import {} from 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import qs from 'qs'

import { Fetch } from '../../utils'
import axios from 'axios'

class WildberriesAPI {
  constructor() {
    this.apiPath = 'https://suppliers-api.wildberries.ru'
  }

  async getAdditionalCardData(data) {
    const uuidGen = uuidv4()

    const directory = await this.getDirectoryList(data.cardProductName)
    const tnved = await this.getTnvedList(data.cardProductName)

    const extras = {
      direcoryList: directory.data,
      tnvedList: tnved.data,
      barcode: await this.getBarCode(uuidGen),
      uuid: uuidGen,
      supplierVendorCode: process.env.SUPLIER_VENDOR_CODE
    }

    console.log(extras);
    return extras
  }

  async getTnvedList(pattern) {
    let encode = encodeURI(pattern)
    const url = `${this.apiPath}/api/v1/directory/tnved?subject=${encode}`
    const fetch = new Fetch(url)
    const request = await fetch.getData()
    return request.data
  }

  async getDirectoryList(pattern) {
    let lang = 'ru'
    let encode = encodeURI(pattern)

    const cyrillicPattern = /^\p{Script=Cyrillic}+$/u
    if(!cyrillicPattern.test(pattern.split(' ')[0])) {
      lang = 'en'
      encode = pattern
    }

    const url = `${this.apiPath}/api/v1/config/get/object/list?pattern=${encode}&lang=${lang}`
    const fetch = new Fetch(url)
    const request = await fetch.getData()
    return request.data
  }

  async getBarCode(uuid) {
    const url = `${this.apiPath}/card/getBarcodes`
    const data = {
      id: uuid,
      params: { quantity: 1 }
    }
    const fetch = new Fetch(url)
    const result = await fetch.postData(data)
    return result.data.result.barcodes[0]
  }

  async saveCard(data) {
    const url = `${this.apiPath}/card/create`
    const options = {
      headers: {
         Authorization: `Bearer ${process.env.WD_TOKEN}`,
         'Content-Type': 'application/json'
      }
   }

   const ddd = this.datass()
    // const test = await axios.post(url, qs.stringify(data), options);

    console.log(data);
    console.log(options);
    console.log(ddd);
    // const fetch = new Fetch(url)
    // const request = await fetch.postData(data)
    return {response: 'ok'}
    // return request
  }

  datass() {
    return {
      "params": {
         "card": [{
            "countryProduction": "Россия",
            "supplierVendorCode": "379a8ebf-a198-4ca8-acbd-3364d06214b8",
            "object": "Худи",
            "addin": [{
                  "type": "Состав",
                  "params": [{
                     "value": "Хлопок",
                     "count": 80
                  }]
               },
               {
                  "type": "Тнвэд",
                  "params": [{
                     "value": "6105201000"
                  }]
               },
               {
                  "type": "Бренд",
                  "params": [{
                     "value": "Raven."
                  }]
               },
               {
                  "type": "Комплектация",
                  "params": [{
                     "value": "худи"
                  }]
               },
               {
                  "type": "Пол",
                  "params": [{
                     "value": "Женский"
                  }]
               },
               {
                  "type": "Описание",
                  "params": [{
                     "value": "Оверсайз худи марки RAVEN. Толстовка свободного силуэта, с увеличенной проймой, шириной рукавов и спущенной плечевой линией. Худи выполено из качественного трикотажного полотна \"френч терри\" с начесом. Оснащена накладным карманом и эластичными поясом и манжетами. Данная модель может стать отличной базой для оверсайз стиля."
                  }]
               },
               {
                  "type": "Ключевые слова",
                  "params": [{
                     "value": "Худи"
                  }]
               }
            ],
            "nomenclatures": [{
               "vendorCode": 680934773,
               "variations": [{
                  "addin": [{
                        "type": "Розничная цена",
                        "params": [{
                           "count": 2068
                        }]
                     },
                     {
                        "type": "Размер",
                        "params": [{
                           "value": "56"
                        }]
                     },
                     {
                        "type": "Рос. размер",
                        "params": [{
                           "value": "56"
                        }]
                     }
                  ]
               }],
               "addin": [{
                     "type": "Основной цвет",
                     "params": [{
                        "value": "светло-песочный"
                     }]
                  },
                  {
                     "type": "Фото",
                     "params": []
                  }
               ]
            }]
         }]
      },
      "jsonrpc": "2.0",
      "id": "aac138f9-7323-4655-8062-09f63d755907"
   }
  }
}

export { WildberriesAPI }