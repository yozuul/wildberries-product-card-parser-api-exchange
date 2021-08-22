import axios from 'axios'

class Fetch {
   constructor(url) {
      this.url = url
      this.fetchParams = {
         headers: {
            Authorization: `Bearer ${process.env.WD_TOKEN}`,
            'Content-Type': 'application/json'
         }
      }
   }

   async getData(data) {
      if (data) {
         const response = {...data, ...{jsonrpc: "2.0"}}
         return await axios.get(this.url, response, this.fetchParams)
      } else {
         return await axios.get(this.url, this.fetchParams)
      }
   }

   async postData(data) {
      if (data) {
         const response = {...data, ...{jsonrpc: "2.0"}}
         return await axios.post(this.url, response, this.fetchParams)
      } else {
         return await axios.post(this.url, this.fetchParams)
      }
   }
}

export { Fetch }