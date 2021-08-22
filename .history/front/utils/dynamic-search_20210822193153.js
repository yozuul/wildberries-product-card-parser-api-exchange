class DynamicSearch {

   watchField(element) {
      const i
      element.oninput = () => {
         const word = element.value
         const canFind = this.checkLettersNumber(word)
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