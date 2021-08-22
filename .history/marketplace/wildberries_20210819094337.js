import {} from 'dotenv/config'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test() {
      console.log(this.data);
   }
}

export { WildberriesAPI }