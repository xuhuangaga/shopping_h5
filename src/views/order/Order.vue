<template>
  <div class="c_home_text">
    <topslot name="我的订单"></topslot>
    <div class="content content_box">
      <van-tabs v-model="active">
        <van-tab title="全部">
          <div class="p-10">
            <completed v-if="list" :list="list"></completed>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div class="p-10 t-a-center">
            该功能待开发中...
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="p-10 t-a-center">
            该功能待开发中...
          </div></van-tab
        >
        <van-tab title="待收货">
          <div class="p-10 t-a-center">
            该功能待开发中...
          </div></van-tab
        >
        <van-tab title="已完成">
          <div class="p-10">
            <completed v-if="list" :list="list"></completed>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import completed from "../../components/order/Completed";
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      list: null
    };
  },
  components: {
    completed
  },
  methods: {
    //获取数据
    getData() {
      //选中标签key
      let id = this.$route.query.id;
      if (id) {
        this.active = Number(id);
      }
      //获取所有订单数据
      this.$api
        .myOrder()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.list = res.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.content {
  background: #f7f8fa;
  min-height: 600px;
  max-height: 100%;
}
</style>