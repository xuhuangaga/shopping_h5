<template>
  <div class="c_home_text">
    <top class="f-size14 wbfb top_pom_box border_b">
      <template #center>
        购物车
      </template>
    </top>
    <div class="content_box">
      <nologin v-if="!user"></nologin>
      <div v-else>
        <nodata v-if="list.length === 0"></nodata>
        <div v-else>
          <havedata v-if="list.length > 0" :list="list" @del="del"></havedata>
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import nologin from "../../components/carts/nologin/NoLogin";
import bottom from "../../components/buttom/Buttom";
import nodata from "../../components/carts/nodata/NoData";
import havedata from "../../components/carts/havedata/HaveData";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: []
    };
  },
  components: {
    nologin,
    bottom,
    nodata,
    havedata
  },
  methods: {
    getData() {
      this.$api
        .getCarsData()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.list = res.shopList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除选中商品
    del() {
      this.list = this.list.filter(item => {
        return !item.check;
      });
      //修改vuex里面的购物车数量
      this.$store.commit("setCartsNum", this.list.length);
      //修改localstorage里面的购物车数量
      localStorage.setItem("carNum", this.list.length);
    }
  },
  mounted() {
    //获取数据
    this.getData();
  },
  computed: {
    //用户信息
    user() {
      return JSON.parse(this.$store.state.user);
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>