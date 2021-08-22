import { element, input, select, textarea } from '../queries'
import { query, show, hide, push, queryAll } from './query-helpers'
import API from '../api'

class DynamicSearch {
   watchField(searchField) {
      searchField.oninput = async () => {
         const word = searchField.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(word)
            this.checkResult(isFind.result)
         }
      }
      searchField.onblur = async () => {
         hide(element.searchResultList)
         input.searchProductCategory.value = input.watchSelectedCategory.value
         this.cleanResult()
         if(input.searchProductCategory.value) {
            const tnved = await API.searchTnved(input.searchProductCategory.value)
            if(tnved) {
               show(element.searchProductTnved_wrapper)
               console.log(tnved);
            }
         }
      }
      searchField.onfocus = async () => {
         const word = searchField.value
         const canFind = this.checkLettersNumber(word)
         if(canFind) {
            const isFind = await API.searchCategory(word)
            this.checkResult(isFind.result)
         }
      }
   }

   checkResult(searchResult) {
      if(searchResult.data) {
         this.cleanResult()
         show(element.searchResultList)
         this.pushResultToList(searchResult.data)
         this.watchSearchItemClick(element.searchResultList)
      } else {
         hide(element.searchResultList)
         input.watchSelectedCategory.value = ''
      }
   }

   pushResultToList(data) {
      const searchElements = []
      for(let foundedCat in data) {
         const object = data[foundedCat]
         searchElements.push(
            `<li class="list-group-item" data-cat-name="${foundedCat}"><span>${foundedCat}</span><em>${object.parent}</em></li>`
         )
      }
      searchElements.reverse().map((item) => {
         push(item).after.begin(element.searchResultList)
      })
   }

   watchSearchItemClick(parent) {
      const itemsArr = parent.getElementsByClassName('list-group-item')
      for(let foundedCategory of itemsArr) {
         foundedCategory.onmouseover = () => {
            input.watchSelectedCategory.value = foundedCategory.getAttribute('data-cat-name')
         }
      }
   }

   cleanResult() {
      const resultItems = element.searchResultList
      while (resultItems.firstChild) {
         resultItems.removeChild(resultItems.firstChild);
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