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
            this.checkResult(isFind.result)
         }
      }
      element.onblur = () => {
         hide(element.searchReulstList)
      }
   }

   checkResult(searchResult) {
      console.log(searchResult.data);
      if(searchResult.data) {
         show(element.searchReulstList)
//          for (const item in object) {
//
//          }
      } else {
         hide(element.searchReulstList)
      }
   }

   checkLettersNumber(word) {
      if(word.split('').length < 3) {
         hide(element.searchReulstList)
         return false
      } else {
         return true
      }
   }
}

export { DynamicSearch }