import {} from 'dotenv/config'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test() {
      const env = process.env
      const token = env.WD_API_TOKET
      console.log(this.data);
      console.log(token);
   }
}

export { WildberriesAPI }