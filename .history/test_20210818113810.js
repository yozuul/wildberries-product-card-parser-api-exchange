(() => {

   const detailBlockWrapper = '.product-detail__details-wrap section.product-detail__details.details'

   console.log(document.querySelectorAll(detailBlockWrapper));
   // if(!document.querySelectorAll)
   const dataHeader = document.querySelectorAll(`${detailBlockWrapper} .details__header`)


   // const dataHeader = document.querySelectorAll(`${detailBlockWrapper} .details__header`)

   // console.log(data);
   const items = []
   for(let item of data) {
      // items.push(item.getAttribute('src'))
   }
   // console.log(items);
   // const data = document.querySelector('h1.same-part-kt__header')
   // data.getAttributeNames()
   // console.log(data);



})()