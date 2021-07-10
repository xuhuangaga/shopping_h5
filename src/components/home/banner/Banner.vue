<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in slides" :key="index">
        <img :src="item.image" class="wbfb hbfb" @click="goto(item.goodsId)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //跳转页面 
    goto(id) {
      this.$utils.goto('/detail',id)
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>