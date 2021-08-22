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

      const direcoryList = await API.getDirectoryList(data.cardProductName)
      const tnvedList = await API.getTnvedList(data.cardProductName)
      console.log(tnvedList);
      // const barcode = await API.getBarCode(uuidGen)
      const barcode = true

      return {
         direcoryList: direcoryList,
         tnvedList: tnvedList,
         barcode: barcode,
         uuid: uuidGen,
      }
   }
}

export { WildberriesExtras }