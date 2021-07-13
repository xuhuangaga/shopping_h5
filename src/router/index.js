import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/product/Detail.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('../views/classify/Classify.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/citys',
    name: 'Citys',
    component: () => import('../views/citys/Citys.vue'),
    meta: {
      title: '城市列表'
    }
  },
  {
    path: '/loginres',
    name: 'LoginRes',
    component: () => import('../views/loginres/LoginRes.vue'),
    meta: {
      title: '登录/注册'
    }
  },
  {
    path: '/carts',
    name: 'Carts',
    component: () => import('../views/carts/Carts.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/myinfo',
    name: 'MyInfo',
    component: () => import('../views/myinfo/MyInfo.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import('../views/buy/Buy.vue'),
    meta: {
      title: '立即购买'
    }
  },
  {
    path: '/editinfo',
    name: 'EditInfo',
    component: () => import('../views/myinfo/EditInfo.vue'),
    meta: {
      title: '编辑资料'
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/pay/Pay.vue'),
    meta: {
      title: '结算'
    }
  },
  {
    path: '/editaddress',
    name: 'Edit',
    component: () => import('../views/address/Edit.vue'),
    meta: {
      title: '编辑收货地址'
    }
  },
  {
    path: '/addresslist',
    name: 'List',
    component: () => import('../views/address/List.vue'),
    meta: {
      title: '收货地址列表'
    }
  },
  {
    path: '/addaddress',
    name: 'Add',
    component: () => import('../views/address/Add.vue'),
    meta: {
      title: '新增收货地址'
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/collection/Collection.vue'),
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/history/History.vue'),
    meta: {
      title: '浏览历史'
    }
  },
  {
    path: '/orders',
    name: 'Order',
    component: () => import('../views/order/Order.vue'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/evaluate',
    name: 'Evaluate',
    component: () => import('../views/evaluate/Evaluate.vue'),
    meta: {
      title: '评价列表'
    }
  },
  {
    path: '/commentcenter',
    name: 'CommentCenter',
    component: () => import('../views/evaluate/CommentCenter.vue'),
    meta: {
      title: '评价中心'
    }
  },
  {
    path: '/evaluatedetail',
    name: 'EvaluateDetail',
    component: () => import('../views/evaluate/EvaluateDetail.vue'),
    meta: {
      title: '评价详情'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
