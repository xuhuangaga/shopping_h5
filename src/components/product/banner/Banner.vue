<template>
  <div class="banner t-a-center hbfb p-relative border_b">
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="(item, index) in 2"
        :key="index"
        style="height:500px"
      >
        <img
          :src="info.image_path"
          @click="HandleclickImg(index)"
          v-for="(item, index) in 2"
          width="375"
          height="375"
        />
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
.banner {
  img {
    position: absolute;
    top: 60px;
    left: 0px;
  }
}
</style>