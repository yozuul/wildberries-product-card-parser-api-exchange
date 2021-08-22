
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

   const inputs = {
      name: '#productName',
      brand: '#productBrand',
      price: '#productPrice',
      desc: '#productDesc',
   }
   const field = {
      name: query(inputs.name),
      brand: query(inputs.brand),
      price: query(inputs.price),
      desc: query(inputs.desc)
   }

   for(let input in field) {
      console.log(field[input]);
      field[input].removeAttribute('readonly')
      field[input].value = data[input]
      // field[input].classList.remove('dn')
   }

   // images: '#productImages',
   // images: query(id.images),
}