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

   checkResult(searchResult) {
      if(searchResult.data) {
         this.cleanResult()
         show(element.searchReulstList)
         this.pushResultToList(searchResult.data)
         this.watchSearchItemClick(element.searchReulstList)
      } else {
         hide(element.searchReulstList)
      }
   }

   pushResultToList(data) {
      const searchElements = []
      for(let foundedCat in data) {
         const object = data[foundedCat]
         searchElements.push(
            `<li class="list-group-item"><span>${foundedCat}</span><em>${object.parent}</em></li>`
         )
      }
      searchElements.reverse().map((item) => {
         push(item).after.begin(element.searchReulstList)
      })
   }

   watchSearchItemClick(parent) {
      const items = parent.getElementsByClassName('list-group-item')
      console.log(items);
      // items.map((foundedCategory) => {
      //    foundedCategory.onclick = () => {
      //       console.log(foundedCategory.getElementsByTagName('span').innerText);
      //    }
      // })
   }

   cleanResult() {
      const resultItems = element.searchReulstList
      while (resultItems.firstChild) {
         resultItems.removeChild(resultItems.firstChild);
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