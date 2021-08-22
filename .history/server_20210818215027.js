import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors'

import { green, darkGray, red } from 'ansicolor'

import { router } from './router'

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(router.routes())

app.listen(3000, console.log(('\nServer started').green));
