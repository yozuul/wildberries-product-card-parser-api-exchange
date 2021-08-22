import Koa from 'koa';
import koaBody from 'koa-body'
import { router } from './router'

import { green, darkGray, red } from 'ansicolor'

const app = new Koa()

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, console.log(('server started').green));
