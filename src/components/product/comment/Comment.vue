<template>
  <div class="p-10 ">
    <div v-for="(item, index) in comment" :key="index" class="p-10 border_b">
      <div class="flex-j-between a-center">
        <div class="comment_l">
          <img :src="item.anonymous?item.comment_avatar:item.user[0].avatar" width="50" height="50" />
        </div>
        <div class="m-l10 comment_r">
          <div class="flex-j-between a-center">
            <div>{{ item.anonymous?item.comment_nickname:item.user[0].nickname }}</div>
            <div>{{ item.comment_time }}</div>
          </div>
          <div class="m-t-b10">
            <van-rate v-model="item.rate" />
          </div>
        </div>
      </div>
      <div class="flex-j-between">
        <div class="comment_l"></div>
        <div class="m-l10 comment_r  o_hidden">
          <div class=" m-t-b20">评论内容:{{item.content}}</div>
          <div>评论{{ item.images.length }}张图片</div>
          <div class="m-t10">
            <img
              v-for="(item1, index1) in item.images"
              :key="index1"
              :src="item1.image"
            />
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
    comment: {
      type: Array
    }
  },
  data() {
    return {
      value: 3
    };
  },
  components: {},
  methods: {
  },
  mounted() {
    // console.log(this.comment);
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.comment_l {
  width: 15%;
}
.comment_r {
  width: 85%;
}
</style>