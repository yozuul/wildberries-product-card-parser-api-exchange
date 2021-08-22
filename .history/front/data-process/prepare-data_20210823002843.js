
// ПОДГОТОВКА ДАННЫХ ДЛЯ ДОБАВЛЕНИЕ КАРТОЧКИ

class PrepareData {
   constructor(params) {
      this.params = params
   }
   FunctionName() {

   }
}

export { PrepareData }
const prepareObjectData = (parseData, updatedFields) => {
   const params = parseData.details.params
   const cardData = {
      params: {
         card: [{
            countryProduction: params['Страна производства'],
            supplierVendorCode: parseData.extras.supplierVendorCode,
            object: parseData.cardProductName,
            addin: [{
                  type: 'Состав',
                  params: [{
                     value: 'Хлопок',
                     count: 80
                  }]
               },
               {
                  type: 'Тнвэд',
                  params: [{
                     value: updatedFields.productTnved.split('--')[0]
                  }]
               },
               {
                  type: 'Бренд',
                  params: [{
                     value: updatedFields.cardProductBrand
                  }]
               },
               {
                  type: 'Комплектация',
                  params: [{
                     value: params['Комплектация']
                  }]
               },
               {
                  type: 'Пол',
                  params: [{
                     value: params['Пол']
                  }]
               },
               {
                  type: 'Описание',
                  params: [{
                     value: updatedFields.cardProductDesc
                  }]
               },
               {
                  type: 'Ключевые слова',
                  params: [{
                     value: 'Худи'
                  }]
               }
            ],
            nomenclatures: [{
               vendorCode: Math.floor(Math.random() * 1000000000),
               variations: [{
                  barcode: parseData.extras.barcode,
                  addin: [{
                        type: 'Розничная цена',
                        params: [{
                           count: parseInt(updatedFields.cardProductPrice)
                        }]
                     },
                     {
                        type: 'Размер',
                        params: [{
                           value: "56"
                        }]
                     },
                     {
                        type: 'Рос. размер',
                        params: [{
                           value: "56"
                        }]
                     }
                  ]
               }],
               addin: [{
                     type: "Основной цвет",
                     params: [{
                        value: updatedFields.productColor
                     }]
                  },
                  {
                     type: "Фото",
                     params: []
                  }
               ]
            }]
         }]
      },
      // jsonrpc: "2.0",
      id: parseData.extras.uuid
   }

   // console.log(cardData);
   return cardData
}