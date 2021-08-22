export class apiFetch {
   constructor(apiURL, jsonData) {
      this.apiURL = apiURL
      this.jsonData = jsonData
   }

   getData() {
   }

   async axios(data) {
      const common = {
         url: url,
         headers: { 'Content-Type': 'application/json' },
      }

      let json = {}
      if(data) json = { data: JSON.stringify(data) }

      let options = common
      if(data) options = {...options, ...json}

      return {
         get: async (url) => {

            console.log(options);
            // try {
            //    const response = await axios.get('/user?ID=12345');
            //    return response
            // } catch (error) {
            //    console.error(error);
            // }
         }
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