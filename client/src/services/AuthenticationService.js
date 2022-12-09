import Api from '@/services/Api'

export default {
  register (params) {
    return Api().post('register/user', params)
  },
  login (params) {
    return Api().post('login', params)
  },
  get (name) {
    return Api().get(`user/${name}`)
  },
  edit (name, params) {
    return Api().post(`user/${name}`, params)
  },
  getAllUsers () {
    return Api().get('allusers')
  },
  delete (name, params) {
    return Api().delete(`user/${name}`, params)
  }
}