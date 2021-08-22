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

   let rowNum = 0
   if(productParams) {
      for(let param of productParams) {
         const rowClass = `rowNum_${rowNum}`
         param.classList.add(rowClass)

         const paramName = query(`.${rowClass} th`).innerText
         console.log(paramName);
         rowNum++
      }
   }

//    const detailBlockWrapperQuery = '.product-detail__details-wrap section.product-detail__details.details'
//    const detailBlockWrapperDomArr = queryAll(detailBlockWrapperQuery)
//
//    let detailBlockNumn = 0
//
//    for(let detailDomItem of detailBlockWrapperDomArr) {
//
//       if(!detailDomItem.classList.contains('hide')) {


         // detailDomItem.classList.add(`detail_block_${detailBlockNumn}`)
         // const detailBlockClass = `.detail_block_${detailBlockNumn}`

         // const checkHeader = query(`${detailBlockClass}`).innerHTML
         //
         // if(checkHeader) {
         //    if(checkHeader == 'Состав')
         //    items.consistText = query(`${detailBlockClass} `)
         // }

         // console.log(detailBlockClass);
         // console.log(checkHeader);
   //    }
   //    detailBlockNumn++
   // }


   function query(el) {
      return document.querySelector(el)
   }
   function queryAll(el) {
      return document.querySelectorAll(el)
   }
   // if(!document.querySelectorAll)
   // const dataHeader = document.querySelectorAll(`${detailBlockWrapper} .details__header`)


   // const dataHeader = document.querySelectorAll(`${detailBlockWrapper} .details__header`)

   // console.log(data);

   // for(let item of dataHeader) {
      // items.push(item.getAttribute('src'))
   // }
   // console.log(items);
   // const data = document.querySelector('h1.same-part-kt__header')
   // data.getAttributeNames()
   // console.log(data);



})()