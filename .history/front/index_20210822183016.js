import API from './api'
import { button, element, input, select } from './queries'
import { query, queryAll } from './helpers'
import { FillFields } from './data-process/index'


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
         // Получение данных
         let parseData = await API.parseCard(input.cardProductURL.value)
         this.passDataToFields(parseData)
      }
   }


   cleanHideDynamicBlocks() {
      // Кнопка сохранения
      this.button.saveCard.classList.add('dn')
      // Блок изображений
      this.element.productImages_wrapper.classList.add('dn')
      // Блок характеристик
      this.element.productParams_wrapper.classList.add('dn')
      // Блок категорий
      this.element.productExtras.classList.add('dn')
      // Удаляем изображения и характеристики
      const cleanInside = [
         queryAll('#productImages div'),
         queryAll('#productParams_table tr'),
         queryAll('#productExtras_wrapper option')
      ]
      for(let items of cleanInside) {
         if(items.length > 0) {
            Array.from(items).map((i) => i.remove())
         }
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