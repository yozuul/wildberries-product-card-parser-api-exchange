class DynamicSearch {

   watchField(element) {
      element.oninput = () => {
         console.log(element.value);
      }
   }
}

export { DynamicSearch }