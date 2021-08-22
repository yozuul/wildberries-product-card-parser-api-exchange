const url = 'http://localhost:3000/fetchData'

const fetchData = async (url, data) => {
   console.log(url);
   try {
      const response = await fetch(url, {
         method: 'POST',
         body: JSON.stringify('data'),
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

urlPassCardButton.addEventListener('click', fetchData)