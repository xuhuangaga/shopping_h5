<template>
  <div class="c_home_text">
    <topslot name="评价详情"></topslot>
    <div class="content_box">
      <div class=" flex-j-between a-center p-10">
        <div class="avatar yd p-10">
          <img :src="user.avatar" width="40" height="40" />
        </div>
        <div>
          <div>{{ evaluateOne.anonymous?'匿名人士':user.nickname}}</div>
          <div class="m-t10"><van-rate v-model="evaluateOne.rate" :size="10"/></div>
        </div>
        <div>{{ evaluateOne.comment_time }}</div>
      </div>
    </div>
    <div class="p-10 border_b">评价内容:{{ evaluateOne.content }}</div>
    <div class="content">
      <div
        class="flex-j-between a-center p-10"
        v-for="(item, index) in evaluateOne.goods"
        :key="index"
      >
        <div>
          <img
            :src="item.image_path"
            width="60"
            height="60"
            @click="goto('/detail', item.id)"
          />
        </div>
        <div @click="goto('/detail', item.id)">{{ item.name }}</div>
        <div class="car_dv yd p-10" @click="addCar(item.id)">
          <i class="iconfont icon-27"></i>
        </div>
      </div>
    </div>
    <div class="goback wbfb">
      <van-button type="primary" class="wbfb" @click="goBack">返回</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      evaluateOne: {},
      user:{}
    };
  },
  components: {
  },
  methods: {
    //获取数据
    getData() {
      this.$api
        .evaluateOne({
          id: this.$route.query.id,
          _id: this.$route.query._id
        })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.evaluateOne = res.evaluateOne;
            this.user = res.evaluateOne.user[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转页面
    goto(url, id) {
      this.$utils.goto(url, id);
    },
    //加入购物车
    addCar(id) {
      this.$api
        .addShop({
          id: id
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
    //返回
    goBack() {
      this.$router.back();
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
.avatar {
  border: 1px solid #eee;
}
.car_dv {
  background: #ffe6e2;
  .iconfont {
    color: red;
    font-size: 20px;
  }
}
.goback {
  position: fixed;
  bottom: 0px;
  left: 0px;
}
.content {
  margin-bottom: 50px;
}
</style>