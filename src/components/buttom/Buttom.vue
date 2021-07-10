<template>
  <div class="bottom_dv">
    <van-tabbar v-model="active" route>
      <van-tabbar-item url="/">
        <span>商城</span>
        <template #icon="props">
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item url="/classify">
        <span>分类</span>
        <template #icon="props">
          <i class="iconfont icon-fenlei"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart"
        :badge="carNum ? carNum : 0"
        url="carts"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" url="myinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0
    };
  },
  components: {},
  methods: {
    //跳转页面
    goto(url, id) {
      if (url != this.$route.path) {
        this.$utils.goto(url, id);
      }
    }
  },
  mounted() {},
  computed: {
    carNum() {
      return this.$store.state.carNum;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.bottom_dv {
  margin-top: 60px;
  .iconfont {
    font-size: 22px;
  }
}
</style>