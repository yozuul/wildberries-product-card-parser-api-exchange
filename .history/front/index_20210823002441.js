import API from './services/api'
import { button, element, input, select, query, queryAll, show } from './utils/index'
import { FillFields } from './data-process/index'
import { DynamicSearch } from './services/index'


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
         this.cleanHideDynamicBlocks()
         this.toggleSpinner('on')
         // Получаем данные и заполняем поля
         let parseData = await API.parseCard(input.cardProductURL.value)
         new FillFields(parseData).passData()
         // Показываем кнопку добавления карточки
         this.button.saveCard.classList.remove('dn')
         this.toggleSpinner('off')
      }
   }

   toggleSpinner(mode) {
      if(mode == 'on') {
         this.element.parseCard_inactive.classList.add('dn')
         this.button.parseCard.setAttribute('disbale', '')
         this.element.parseCard_active.classList.remove('dn')
      } else {
         this.element.parseCard_active.classList.add('dn')
         this.button.parseCard.removeAttribute('disbale')
         this.element.parseCard_inactive.classList.remove('dn')
      }
   }
}


new Panel(button, element, input, select).registerButtons()