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
      console.log(this.items);
      this.items.reverse().map((i) => insert(i).after.begin(this.parent))
   }
}

export { ChildsPush }