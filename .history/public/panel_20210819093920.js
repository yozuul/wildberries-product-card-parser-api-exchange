class Panel {
   constructor(api) {
      this.api = api
   }

   waitParse() {
      const parseButtonQuery = '#passCardURL'
      const urlPassCardButton = this.query(parseButtonQuery)
      this.parseButtonClick(parseButtonQuery, urlPassCardButton)

      const field = {
         name: this.query('#productName'),
         brand: this.query('#productBrand'),
         price: this.query('#productPrice'),
      }
      const params = {
         consist: this.query('#productConsist'),
         desc: this.query('#productDesc')
      }

      this.sendData(this.jsonData(), field, params)
   }

   sendData(data, field, params) {
      let newData = this.jsonData()
      data.name = field.name.value
      data.brand = field.brand.value
      data.price = field.price.value
      data.details.consist = params.consist.value
      data.details.desc = params.desc.value

      const saveCardButton = this.query('#saveCard')
      console.log(data);
      saveCardButton.onclick = () => {
         this.fetchData(this.api.saveCard, data)
      }
   }

   async fetchData(apiURL, data) {
      try {
         const response = await fetch(apiURL, {
            method: 'POST',
            body: JSON.stringify({ data: 'test' }),
            headers: { 'Content-Type': 'application/json' }
         })
         // return await response.json()
      } catch (error) {
         console.error('Error fetching:', error);
      }
   }

   passDataToFields(data) {
      // Определение полей
      const field = {
         name: this.query('#productName'),
         brand: this.query('#productBrand'),
         price: this.query('#productPrice'),
      }
      const params = {
         consist: this.query('#productConsist'),
         desc: this.query('#productDesc')
      }
      // Добавление данных в поля
      // Основные данные товара
      for(let input in field) {
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
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }
         // id='imgNum_${imgNum}'
      }
      // Описание
      const detailDesc = data.details.desc
      if(detailDesc) {
         params.desc.removeAttribute('readonly')
         params.desc.value = detailDesc
      }
      // Состав
      const detailConsist = data.details.consist
      if(detailConsist) {
         this.query('.productConsistDiv').classList.remove('dn')
         params.consist.value = detailConsist
      } else {
         this.query('.productConsistDiv').classList.add('dn')
      }
      // Характеристики
      const detailParams = data.details.params
      if(detailParams) {
         const paramsTable = this.query('#productParamsTable')
         const paramsWrapper = this.query('#productParamsDiv')

         paramsWrapper.classList.remove('dn')
         for(let name in detailParams) {
            const paramRow = `<tr><th>${name}</th><td>${detailParams[name]}</td></tr>`
            paramsTable.insertAdjacentHTML('afterbegin', paramRow)
         }
      } else {
         paramsWrapper.classList.add('dn')
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

   jsonData() {
      return {
         name: 'Худи',
         brand: 'Raven.',
         price: '2068',
         images: [
           'https://images.wbstatic.net/large/new/13240000/13243476-1.jpg',
           'https://images.wbstatic.net/large/new/13240000/13243476-2.jpg',
           'https://images.wbstatic.net/large/new/13240000/13243476-3.jpg',
           'https://images.wbstatic.net/large/new/13240000/13243476-4.jpg',
           'https://images.wbstatic.net/large/new/13240000/13243476-5.jpg',
           'https://images.wbstatic.net/large/new/13240000/13243476-6.jpg'
         ],
         details: {
           consist: 'хлопок 80%, полиэстер 20%',
           desc: 'Оверсайз худи марки RAVEN. Толстовка свободного силуэта, с увеличенной проймой, шириной рукавов и спущенной плечевой линией. Худи выполено из качественного трикотажного полотна "френч терри" с начесом. Оснащена накладным карманом и эластичными поясом и манжетами. Данная модель может стать отличной базой для оверсайз стиля.',
           params: {
             'Покрой': 'оверсайз',
             'Фактура материала': 'футер',
             'Декоративные элементы': 'без элементов',
             'Уход за вещами': 'отбеливание запрещено',
             'Особенности модели': 'нет',
             'Назначение': 'повседневная',
             'Длина изделия по спинке': '70 см',
             'Страна производства': 'Россия',
             'Комплектация': 'худи',
             'Пол': 'Женский'
           }
         }
       }
   }

   query(el) { return document.querySelector(el) }
   queryAll(el) { return document.querySelectorAll(el) }
}

const api = {
   addCard: 'http://localhost:3000/addCard',
   saveCard: 'http://localhost:3000/saveCard',
}

new Panel(api).waitParse()