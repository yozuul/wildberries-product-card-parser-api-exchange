import { element, input, select, textarea} from '../queries'
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
         console.log(element.searchReulstList);
         show(element.searchReulstList)
         for (const item in object) {

         }
      } else {
         hide(element.searchReulstList)
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