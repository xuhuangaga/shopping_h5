<template>
  <div class="classify">
    <div class="box bg-c-w  flex-j-around a-center">
      <div v-for="(item, index) in category" class="box_dv">
        <div @click="goto(item.bxMallSubDto[0].mallSubId, index)">
          <img :src="item.image" class="wbfb hbfb" />
        </div>
        <div
          class="f-size12 c_home_text"
          @click="goto(item.bxMallSubDto[0].mallSubId)"
        >
          {{ item.mallCategoryName }}
        </div>
      </div>
    </div>
    <div class="m-t20">
      <img :src="advertesPicture" class="wbfb" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category: {
      type: Array,
      required: true
    },
    advertesPicture: {
      type: String
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //跳转页面
    goto(id, index) {
      this.$router.push({
        path: "/classify",
        query: {
          id: id,
          index: index
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
.classify {
  margin-top: -5px;
  padding: 20px 10px;
  background: #eee;
  .box {
    border-radius: 8px;
    .box_dv {
      width: 20%;
      padding: 10px;
    }
  }
}
</style>