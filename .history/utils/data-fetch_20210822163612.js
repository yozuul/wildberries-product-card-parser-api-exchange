import {} from 'dotenv/config'
import axios from 'axios'

class Fetch {
   constructor(url) {
      this.url = url
   }

   async getData() {
      axios.get(this.url, this.header)
   }

   async postData(data) {
      if (data) {
         const response = {...data, ...{ jsonrpc: '2.0' }}
         return await axios.post(this.url, response, this.options)
      } else {
         return await axios.post(this.url, this.options)
      }
   }

   get header() {
      if(this.url.split('wildberries')[1]) {
         return this.wildberriesHeaders
      }
   }

   get wildberriesHeader() {
      return {
         Authorization: `Bearer ${process.env.WD_TOKEN}`,
         'Content-Type': 'application/json'
      }
   }
}

export { Fetch }