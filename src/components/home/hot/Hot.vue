<template>
  <div class="c_home_text hbfb">
    <div class="flex-j-center a-center floor_title p-tb10">
      <div class="floor_name m-l10">热销商品</div>
    </div>
    <div class="flex-a-center hot_dv">
      <div v-for="(item, index) in hot" :key="index" class="hbfb pro_dv p-10">
        <img :src="item.image" class="wbfb hbfb" @click="goto(item.goodsId)"/>
        <div class="pro_name p-l-r10" @click="goto(item.goodsId)">{{ item.name }}</div>
        <div class=" flex-j-center a-center m-t-b10">
          <div class="f-size16">￥{{ item.price }}</div>
          <div class="f-size14 zhx floor_name">￥{{ item.mallPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    hot: {
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
      this.$utils.goto("/detail", id);
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.pro_name {
  width: 170px !important;
}
.hot_dv {
  flex-wrap: wrap;
}
.floor_title {
  background: #eee;
}
.pro_dv {
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  width: 44%;
  &:nth-child(2n) {
    border-right: none;
  }
}
</style>