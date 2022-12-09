const { Transaction, Product } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const userName = req.user.name
      const transactions = await Transaction.findAll({
        where: {
          bidderName: userName
        }
      })

      for (let i = 0; i < transactions.length; i++) {
        const product = await Product.findByPk(transactions[i].productId)
        transactions[i].dataValues.productName = product.name
        transactions[i].dataValues.sellerName = product.sellerName
        transactions[i].dataValues.tradingplace = product.tradingplace
      }
      res.send(transactions)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to get transactions.'
      })
    }
  }, 
  async bidding (req, res) {
    try {
      const userName = req.user.name
      const {
        productId,
        price
      } = req.body
      
      // get the highest price
      const product = await Product.findByPk(productId)

      if (!product) {
        return res.status(400).send({
          error: 'The product does not exist.'
        })
      }

      // check if the product is sold
      if (product.status == 2) {
        return res.status(400).send({
          error: 'The product is already out of stock.'
        })
      }

      // check the suggested price is higher
      if (price <= product.price) {
        return res.status(400).send({
          error: 'The suggested price is not highest.'
        })
      }

      // update the highest price of the product
      await product.update({
        price: price
      })

      // mark all the other trx's status as rejected
      await Transaction.update(
        {
          status: 0
        },
        {
          where: {
            productId: productId,
            status: 1
          }
        }
      )

      const transaction = await Transaction.create({
        productId: productId,
        bidderName: userName,
        price: price,
        status: 1
      })

      res.send(transaction)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to request bidding.'
      })
    }
  },
  async purchase (req, res) {
    try {
      const userName = req.user.name
      const productId = req.body.productId
      
      // get the highest price
      const product = await Product.findByPk(productId)
      if (!product) {
        return res.status(400).send({
          error: 'The product does not exist.'
        })
      }
      // check if the product is sold
      if (product.status == 2) {
        return res.status(400).send({
          error: 'The product is already out of stock.'
        })
      }

      const finalPrice = product.price * 2
      await product.update({
        price: finalPrice,
        status: 2
      })

      // mark all the other trx's status as rejected
      await Transaction.update(
        {
          status: 0
        },
        {
          where: {
            productId: productId,
            status: 1
          }
        }
      )

      const transaction = await Transaction.create({
        productId: productId,
        bidderName: userName,
        price: finalPrice,
        status: 2
      })

      res.send(transaction)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to get transactions.'
      })
    }
  }, 
  async getProductTransaction (req, res) {
    try {
      const productId = req.params.productId
      const sellerName = req.user.name
  
      const product = await Product.findByPk(productId)
  
      if (product.sellerName !== sellerName) {
        return res.status(400).send({
          error: 'You have no permisson.'
        })
      }
  
      const transactions = await Transaction.findAll({
        where: {
          productId: productId
        }
      })

      res.send({
        productName: product.name,
        transactions: transactions
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to find the transactions.'
      })
    }

  }
}