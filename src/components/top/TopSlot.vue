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
       this.$router.back();
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>