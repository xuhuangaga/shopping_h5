<template>
  <div class="c_home_text">
    <topslot name="评价中心"></topslot>
    <div class="content_box flex-a-center p-10">
      <div><img :src="pro.image_path" width="150" height="150" /></div>
      <div>
        <div>商品评分</div>
        <div class="m-t20"><van-rate v-model="rate" /></div>
      </div>
    </div>
    <van-field
      v-model="content"
      rows="10"
      autosize
      type="textarea"
      placeholder="说说你的购买感受吧~~"
      show-word-limit
      class="comment_center_van_field"
    />
    <div class=" p-10">
      <!-- <van-radio-group v-model="isAnonymous">
        <van-radio name="isAnonymous"></van-radio>
      </van-radio-group> -->
      <input type="checkbox" v-model="isAnonymous"> 匿名评价
    </div>
    <div class="btnCommit p-l-r10 m-t20">
      <van-button type="primary" class="wbfb" @click="comitComment"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      pro: {},
      rate: 5,
      //评论内容
      content: "",
      //是否匿名
      isAnonymous: 0
    };
  },
  components: {
  },
  methods: {
    change(e) {
      console.log(this.isAnonymous);
    },
    //获取数据
    getData() {
      this.pro = JSON.parse(this.$route.query.id);
      // console.log(this.pro);
    },
    //提交评论
    comitComment() {
      if (!this.content.trim()) {
        this.$toast.fail("评论内容不能为空");
        return;
      }
      // console.log(this.isAnonymous);
      this.$api
        .subComment({
          id: this.pro.cid,
          rate: this.rate,
          content: this.content,
          anonymous: this.isAnonymous,
          _id: this.pro._id,
          order_id: this.pro.order_id,
          image: []
        })
        .then(res => {
          // console.log(res);
          if (res.code===200) {
            this.$toast(res.msg)
            this.$router.back()
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //获取数据
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>