<template>
  <div class="floor m-t20">
    <div class="flex-j-center a-center floor_title p-tb10">
      <div class="floor_yq f-c-w flex-j-center a-center">
        {{ index }}
      </div>
      <div class="m-l10 floor_name">{{ floorname }}</div>
    </div>
    <!-- goodsId 产品Id -->
    <div class="" v-if="floor.length === 5">
      <!-- 上面三个 -->
      <div class="flex-j-between a-center">
        <div class=" hbfb" @click="goto(floor[0].goodsId)">
          <img :src="floor[0].image" class="wbfb" />
        </div>
        <div>
          <div class="img_box" @click="goto(floor[1].goodsId)">
            <img :src="floor[1].image" class="wbfb" />
          </div>
          <div class="img_box_nb img_box" @click="goto(floor[2].goodsId)">
            <img :src="floor[2].image" class="wbfb" />
          </div>
        </div>
      </div>
      <!-- 下面两个 -->
      <div class="flex-j-between a-center hbfb">
        <div class="img_box hbfb img_box_t" @click="goto(floor[3].goodsId)">
          <img :src="floor[3].image" class="wbfb" />
        </div>
        <div class="img_box img_box_t" @click="goto(floor[4].goodsId)">
          <img :src="floor[4].image" class="wbfb" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    floor: {
      type: Array,
      required: true
    },
    index: {
      type: String
    },
    floorname: {
      type: String
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
.floor {
  .floor_title {
    background: #eee;
  }
  .floor_yq {
    background: red;
    border-radius: 100%;
    width: 30px;
    height: 30px;
  }
  .img_box {
    border-left: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .img_box_nb {
    border-bottom: none;
  }
  .img_box_t {
    border-top: 1px solid #eee;
  }
}
</style>   