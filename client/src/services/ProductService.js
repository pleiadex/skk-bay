import Api from '@/services/Api'

export default {
  register (params, meta) {
    return Api().post('register/product', params, meta)
  },
  getMyProducts () {
    return Api().get('myproduct')
  },
  delete (productId) {
    return Api().delete(`product/${productId}`)
  },
  get (productId) {
    return Api().get(`product/${productId}`)
  },
  edit (productId, params) {
    return Api().post(`product/${productId}/edit`, params)
  },
  search (keyword, params) {
    return Api().post(`search/${keyword}`, params)
  }

}