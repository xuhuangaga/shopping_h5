<template>
  <div>
    <img src="../../../assets/images/order.gif" class="wbfb">
    <div class="f-size20 t-a-center">登录后才能查看购物车</div>
    <div class="t-a-center m-t20"><van-button type="primary" @click="goto">请先登录</van-button></div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {},
  methods: {
    //跳转页面
    goto(){
      this.$utils.goto('/loginres','')
    }
  },
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
</style>