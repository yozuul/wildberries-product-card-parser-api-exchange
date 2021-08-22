import { insert } from './query-helpers'

class childsPush {
   constructor(parent) {
      this.parent = parent
      this.items = []
   }
   collect(item) {
      this.items.push(item)
   }
   insert() {
      console.log(this.items);
      this.items.reverse().map((item) => insert(item).after.begin(this.parent))
   }
}

export { childsPush }