const { Op } = require('sequelize');
const { User, Product, Transaction } = require('../models');

module.exports = {
  async register (req, res) {
    try {
      console.log('product insert')
      const sellerName = req.user.name
      const {
        name,
        price,
        tradingplace,
        description
      } = req.body;

      console.log(JSON.stringify(req.files))

      const images = req.files;
      const fileNames = images.map(image => image.filename)
      console.log(fileNames)

      if (images === undefined) {
        return res.status(400).send({
          error: 'Failed to upload the image.'
        })
          
      }

      let filteredPrice;
      if (!price) {
        filteredPrice = 1000
      } else {
        filteredPrice = price
      }
      const serverUrl = 'http://localhost:8081/images/'
      const productData = {
        name: name,
        price: filteredPrice,
        tradingplace: tradingplace,
        status: 1,
        description: description,
        image1: serverUrl + fileNames[0],
        image2: serverUrl + fileNames[1],
        image3: serverUrl + fileNames[2],
        image4: serverUrl + fileNames[3],
        sellerName: sellerName
      }
      const product = await Product.create(productData)
      const productJson = product.toJSON()
      res.send(productJson)

      // const absPath = path.resolve(__dirname, '../../' + image)
      // res.status(200).sendFile(absPath)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to register a product'
      })
    }
  },
  async edit (req, res) {
    try {
      const sellerName = req.user.name
      const productId = req.params.productId
      const {
        name,
        price,
        tradingplace,
        description
      } = req.body;

      const oldProduct = await Product.findByPk(productId)
      if (!oldProduct) {
        return res.status(403).send({
          error: 'The product is not found.'
        })
      }
      if (oldProduct.sellerName !== sellerName) {
        return res.status(400).send({
          error: 'You have no permission on this product.'
        })
      }

      const newProduct = await oldProduct.update({
        name: name,
        price: price,
        tradingplace: tradingplace,
        description: description
      })
      res.send(newProduct)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to edit the product info.'
      })
    }
  },
  async get (req, res) {
    try {
      const productId = req.params.productId

      const product = await Product.findByPk(productId)

      if (!product) {
        return res.status(403).send({
          error: 'The product is not found.'
        })
      }

      const user = await User.findByPk(product.sellerName)
      

      const transaction = await Transaction.findAll({
        where: {
          productId: productId
        }
      })
      product.dataValues.numOfBidding = transaction.length
      product.dataValues.sellerPhonenumber = user.phonenumber
      res.send(product)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to get the product.'
      })
    }
  },
  async getAllProduct (req, res) {
    try {
      let minPrice = req.body.minPrice
      let maxPrice = req.body.maxPrice

      if (minPrice === undefined) {
        minPrice = 0
      } 
      if (maxPrice === undefined) {
        maxPrice = 1000000
      }

      console.log(`${minPrice} : ${maxPrice}`)

      const products = await Product.findAll({
        where: {
          price: {
            [Op.between]: [minPrice, maxPrice]
          }
        }
      })
      res.send(products)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to get the product.'
      })
    }
  },
  async getMyProduct (req, res) {
    try {
      const userName = req.user.name
      const products = await Product.findAll({
        where: {
          sellerName: userName
        }
      })

      for (let i = 0; i < products.length; i++) {
        // products[i].dataValues.image1 = 'http://localhost:8081/images/' + products[i].dataValues.image1 

        const transaction = await Transaction.findAll({
          where: {
            productId: products[i].id
          }
        })
        products[i].dataValues.numOfBidding = transaction.length
      }
      res.send(products)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to get the product.'
      })
    }
  },
  async delete (req, res) {
    try {
      const sellerName = req.user.name
      const productId = req.params.productId

      const product = await Product.findByPk(productId)

      if (product.sellerName !== sellerName) {
        return res.status(403).send({
          error: 'You have no permission.'
        })
      }

      await product.destroy()

      res.send(`Successfully deleted the product which name is ${product.name}.`)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to delete the product.'
      })
    }
  }, 
  async search (req, res) {
    try {
      // search by productName, price, sellerName
      const name = req.params.name
      let {
        minPrice,
        maxPrice
      } = req.body

      if (minPrice === undefined) {
        minPrice = 0
      } 
      if (maxPrice === undefined) {
        maxPrice = 1000000
      }

      const products = await Product.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              name: { 
                [Op.like]: `%${name}%` 
              },
              sellerName: 
              {
                [Op.like]: `%${name}%` 
              }
            },
            price: {
              [Op.between]: [minPrice, maxPrice]
            }
          }
        }
      })
      res.send(products)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to search products.'
      })
    }
  }
}