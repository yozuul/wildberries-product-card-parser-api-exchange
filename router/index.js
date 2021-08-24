import fse from 'fs-extra'

import { writeFile } from 'fs/promises';
import { Buffer } from 'buffer';

import Router from '@koa/router'

import { Louncher } from '../parser'
import { Authorize } from '../utils'
import { green, darkGray, red } from 'ansicolor'
import { WildberriesAPI } from '../api/wildberries'

const router = new Router()

router.post('/createCard', async (ctx) => {
   try {
      const createCard = await new WildberriesAPI().createCard(JSON.parse(ctx.request.body))
      ctx.body = createCard
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500,
      ctx.body = `Internal error at parseCard`
   }
})

router.post('/parseCard', async (ctx) => {
   try {
      let parsedData =  await new Louncher().checkURL(ctx.request.body)
      ctx.body = parsedData
      ctx.status = 200
      // console.log(JSON.parse(parsedData.source));
      // writeJson(parsedData.source)
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500,
      ctx.body = `Internal error at parseCard`
   }
})

router.post('/searchCategory', async (ctx) => {
   try {
      ctx.body = await new WildberriesAPI().getDirectoryList(ctx.request.body)
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500,
      ctx.body = `Internal error at searchCategory`
   }
})

router.post('/searchTnved', async (ctx) => {
   try {
      ctx.body = await new WildberriesAPI().getTnvedList(ctx.request.body)
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500,
      ctx.body = `Internal error at searchTnved`
   }
})

router.post('/genBarcodes', async (ctx) => {
   try {
      ctx.body = await new WildberriesAPI().getBarCode(ctx.request.body)
      ctx.status = 200
   }
   catch (err) {
      console.log('Error:', (err).red)
      ctx.status = 500,
      ctx.body = `Internal error at searchTnved`
   }
})

async function writeJson(data) {
   const tempFile = './.exports/temp.json'
   try {
      const buff = Buffer.from(data);
      await writeFile(tempFile, buff)
    } catch (err) {
      console.error(err)
    }
}

export { router }