import { WildberriesAPI } from '../marketplace/wildberries'

class SaveCard {
   apiConnect(data) {
      console.log(data);

      new WildberriesAPI(data).test()
      return {data: true}
   }
}

export { SaveCard }