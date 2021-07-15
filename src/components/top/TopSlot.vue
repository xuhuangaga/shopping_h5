<template>
  <div>
    <top class="f-size14 wbfb top_pom_box border_b">
      <template #left>
        <i class="iconfont icon-zjt f-size20" @click="goBack"></i>
      </template>
      <template #center>
        {{ name }}
      </template>
    </top>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //返回上一页
    goBack() {
      switch (this.$route.path) {
        case "/addresslist":
          if (!Number(localStorage.getItem("addresslistItem"))) {
            this.$utils.goto("/pay");
          } else {
            this.$router.push("/myinfo");
          }
          break;
        case "/pay":
          if (Number(localStorage.getItem("idDirect"))) {
            let pro = JSON.parse(localStorage.getItem('checked'))[0]
            //直接购买进入的结算页 回到产品详情
            this.$utils.goto("/detail",pro.id);
          } else {
            //购物车进入的结算页 回到购物车页面
            this.$router.push("/carts");
          }
          break;
        default:
          //如果是编辑地址  返回地址列表
          this.$router.back();
          break;
      }
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>