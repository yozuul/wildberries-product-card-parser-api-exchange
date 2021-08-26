class NormalizeFeauture {
   checkUnits(value) {
      const patternName = {
         sm: ' см', gr: ' г', kg: ' кг', mm: ' мм', mp: ' Мп', mhz: ' МГц', min: ' мин', h: ' час', qu: ' шт.', grad: ' градусов', temp: ' C', noize: ' дБ', ml: ' мл', kkal: ' ккал', plot: ' г/кв.м'
      }
      const unitCheck = (str) => {
         return {
            sm: str.slice(-3), gr: str.slice(-2), kg: str.slice(-3), mm: str.slice(-3), mp: str.slice(-3), mhz: str.slice(-4), min: str.slice(-4), h: str.slice(-4), qu: str.slice(-4), grad: str.slice(-9), temp: str.slice(-2), noize: str.slice(-3), ml: str.slice(-3), kkal: str.slice(-5), plot: str.slice(-7)
         }
      }
      for(let item in patternName) {
         const pattern = unitCheck(value)[item]
         if(patternName[item] == pattern) {
            const unitValue = value.split(pattern)[0]
            if (parseInt(unitValue)) {
               return unitValue
            }
         }
      }
   }
}

export { NormalizeFeauture }