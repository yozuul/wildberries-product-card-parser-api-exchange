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
      return  await response.json()
   } catch (error) {
      console.error('Error fetching:', error);
   }
}



const urlPassCardButton = document.querySelector('#passCardURL')
const apiURL = 'http://localhost:3000/addCard'

urlPassCardButton.onclick = async () => {
   const cardURL = document.querySelector('#cardProductURL').value
   const cardData = await fetchData(apiURL, cardURL)
}


function passDataToFields(data) {
   const fields = {
      name: '#productName',
      brand: '#productBrand',
      price: '#productPrice',
      images: '#productImages',
   }
}

function query(el) { return document.querySelector(el) }
