<template>
  <div class="c_home_text">
    <div class="p-10 border_bc">商品推荐</div>
    <!-- 这里是父盒子 -->
    <div class="flex o_hidden" ref="wrapper">
      <!-- 这里是子盒子，即滚动区域 -->
      <div class="flex-a-center" style="flex:1">
        <div
          v-for="(item, index) in recommend"
          :key="index"
          class="hbfb pro_dv p-10"
          ref="pro_dv"
        >
          <img
            :src="item.image"
            width="120"
            height="120"
            @click="goto('/detail', item.goodsId)"
          />
          <div class="pro_name p-l-r10" @click="goto('/detail', item.goodsId)">
            {{ item.goodsName }}
          </div>
          <div class="flex a-center m-t10 p-l-r10">
            <div class=" f-size16">￥{{ item.price }}</div>
            <div class=" f-size14 zhx">￥{{ item.mallPrice }}</div>
          </div>
          <div class="flex a-center p-l-r10 m-t10">
            <div
              class="add_car flex-j-center a-center"
              @click="checkLoginAddCar(item.goodsId)"
            >
              <i class="iconfont icon-ziyuan f-c-w"></i>
            </div>
            <div
              class="detail f-c-w f-size12 t-a-center flex-j-center a-center"
              @click="goto('/detail', item.goodsId)"
            >
              查看详情
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
    recommend: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {},
  created: function() {},
  methods: {
    //横向滚动
    personScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false
          });
        }
      });
    },
    //加入购物车
    addCar(item) {
      this.$api
        .addShop({
          id: item
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
            this.$toast.success(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转
    goto(url, id) {
      this.$utils.goto(url, id);
    },
    //检查是否登录 并执行下一步操作
    checkLoginAddCar(item) {
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.addCar,
        item: item
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  computed: {
    //获取登录的用户信息
    user() {
      return this.$store.state.user;
    },
    //获取购物车数量
    carNum() {
      return this.$store.state.carNum;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.pro_dv {
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  width: 124px;
  &:nth-child(1) {
    border-left: 1px solid #ccc;
  }
}

.add_car,
.detail {
  height: 25px;
}
.add_car {
  background: rgb(254, 202, 58);
  width: 30%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.detail {
  background: rgb(255, 76, 56);
  width: 70%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>