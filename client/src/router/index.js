import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Product from '@/components/Product'
import Post from '@/components/Post'
import Layout from '@/components/Layout'
import MyPage from '@/components/MyPage'
import Login from '@/components/Login'
import UserRegister from '@/components/UserRegister'
import ProductRegister from '@/components/ProductRegister'
import UserList from '@/components/UserList'
import SaleHistory from '@/components/SaleHistory'
import PurchaseHistory from '@/components/PurchaseHistory'
import ProductTransaction from '@/components/ProductTransaction'
import UserEdit from '@/components/UserEdit'
import ProductEdit from '@/components/ProductEdit'
import Wishlist from '@/components/Wishlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'/',
          component:Home,
          name:'Home'
        },
        {
          path:'/shop',
          component:Shop,
          name:'Shop'
        },
        {
          path:'/shop/:keyword',
          component:Shop,
          name:'Shop'
        },
        {
          path:'/product/:id',
          component:Product,
          name:'Product'
        },
        {
          path:'/post',
          component:Post,
          name:'Post'
        },
        {
          path:'/mypage',
          component:MyPage,
          name:'MyPage'
        },
        {
          path:'/login',
          component:Login,
          name:'Login'
        },
        {
          path:'/register/user',
          component:UserRegister,
          name:'UserRegister'
        },
        {
          path:'/register/product',
          component:ProductRegister,
          name:'ProductRegister'
        },
        {
          path:'/userlist',
          component:UserList,
          name:'UserList'
        },
        {
          path:'/salehistory',
          component:SaleHistory,
          name:'SaleHistory'
        },
        {
          path: '/transactions/:productId',
          component:ProductTransaction,
          name: 'ProductTransaction'
        },
        {
          path:'/purchasehistory',
          component:PurchaseHistory,
          name:'PurchaseHistory'
        },
        {
          path:'/user/:name/edit',
          component:UserEdit,
          name:'UserEdit'
        },
        {
          path:'/product/:id/edit',
          component:ProductEdit,
          name:'ProductEdit'
        },
        {
          path:'/wishlist',
          component:Wishlist,
          name:'Wishlist'
        }
      ]

    }
  ],
    mode:'history'
})
