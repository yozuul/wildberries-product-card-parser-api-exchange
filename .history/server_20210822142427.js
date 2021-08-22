import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors';
import { router } from './router'
import { WildberriesAPI } from './marketplace/wildberries'

import { green } from 'ansicolor'

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, console.log(('\nServer started').green))
