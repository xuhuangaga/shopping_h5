<template>
  <div>
    <div v-if="evaluateList" class="p-10" style="padding-top:310px">
      <div
        v-for="(item, index) in evaluateList"
        :key="index"
        class="flex border_b p-10"
      >
        <div>
          <img :src="item.image_path" width="100" height="100" />
        </div>
        <div class="wbfb m-l10" @click="gotoDetail(item.cid)">
          <div>{{ item.name }}</div>
          <div class="comment flex-j-end a-center">
            <van-icon name="chat-o" />
            <div class="comment_dv" @click.stop="goto(item)">
              评论晒单
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    evaluateList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //跳转页面
    goto(item) {
      this.$utils.goto("/commentcenter", JSON.stringify(item));
    },
    //跳转到详情页面
    gotoDetail(id) {
      this.$utils.goto('/detail', id);
    },
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.comment,
.comment_show {
  margin-top: 8vw;
  border: 1px solid red;
  border-radius: 15px;
  width: 90px;
  padding: 4px 15px;
  color: red;
  position: absolute;
  right: 10px;
}
.comment_dv {
  margin-left: 5px;
}
</style>