import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //城市定位
    city: localStorage.getItem("citys"),
    //登录的用户信息
    user: localStorage.getItem("h5_shopping_user"),
    // 购物车数量
    carNum:localStorage.getItem("carNum")
  },
  mutations: {
    //切换城市
    setCity(state, data) {
      state.city = data
    },
    //修改用户信息
    setUser(state, data) {
      state.user = data
    },
    //修改购物车数量
    setCartsNum(state, data) {
      state.carNum = data
    }
  },
  actions: {
  },
  modules: {
  }
})
