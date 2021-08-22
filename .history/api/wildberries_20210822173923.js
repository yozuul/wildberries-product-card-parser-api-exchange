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

   async getTnvedList(pattern) {
      let encode = encodeURI(pattern)
      const url = `api/v1/directory/tnved?subject=${encode}`
      try {
         const response = await this.fetchData.get(url)
         console.log(response);
         // console.log(this.processResponse(response, 'ТНВЭД'));
         // return this.processResponse(response, 'ТНВЭД')
      } catch (error) {
         console.error(error);
         console.log(`Ошибка получения ТНВЭД Wildberries по паттерну: ${pattern}`);
      }
   }

   async processResponse(response, dirName) {
      const data = response.data
      const status = response.status
      const headers = response.headers
      const config = response.config

      let responseData = {}

      if(dirName == 'category') {
         const rquestData = Object.keys(data.data)[0] ? data.data : null
         const searchResultLog = rquestData ? 'notFound' : 'founded'
         responseData = {
            log: searchResultLog,
            data: rquestData
         }
      }

      if(!status == 200) {
         return this.error(status).donorResponse
      } else {
         return {
            type: 'OK',
            text: `Поиск данных в справочнике ${dirName} завершён без ошибок`,
            searchResult: responseData
         }
      }
   }
   // await axios.get(url)

   // return request.data

   //    async getTnvedList(pattern) {
   //       let encode = encodeURI(pattern)
   //       const url = `${this.apiPath}/api/v1/directory/tnved?subject=${encode}`
   //       const fetch = new Fetch(url, process.env.WD_TOKEN)
   //       const request = await fetch.getData()
   //       return request.data
   //    }
   //
   //    async getBarCode(uuid) {
   //       const url = `${this.apiPath}/card/getBarcodes`
   //       const data = {
   //          id: uuid,
   //          params: {
   //             quantity: 1
   //          }
   //       }
   //       const fetch = new Fetch(url)
   //       const result = await fetch.postData(data)
   //       return result.data.result.barcodes[0]
   //    }

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