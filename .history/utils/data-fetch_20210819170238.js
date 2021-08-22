import axios from 'axios'

const headers = {
   Authorization: `Bearer ${process.env.WD_TOKEN}`,
   'Content-Type': 'application/json',
}

export const fetchData = async (type, data) => {
   try {
      let response = {}
      if (type == 'get') {
         if (data) {
            response = await axios.get(url, ...data, {
               headers: headers
            })
         } else {
            response = await axios.get(url, {
               headers: headers
            })
         }
         console.log(response.data)
         return response.data
      }
      if (type == 'post') {
         if (data) {
            response = await axios.post(url, ...data, {
               headers: headers
            })
         } else {
            response = await axios.post(url, {
               headers: headers
            })
         }
         console.log(response.data)
         return response.data
      }
   } catch (error) {
      console.error(error);
   }
}