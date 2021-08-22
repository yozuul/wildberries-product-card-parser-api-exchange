import { API } from '../api'

class DynamicSearch {

   watchField(element) {
      const API = new API()
      element.oninput = async () => {
         const word = element.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            return await API.searchCategory(canFind)
         }
      }
   }
   checkLettersNumber(word) {
      if(word.split('').length < 3) {
         return false
      } else {
         return true
      }
   }
}

export { DynamicSearch }