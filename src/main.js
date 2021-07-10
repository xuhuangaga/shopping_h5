import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import api from './http/api'
import top from './components/top/Top.vue'
import bottom from './components/buttom/Buttom.vue'
import {Toast,Dialog} from 'vant'
import utils from './utils'
import topslot from "./components/top/TopSlot";


//把api挂载成全局变量
Vue.prototype.$api=api
//挂载公共的js
Vue.prototype.$toast=Toast
Vue.prototype.$dialog=Dialog
Vue.prototype.$utils=utils

//注册全局组件Top
Vue.component('top',top)
Vue.component('bottom',bottom)
Vue.component('topslot',topslot)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
