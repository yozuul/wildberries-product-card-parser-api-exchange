(() => {

   const productDetails = {}

   const consistQuery = '[data-link="text{:productCard.consist}"]'
   const descriptionQuery = '[data-link="text{:productCard.description}"]'

   const consistData = query(consistQuery)
   const descriptioData = query(descriptionQuery)

   if(consistData.innerText) {
      productDetails.consist = consistData.innerText
   }
   if(descriptioData.innerText) {
      productDetails.description = descriptioData.innerText
   }

   const productParams = queryAll('.product-params__table .product-params__row')

   if(productParams) {
      let rowNum = 0
      productDetails.params = {}
      for(let param of productParams) {
         const rowClass = `rowNum_${rowNum}`
         param.classList.add(rowClass)

         const paramName = query(`.${rowClass} th`).innerText
         const paramValue = query(`.${rowClass} td`).innerText

         productDetails.params[paramName] = paramValue
         rowNum++
      }
   }


   function query(el) {
      return document.querySelector(el)
   }
   function queryAll(el) {
      return document.querySelectorAll(el)
   }


})()