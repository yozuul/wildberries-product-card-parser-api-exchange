import API from './services/api'
import { button, input, element, FillFields, ChangedData, PrepareData } from './data-process/index'
import { fetchSpinner, FieldsCleaner, show } from './utils/index'
import { Notify } from './services/notify'

// УПРАВЛЕНИЕ НАНЕЛЬЮ ПАРСИНГА

class ParsePanel {
   // Подключаем кнопки Спарсить и Добавить
   async registerButtons() {
      button.parseCard.onclick = async () => {
         // Убеждаемся что предыдущий данные очищены
         FieldsCleaner.restoreMarkup()
         // Включаем спиннер
         fetchSpinner('on')
         // Парсим карточку
         const parseData = await API.parseCard(input.productURL.value)
         // Заполняем полученными данными поля в панели
         new FillFields(parseData).passData()
         // // Показываем кнопку добавления карточки
         show(button.saveCard)
         // // Выключаем спиннер
         fetchSpinner('off')
         // Передаём данные парсинга для добавления
         this.addProductButtonControl(parseData)
      }
   }
   // Кнопка сохранения карточки
   addProductButtonControl(parseData) {
      button.saveCard.onclick = async () => {
         if(this.checkCategory()) {
            // Собираем изменённые данные с полей
            const updatedFields = await new ChangedData().collect()
            // Формируем тело запроса
            const postData = new PrepareData(parseData, updatedFields).collect()
            console.log('updatedFields', updatedFields);
            console.log('postData', postData);
            // Отправляем карточку в Wildberries
            const response = await API.createCard(postData)
            this.notifiers.wdError(response)
         } else {
            this.notifiers.error('Добавьте категорию')
         }
      }
   }

   get notifiers() {
      return {
         error: (reason) => {
            Notify.error({ head: 'Ошибка', body: reason })
         },
         correct: (reason) => {
            Notify.correct(reason)
         },
         wdError(response) {
            if(response.error) {
               Notify.error({
                  head: response.error.code.toString(),
                  body: response.error.data.cause.err
               })
            }
            if(!response.error) {
               Notify.correct('Wildberries response: карточка успешно добавлена')
            }
         }
      }
   }

   checkCategory() {
      const visible = (el) => {
         if(el.classList.contains('dn')) {
            return false
         } else { return true }
      }
      if(visible(element.productExtrasNotFound_wrapper)) {
         if(!input.searchProductCategory.value) {
            input.searchProductCategory.classList.add('error-require')
            return false
         } else { return true }
      } else { return true }
   }

}

new ParsePanel().registerButtons()

