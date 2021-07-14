<template>
  <div>
    <div
      class=" flex-j-between a-center p-10 border_b"
      @click="checkLoginGoto('/orders')"
    >
      <div class=" flex-a-center">
        <div><i class="iconfont icon-quanbudingdan"></i></div>
        <div class="m-lr5">全部订单</div>
      </div>
      <div><i class="iconfont icon-youjiantou"></i></div>
    </div>
    <!-- <div class=" border_b" style="height:20px"></div> -->
    <div
      class=" flex-j-between a-center p-10 border_b"
      @click="checkLoginGoto('/collection')"
    >
      <div class=" flex-a-center">
        <div><i class="iconfont icon-shoucang"></i></div>
        <div class="m-lr5">收藏商品</div>
      </div>
      <div><i class="iconfont icon-youjiantou"></i></div>
    </div>
    <div
      class=" flex-j-between a-center p-10 border_b"
      @click="checkLoginGoto('/addresslist')"
    >
      <div class=" flex-a-center">
        <div><i class="iconfont icon-dizhiguanli"></i></div>
        <div class="m-lr5">地址管理</div>
      </div>
      <div><i class="iconfont icon-youjiantou"></i></div>
    </div>
    <div
      class=" flex-j-between a-center p-10 border_b"
      @click="checkLoginGoto('/history')"
    >
      <div class=" flex-a-center">
        <div><i class="iconfont icon-liulan"></i></div>
        <div class="m-lr5">最近浏览</div>
      </div>
      <div><i class="iconfont icon-youjiantou"></i></div>
    </div>
    <div
      class=" flex-j-between a-center p-10 border_b"
      @click="checkLoginClear"
    >
      <div class=" flex-a-center">
        <div><i class="iconfont icon-qingchushujuku"></i></div>
        <div class="m-lr5">清除缓存</div>
      </div>
      <div><i class="iconfont icon-youjiantou"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    //点击跳转
    checkLoginGoto(item, item1) {
      this.index = item1;
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.goto,
        item: item
      });
    },
    //清除缓存
    checkLoginClear() {
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.clear
      });
    },
    //跳转页面
    goto(url) {
      //本页面所有功能都需要登录
      //如果点击收货地址列表  需要存储一个本地数据 标识是从个人中心点击进入的地址列表
      localStorage.setItem("addresslistItem", 1);
      this.$utils.goto(url, this.index);
    },
    //清除缓存
    clear() {
      if (this.user) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认清除所有缓存?",
            confirmButtonColor: "#439ffb"
          })
          .then(() => {
            //清除搜索历史记录
            this.$utils.removeHistory(`${this.user.username}search`, "");
            //清除浏览历史记录
            this.$utils.removeHistory(`${this.user.username}browse`, "");
            //清除收藏历史记录
            //调用取消收藏的接口  取消所有收藏
            let list = this.$utils.getHistory(
              `${this.user.username}collection`
            );
            if (list) {
              list.map(item => {
                this.$api
                  .cancelCollection({ id: item.id })
                  .then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                      this.$utils.removeHistory(
                        `${this.user.username}collection`,
                        item.id
                      );
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            }
            this.$toast("清除成功");
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
  mounted() {},
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