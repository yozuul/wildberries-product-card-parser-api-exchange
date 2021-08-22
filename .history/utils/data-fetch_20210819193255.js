import axios from 'axios'

class Fetch {
   constructor(url) {
      this.url = url
      this.jsonrpc = { jsonrpc: "2.0" }
      this.fetchParams = {
         headers: {
            Authorization: `Bearer ${process.env.WD_TOKEN}`,
            'Content-Type': 'application/json'
         }
      }
   }

   async getData(data) {
      if (data) {
         const response = {...data, ...this.jsonrpc}
         return await axios.get(this.url, response, this.fetchParams)
      } else {
         return await axios.get(this.url, this.fetchParams)
      }
   }

   async postData(data) {
      if (data) {
         const response = {...data, ...this.jsonrpc}
         return await axios.post(this.url, response, this.fetchParams)
      } else {
         return await axios.post(this.url, this.fetchParams)
      }
   }
}

export { Fetch }