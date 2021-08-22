import { query, show, hide, queryAll } from '../utils/query-helpers'
import { element, input, select, textarea } from '../data-process/queries'

// ОЧИСТКА ДАННЫХ ПОЛЕЙ, ВОССТАНОВЛЕНИЕ РАЗМЕТКИ

class FieldsCleaner {
   restoreMarkup() {
      // Элементы которые надо спрятать
      const hideElement = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper
      ]
      // Прячем
      hideElement.map((el) => hide(el))

      // Элементы у которых надо удалить дочерние элементы
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
