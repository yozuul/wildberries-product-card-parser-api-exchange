import axios from 'axios'
import { isCyrillic } from '../utils'

class WildberriesAPI {
   constructor() {
      this.fetchData = axios.create({
         baseURL: 'https://suppliers-api.wildberries.ru/',
         timeout: 10000,
         headers: this.wildberriesHeader
      });
   }

   // Поиск категорий
   async getDirectoryList(pattern) {
      let lang = 'ru'
      if (!isCyrillic(pattern.split(' ')[0])) lang = 'en'

      const encode = encodeURI(pattern)

      const url = `api/v1/config/get/object/list?pattern=${encode}&lang=${lang}`
      try {
         const response = await this.fetchData.get(url)
         return this.processResponse(response, 'category')
      } catch (error) {
         console.error(error);
         console.log(`Ошибка получения категорий Wildberries по паттерну: ${pattern}`);
      }
   }

   // Поиск ТНВЭД
   async getTnvedList(pattern) {
      let encode = encodeURI(pattern)
      const url = `api/v1/directory/tnved?subject=${encode}`
      try {
         const response = await this.fetchData.get(url)
         return this.processResponse(response, 'tnved')
      } catch (error) {
         console.error(error);
         console.log(`Ошибка получения ТНВЭД Wildberries по паттерну: ${pattern}`);
      }
   }

   // Генерирование штрихкода
   async getBarCode(uuid) {
      const url = `card/getBarcodes`
      const data = {
         id: uuid,
         params: { quantity: 1 },
         jsonrpc: '2.0'
      }
      const response = await this.fetchData.post(url, data)
      const resData = response.data

      if((resData.id)&&(resData.id == uuid)) {
         return resData.result.barcodes[0]
      }
   }

   // Обработка результатов поиска в справочниках
   async processResponse(response, dirName) {

      const data = response.data
      const status = response.status
      // const headers = response.headers
      // const config = response.config

      let responseData = {}

      // Обработка ответа от справочника Категорий
      if(dirName == 'category') {
         const rquestData = Object.keys(data.data)[0] ? data.data : null
         const searchResult = rquestData ? true : false
         responseData = {
            founded: searchResult,
            data: rquestData
         }
      }
      // Обработка ответа от справочника ТНВЭД
      if(dirName == 'tnved') {
         if(data.error) {
            responseData = {
               founded: false,
               data: null
            }
         } else {
            responseData = {
               founded: true,
               data: data.data
            }
         }
      }

      // Формируем ответ
      if(!status == 200) {
         return this.error(status).donorResponse
      } else {
         return {
            type: 'OK',
            text: `Поиск данных в справочнике ${dirName.toUpperCase()} завершён без ошибок`,
            result: responseData
         }
      }
   }

   // Лог ошибок
   error(code) {
      return {
         donorResponse: {
            type: 'error',
            text: `Ошибка парсинга. Сервер донора ответил кодом ${code}`
         }
      }
   }

   get wildberriesHeader() {
      return {
         Authorization: `Bearer ${process.env.WD_TOKEN}`,
         'Content-Type': 'application/json'
      }
   }
}

export { WildberriesAPI }