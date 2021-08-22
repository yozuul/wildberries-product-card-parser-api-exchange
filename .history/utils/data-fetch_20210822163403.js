import {} from 'dotenv/config'
import axios from 'axios'

class Fetch {
   constructor(url) {
      this.url = url
   }


   async getData(data) {
      const options = {
         headers: this.headers
      }
      axios.get(this.url, options)
   }

   async postData(data) {
      if (data) {
         const response = {...data, ...{ jsonrpc: '2.0' }}
         return await axios.post(this.url, response, this.options)
      } else {
         return await axios.post(this.url, this.options)
      }
   }

   wildberriesHeaders() {
      return {
         Authorization: `Bearer ${process.env.WD_TOKEN}`,
         'Content-Type': 'application/json'
      }
   }
}

export { Fetch }