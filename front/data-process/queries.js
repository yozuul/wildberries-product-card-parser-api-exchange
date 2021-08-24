import { query } from '../utils/query-helpers'

// Поля форм
const input = {
   productURL: query('#productURL'),
   productName: query('#productName'),
   productBrand: query('#productBrand'),
   productPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
   productColor: query('#productColor'),
   currentUUID: query('#currentUUID'),
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
   productSizes_wrapper: query('#productSizes_wrapper'),
   productSizes: query('#productSizes'),
   notify: query('#notify'),
   notifyHeader: query('#notifyHeader'),
   notifyText: query('#notifyText'),
}
const textarea = {
   productDesc: query('#productDesc')
}
// Кнопки
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
   changeAutoFindedCategory: query('#changeAutoFindedCategory'),
}

export { button, element, input, select, textarea }