<template>
  <div class="bottom_dv">
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>商城</span>
        <template #icon="props">
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/classify">
        <span>分类</span>
        <template #icon="props">
          <i class="iconfont icon-fenlei"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" :badge="carNum" to="/carts"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" to="/myinfo">我的</van-tabbar-item>
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
      let count = "";
      //未登录清空下 购物车数量是0
      if (this.$store.state.user) {
        console.log(this.$store.state.carNum );
        if (this.$store.state.carNum) {
          this.$store.state.carNum !== 0
            ? (count = this.$store.state.carNum)
            : (count = "");
        }
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