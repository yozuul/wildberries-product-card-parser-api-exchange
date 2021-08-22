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
         return this.processResponse(response)
      } catch (error) {
         console.error(error);
      }
   }

   async processResponse(response) {
      const data = response.data
      const status = response.status
      const headers = response.headers
      const config = response.config

      if(!status == 200) {
         return this.error(status).donorResponse
      } else {
         return {
            type: 'OK',
            text: 'Получение данных из справочника завершён успешно',
            data: data.data ? data.data : null
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