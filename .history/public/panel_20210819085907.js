class Panel {
   constructor(api) {
      this.api = api
   }

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
      const params = {
         consist: this.query('#productConsist'),
         desc: this.query('#productDesc')
      }
      // Основные данные товара
      for(let input in field) {
         console.log(field[input]);
         field[input].removeAttribute('readonly')
         field[input].value = data[input]
      }
      // Изображения
      if(data.images) {
         data.images.reverse()
         const imageWrapperBlock = this.query('.productImagesDiv')
         imageWrapperBlock.classList.remove('dn')
         const imagesBlock = this.query('#productImages')

         let imgNum = 0
         for(let image of data.images) {
            const divTag = `<div id='imgNum_${imgNum}' class='col-4 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }
      }
      // Описание
      if(data.details.desc) {
         params.desc.removeAttribute('readonly')
         params.desc.value = data.details.desc
      }
      // Состав
      if(data.details.consist) {
         this.query('.productConsistDiv').classList.remove('dn')
         params.consist.value = data.details.consist
      } else {
         this.query('.productConsistDiv').classList.add('dn')
      }


   }

   // .classList.add('dn')

   parseButtonClick(parseButtonQuery, urlPassCardButton) {
      // Кнопка парсинга
      const inputCardURL = this.query('#cardProductURL').value
      const parseInactive = this.query(`${parseButtonQuery} .parseInactive`)
      const parseActive = this.query(`${parseButtonQuery} .parseActive`)

      // Кнопка добавления
      const saveCardButton = this.query('#saveCard')
      const saveCardInactive = this.query('#saveCardInactive')
      const saveCardActive = this.query('#saveCardActive')

      urlPassCardButton.onclick = async () => {
         // Кнопка сохранения
         saveCardButton.classList.add('dn')
         // Включение спиннера парсинга
         parseInactive.classList.add('dn')
         urlPassCardButton.setAttribute('disbale', '')
         parseActive.classList.remove('dn')
         // Получение данных
         const cardData = await this.fetchData(this.api.addCard, inputCardURL)
         // Отключение спиннера парсинга
         parseActive.classList.add('dn')
         urlPassCardButton.removeAttribute('disbale', '')
         parseInactive.classList.remove('dn')
         // Показываем кнопку добавления
         saveCardButton.classList.remove('dn')
         // Пуш данных в поля
         this.passDataToFields(cardData)
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