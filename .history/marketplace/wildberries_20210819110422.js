import {} from 'dotenv/config'
import axios from 'axios'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test(data) {
      const env = process.env
      const token = env.WD_API_TOKET
      this.checkFetch(token)
      // console.log(data);
   }

   async checkFetch(token) {
      // const instance = axios.get({
      //    baseURL: 'https://suppliers-api.wildberries.ru/public/api/v1/info',
      //    timeout: 1000,
      //    headers: { 'Authorization': `Bearer ${token}` }
      //  });

      const url = 'https://suppliers-api.wildberries.ru/public/api/v1/info'
      try {
         const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
         });
         console.log(response.data);
      } catch (error) {
         console.error(error);
      }
   }
}

export { WildberriesAPI }