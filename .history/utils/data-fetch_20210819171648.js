import axios from 'axios'

class Fetch {
   constructor(url) {
      this.url = url
      this.headers = {
         Authorization: `Bearer ${process.env.WD_TOKEN}`,
         'Content-Type': 'application/json'
      }
   }
   getData() {
      console.log(this.headers);
   }
}

const fetchParams = {
   headers: {
      Authorization: `Bearer ${process.env.WD_TOKEN}`,
      'Content-Type': 'application/json'
   }
}

export const fetchData = async (url) => {
   return {
      get: async (data) => {
         if (data) {
            return await axios.get(url, ...data, fetchParams)
         } else {
            console.log(url);
            return await axios.get(url, fetchParams)
         }
      },
      post: async (data) => {
         if (data) {
            response = await axios.post(url, ...data, fetchParams)
         } else {
            response = await axios.post(url, fetchParams)
         }
         console.log(response.data)
         return response.data
      }
   }
}