<template>
  <div class="address_dv">
    <div v-if="obj">
      <div class=" flex-j-around p-10"  @click="goto">
        <div class="flex-j-center a-center">
          <i class="iconfont icon-dizhiguanli"></i>
        </div>
        <div class="consignee">
          <div>收货人:{{obj.name}}</div>
          <div>收货地址:{{obj.addressDetail}}</div>
          <div class="orange f-size12">(收货不便时,可选择免费待收货服务)</div>
        </div>
        <div>
          <div>{{obj.tel}}</div>
        </div>
        <div class="flex-j-center a-center">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
    </div>
    <div v-else class="setAddress flex-j-center a-center" @click="goto">点击设置收货地址</div>
    <img src="../../../assets/images/caitiao.jpg" class="wbfb">
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    obj:{
      type:Object
    }
  },
  data() {
    return {
    };
  },
  components: {},
  methods: {
    //跳转页面
    goto(){
      //如果点击收货地址列表  需要存储一个本地数据 标识是从个人中心点击进入的地址列表
      localStorage.setItem("addresslistItem",0)
      this.$utils.goto('/addresslist')
    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.address_dv {
  min-height: 50px;
  .setAddress {
    text-decoration: underline;
    padding:20px;
  }
  .orange {
    color:#fbd4b6
  }
  .consignee {
    line-height: 30px;
  }
}
</style>