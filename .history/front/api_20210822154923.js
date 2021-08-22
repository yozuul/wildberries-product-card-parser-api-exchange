
class API {

   async parseCard(data) {
      const res = await this.fetch(data).post(this.apiURL.parseCard)
      return await res.json()
   }


   get apiURL() {
      const apiHost = 'http://localhost:3000'
      return {
         parseCard: `${apiHost}/parseCard`,
         getAdditionalCardData: `${apiHost}/getAdditionalCardData`,
         addCard: `${apiHost}/addCard`,
      }
   }

   fetch(data) {

      let contentType = 'text/plain; charset=UTF-8'
      if(typeof data == 'object') contentType = 'application/json; charset=utf-8'

      const common = {
         headers: { 'Content-Type': contentType }
      }

      let body = {}
      if(data) body = { body: data }

      let options = common
      if(data) options = {...options, ...body}

      return {
         post: async (url) => {
            const request = { ...options, ...{ method: 'POST' }}
            try {
               return await fetch(url, request)
            } catch (error) {
               console.error('Error fetching:', error);
            }
         },
         get: async (url) => {
            try {
               return await fetch(url)
            } catch (error) {
               console.error('Error fetching:', error);
            }
         }
      }
   }
}

export default new API()