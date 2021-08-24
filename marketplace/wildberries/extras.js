import { v4 as uuidv4 } from 'uuid'
import { WildberriesAPI } from '../../api/wildberries'

class WildberriesExtras {
   constructor(parseResult) {
      this.parseResult = parseResult
   }

   async cardData() {
      const API = new WildberriesAPI()
      const data = this.parseResult
      const uuidGen = uuidv4()
      const pattern = data.productName.split(' ')[0]
      const direcoryList = await API.getDirectoryList(pattern)
      return {
         direcoryList: direcoryList,
         uuid: uuidGen,
      }
   }
}

export { WildberriesExtras }