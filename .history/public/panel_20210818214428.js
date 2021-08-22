const fetchURL = 'http://localhost:3000/fetchData'

const fetchData = async (data) => {
   try {
      const response = await fetch(fetchURL, {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      console.log('Data send:', response);
   } catch (error) {
      console.error('Error fetching:', error);
   }
}

const urlPassCardButton = document.querySelector('#passCardURL')

urlPassCardButton.onclick = () => {
   const url = document.querySelector('#cardProductURL').value
   fetchData(url)
 }