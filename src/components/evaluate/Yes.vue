<template>
  <div>
    <div v-if="alreadyEvaluated" class="p-10" style="padding-top:310px">
      <div
        v-for="(item, index) in alreadyEvaluated"
        :key="index"
        class="flex border_b p-10"
         @click="gotoDetail(item.cid)"
      >
        <div>
          <img :src="item.goods[0].image_path" width="100" height="100" />
        </div>
        <div class="wbfb m-l10">
          <div>{{ item.goods[0].name }}</div>
          <div class="comment_show flex-j-end a-center">
            <van-icon name="chat-o" />
            <div class="no_comment_dv" @click.stop="gotodetail(item.cid, item._id)">
              查看评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    alreadyEvaluated: {
      type: Array
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    gotodetail(cid, _id) {
      this.$router.push({
        path: "/evaluatedetail",
        query: {
          id: cid,
          _id: _id
        }
      });
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
.no_comment_dv {
  margin-left: 5px;
}
.comment,
.comment_show {
  margin-top: 8vw;
  border-radius: 15px;
  width: 90px;
  padding: 4px 15px;
  position: absolute;
  right: 10px;
  color: #6c6c6c !important ;
  border: 1px solid #6c6c6c !important;
}
</style>