import { WildberriesAPI } from '../marketplace/wildberries'

class SaveCard {
   apiConnect(data) {
      new WildberriesAPI(data).connect()
      return {data: true}
   }
}

export { SaveCard }