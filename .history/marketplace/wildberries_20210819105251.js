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
      console.log(data);
      console.log(axios);
   }

   checkFetch(token) {

   }
}

export { WildberriesAPI }