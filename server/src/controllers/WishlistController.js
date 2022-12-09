const { Wishlist, Product } = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const productId = req.body.productId
      const userName = req.user.name
  
      const oldWishlist = await Wishlist.findAll({
        where: {
          userName: userName,
          productId: productId
        }
      })
      if (oldWishlist.length !== 0) {
        return res.status(400).send(
          {
            error: 'You already have the product in the wishlist.'
          }
        )
      }

      const wishlist = await Wishlist.create({
        userName: userName,
        productId: productId
      })
      res.send(wishlist)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to register a wishlist.'
      })
    }
  },
  async index (req, res) {
    try {
      const userName = req.user.name
  
      const wishlists = await Wishlist.findAll({
        where: {
          userName: userName
        }
      })

      for (let i = 0; i < wishlists.length; i++) {
        const product = await Product.findByPk(
          wishlists[i].productId
        )
        wishlists[i].dataValues.productName = product.name
        wishlists[i].dataValues.price = product.price
        wishlists[i].dataValues.tradingplace = product.tradingplace
        wishlists[i].dataValues.sellerName = product.sellerName
        wishlists[i].dataValues.status = product.status
        wishlists[i].dataValues.image = product.image1


      }
      res.send(wishlists)

    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to get wishlist.'
      })
    }
  },
  async delete (req, res) {
    try {
      const userName = req.user.name
      const productId = req.params.productId

      const wishlist = await Wishlist.findOne({
        where: {
          userName: userName,
          productId: productId
        }
      })
      // console.log(wishlists)
      await wishlist.destroy()
      res.send(wishlist)

    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Failed to delete the wishlist.'
      })
    }
  },
  async getNumOfList (req, res) {
    try {
      const userName = req.user.name

      const wishlist = await Wishlist.findAll({
        where: {
          userName: userName
        }
      })
      res.send(`${wishlist.length}`)

    } catch (err) {
      res.status(500).send({
        error: 'Failed to get wishlist.'
      })
    }
  },
}