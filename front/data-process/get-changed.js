import API from '../services/api'
import { element, input, select, textarea } from '../data-process/queries'

// СОБИРАЕМ ОТРЕДАКТИРОВАННЫЕ В ПАНЕЛИ ДАННЫЕ

class ChangedData {

   async collect() {
      const sizes = this.sizes()
      const sizeNum = Object.keys(sizes).length
      let barcodeNums = 1
      if(sizeNum > 0) {
         barcodeNums = sizeNum
      }
      return {
         inputsData: this.inputsValue(),
         selectData: this.selectValue(),
         feautures: this.feautures(),
         sizesData: sizes,
         barcodes: await API.genBarcodes(barcodeNums.toString())
      }
   }

   inputsValue() {
      const inputFields = [
         input.productName, input.productBrand, input.productPrice, input.productConsist, textarea.productDesc, input.productColor, input.searchProductCategory
      ]

      let inputData = {}
      for(let input of inputFields) {
         if(input.value) {
            const inputID = input.getAttribute('id')
            inputData[inputID] = input.value
         }
      }
      // console.log(inputData)
      return inputData
   }

   selectValue() {
      let selectData = {}
      if(this.visible(element.productExtras_wrapper)) {
         selectData.productCategory = this.cleanOption.category(select.productCategory.value)
         selectData.productTnved = this.cleanOption.tnved(select.productTnved.value)
      }
      if(this.visible(element.productExtrasNotFound_wrapper)) {
         selectData.productCategory = this.cleanOption.category(input.searchProductCategory.value)
         selectData.productTnved = this.cleanOption.tnved(select.searchProductTnved.value)
      }
      // console.log(selectData)
      return selectData
   }

   feautures() {
      let feauturesData = {}
      for(let feauture of element.productParams_table.children) {
         feauturesData[feauture.children[0].innerText] = feauture.children[1].innerText
      }
      // console.log(feauturesData)
      return feauturesData
   }

   sizes() {
      let sizesData = {}
      if(this.visible(element.productSizes_wrapper)) {
         for(let size of element.productSizes.children) {
            sizesData[size.innerText] = size.getAttribute('data-ru-size')
         }
         return sizesData
      } else {
         return false
      }
   }

   get cleanOption() {
      return {
         category: (val) => val.split(' --')[0],
         tnved: (val) => val.split(' -')[0]
      }
   }

   visible(el) {
      if(el.classList.contains('dn')) {
         return false
      } else {
         return true
      }
   }
}

export { ChangedData }