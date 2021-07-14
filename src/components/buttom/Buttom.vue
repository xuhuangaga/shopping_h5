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
      <van-tabbar-item icon="shopping-cart" :badge="carNum" url="carts"
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
    },
  },
  mounted() {},
  computed: {
    carNum() {
      let count = 0;
      //未登录清空下 购物车数量是0
      if (this.$store.state.user) {
        this.$store.state.carNum
          ? (count = this.$store.state.carNum)
          : (count = 0);
      } else {
        count = "";
      }
      return count;
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