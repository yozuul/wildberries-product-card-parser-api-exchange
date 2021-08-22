import {} from 'dotenv/config'

class WildberriesAPI {
   constructor(data) {
      this.data = data
   }
   test() {
      const env = process.env
      const token = env.WD_API_TOKET
      const data = this.jsonData()

      console.log(data);
   }

   jsonData() {
      return {
         data: {
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
             params: [Object]
           }
         }
       }
   }
}

export { WildberriesAPI }