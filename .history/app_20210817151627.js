import { GetProductCard } from './api'

const parseURL = process.env.URL
console.log(parseURL);
GetProductCard.checkURL(parseURL)
