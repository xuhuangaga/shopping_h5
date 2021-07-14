<template>
  <div class="loding_dv a-center flex-j-center">
    <van-loading :size="size">
      <div v-html="text"></div>
    </van-loading>
    
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    show:{
      type:Boolean,
      default:true
    },
    text:{
      type:String,
      default:'加载中...'
    },
    size:{
      type:String,
      default:'24px'
    }
  },
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
.loding_dv {
  background: #eee;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
}
</style>