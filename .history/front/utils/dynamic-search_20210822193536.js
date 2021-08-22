import { WildberriesAPI } from '../../api/wildberries'

class DynamicSearch {

   watchField(element) {
      element.oninput = () => {
         const word = element.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            return await
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