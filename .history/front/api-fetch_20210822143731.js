export class apiFetch {
   constructor(apiURL) {
      this.apiURL = apiURL
   }

   async getData(data) {
      return await this.axios(data).get()
   }

   axios(data) {
      const common = {
         headers: { 'Content-Type': 'application/json' },
      }

      let json = {}
      if(data) json = { body: JSON.stringify(data) }

      let options = common
      if(data) options = {...options, ...json}

      return {
         post: () => {
            // console.log({ ...options, ...{ method: 'POST' }});
            // try {
            //    const response = await fetch(this.apiURL, { ...options, method: 'POST' })
            //    return await response
            // } catch (error) {
            //    console.error('Error fetching:', error);
            // }
         }
      }


      {
         method: 'POST',
         body: JSON.stringify(jsonData),
         headers: { 'Content-Type': 'application/json' }
      }

      // axios.post('/post/server', JSON.parse(data))
      // .then(function (res) {
      //    output.className = 'container';
      //    output.innerHTML = res.data;
      // })
      // .catch(function (err) {
      //    output.className = 'container text-danger';
      //    output.innerHTML = err.message;
      // });

   }
}

// export const apiFetch = async (apiURL, jsonData) => {
//    try {
//       const response = await fetch(apiURL, {
//          method: 'POST',
//          body: JSON.stringify(jsonData),
//          headers: { 'Content-Type': 'application/json' }
//       })
//       return await response.json()
//    } catch (error) {
//       console.error('Error fetching:', error);
//    }
// }