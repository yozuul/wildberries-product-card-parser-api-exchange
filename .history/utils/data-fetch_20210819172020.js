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
         return await axios.get(this.url, ...data, this.fetchParams)
      } else {
         return await axios.get(this.url, this.fetchParams)
      }
   }

   async postData(data) {
      if (data) {
         return await axios.post(this.url, ...data, this.fetchParams)
      } else {
         return await axios.post(this.url, this.fetchParams)
      }
   }
}

export { Fetch }