import Router from '@koa/router'

import { Louncher, TypeURL } from '../parser'
import { green, darkGray, red } from 'ansicolor'

const router = new Router()

router.post('/addCard', async (ctx) => {
   try {
      const result = await new TypeURL().check({...ctx.request.body})
      console.log(result);
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