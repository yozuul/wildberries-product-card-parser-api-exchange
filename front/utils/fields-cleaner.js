import { hide } from '../utils/query-helpers'
import { element, button, input, select, textarea } from '../data-process/queries'

// ОЧИСТКА ДАННЫХ ПОЛЕЙ, ВОССТАНОВЛЕНИЕ РАЗМЕТКИ

class FieldsCleaner {
   restoreMarkup() {
      // Восстанавливаем поля
      const restoreElement = [
         input.productName, input.productBrand, input.productPrice, textarea.productDesc
      ]
      restoreElement.map((el) => {
         el.value = ''
         el.setAttribute('readonly', '')
      })

      // Очищаем поля
      const cleanElement = [
         input.productConsist, input.productColor, input.watchSelectedCategory, textarea.productDesc, input.searchProductCategory
      ]
      cleanElement.map((el) => el.value = '')

      // Элементы которые надо спрятать
      const hideElement = [
         button.saveCard, element.productImages_wrapper, element.productParams_wrapper, element.productExtras_wrapper, element.productConsist_wrapper, element.productColor_wrapper, element.productExtrasNotFound_wrapper, element.productSizes_wrapper, element.productFeaut_wrapper
      ]
      hideElement.map((el) => hide(el))

      // Элементы у которых надо удалить дочерние элементы
      const cleanChilds = [
         element.productImages, element.productParams_table, select.productCategory, select.productTnved, select.searchProductTnved, element.productSizes, element.parsedFeautures_wrapper, element.productFeautRequire_block, element.productFeautOther_block
      ]
      cleanChilds.map((parent) => {
         if(parent.firstChild) {
            while(parent.firstChild) {
               parent.firstChild.remove()
            }
         }
      })

      textarea.productDesc.classList.remove('max_height_desc')
   }
}

export default new FieldsCleaner()
