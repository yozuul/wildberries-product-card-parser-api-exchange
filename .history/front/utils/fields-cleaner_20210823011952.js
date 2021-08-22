import { query, show, hide, queryAll } from '../utils/query-helpers'
import { element, button, input, select, textarea } from '../data-process/queries'

// ОЧИСТКА ДАННЫХ ПОЛЕЙ, ВОССТАНОВЛЕНИЕ РАЗМЕТКИ

class FieldsCleaner {
   restoreMarkup() {
      // Восстанавливаем поля
      const restoreElement = [
         input.cardProductName, input.cardProductBrand, input.cardProductPrice, textarea.cardProductDesc
      ]
      restoreElement.map((el) => {
         el.value = ''
         el.setAttribute('readonly', '')
      })

      // Очищаем поля
      const cleanElement = [
         input.productConsist, input.productColor, input.watchSelectedCategory, textarea.cardProductDesc
      ]
      cleanElement.map((el) => el.value = '')

      // Элементы которые надо спрятать
      const hideElement = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper, element.productConsist_wrapper, element.productExtrasNotFound_wrapper
      ]
      hideElement.map((el) => console.log(el))

      // Элементы у которых надо удалить дочерние элементы
      const cleanChilds = [
         element.productImages, element.productParams_table, element.productExtras_wrapper, select.searchProductTnved
      ]
      cleanChilds.map((parent) => {
         if(parent.firstChild) {
            while(parent.firstChild) {
               parent.firstChild.remove()
            }
         }
      })
   }
}

export default new FieldsCleaner()
