import Koa from 'koa';
import koaBody from 'koa-body'
import serve from 'koa-static'
import Boom from 'boom'

import { green, darkGray, red } from 'ansicolor'

import { router } from './router'

const app = new Koa()

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods({
   throw: true,
   notImplemented: () => new Boom.notImplemented(),
   methodNotAllowed: () => new Boom.methodNotAllowed()
 }))

 app.use(serve('.'));


app.listen(3000, console.log(('\nServer started').green));
