import axios from 'axios'

const fetchParams = {
   headers: {
      Authorization: `Bearer ${process.env.WD_TOKEN}`,
      'Content-Type': 'application/json',
   }
}

export const fetchData = async (url, data) => {
   let response = {}
   return {
      get: async () => {
         if (data) {
            response = await axios.get(url, ...data, fetchParams)
         } else {
            response = await axios.get(url, fetchParams)
         }
         console.log(response.data)
         return response.data
      },
      post: async () => {
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