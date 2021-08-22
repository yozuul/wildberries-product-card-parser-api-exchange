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

      // const tnvedList = await API.getTnvedList(data.cardProductName)
      // const barcode = await API.getBarCode(uuidGen)
      const tnvedList = true
      const barcode = true

      return {
         direcoryList: await API.getDirectoryList(data.cardProductName),
         tnvedList: tnvedList,
         barcode: barcode,
         uuid: uuidGen,
      }
   }
}

export { WildberriesExtras }