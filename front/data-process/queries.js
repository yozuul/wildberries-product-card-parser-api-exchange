import { query, queryAll } from '../utils/query-helpers'

// Поля форм
const input = {
   productURL: query('#productURL'),
   productName: query('#productName'),
   productBrand: query('#productBrand'),
   productPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   productCountry: query('#productConsist'),
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
   productColor: query('#productColor'),
   currentUUID: query('#currentUUID'),
   saveSelectedCat: query('#saveSelectedCat'),
   productBarcode: query('#productBarcode'),
}
// Селекты
const select = {
   productCategory: query('#productCategory'),
   productTnved: query('#productTnved'),
   searchProductTnved: query('#searchProductTnved'),
}
// Блочные элементы
const element = {
   parseCard_inactive: query('#parseCard_inactive'),
   parseCard_active: query('#parseCard_active'),
   saveCard_inactive: query('#saveCard_inactive'),
   saveCard_active: query('#saveCard_active'),
   productExtras_wrapper: query('#productExtras_wrapper'),
   productExtrasNotFound_wrapper: query('#productExtrasNotFound_wrapper'),
   productImages: query('#productImages'),
   productImages_wrapper: query('#productImages_wrapper'),
   productConsist_wrapper: query('#productConsist_wrapper'),
   productParams_wrapper: query('#productParams_wrapper'),
   productColor_wrapper: query('#productColor_wrapper'),
   searchProductTnved_wrapper: query('#searchProductTnved_wrapper'),
   productParams_table: query('#productParams_table tbody'),
   searchResultList: query('#searchResultList'),
   searchResultListInner: queryAll('#searchResultList li'),
   productSizes_wrapper: query('#productSizes_wrapper'),
   productSizes: query('#productSizes'),
   notify: query('#notify'),
   notifyHeader: query('#notifyHeader'),
   notifyText: query('#notifyText'),
   productFeaut_wrapper: query('#productFeaut_wrapper'),
   productFeautRequire_block: query('#productFeautRequire_block'),
   productFeautOther_block: query('#productFeautOther_block'),
   productFeautVariat_block: query('#productFeautVariat_block'),
   productFeautInputs: queryAll('#productFeaut_wrapper input'),
   parsedFeautures_wrapper: query('#parsedFeautures_wrapper'),
   productBarcode_wrapper: query('#productBarcode_wrapper'),
   addedFeautures: queryAll('.addedFeautures'),
}
const textarea = {
   productDesc: query('#productDesc'),
   token: query('#token')
}
// Кнопки
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
   saveToken: query('#saveToken'),
   closeModal: query('#closeModal'),
   changeAutoFindedCategory: query('#changeAutoFindedCategory'),
}

export { button, element, input, select, textarea }