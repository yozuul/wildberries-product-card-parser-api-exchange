import Router from '@koa/router'

import { Louncher, TypeURL } from '../parser'
import { SaveCard } from '../api'
import { WildberriesAPI } from '../marketplace'
import { green, darkGray, red } from 'ansicolor'

const router = new Router()

const falseReturnAPI = { response: false }

router.post('/parseCard', async (ctx) => {
   try {
      const result = await new TypeURL().check({...ctx.request.body})
      // console.log(result);
      ctx.body = result || falseReturnAPI
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500
      ctx.body = 'Internal error at parseCard'
   }
})
router.post('/getAdditionalCardData', async (ctx) => {
   try {
      const result = await new WildberriesAPI().getAdditionalCardData({...ctx.request.body})
      // console.log(result);
      ctx.body = result || falseReturnAPI
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500
      ctx.body = 'Internal error at getAdditionalCardData'
   }
})
router.post('/addCard', async (ctx) => {
   try {
      const result = await new WildberriesAPI().saveCard({...ctx.request.body})
      // console.log(result);
      ctx.body = result || falseReturnAPI
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500
      ctx.body = 'Internal at addCard error'
   }
})


export { router }