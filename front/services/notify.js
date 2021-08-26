import { element, button } from '../data-process/index'
import { hide, show } from '../utils/index'

class Notifier {
   error(data) {
      this.toggle('error')
      element.notifyHeader.innerText = `Код ошибки: ${data.head}`
      element.notifyText.innerText = `Wildberries response: \n${data.body}`
   }
   correct(text) {
      element.notifyText.classList.remove('error')
      this.toggle()
      element.notifyHeader.innerText = `Операция выполнена`
      element.notifyText.innerText = text
   }
   toggle(type) {
      let timeOut = 3000
      if(type == 'error') {
         hide(button.parseCard)
         hide(button.saveCard)
         timeOut = 4000
         element.notifyText.classList.add('error')
      }
      const popup = () => {
         element.notify.classList.remove('show')
         show(button.parseCard)
         show(button.saveCard)
      }
      setTimeout(popup, timeOut)
      element.notify.classList.add('show')
   }
}

const Notify = new Notifier()
export { Notify }