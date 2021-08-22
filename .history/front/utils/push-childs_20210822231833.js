import { insert } from './query-helpers'

class childsPush {
   constructor(parent) {
      this.parent = parent
      this.items = []
   }
   collect(item) {
      console.log(item);
   }
}

export { childsPush }