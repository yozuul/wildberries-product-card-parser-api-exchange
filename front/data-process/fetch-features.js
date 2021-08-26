import { ChildsPush, show, insert } from '../utils/index'
import { element } from '../data-process/index'

class FeautureData {
   constructor(data) {
      this.data = data
   }

   push() {
      this.clean()
      const pushedDataNotRequire = new ChildsPush(element.productFeautOther_block)
      const pushedDataRequire = new ChildsPush(element.productFeautRequire_block)
      let idData = {}
      let index = 0
      for (let common of this.data.addin) {
         if((common.type !== 'Бренд') && (common.type !== 'Тнвэд') && (common.type !== 'Описание') && (common.type !== 'Состав') && (common.type !== 'Наименование')) {
            const feautureID = `feautureNum_${index}`
            const pushedDataString = `
            <div class="row uploadedFeautureFields" feautre-name="${common.type}" id="${feautureID}">
               <div class="col-10">
                  <input type="text" class="form-control" placeholder="${common.type}">
               </div>
               <div class="col-2">
                  <button class="btn btn-primary mb-3 addFeauture">+</button>
               </div>
               <ul class="col-12"></ul>
            </div>`
            if ((common.required)) {
               pushedDataRequire.collect(pushedDataString)
            } else {
               pushedDataNotRequire.collect(pushedDataString)
            }
            idData[common.type] = feautureID
            index++
         }
      }
      pushedDataRequire.insert()
      pushedDataNotRequire.insert()
      this.compareData(this.parsedFeautures, idData)
      this.addListeneres()
      show(element.productFeaut_wrapper)
   }

   addListeneres() {
      const addFeautureButtons = document.querySelectorAll('#productFeaut_wrapper .addFeauture')
      for(let addFeautureButton of addFeautureButtons) {
         addFeautureButton.onclick = () => {
            const blockID = addFeautureButton.parentElement.parentElement.id
            const blockInput = document.querySelector(`#${blockID} input`)
            const blockFeautData = document.querySelector(`#${blockID} ul`)
            if(blockInput.value) {
               const template = `
               <li class="addedFeautures">
                  <small class="text-muted">${blockInput.value}</small>
                  <button class="removeFeauture" onclick="this.parentElement.remove()">-</button>
               </li>`
               insert(template).after.begin(blockFeautData)
               blockInput.value = ''
            }
         }
      }
   }

   compareData(parsedFeautures, idData) {
      console.log(parsedFeautures);
      for(let feautureName in parsedFeautures) {
         const existFeautureFieldID = idData[feautureName]
         if(existFeautureFieldID) {
            const existFeutureBlock = document.querySelector(`#${existFeautureFieldID} ul`)
            const parsedFeautureItem = parsedFeautures[feautureName]
            const fillData = {
               dest: existFeutureBlock,
               value: parsedFeautureItem.value,
            }
            if(parsedFeautureItem.type == 'multiple') {
               this.fillDataMultiple(fillData)
            } else {
               this.fillDataOnce(fillData)
            }
         }
      }
   }

   fillDataMultiple(data) {
      const checkSplit = data.value.split(';')
      if(checkSplit)
      for(let item of data.value.split(';')) {
         const template = `
         <li class="addedFeautures">
            <small class="text-muted">${item}</small>
            <button class="removeFeauture" onclick="this.parentElement.remove()">-</button>
         </li>`
         insert(template).after.begin(data.dest)
      }
   }

   fillDataOnce(data) {
      const template = `
      <li class="addedFeautures">
         <small class="text-muted">${data.value}</small>
         <button class="removeFeauture" onclick="this.parentElement.remove()">-</button>
      </li>`
      insert(template).after.begin(data.dest)
   }

   get parsedFeautures() {
      let data = {}
      const parsedFeautures = document.querySelectorAll('#parsedFeautures_wrapper input')
      for(let item of parsedFeautures) {
         data[item.getAttribute('feauture-name')] = {
            value: item.value,
            type: item.classList.contains('multiple') ? 'multiple' : 'one'
         }
      }
      return data
   }

   clean() {
      const fondedLoad = document.querySelectorAll('.uploadedFeautureFields')
      if(fondedLoad.length > 0) {
         for(let item of fondedLoad) {
            item.remove()
         }
      }
   }
}

export { FeautureData }