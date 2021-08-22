class FillFields {

   passDataToFields(data) {
      // Основные данные товара
      const commonDataFields = {
         cardProductName: input.cardProductName,
         cardProductBrand: input.cardProductBrand,
         cardProductPrice: input.cardProductPrice
      }
      for(let input in commonDataFields) {
         commonDataFields[input].removeAttribute('readonly')
         commonDataFields[input].value = data[input]
      }

      // Изображения
      if(data.cardProductImages) {
         this.element.productImages_wrapper.classList.remove('dn')
         data.cardProductImages.reverse()
         const imagesBlock = query('#productImages')
         let imgNum = 0
         for(let image of data.cardProductImages) {
            const divTag = `<div class='col-3 imageItem'><img src="${image}"></div>`
            imagesBlock.insertAdjacentHTML('afterbegin', divTag)
            imgNum++
         }
      }
      // Состав
      const detailConsist = data.details.consist
      if(detailConsist) {
         element.productConsist_wrapper.classList.remove('dn')
         input.productConsist.value = detailConsist
      } else {
         element.productConsist_wrapper.classList.add('dn')
      }
      // Описание
      const detailDesc = data.details.desc
      if(detailDesc) {
         textarea.cardProductDesc.removeAttribute('readonly')
         textarea.cardProductDesc.classList.add('max_height_desc')
         textarea.cardProductDesc.value = detailDesc
      }
      // Цвет
      const productColor = data.cardProductColor
      if(productColor) {
         element.productColor_wrapper.classList.remove('dn')
         input.productColor.value = productColor
      } else {
         element.productColor_wrapper.classList.add('dn')
      }
      // Характеристики
      const detailParams = data.details.params
      if(detailParams) {
         element.productParams_wrapper.classList.remove('dn')

         for(let name in detailParams) {
            const paramRow = `<tr><th>${name}</th><td>${detailParams[name]}</td></tr>`
            element.productParams_table.insertAdjacentHTML('afterbegin', paramRow)
         }
      } else {
         element.productParams_wrapper.classList.add('dn')
      }
      // Категория
      const direcoryList = data.extras.direcoryList
      if(direcoryList) {
         let num = 1
         for(let direcory in direcoryList) {
            const dirOptionRow = `<option value="${num}">${direcory}</option>`
            select.productCategory.insertAdjacentHTML('afterbegin', dirOptionRow)
            num++
         }
         element.productExtras.classList.remove('dn')
      }
      // ТВЭНД
      const tvendList = data.extras.tnvedList
      if(tvendList) {
         let num = 1
         for(let tvend of tvendList) {
            const tvendOptionRow = `<option value="${num}">${tvend.tnvedCode}${tvend.description}</option>`
            select.productTnved.insertAdjacentHTML('afterbegin', tvendOptionRow)
            num++
         }
         element.productExtras.classList.remove('dn')
      }

      this.button.saveCard.classList.remove('dn')
      this.toggleSpinner('off')
   }
}