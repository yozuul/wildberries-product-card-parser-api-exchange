import Router from '@koa/router'
import { GetProductCard } from '../api'
import { green, darkGray, red } from 'ansicolor'

const router = new Router()

router.post('/panel', async (ctx) => {
   console.log('panel');
   try {
      const result = await GetProductCard({...ctx.request.body})
      ctx.body = result
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})


export { router }