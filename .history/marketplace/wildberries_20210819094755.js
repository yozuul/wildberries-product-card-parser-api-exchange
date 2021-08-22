import {} from 'dotenv/config'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test(data) {
      const env = process.env
      const token = env.WD_API_TOKET

      console.log(data);
   }


}

export { WildberriesAPI }