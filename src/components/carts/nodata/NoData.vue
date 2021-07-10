<template>
  <div>
    <div class="m-t-b20 flex-j-center">
      <div class="yd flex-j-center a-center m-t-b20">
        <img src="../../../assets/images/shop.png" />
      </div>
    </div>
    <div class=" fs20 t-a-center">您的购物车还是空的</div>
    <div class="m-t20 flex-j-center">
      <div class="goShop p-10 t-a-center" @click="goto">
        去购物
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    //点击去购物
    goto(){
      this.$utils.goto('/','')
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.yd {
  background: #eee;
  width: 200px;
  height: 200px;
}
.goShop {
  border: 1px solid rgb(38,40,40);
  width: 100px;
  border-radius: 30px;
}
</style>