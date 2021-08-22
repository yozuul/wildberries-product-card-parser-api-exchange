
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


const parseButtonQuery = '#passCardURL'
const urlPassCardButton = document.querySelector(parseButtonQuery)
const apiURL = 'http://localhost:3000/addCard'

urlPassCardButton.onclick = async () => {
   document.querySelector(`${parseButtonQuery} .parseActive`).classList.add('dn')
   document.querySelector(`${parseButtonQuery} .spinner`).classList.remove('dn')
   urlPassCardButton.setAttribute('disbale', '')
   // urlPassCardButton.classList.remove
   const cardURL = document.querySelector('#cardProductURL').value
   const cardData = await fetchData(apiURL, cardURL)

   document.querySelector(`${parseButtonQuery} .parseActive`).classList.remove('dn')
   document.querySelector(`${parseButtonQuery} .spinner`).classList.add('dn')
   urlPassCardButton.removeAttribute('disbale')

   passDataToFields(cardData)
}

function passDataToFields(data) {
   const field = {
      name: query('#productName'),
      brand: query('#productBrand'),
      price: query('#productPrice'),
   }
   const textArea = {

   }

   for(let input in field) {
      console.log(field[input]);
      field[input].removeAttribute('readonly')
      field[input].value = data[input]
   }

   if(data.details.desc) {
      const textarea = query('#productDesc')
      textarea.removeAttribute('readonly')
      textarea.removeAttribute('readonly')
   }
   // desc: '#productDesc',
   // images: '#productImages',
   // images: query(id.images),
}