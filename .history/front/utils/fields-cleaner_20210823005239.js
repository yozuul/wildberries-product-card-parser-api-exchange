import { query, show, hide, queryAll } from '../utils/query-helpers'
import { element, input, select, textarea } from '../data-process/queries'

// ОЧИСТКА ДАННЫХ ПОЛЕЙ, ВОССТАНОВЛЕНИЕ РАЗМЕТКИ

class FieldsCleaner {
   restoreMarkup() {
      // Кнопка сохранения
      this.button.saveCard.classList.add('dn')
      // Блок изображений
      this.element.productImages_wrapper.classList.add('dn')
      // Блок характеристик
      this.element.productParams_wrapper.classList.add('dn')
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
