class API {

   get apiURL() {
      const apiHost = 'http://localhost:3000'
      return {
         parseCard: `${apiHost}/parseCard`,
         createCard: `${apiHost}/createCard`,
         searchCategory: `${apiHost}/searchCategory`,
         searchFeautures: `${apiHost}/searchFeautures`,
         searchTnved: `${apiHost}/searchTnved`,
         genBarcodes: `${apiHost}/genBarcodes`,
         saveToken: `${apiHost}/saveToken`,
      }
   }

   async saveToken(data) {
      const saveToken = this.apiURL.saveToken
      const response = await this.fetch(data).post(saveToken)
      return {save: 'ok'}
      // return await this.requestResult(response, saveToken)
   }
   async searchFeautures(data) {
      const searchFeautures = this.apiURL.searchFeautures
      const response = await this.fetch(data).post(searchFeautures)
      return await this.requestResult(response, searchFeautures)
   }
   async searchCategory(data) {
      const searchCategory = this.apiURL.searchCategory
      const response = await this.fetch(data).post(searchCategory)
      return this.requestResult(response, searchCategory)
   }
   async searchTnved(data) {
      const searchTnved = this.apiURL.searchTnved
      const response = await this.fetch(data).post(searchTnved)
      return this.requestResult(response, searchTnved)
   }
   async parseCard(data) {
      const parseCard = this.apiURL.parseCard
      const response = await this.fetch(data).post(parseCard)
      return this.requestResult(response, parseCard)
   }
   async createCard(data) {
      const createCard = this.apiURL.createCard
      const response = await this.fetch(JSON.stringify(data)).post(createCard)
      return this.requestResult(response, createCard)
   }
   async genBarcodes(quantity) {
      const genBarcodes = this.apiURL.genBarcodes
      const response = await this.fetch(quantity).post(genBarcodes)
      return this.requestResult(response, genBarcodes)
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