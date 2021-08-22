
class API {
   constructor(apiURL) {
      this.apiURL = apiURL
   }

   async parseCard(url) {
      return await this.fetch(url).post()
   }

   fetch(data) {

      let contentType = 'text/plain; charset=UTF-8'
      if(typeof data == 'object') contentType = 'application/json; charset=utf-8'

      const common = {
         headers: { 'Content-Type': contentType },
      }

      let body = {}
      if(data) body = { body: data }

      let options = common
      if(data) options = {...options, ...body}

      return {
         post: () => {
            console.log({ ...options, ...{ method: 'POST' }});
            // try {
            //    const response = await fetch(this.apiURL, { ...options, method: 'POST' })
            //    return await response
            // } catch (error) {
            //    console.error('Error fetching:', error);
            // }
         }
      }


      // {
      //    method: 'POST',
      //    body: JSON.stringify(jsonData),
      //    headers: { 'Content-Type': 'application/json' }
      // }

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

   apiURL() {
      const apiHost = 'http://localhost:3000'
      return {
         parseCard: `${apiHost}/parseCard`,
         getAdditionalCardData: `${apiHost}/getAdditionalCardData`,
         addCard: `${apiHost}/addCard`,
      }
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

export default new API()