import Router from '@koa/router'

import { Louncher, TypeURL } from '../parser'
import { SaveCard } from '../api'
import { WildberriesAPI } from '../marketplace'
import { green, darkGray, red } from 'ansicolor'

const router = new Router()

router.post('/getAdditionalCardData', async (ctx) => {
   try {
      const result = await new WildberriesAPI().getAdditionalCardData({...ctx.request.body})
      console.log({...ctx.request.body});
      ctx.body = result
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})
router.post('/parseCard', async (ctx) => {
   try {
      const result = await new TypeURL().check({...ctx.request.body})
      // console.log(result);
      ctx.body = result
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})
router.post('/addCard', async (ctx) => {
   try {
      const result = await new TypeURL().check({...ctx.request.body})
      // console.log(result);
      ctx.body = result
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})
router.post('/saveCard', async (ctx) => {
   try {
      const result = await new SaveCard().apiConnect({...ctx.request.body})
      ctx.body = result
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})


export { router }