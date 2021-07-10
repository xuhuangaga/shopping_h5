<template>
  <div class="flex-j-between a-center p-10 hpm_top">
    <div><slot name="left"></slot></div>
    <div><slot name="center"></slot></div>
    <div><slot name="right"></slot></div>
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
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
  .hpm_top {
    background: #eee;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
  }
</style>