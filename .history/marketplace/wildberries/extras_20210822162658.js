import {} from 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import { WildberriesAPI } from '../../api/wildberries'
import { Fetch } from '../../utils'

class WildberriesExtras {
   constructor(parseResult) {
      this.parseResult = parseResult
   }

   async cardData() {
      const API = new WildberriesAPI()
      const data = this.parseResult
      const uuidGen = uuidv4()

      const direcoryList = await API.getdirectoryList(data.cardProductName)
      const tnvedList = await API.getTnvedList(data.cardProductName)
      const barcode = await API.getBarCode(uuidGen)

      return {
         direcoryList: direcoryList,
         tnvedList: tnved.data,
         barcode: tnvedList,
         uuid: uuidGen,
      }
   }
}

export { WildberriesExtras }