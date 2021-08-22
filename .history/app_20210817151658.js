import {} from 'dotenv/config'
import { GetProductCard } from './api'

const parseURL = process.env.URL
GetProductCard.checkURL(parseURL)
