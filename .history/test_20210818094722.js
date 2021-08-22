(() => {
   const data = document.querySelectorAll('.swiper .slide__content img')
   for(let item of data) {
      console.log(item.getAttribute('src'));
   }

   // const data = document.querySelector('h1.same-part-kt__header')
   // data.getAttributeNames()
   console.log(data);



})()