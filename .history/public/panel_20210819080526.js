class Panel {

   waitParse() {
      const parseButtonQuery = '#passCardURL'
      const urlPassCardButton = this.query(parseButtonQuery)
      this.parseButtonClick(parseButtonQuery, urlPassCardButton)
   }

   passDataToFields(data) {
      const field = {
         name: this.query('#productName'),
         brand: this.query('#productBrand'),
         price: this.query('#productPrice'),
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

   // .classList.add('dn')

   parseButtonClick(parseButtonQuery, urlPassCardButton) {
      const parseInactive = this.query(`${parseButtonQuery} .parseInactive`)
      const parseActive = this.query(`${parseButtonQuery} .parseActive`)

      console.log(parseInactive);
      console.log(parseActive);
      urlPassCardButton.onclick = async () => {
         // parseActive.classlist.add('dn')
         // urlPassCardButton.setAttribute.add('disbale', '')
         // parseInactive.classlist.remove('dn')
//          document.querySelector(`${parseButtonQuery} .spinner`).classList.remove('dn')
//          urlPassCardButton.setAttribute('disbale', '')
//          // urlPassCardButton.classList.remove
//          const cardURL = document.querySelector('#cardProductURL').value
//          const cardData = await fetchData(this.api.addCard, cardURL)
//
//          document.querySelector(`${parseButtonQuery} .parseActive`).classList.remove('dn')
//          document.querySelector(`${parseButtonQuery} .spinner`).classList.add('dn')
//          urlPassCardButton.removeAttribute('disbale')
//
//          passDataToFields(cardData)
      }

   }

   async fetchData(apiURL, cardURL) {
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

   query(el) { return document.querySelector(el) }
   queryAll(el) { return document.querySelectorAll(el) }
}

const api = {
   addCard: 'http://localhost:3000/addCard'
}

new Panel(api).waitParse()