import API from './services/api'
import { button, element, input, select, query, queryAll, show } from './utils/index'
import { FillFields } from './data-process/fill-fields'
import { fetchSpinner } from './utils/fetch-spinner'


class Panel {

   registerControlButtons() {
      this.parseButtonControl()
      this.addProductButtonControl()
   }

   parseButtonControl() {
      button.parseCard.onclick = async () => {
         this.cleanHideDynamicBlocks()
         fetchSpinner('on')
         // Получаем данные и заполняем поля
         let parseData = await API.parseCard(input.cardProductURL.value)
         new FillFields(parseData).passData()
         // Показываем кнопку добавления карточки
         button.saveCard.classList.remove('dn')
         fetchSpinner('off')
      }
   }

   addProductButtonControl() {
      button.saveCard.onclick = async () => {
         // const updatedFields = this.getUpdatedFields()
         // const objectData = this.prepareObjectData(this.parseData, updatedFields)
         // const addCard = await this.apiFetch(this.api.addCard, objectData)
         // console.log(objectData);
      }
   }
}


new Panel().registerButtons()