(() => {
   const data = document.querySelectorAll('.slide__content img')
   for(let item of data) {
      console.log(item.innerHTML);
   }

   // const data = document.querySelector('h1.same-part-kt__header')
   // data.getAttributeNames()
   console.log(data);



})()