import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors';
import { router } from './router'
import { WildberriesAPI } from './marketplace/wildberries'
import axios from 'axios'

import { green, darkGray, red } from 'ansicolor'

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, console.log(('\nServer started').green))


const apiPath = 'https://suppliers-api.wildberries.ru'
const apiURL = `${apiPath}/card/getBarcodes`
const ddata = {
   "id": "asd45a4sd54d", // uuid запроса
   "jsonrpc": "2.0",
   "params": {
       // Количество ШК которые необходимо сгенерировать
       "quantity": 1
   }
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjU1YzNkMzE2LTExMzYtNGMwYi04MmY5LTY2NTMzZDMzZTNiMyJ9.r1vgQ-uEi4mcr1wizeFSqBRZazao4H34TLrjs3Msch8'
console.log(apiURL);

async function apiFetchd() {
   try {
      const response = await fetch(apiURL, {
         method: 'POST',
         body: JSON.stringify(ddata),
         Authorization: `Bearer ${token}`,
         headers: { 'Content-Type': 'application/json' }
      })
      console.log(response);
      // return await response.json()
   } catch (error) {
      console.error('Error fetching:', error);
   }
}

apiFetchd()

const apiRequest = () => new WildberriesAPI().getAdditionalCardData({
   name: 'Худи',
   brand: 'Raven.',
   price: '2068',
   images: [
     'https://images.wbstatic.net/large/new/13240000/13243476-1.jpg',
     'https://images.wbstatic.net/large/new/13240000/13243476-2.jpg',
     'https://images.wbstatic.net/large/new/13240000/13243476-3.jpg',
     'https://images.wbstatic.net/large/new/13240000/13243476-4.jpg',
     'https://images.wbstatic.net/large/new/13240000/13243476-5.jpg',
     'https://images.wbstatic.net/large/new/13240000/13243476-6.jpg'
   ],
   details: {
     consist: 'хлопок 80%, полиэстер 20%',
     desc: 'Оверсайз худи марки RAVEN. Толстовка свободного силуэта, с увеличенной проймой, шириной рукавов и спущенной плечевой линией. Худи выполено из качественного трикотажного полотна "френч терри" с начесом. Оснащена накладным карманом и эластичными поясом и манжетами. Данная модель может стать отличной базой для оверсайз стиля.',
     params: {
       'Покрой': 'оверсайз',
       'Фактура материала': 'футер',
       'Декоративные элементы': 'без элементов',
       'Уход за вещами': 'отбеливание запрещено',
       'Особенности модели': 'нет',
       'Назначение': 'повседневная',
       'Длина изделия по спинке': '70 см',
       'Страна производства': 'Россия',
       'Комплектация': 'худи',
       'Пол': 'Женский'
     }
   }
 })

//  apiRequest()