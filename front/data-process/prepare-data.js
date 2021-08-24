// ПОДГОТОВКА ДАННЫХ ДЛЯ ДОБАВЛЕНИЕ КАРТОЧКИ

class PrepareData {
  constructor(parseData, updates) {
    this.parseData = parseData
    this.updates = updates
  }
  collect() {
    // console.log(this.parseData);
    // console.log(this.updates);
    // console.log(this.bodyObject());
    return this.bodyObject()
  }


 checkMultiple(value) {
    let multipleParams = []
    const trySplit = value.split('; ')
    if(trySplit[1]) {
      let index = 1
      for(let item of trySplit) {
        if(index < 3) {
          multipleParams.push({value: item})
        }
        index++
      }
      return multipleParams
    } else {
      return value
    }
 }

 checkUnits(value) {
     const patternName = {
       sm: ' см', sm2: ' см', gr: ' г', kg: ' кг', mm: ' мм', mp: ' Мп', mhz: ' МГц'
     }
     const unitCheck = (str) => {
       return {
        sm: str.slice(-3), sm2: str.slice(-3), gr: str.slice(-2), kg: str.slice(-3),
        mm: str.slice(-3), mp: str.slice(-3), mhz: str.slice(-4)
       }
     }
     for (let unit in patternName) {
       const pattern = unitCheck(value)[unit]
       if (pattern == patternName[unit]) {
         const unitValue = value.split(pattern)[0]
         if(parseInt(unitValue)) {
          //  console.log('value', value);
          //  console.log('unitValue', unitValue);
            return unitValue
         }
       }
     }
 }

 collectFeautures(data) {
   const paramsData = []
   const feauturesData = data

   let feauturesParams = {}
   for (const feauture in feauturesData) {
     if ((feauture !== 'Страна производства') && (feauture)) {
       console.log(feauture);
       const value = feauturesData[feauture]
       // console.log('value', value);
       const checked = this.checkType(value)
       // console.log('checked', checked);
       if (checked) {
         feauturesParams[feauture] = {
           type: feauture,
           params: checked
         }
       }
     }
   }
   for (let param in feauturesParams) {
     paramsData.push(feauturesParams[param])
   }
   // console.log('paramsData', paramsData);
   // console.log(paramsData);
   return paramsData
 }

 checkType(value) {
    let result = []
    // Если есть единицы измерения
    const isUnit = this.checkUnits(value)
    // console.log(value);
    if(isUnit) {
      result.push({value: isUnit})
      return result
      // console.log('isUnit result', result);
    }
    // // Если значений несколько
    const isMultiply = this.checkMultiple(value)
    if(isMultiply) {
      if(typeof isMultiply !== 'string') {
        result = isMultiply
        return result
        // console.log('isMultiply', isMultiply)
      } else {
        result.push({ value: value})
        return result
      }
    }
    // console.log('value', value);
    // console.log('result', result);
 }

  bodyObject() {
    const vendorCode = Math.floor(Math.random() * 1000000000)
    const { inputsData, feautures, selectData, sizesData, barcodes } = this.updates
    const body = {
      params: {
        card: {
          countryProduction: feautures['Страна производства'],
          object: selectData.productCategory,
          addin: [{...this.getConsist(inputsData.productConsist)},
            { type: "Бренд",
              params: [{ value: inputsData.productBrand}]
            },
            { type: "Тнвэд",
              params: [{ value: selectData.productTnved }]
            },
            ...this.collectFeautures(feautures)
          ],
          nomenclatures: [{
            vendorCode:  vendorCode.toString(),
            variations: this.getVariations({
                barcodes: barcodes,
                name: inputsData.productName,
                price: inputsData.productPrice,
                sizes: sizesData
              }),
              addin: [{...this.getImages(this.parseData.productImages)}]
            }
          ]
        }
      },
      id: this.parseData.extras.uuid,
      jsonrpc: '2.0'
    }
    return body
  }

  // Размеры
  getVariations(data) {
    let variationsData = ''
    if (data.sizes) {
       variationsData = this.sizeVariation(data)
    } else {
       variationsData = this.defaultVariation(data)
    }
    return variationsData
 }

 defaultVariation(data) {
   const product = [{
     barcode: data.barcodes[0],
     addin: [
       {
       type: "Розничная цена",
       params: [{ count: parseInt(data.price) }]
      }
    ]
   }]
   return product
 }

 sizeVariation(data) {
   let variationsData = []
   let index = 0
   for (let size in data.sizes) {
     variationsData.push(
      { barcode: data.barcodes[index],
        addin: [
          { type: "Розничная цена",
            params: [{ count: parseInt(data.price) }]
          },
          { type: 'Размер',
            params: [{ value: size.toUpperCase() }]
          },
          { type: "Рос. размер",
            params: [{ value: data.sizes[size] }]
          },
        ]
      })
     index++;
   }
   return variationsData
 }

  // Фотки
  getImages(data) {
    const images = { type: 'Фото', params: [] }
    for (let image of data.reverse()) {
      images.params.push({ value: image })
    }
    return images
  }

  // Состав
  getConsist(data) {
    const consist = { type: "Состав", params: [] }
    if (data) {
       const multipleConsists = data.split(', ')
        for (let item of multipleConsists) {
           const spaceIndex = item.lastIndexOf(' ')
           consist.params.push({
              value: item.slice(0, spaceIndex),
              count: parseInt(item.slice(spaceIndex + 1, -1))
           })
        }
        return consist
    } else {
       return {}
    }
  }

}

export { PrepareData }