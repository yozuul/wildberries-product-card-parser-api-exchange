function query(el) {
   return document.querySelector(el)
}

const fetchData = async (apiURL, cardURL) => {
   try {
      const response = await fetch(apiURL, {
         method: 'POST',
         body: JSON.stringify({
            cardURL: cardURL
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      return await response.json()
   } catch (error) {
      console.error('Error fetching:', error);
   }
}



const urlPassCardButton = document.querySelector('#passCardURL')
const apiURL = 'http://localhost:3000/addCard'

urlPassCardButton.onclick = async () => {
   const cardURL = document.querySelector('#cardProductURL').value
   const cardData = await fetchData(apiURL, cardURL)
   // passDataToFields(cardData)
}

console.log(query('#productName'));
// function passDataToFields(data) {
//    const query = {
//       name: '#productName',
//       brand: '#productBrand',
//       price: '#productPrice',
//       images: '#productImages',
//    }
//    const field = {
//       name: query(query.name),
//       brand: query(query.brand),
//       price: query(query.price),
//       images: query(query.images),
//    }
//
//    for(let input in field) {
//       console.log(field[input]);
//       field[input].classList.remove('dn')
//    }
//
// }