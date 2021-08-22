import { query } from './query-helpers'

// Поля форм
const input = {
   cardProductURL: query('#cardProductURL'),
   cardProductName: query('#productName'),
   cardProductBrand: query('#productBrand'),
   cardProductPrice: query('#productPrice'),
   productConsist: query('#productConsist'),
   productDesc: query('#productDesc'),
   productColor: query('#productColor'),
   searchProductCategory: query('#searchProductCategory'),
   watchSelectedCategory: query('#watchSelectedCategory'),
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
   productImages_wrapper: query('#productImages_wrapper'),
   productConsist_wrapper: query('#productConsist_wrapper'),
   productParams_wrapper: query('#productParams_wrapper'),
   productColor_wrapper: query('#productColor_wrapper'),
   searchProductTnved_wrapper: query('#searchProductTnved_wrapper'),
   productParams_table: query('#productParams_table'),
   searchResultList: query('#searchResultList'),
}
const textarea = {
   cardProductDesc: query('#cardProductDesc')
}
// Кнопки
const button = {
   parseCard: query('#parseCard'),
   saveCard: query('#saveCard'),
}

export { button, element, input, select, textarea }