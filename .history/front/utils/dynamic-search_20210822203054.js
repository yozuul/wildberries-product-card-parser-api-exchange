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
      for(let foundedCat in data) {
         const resultElement = `<li class="list-group-item">${foundedCat}</li>`
         push(resultElement).after.start(element.searchReulstList)
      }
   }

   checkResult(searchResult) {
      if(searchResult.data) {
         show(element.searchReulstList)
         this.pushResultToList(earchResult.data)
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