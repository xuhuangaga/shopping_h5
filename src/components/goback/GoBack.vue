<template>
  <div>
    <div class="go_back yd flex-j-around a-center">
      <i class="iconfont icon-zjt f-c-w" @click="goBack"></i>
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
    //返回
    goBack() {
      this.$router.back();
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.go_back {
  z-index: 999;
  width: 50px;
  height: 50px;
  background: #999;
  position: fixed;
  top: 10px;
  left: 10px;
  .iconfont {
    font-size: 25px;
  }
}
</style>