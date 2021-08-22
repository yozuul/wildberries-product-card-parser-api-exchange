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
         for (const item in object) {

         }
      }
   }

   ifPopupDisplay() {

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