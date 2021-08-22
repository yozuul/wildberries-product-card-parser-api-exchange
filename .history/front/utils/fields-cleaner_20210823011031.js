import { query, show, hide, queryAll } from '../utils/query-helpers'
import { element, button, input, select, textarea } from '../data-process/queries'

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
      const cleanChilds = [
         element.productImages, element.productParams_table, element.productExtras_wrapper
      ]
      // Удаляем
      cleanChilds.map((parent) => {
         console.log(parent);
         // if(parent.firstChild) {
         //    while(parent.firstChild) {
         //       parent.firstChild.remove()
         //    }
         // }
      })
   }
}

export default new FieldsCleaner()
