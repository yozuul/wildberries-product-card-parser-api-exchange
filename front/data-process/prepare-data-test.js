
export const getCardData = (uuid, barcode) => {
   const art = Math.floor(Math.random() * 1000000000)
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
             "vendorCode":  art.toString(),
             "variations": [
               {
                 "barcode": barcode.toString(),
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
             ]
           }
         ]
       }
     },
     "jsonrpc": "2.0",
     "id": uuid
   }
 }