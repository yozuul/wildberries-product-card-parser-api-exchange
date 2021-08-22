import axios from 'axios'
import { isCyrillic } from '../utils'

class WildberriesAPI {
   constructor() {
      this.apiPath = 'https://suppliers-api.wildberries.ru'
   }

   async getDirectoryList(pattern) {
      let lang = 'ru'
      if (!isCyrillic(pattern.split(' ')[0])) lang = 'en'

      const encode = encodeURI(pattern)

      const url = `${this.apiPath}/api/v1/config/get/object/list?pattern=${encode}&lang=${lang}`

      // await axios.get(url)

      // return request.data
   }

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

   get wildberriesHeader() {
      console.log(process.env.WD_TOKEN);
      return {
         Authorization: `Bearer ${process.env.WD_TOKEN}`,
         'Content-Type': 'application/json'
      }
   }
}

export { WildberriesAPI }