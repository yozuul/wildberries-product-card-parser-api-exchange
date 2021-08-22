import API from './api'
import { button, element, input, select } from './queries'
import { query, queryAll } from './helpers'


class Panel {
   constructor(button, element, input) {
      this.button = button
      this.element = element
      this.input = input
   }

   registerButtons() {
      this.parseButtonControl()
      // this.addProductButtonControl()
   }

   parseButtonControl() {
      this.button.parseCard.onclick = async () => {
         // this.cleanHideDynamicBlocks()
         // this.toggleSpinner('on')
         // Получение данных
         let parseData = await API.parseCard(input.cardProductURL.value)
         // console.log(parseData);
         // let parseData = await apiFetch(this.api.parseCard, {data: input.cardProductURL.value})
         // console.log(parseData);
         // parseData.extras = await apiFetch(this.api.getAdditionalCardData, parseData)
         // this.parseData = parseData
         // this.passDataToFields(parseData)
      }
   }
}


new Panel(button, element, input, select).registerButtons()