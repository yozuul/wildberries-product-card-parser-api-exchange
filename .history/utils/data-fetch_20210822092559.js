import axios from 'axios'

class Fetch {
   constructor(url) {
      this.url = url
      this.jsonrpc = { jsonrpc: '2.0' }
      this.options = {
         headers: {
            Authorization: `Bearer ${process.env.WD_TOKEN}`,
            'Content-Type': 'application/json'
         }
      }
   }

   async getData(data) {
      if (data) {
         const response = {...data, ...this.jsonrpc}
         return await axios.get(this.url, response, this.options)
      } else {
         return await axios.get(this.url, this.options)
      }
   }

   async postData(data) {
      if (data) {
         const response = {...data, ...this.jsonrpc}
         return await axios.post(this.url, response, this.options)
      } else {
         return await axios.post(this.url, this.options)
      }
   }
}

export { Fetch }