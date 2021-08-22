import API from './api'
import {
   query, queryAll, element, input, select, textarea, show, hide, insert, ChildsPush
} from '../utils/index'

class DynamicSearch {
   // Следим за фокусом и набором текста в полях
   watchField(searchField) {
      // Если пользователь набирает текст
      searchField.oninput = async () => {
         const word = searchField.value
         // Если больше трёх букв
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            // Ищем паттерн по API
            const isFind = await API.searchCategory(word)
            // Проверяем результат и показываем результат
            this.checkResult(isFind.result)
         }
      }
      // Если с поля поиска убран фокус
      searchField.onblur = async () => {
         hide(element.searchResultList)
         input.searchProductCategory.value = input.watchSelectedCategory.value
         this.tryFoundTvend(input.watchSelectedCategory.value)
         this.cleanResult(element.searchResultList)
      }
      // Если поле в фокусе
      searchField.onfocus = async () => {
         const word = searchField.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(word)
            this.checkResult(isFind.result)
         }
      }
   }

   // Формируем отображение результатов поиска
   checkResult(searchResult) {
      // Если что-то нашли
      if(searchResult.data) {
      // Очищаем выпадающий список
         this.cleanResult(element.searchResultList)
         // Добавляем в список найденные результаты
         const pushedData = new ChildsPush(element.searchResultList)
         for(let foundedCat in data) {
            const item = data[foundedCat]
            pushedData.collect(
               `<li class="list-group-item" data-cat-name="${foundedCat}"><span>${foundedCat}</span><em>${item.parent}</em></li>`
            )
         }
      //    // Вставляем список в select
      //    pushedData.insert()
      //    // Показываем список пользователю
      //    show(element.searchResultList)
      //    // Следим за его выбором
      //    this.watchSearchItemClick(element.searchResultList)
      // } else {
      //    // Если не нашли, убеждаемся что список скрыт
      //    hide(element.searchResultList)
      //    // Очищаем ранее найденные данные, если были
      //    input.watchSelectedCategory.value = ''
      }
   }

   // Формируем список ТВЭНД
   async tryFoundTvend(foundedResult) {
      // Если категория выбрана, ищем ТВЭНД по её наименованию
      if(foundedResult) {
         const tnved = await API.searchTnved(foundedResult)
         if(tnved) {
            // если нашли ТВЭНД, формируем выпадающий список
            const pushedData = new ChildsPush(select.searchProductTnved)
            const searchResult = tnved.result.data
            if(select.searchProductTnved.firstChild) {
               this.cleanResult(select.searchProductTnved)
            }
            for(let foundedTnvd of searchResult) {
               const code = foundedTnvd.tnvedCode
               pushedData.collect(
                  `<option data-tnved-num="${code}">${code} ${foundedTnvd.description}</option>`
               )
            }
            // Вставляем список в select
            pushedData.insert()
            // Показываем список пользователю
            show(element.searchProductTnved_wrapper)
         }
      }
   }

   watchSearchItemClick(parent) {
      for(let foundedCategory of parent.children) {
         foundedCategory.onmouseover = () => {
            input.watchSelectedCategory.value = foundedCategory.getAttribute('data-cat-name')
         }
      }
   }

   cleanResult(parent) {
      while (parent.firstChild) {
         parent.removeChild(parent.firstChild);
      }
   }

   checkLettersNumber(word) {
      if(word.split('').length < 3) {
         hide(element.searchResultList)
         return false
      } else {
         return true
      }
   }
}

export { DynamicSearch }