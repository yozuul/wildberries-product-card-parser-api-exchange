(() => {

   const items = []

   const detailBlockWrapperQuery = '.product-detail__details-wrap section.product-detail__details.details'
   const detailBlockWrapperDomArr = document.querySelectorAll(detailBlockWrapperQuery)

   let detailBlockNumn = 0

   for(let detailDomItem of detailBlockWrapperDomArr) {
      if(!detailDomItem.classList.contains('hide')) {
         detailDomItem.classList.add(`detail_block_${detailBlockNumn}`)
      }
      detailBlockNumn++
      const checkHeader = document.querySelector(`detail_block_${detailBlockNumn}`)
      console.log(`detail_block_${detailBlockNumn}`);
      console.log(checkHeader);
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