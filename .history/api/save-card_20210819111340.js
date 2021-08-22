import { WildberriesAPI } from '../marketplace'

class SaveCard {
   apiConnect(data) {
      new WildberriesAPI(data).test()
      return {data: true}
   }
}

export { SaveCard }