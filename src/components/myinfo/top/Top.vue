<template>
  <div>
    <div class=" flex-j-around a-center p-tb20 p-l-r10 border_b">
      <div @click="checkLoginGoto('/orders', 1)">
        <div class=" t-a-center"><i class="iconfont icon-qianbao"></i></div>
        <div>待付款</div>
      </div>
      <div @click="checkLoginGoto('/orders', 2)">
        <div class=" t-a-center">
          <i class="iconfont icon-icon-test"></i>
        </div>
        <div>待发货</div>
      </div>
      <div @click="checkLoginGoto('/orders', 3)">
        <div class=" t-a-center"><i class="iconfont icon-nogoods"></i></div>
        <div>待收货</div>
      </div>
      <div @click="checkLoginGoto('/evaluate')">
        <div class=" t-a-center">
          <van-badge :content="evaluate">
            <i class="iconfont icon-pingjia"></i>
          </van-badge>
        </div>
        <div>评价</div>
      </div>
      <div @click="checkLoginGoto('/orders', 4)">
        <div class=" t-a-center">
          <i class="iconfont icon-yiwancheng-"></i>
        </div>
        <div>已完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      //未评价的数量
      evaluate: 0,
      //点击的是哪一个订单类型
      index: 0
    };
  },
  components: {},
  methods: {
    //获取未评价信息
    getTobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.evaluate = res.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击跳转
    checkLoginGoto(item, item1) {
      this.index = item1;
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.goto,
        item: item
      });
    },
    //跳转页面
    goto(url) {
      //本页面所有功能都需要登录
      //如果点击收货地址列表  需要存储一个本地数据 标识是从个人中心点击进入的地址列表
      localStorage.setItem("addresslistItem", 1);
      this.$utils.goto(url, this.index);
    }
  },
  mounted() {
    this.getTobeEvaluated();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>