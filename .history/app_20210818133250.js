import {} from 'dotenv/config'
import { TypeURL } from './parser'

const parseURL = process.env.URL

new TypeURL(parseURL).check()
