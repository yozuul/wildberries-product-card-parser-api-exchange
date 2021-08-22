const query = (el) => document.querySelector(el)
const queryAll = (el) => document.querySelectorAll(el)
const hide = (el) => el.classList.add('dn')
const show = (el) => el.classList.remove('dn')
const push = (el) => {
   return {
      after: {
         start: (parent) => {
            parent.insertAdjacentHTML('afterstart', el);
         }
      }
   }
}

export { query, queryAll, hide, show, push }