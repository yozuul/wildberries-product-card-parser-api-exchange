import API from './api'
import {
   query, queryAll, element, input, select, textarea, show, hide, insert, ChildsPush
} from '../utils/index'

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
         this.tryFoundTvend(input.watchSelectedCategory.value)
         this.cleanResult(element.searchResultList)
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

   async tryFoundTvend(foundedResult) {
      if(foundedResult) {
         const tnved = await API.searchTnved(foundedResult)
         if(tnved) {
            const pushedData = new ChildsPush(select.searchProductTnved)
            const tvnedResult = tnved.result.data
            for(let foundedTvend in tvnedResult) {
               const item = tvnedResult[foundedTvend]
               pushedData.collect(
                  `<option class="tvendItem" value="${foundedTvend}">${item.description}</option>`
               )
            }
            pushedData.insert()

            show(element.searchProductTnved_wrapper)

            console.log(tnved);

            // const foundedTvned = []
            // for (const tvend in tvnedResult) {
            //    foundedTvned.push(`${tvnedResult[tvend].tnvedCode} ${tvnedResult[tvend].description}`)
            // }
            // const latestFounded = select.searchProductTnved.getElementsByClassName('tvendItem')
            // if(latestFounded.length > 0) {
            //    this.cleanResult(select.searchProductTnved)
            // }
            // foundedTvned.reverse().map((item, index) => {
            //    const selectOption = `<option class="tvendItem" data-tvend-num="${index}" value="${index}">${item}</option>`
            //    insert(selectOption).after.begin(select.searchProductTnved)
            // })
            // show(element.searchProductTnved_wrapper)
         }
      }
   }

   checkResult(searchResult) {
      if(searchResult.data) {
         this.cleanResult(element.searchResultList)
         show(element.searchResultList)
         this.pushResultToList(searchResult.data)
         this.watchSearchItemClick(element.searchResultList)
      } else {
         hide(element.searchResultList)
         input.watchSelectedCategory.value = ''
      }
   }

   pushResultToList(data) {
      const pushedData = new ChildsPush(element.searchResultList)
      for(let foundedCat in data) {
         const item = data[foundedCat]
         pushedData.collect(
            `<li class="list-group-item" data-cat-name="${foundedCat}"><span>${foundedCat}</span><em>${item.parent}</em></li>`
         )
      }
      pushedData.insert()
   }

   watchSearchItemClick(parent) {
      const itemsArr = parent.getElementsByClassName('list-group-item')
      for(let foundedCategory of itemsArr) {
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