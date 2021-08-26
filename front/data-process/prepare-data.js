// ПОДГОТОВКА ДАННЫХ ДЛЯ ДОБАВЛЕНИЕ КАРТОЧКИ

class PrepareData {
  constructor(parseData, updates) {
    this.parseData = parseData
    this.updates = updates
  }
  collect() {
    return this.bodyObject()
  }

  bodyObject() {
    const vendorCode = Math.floor(Math.random() * 1000000000)
    const { inputsData, feautures, selectData, sizesData, barcodes } = this.updates
    const country = this.parseData.details.params['Страна производства']
    const body = {
      params: {
        card: {
          name: inputsData.productName,
          countryProduction: country || 'Россия',
          object: selectData.productCategory,
          addin: [
            { type: "Бренд",
              params: [{ value: inputsData.productBrand}]
            },
            { type: "Наименование",
              params: [{ value: inputsData.productName}]
            },
            { type: "Описание",
              params: [{ value: this.parseData.details.desc}]
            },
            { type: "Тнвэд",
              params: [{ value: selectData.productTnved }]
            },
            {...this.getConsist(inputsData.productConsist)},
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

  collectFeautures(data) {
    const feauturesParams = {}
    const paramsData = []

    for (const feauture in data) {
      const value = data[feauture]
      feauturesParams[feauture] = {
        type: feauture, params: []
      }
      for(let feautureValues of value) {
        feauturesParams[feauture].params.push({
          value: feautureValues
        })
      }
    }

    for(let item in feauturesParams) {
      paramsData.push(feauturesParams[item])
    }

    return paramsData
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
       { type: "Розничная цена",
       params: [{ count: parseInt(data.price) }] }]
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
}

export { PrepareData }