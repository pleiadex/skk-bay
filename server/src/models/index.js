const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
)

fs
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        )
        db[model.name] = model
    })


db['Product'].belongsTo(db['User'], {as: 'seller'})             // Define seller (user Id) as fk in Product table
db['Transaction'].belongsTo(db['User'], {as: 'bidder'})         // Define bidder (user Id)as fk in Transaction table
db['Transaction'].belongsTo(db['Product'], {as: 'product'})     // Define product Id as fk in Transaction table
db['Wishlist'].belongsTo(db['User'], {as: 'user'})              // Define user Id as fk in Wishlist table
db['Wishlist'].belongsTo(db['Product'], {as: 'product'})        // Define product id as fk in Wishlist table


Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
})

console.log('db', db)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
