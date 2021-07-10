<template>
  <div>
    <van-goods-action class="product_detail">
      <van-goods-action-icon
        icon="shop-o"
        text="首页"
        class="btn_addcars"
        url="/"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="carNum ? carNum : 0"
        url="/carts"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="checkLoginAddCar"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="bottomShow = true"
      />
    </van-goods-action>
    <van-popup
      v-model="bottomShow"
      position="bottom"
      :style="{ height: '38%' }"
      :close-on-click-overlay="false"
    >
      <div class="flex-j-between p-10 border_b">
        <div class="m-t10 flex">
          <div class="pro_detail_img">
            <img :src="info.image_path" width="100" height="100" />
          </div>
          <div class="m-l10 p-l10">
            <div>{{ info.name }}</div>
            <div class="floor_name">￥{{ info.present_price }}</div>
          </div>
        </div>
        <div class="m-t10" @click="bottomShow = false">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
      <div class=" flex-a-center p-10">
        <div>
          <div>购买数量:</div>
          <div class="flex-a-center">
            <div class="amount m-t-b10">剩余 {{ info.amount }} 件</div>
            <div class="floor_name m-l10 " style="margin-top:-2px">
              每人限购{{50}}件
            </div>
          </div>
        </div>
        <div class=" m-l10 p-l-r20">
          <van-stepper v-model="num" :max="50" :integer="true" />
        </div>
      </div>
      <div class="wbfb f-c-w buy t-a-center p-tb10" @click="checkLoginBuy">立即购买</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    // 商品对象
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //底部弹框是否显示
      bottomShow: false,
      num: 1
    };
  },
  components: {},
  methods: {
    //加入购物车 必须登录
    addCar() {
      this.$api
          .addShop({
            id: this.info.id
          })
          .then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.$api
                .getCarsData()
                .then(res => {
                  // console.log(res);
                  if (res.code === 200) {
                    //修改vuex里面的购物车数量
                    this.$store.commit("setCartsNum", res.shopList.length);
                    //修改localstorage里面的购物车数量
                    localStorage.setItem("carNum", res.shopList.length);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
            this.$toast.success(res.msg);
          })
          .catch(err => {
            console.log(err);
          });
    },
    //立即购买 必须登录
    buy() {
      this.$set(this.info,'cid',this.info.id)
        this.$set(this.info,'mallPrice',this.info.present_price)
        this.info.count = this.num
        let checked = []
        checked.push(this.info)
        localStorage.setItem('checked',JSON.stringify(checked))
        localStorage.setItem('totalMoney',this.num*this.info.present_price)
        localStorage.setItem('idDirect',1)
        this.$utils.goto('/pay','')
    },
    //点击加入购物车
    checkLoginAddCar(){
      this.$utils.checkLogin({
        key:'h5_shopping_user',
        next:this.addCar
      })
    },
    //点击立即购买
    checkLoginBuy(){
       this.$utils.checkLogin({
        key:'h5_shopping_user',
        next:this.buy
      })
    }
  },
  mounted() {},
  computed: {
    //获取购物车数量
    carNum() {
      return this.$store.state.carNum;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.buy {
  background: rgb(255, 68, 68);
}
.pro_detail_img {
  z-index: 999;
  border: 1px solid #eee;
}
.icon-guanbi {
  font-size: 22px;
}
.amount {
  color: #ccc;
}
.floor_name {
  margin-top: 40px;
}
</style>