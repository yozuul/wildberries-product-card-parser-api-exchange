import { API } from '../api'

class DynamicSearch {

   async watchField(element) {
      const API = new API()
      element.oninput = () => {
         const word = element.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            return await API.searchCategory(canFind)
         }
         console.log(canFind);
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