import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors';
import { router } from './router'
import { WildberriesAPI } from './marketplace/wildberries'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import qs from 'qs'


import { green, darkGray, red } from 'ansicolor'

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, console.log(('\nServer started').green))

const testAdd = async () => {

  const url = 'https://suppliers-api.wildberries.ru/card/create'
  const options = {
    headers: {
       Authorization: `Bearer ${process.env.WD_TOKEN}`,
       'Content-Type': 'application/json'
    }
 }

  const uuid = uuidv4()
  const barcode = await new WildberriesAPI().getBarCode(uuid)
  const data = getCardData(uuid, barcode)
  console.log(data);
  const test = await axios.post(url, qs.stringify(data), options);

}

testAdd()

function getCardData(uuid, barcode) {
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
          "vendorCode": Math.floor(Math.random() * 1000000000),
          "variations": [{
            "barcode": barcode,
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
    "id": uuid
  }
}