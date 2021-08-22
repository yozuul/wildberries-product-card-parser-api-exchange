
class API {

   async parseCard(data) {
      const response = await this.fetch(data).post(this.apiURL.parseCard)
      if(response.status == 200) {
         return response.json()
      } else {
         console.log(`Ошибка получения данных по API ${this.apiURL.parseCard}`);
      }
   }

   async parseCard(data) {
      const response = await this.fetch(data).post(this.apiURL.parseCard)
      if(response.status == 200) {
         return response.json()
      } else {
         console.log(`Ошибка получения жанных по API ${this.apiURL.parseCard}`);
      }
   }


   get apiURL() {
      const apiHost = 'http://localhost:3000'
      return {
         parseCard: `${apiHost}/parseCard`,
         searchCategory: `${apiHost}/searchCategory`,
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
               console.error(error);
               console.error('Error POST:', url);
            }
         },
         get: async (url) => {
            try {
               return await fetch(url)
            } catch (error) {
               console.error(error);
               console.error('Error GET:', url);
            }
         }
      }
   }
}

export default new API()