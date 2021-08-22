import { insert } from './query-helpers'

class ChildsPush {
   constructor(parent) {
      this.parent = parent
      this.items = []
   }
   collect(item) {
      this.items.push(item)
   }
   insert() {
      this.items.reverse().map((i) => insert(i).after.begin(this.parent))
      const firstElement = this.parent.firstChild
      if(firstElement.tagName == 'OPTION') {
         firstElement.setAttribute('selected', 'selected')
      }
   }
}

export { ChildsPush }