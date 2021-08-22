import { element, input, select, textarea } from '../queries'
import { query, show, hide, push, queryAll } from './helpers'
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
      searchField.onblur = () => {
         hide(element.searchReulstList)
         this.cleanResult()
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

   pushResultToList(data) {
      console.log(data);
      const searchElements = []
      for(let foundedCat in data) {
         const object = data[foundedCat]
         const searchData = `<span>${foundedCat}</span><em>${object.parent}</em>`
         const searchElement = `<li class="list-group-item">${searchData}</li>`
         searchElements.push(element)
      }
      searchElements.reverse().map((cat) => {
         push(cat).after.begin(element.searchReulstList)
      })
   }

   cleanResult() {
      const resultItems = element.searchReulstList
      while (resultItems.firstChild) {
         resultItems.removeChild(resultItems.firstChild);
       }
   }

   checkResult(searchResult) {
      if(searchResult.data) {
         this.cleanResult()
         show(element.searchReulstList)
         this.pushResultToList(searchResult.data)
      } else {
         hide(element.searchReulstList)
      }
   }

   checkLettersNumber(word) {
      if(word.split('').length < 3) {
         hide(element.searchReulstList)
         return false
      } else {
         return true
      }
   }
}

export { DynamicSearch }