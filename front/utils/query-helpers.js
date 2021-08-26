const query = (el) => document.querySelector(el)
const queryAll = (el) => document.querySelectorAll(el)
const hide = (el) => el.classList.add('dn')
const show = (el) => el.classList.remove('dn')
const insert = (el) => {
   return {
      after: {
         begin: (parent) => {
            parent.insertAdjacentHTML('afterbegin', el);
         }
      },
      before: {
         end: (parent) => {
            parent.insertAdjacentHTML('beforeend', el);
         }
      }
   }
}

export { query, queryAll, hide, show, insert }