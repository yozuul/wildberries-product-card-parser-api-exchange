(() => {

   const productDetails = {}

   const sizesQuery = '.j-size-list label.j-size'
   const allSizes = queryAll(sizesQuery)

   for(let size of allSizes) {
      if(!size.classList.disable) {

      }
   }


   function query(el) {
      return document.querySelector(el)
   }
   function queryAll(el) {
      return document.querySelectorAll(el)
   }


})()