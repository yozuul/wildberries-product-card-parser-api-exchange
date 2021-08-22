import API from '../api'

class DynamicSearch {
   watchField(element) {
      element.oninput = async () => {
         const word = element.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(canFind)
            console.log(isFind.result.data);
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