import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors';
import { router } from './router'
import { WildberriesAPI } from './marketplace/wildberries'

import { green, darkGray, red } from 'ansicolor'

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, console.log(('\nServer started').green))

const apiRequest = () => new WildberriesAPI().connect({
   name: 'лопок 80',
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

 apiRequest()