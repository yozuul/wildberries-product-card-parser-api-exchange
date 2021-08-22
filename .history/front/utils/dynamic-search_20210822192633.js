class DynamicSearch {

   watchField(element) {
      element.onchange = () => {
         console.log(element.value);
      }
   }
}

export { DynamicSearch }