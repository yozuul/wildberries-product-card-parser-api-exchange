(() => {

   const items = []

   const detailBlockWrapperQuery = '.product-detail__details-wrap section.product-detail__details.details'
   const detailBlockWrapperDomArr = document.querySelectorAll(detailBlockWrapperQuery)

   for(let detailDomItem of detailBlockWrapperDomArr) {
      console.log(detailDomItem);
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