import {} from 'dotenv/config'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test(data) {
      const env = process.env
      const token = env.WD_API_TOKET
      this.checkFetch(token)
      console.log(data);
   }

   checkFetch(token) {

   }
}

export { WildberriesAPI }