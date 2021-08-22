import { element, input, select, textarea} from '../queries'
import { query, show, hide, queryAll } from './helpers'
import API from '../api'

class DynamicSearch {
   watchField(searchField) {
      searchField.oninput = async () => {
         const word = searchField.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(word)
            this.checkResult(isFind.result)
         }
      }
      searchField.onblur = async () => {
         hide(element.searchReulstList)
      }
      searchField.onfocus = () => {
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(word)
            this.checkResult(isFind.result)
         }
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