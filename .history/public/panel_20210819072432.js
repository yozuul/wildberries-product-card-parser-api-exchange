const fetchData = async (apiURL, cardURL) => {
   try {
      const response = fetch(apiURL, {
         method: 'POST',
         body: JSON.stringify({
            cardURL: cardURL
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      console.log(await response.json);
      // console.log('Data send:', response);
   } catch (error) {
      console.error('Error fetching:', error);
   }

}

const urlPassCardButton = document.querySelector('#passCardURL')
const apiURL = 'http://localhost:3000/addCard'

urlPassCardButton.onclick = () => {
   const cardURL = document.querySelector('#cardProductURL').value
   fetchData(apiURL, cardURL)
}