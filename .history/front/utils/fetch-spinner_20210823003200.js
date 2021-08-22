import { button, element } from './utils/index'

export const toggleSpinner = (mode) => {
   if(mode == 'on') {
      element.parseCard_inactive.classList.add('dn')
      button.parseCard.setAttribute('disbale', '')
      element.parseCard_active.classList.remove('dn')
   } else {
      element.parseCard_active.classList.add('dn')
      button.parseCard.removeAttribute('disbale')
      element.parseCard_inactive.classList.remove('dn')
   }
}