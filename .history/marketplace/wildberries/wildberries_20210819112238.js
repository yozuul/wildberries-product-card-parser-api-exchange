import {} from 'dotenv/config'
import axios from 'axios'

import { uuid } from '../../utils'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test(data) {
      console.log(data);
      // this.createCard(data)
   }

   createCard(data) {
      const url = 'https://suppliers-api.wildberries.ru/card/create'
      this.axios(data).post(url)
   }

   axios(data) {
      return {
         post: async (url) => {
            try {
               const response = await axios.get(url, {
                  headers: { Authorization: `Bearer ${process.env.WD_TOKEN}` }
               }, data)
               console.log(response);
            } catch (error) {
               console.error(error);
            }
         }
      }
   }
}

export { WildberriesAPI }



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