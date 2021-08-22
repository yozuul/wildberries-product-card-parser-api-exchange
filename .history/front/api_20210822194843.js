
class API {

   get apiURL() {
      const apiHost = 'http://localhost:3000'
      return {
         parseCard: `${apiHost}/parseCard`,
         searchCategory: `${apiHost}/searchCategory`,
         addCard: `${apiHost}/addCard`,
      }
   }

   async parseCard(data) {
      const parseCard = this.apiURL.parseCard
      const response = await this.fetch(data).post(parseCard)
      return this.requestResult(response, parseCard)
   }

   async searchCategory(data) {
      const searchCategory = this.apiURL.searchCategory
      const response = await this.fetch(data).post(searchCategory)
      console.log(response);
      return this.requestResult(response, searchCategory)
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

   requestResult(response, apiURL) {
      if(response.status == 200) {
         return response.json()
      } else {
         console.log(`Ошибка получения данных по API: ${apiURL}`)
         return
      }
   }
}

export default new API()