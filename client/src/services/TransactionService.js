import Api from '@/services/Api'

export default {
  get () {
    return Api().get('transactions')
  },
  getProductTransaction (productId) {
    return Api().get(`transactions/${productId}`)
  },
  bidding (params) {
    return Api().post('transactions/bidding', params)
  },
  purchase (params) {
    return Api().post('transactions/purchase', params)
  }
}