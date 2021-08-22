(() => {

   const productDetails = {}

   const sizesQuery = '.j-size-list .sizes-list__item'
   const allSizes = queryAll(sizesQuery)

   for(let size of allSizes) {
      console.log(size);
   }


   function query(el) {
      return document.querySelector(el)
   }
   function queryAll(el) {
      return document.querySelectorAll(el)
   }


})()