import {Query, Field, client} from '@tilework/opus'

client.setEndpoint('http://localhost:4000/')


export const fetchCategories = async () => {

  //query
  const categoriesQuery = new Query('categories', true)
    .addField('name')

  //API call
  let result
  await client.post(categoriesQuery)
    .then((res) => (result = res))
  return result
}

export const fetchCategory = async (category) => {

  //query
  const categoryQuery = new Query('category', true)
    .addArgument('input', 'CategoryInput', category)
    .addField(new Field('products', true)
    .addFieldList(['name', 'gallery', 'inStock', 'description', 'category', 'brand', 'id'])
    .addField(new Field('prices')
        .addField('amount')
        .addField(new Field('currency')
          .addFieldList(['label', 'symbol'])
        )
      )
    .addField(new Field('attributes', true)
      .addFieldList(['name', 'type'])
      .addField(new Field('items', true)
        .addFieldList(['value', 'displayValue'])
      )
    )
    )

  //API call
  let result
  await client.post(categoryQuery)
    .then((res) => (result = res))
  return result
}


export const fetchProduct = async (id) => {

  //query
  const productQuery = new Query('product')
    .addArgument('id', 'String!', id)
    .addFieldList(['name', 'gallery', 'inStock', 'description', 'category', 'brand', 'id'])
    .addField(new Field('prices')
        .addField('amount')
        .addField(new Field('currency')
          .addFieldList(['label', 'symbol'])
        )
      )
    .addField(new Field('attributes', true)
      .addFieldList(['name', 'type'])
      .addField(new Field('items', true)
        .addFieldList(['value', 'displayValue'])
      )
    )
  
  //API call
  let result
  await client.post(productQuery)
    .then((res) => (result = res))
  return result  
}


export const fetchCurrency = async () => {

  //query
  const currencyQuery = new Query('currencies', true)
    .addField('label')
    .addField('symbol')

  //API call
  let result
  await client.post(currencyQuery)
    .then((res) => result = res)
  return result
}
 