import Router from '@koa/router'
import { Louncher, FetchData } from '../parser'
import { green, darkGray, red } from 'ansicolor'

const router = new Router()

router.post('/panel', async (ctx) => {
   console.log('panel');
   try {
      const browser = await new Louncher().startBrowser()
      new FetchData().start(browser)
      // process.env.BROWSER = await new Louncher().startBrowser()
      // const result = await GetProductCard({...ctx.request.body})
      ctx.body = result
   }
   catch (err) {
      console.log('Error:', err)
      ctx.status = 500
      ctx.body = 'Internal error'
   }
})

export { router }