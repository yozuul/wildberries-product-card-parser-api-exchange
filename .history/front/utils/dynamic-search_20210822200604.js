import { query, show, hide, queryAll } from './helpers'
import API from '../api'

class DynamicSearch {
   watchField(element) {
      element.oninput = async () => {
         const word = element.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(word)
            this.checkResult(isFind)
         }
      }
   }

   checkResult(searchResult) {
      if(searchResult.data) {
         this.checkPopupVisible(true)
         for (const item in object) {

         }
      }
   }

   checkPopupVisible(status) {
      if(status) {

      }
   }

   checkLettersNumber(word) {
      if(word.split('').length < 2) {
         return false
      } else {
         return true
      }
   }
}

export { DynamicSearch }