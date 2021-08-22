import axios from 'axios'


const fetchParams = {
   headers: {
      Authorization: `Bearer ${process.env.WD_TOKEN}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WD_TOKEN}`
   }
}

export const fetchData = async (url) => {
   console.log(url);
   let response = {}
   return {
      get: async (data) => {
         if (data) {
            response = await axios.get(url, ...data, fetchParams)
         } else {
            response = await axios.get(url, fetchParams)
         }
         console.log(response.data)
         return response.data
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