<template>
  <div class="pay_submit_van-submit-bar">
    <div class="content">
      <div
        class=" flex-j-around a-center p-10 border_b"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="car_proimg" @click="goto('/detail', item.cid)">
          <img :src="item.image_path" width="100" height="100" />
        </div>
        <div>
          <div
            class="floor_name car_proname sl-one"
            @click="goto('/detail', item.cid)"
          >
            {{ item.name }}
          </div>
          <div class="floor_name">￥{{ item.mallPrice.toFixed(2) }}</div>
        </div>
        <div>x {{ item.count }}</div>
      </div>
    </div>
    <van-submit-bar
      :price="totalMoney * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      required: true
    },
    totalMoney: {
      type: Number,
      required: true
    },
    obj: {
      type: Object
    },
    idDirect: {
      type: Number
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //跳转页面
    goto(url, id) {
      this.$utils.goto(url, id);
    },
    //提交订单
    onSubmit() {
      if (this.obj) {
        let ids = [];
        let count = this.list[0].count;
        this.list.map(item => {
          ids.push(item.cid);
        });

        this.$api
          .pay({
            address: this.obj.address,
            tel: this.obj.tel,
            orderId: ids,
            totalPrice: this.totalMoney,
            idDirect: this.idDirect ? true : false,
            count: count
          })
          .then(res => {
            if (res.code === 200) {
              //修改购物车数量
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
              this.$toast(res.msg);
              this.goto("/", "");
            }
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast("无收货地址,无法购买");
      }
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.content {
  margin-bottom: 45px;
  .car_proimg {
    border: 1px solid #eee;
    padding: 5px;
  }
  .car_proname {
    width: 150px !important;
    margin-bottom: 50px;
  }
}
</style>