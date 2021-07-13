<template>
  <div class="banner t-a-center hbfb p-relative border_b">
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="(item, index) in 2"
        :key="index"
        class=" flex-j-center a-center"
      >
        <img :src="info.image" @click="HandleclickImg(index)" class="wbfb hbfb"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "",
  props: {
    // 商品对象
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  methods: {
    //预览详情图
    HandleclickImg(index) {
      ImagePreview({
        images: [this.info.image, this.info.image],
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>