
const query = (el) => document.querySelector(el)

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
   passDataToFields(cardData)
}

function passDataToFields(data) {


   const id = {
      name: '#productName',
      brand: '#productBrand',
      price: '#productPrice',
      images: '#productImages',
   }
   const field = {
      name: query(id.name),
      brand: query(id.brand),
      price: query(id.price),
      desc: query(id.productDesc)
   }

   for(let input in field) {
      console.log(field[input]);
      field[input].removeAttribute('readonly')
      // field[input].classList.remove('dn')
   }

}