import Api from '@/services/Api'

export default {
  getNumOfWishlist () {
    return Api().get('wishlist/total')
  },
  get () {
    return Api().get('wishlist')
  },
  delete (productId) {
    return Api().delete(`wishlist/${productId}`)
  },
  post (params) {
    return Api().post('wishlist', params)
  }
}