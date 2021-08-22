import { WildberriesAPI } from '../marketplace/wildberries'

class SaveCard {
   apiConnect(data) {
      new WildberriesAPI(data).request()
      return {data: true}
   }
}

export { SaveCard }