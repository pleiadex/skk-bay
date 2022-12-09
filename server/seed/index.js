const {
  sequelize,
  User,
  Product,
  Wishlist,
  // Transaction
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const products = require('./products.json')
const wishlists = require('./wishlists.json')
// const transactions = require('./transactions.json')

module.exports = () => {
sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      products.map(product => {
        Product.create(product)
      })
    )
    await Promise.all(
      wishlists.map(wishlist => {
        Wishlist.create(wishlist)
      })
    )
    // await Promise.all(
    //   transactions.map(transaction => {
    //     Transaction.create(transaction)
    //   })
    // )
  })
  .then(() => console.log('The initial data is created'))
}