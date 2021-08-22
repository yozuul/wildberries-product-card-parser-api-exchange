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
         hide(element.searchResultList)
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
         show(element.searchResultList)
         this.pushResultToList(searchResult.data)
         this.watchSearchItemClick(element.searchResultList)
      } else {
         hide(element.searchResultList)
      }
   }

   pushResultToList(data) {
      const searchElements = []
      for(let foundedCat in data) {
         const object = data[foundedCat]
         searchElements.push(
            `<li class="list-group-item"><span class="itemCat">${foundedCat}</span><em>${object.parent}</em></li>`
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
            console.log(foundedCategory.innerText);
         }
         // foundedCategory.onclick = () => {
         //    console.log(foundedCategory.getElementsByTagName('span').innerText);
         // }
      }

      // items.map((foundedCategory) => {
         // foundedCategory.onclick = () => {
         //    console.log(foundedCategory.getElementsByTagName('span').innerText);
         // }
      // })
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