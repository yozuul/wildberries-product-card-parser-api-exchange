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
      console.log(this.parent.firstChild);
   }
}

export { ChildsPush }