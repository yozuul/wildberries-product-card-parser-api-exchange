import { query, show, hide, queryAll } from '../utils/query-helpers'
import { element, input, select, textarea } from '../data-process/queries'

// ОЧИСТКА ДАННЫХ ПОЛЕЙ, ВОССТАНОВЛЕНИЕ РАЗМЕТКИ

class FieldsCleaner {
   restoreMarkup() {
      const hide = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper
      ]
      // Кнопка сохранения
      // hide(button.saveCard)
      // Блок изображений
      // this.element.productImages_wrapper.classList.add('dn')
      // Блок характеристик
      // this.element.productParams_wrapper.classList.add('dn')
      // Блок категорий
      this.element.productExtras_wrapper.classList.add('dn')
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

}

export default new FieldsCleaner()
