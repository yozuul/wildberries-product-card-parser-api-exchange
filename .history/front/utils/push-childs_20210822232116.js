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
   }
}

export { childsPush }