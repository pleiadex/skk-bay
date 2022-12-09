const AuthenticationController = require('./controllers/AuthenticationController')
const ProductController = require('./controllers/ProductController')
const TransactionController = require('./controllers/TransactionController')
const isAuthenticated = require('./policies/isAuthenticated')
const path = require('path')
const multer = require('multer')
const WishlistController = require('./controllers/WishlistController')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({storage: storage})

module.exports = (app) => {
  app.post('/register/user', 
    AuthenticationController.register
  )
  app.post('/login', 
    AuthenticationController.login
  )
  app.post('/user/:name',
    isAuthenticated,
    AuthenticationController.edit
  )
  app.get('/allusers',
    isAuthenticated,
    AuthenticationController.getAllUsers
  )
  app.get('/user/:name',
    isAuthenticated,
    AuthenticationController.get
  )
  app.delete('/user/:name',
    isAuthenticated,
    AuthenticationController.delete
  )
  app.post('/register/product',
    isAuthenticated,
    upload.array('image', 4),
    ProductController.register
  )
  app.get('/product/:productId',
    ProductController.get
  )
  app.post('/product/:productId/edit',
    isAuthenticated,
    ProductController.edit
  )
  app.delete('/product/:productId',
    isAuthenticated,
    ProductController.delete
  )
  app.post('/search',
    ProductController.getAllProduct
  )
  app.post('/search/:name',
    ProductController.search
  )
  app.get('/myproduct',
    isAuthenticated,
    ProductController.getMyProduct
  )
  app.post('/wishlist',
    isAuthenticated,
    WishlistController.register
  )
  app.delete('/wishlist/:productId',
    isAuthenticated,
    WishlistController.delete
  )
  app.get('/wishlist',
    isAuthenticated,
    WishlistController.index
  )
  app.get('/wishlist/total',
    isAuthenticated,
    WishlistController.getNumOfList
  )
  app.get('/transactions',
    isAuthenticated,
    TransactionController.index 
  )
  app.get('/transactions/:productId',
    isAuthenticated,
    TransactionController.getProductTransaction
  )
  app.post('/transactions/bidding',
    isAuthenticated,
    TransactionController.bidding 
  )
  app.post('/transactions/purchase',
    isAuthenticated,
    TransactionController.purchase 
  )
}