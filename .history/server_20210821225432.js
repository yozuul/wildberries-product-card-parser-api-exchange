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

  const test = await axios.post(url, qs.stringify(data), options);
  console.log(test);

  console.log(data.id);
  console.log(data.params.card[0].nomenclatures[0].variations[0].barcode);

}

testAdd()

function getCardData(uuid, barcode) {
  const vendorCode = Math.floor(Math.random() * 1000000000)
  return {
    "params": {
      "params": {
        "card": [{
          "countryProduction": "Чешская Республика",
          "supplierVendorCode": "379a8ebf-a198-4ca8-acbd-3364d06214b8",
          "object": "карандаш для губ",
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
                "value": "notnved"
              }]
            },
            {
              "type": "Бренд",
              "params": [{
                "value": "Miss Tais"
              }]
            },
            {
              "type": "Комплектация",
              "params": [{
                "value": "карандаш"
              }]
            },
            {
              "type": "Пол",
              "params": [{}]
            },
            {
              "type": "Описание",
              "params": [{
                "value": "Представляем самый популярный в России деревянный карандаш для губ. Сочетание идеальной гипоаллергенной формулы и деревянного корпуса из калифорнийского кедра делает нанесение макияжа не только комфортным, но и предпочтительным для женщин, обладающих чувствительной кожей или, например, носящих контактные линзы. Дерево обладает сильнейшим антисептическим свойством, что не позволяет размножаться бактериям на поверхности грифеля, и является прекрасным природным консервантом. Корпус карандаша покрыт безвредным прозрачным лаком. Самые популярные профессиональные карандаши. Прекрасно сбалансированная формула, подходящая для всех типов кожи."
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
            "vendorCode": vendorCode.toString(),
            "variations": [{
              "barcode": barcode,
              "addin": [{
                  "type": "Розничная цена",
                  "params": [{
                    "count": 147
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
                  "value": "темно-бежевый"
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
}

// function getCardData(uuid, barcode) {
//   const vendorCode = Math.floor(Math.random() * 1000000000)
//   return {
//     "params": {
//       "card": [{
//         "countryProduction": "Россия",
//         "supplierVendorCode": "379a8ebf-a198-4ca8-acbd-3364d06214b8",
//         "object": "Худи",
//         "addin": [{
//             "type": "Состав",
//             "params": [{
//               "value": "Хлопок",
//               "count": 80
//             }]
//           },
//           {
//             "type": "Тнвэд",
//             "params": [{
//               "value": "6105201000"
//             }]
//           },
//           {
//             "type": "Бренд",
//             "params": [{
//               "value": "Raven."
//             }]
//           },
//           {
//             "type": "Комплектация",
//             "params": [{
//               "value": "худи"
//             }]
//           },
//           {
//             "type": "Пол",
//             "params": [{
//               "value": "Женский"
//             }]
//           },
//           {
//             "type": "Описание",
//             "params": [{
//               "value": "Оверсайз худи марки RAVEN. Толстовка свободного силуэта, с увеличенной проймой, шириной рукавов и спущенной плечевой линией. Худи выполено из качественного трикотажного полотна \"френч терри\" с начесом. Оснащена накладным карманом и эластичными поясом и манжетами. Данная модель может стать отличной базой для оверсайз стиля."
//             }]
//           },
//           {
//             "type": "Ключевые слова",
//             "params": [{
//               "value": "Худи"
//             }]
//           }
//         ],
//         "nomenclatures": [{
//           "vendorCode": vendorCode.toString(),
//           "variations": [{
//             "barcode": barcode,
//             "addin": [{
//                 "type": "Розничная цена",
//                 "params": [{
//                   "count": 2068
//                 }]
//               },
//               {
//                 "type": "Размер",
//                 "params": [{
//                   "value": "56"
//                 }]
//               },
//               {
//                 "type": "Рос. размер",
//                 "params": [{
//                   "value": "56"
//                 }]
//               }
//             ]
//           }],
//           "addin": [{
//               "type": "Основной цвет",
//               "params": [{
//                 "value": "светло-песочный"
//               }]
//             },
//             {
//               "type": "Фото",
//               "params": []
//             }
//           ]
//         }]
//       }]
//     },
//     "jsonrpc": "2.0",
//     "id": uuid
//   }
// }