(() => {
   const data = document.querySelectorAll('.swiper-wrapper .slide__content img')
   const items = []
   for(let item of data) {
      items.push(item.getAttribute('src'))
   }
   console.log(items);
   // const data = document.querySelector('h1.same-part-kt__header')
   // data.getAttributeNames()
   console.log(data);



})()