import API from './services/api'
import { FillFields, ChangedData, button, input } from './data-process/index'
import { fetchSpinner } from './utils/fetch-spinner'

// УПРАВЛЕНИЕ НАНЕЛЬЮ ПАРСИНГА

class ParsePanel {
   // Подключаем кнопки Спарсить и Добавить
   registerButtons() {
      this.parseButtonControl()
      this.addProductButtonControl()
   }

   // Кнопка парсинга
   parseButtonControl() {
      button.parseCard.onclick = async () => {
         // Убеждаемся что предыдущий данные очищены
         this.cleanHideDynamicBlocks()
         // Включаем спиннер
         fetchSpinner('on')
         // Парсим карточку
         let parseData = await API.parseCard(input.cardProductURL.value)
         // Заполняем полученными данными поля в панели
         new FillFields(parseData).passData()
         // Показываем кнопку добавления карточки
         button.saveCard.classList.remove('dn')
         // Выключаем спиннер
         fetchSpinner('off')
      }
   }

   // Кнопка сохранения карточки
   addProductButtonControl() {
      button.saveCard.onclick = async () => {
         const updatedFields = new ChangedData().collect
         // const updatedFields = this.getUpdatedFields()
         // const objectData = this.prepareObjectData(this.parseData, updatedFields)
         // const addCard = await this.apiFetch(this.api.addCard, objectData)
         // console.log(objectData);
      }
   }
}


new ParsePanel().registerButtons()