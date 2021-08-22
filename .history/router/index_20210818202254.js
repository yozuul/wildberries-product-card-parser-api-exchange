import Router from '@koa/router'
import { Louncher } from '../parser'
import { green, darkGray, red } from 'ansicolor'

const router = new Router()

const browser = router.post('/panel', async (ctx) => {
   console.log('panel');
   try {
      return browser = await new Louncher().startBrowser()
      // const result = await GetProductCard({...ctx.request.body})
      ctx.body = result
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})

console.log(browser);

export { router }