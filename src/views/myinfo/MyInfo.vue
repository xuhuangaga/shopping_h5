<template>
  <div class="c_home_text">
    <top class="f-size14 wbfb classify_top">
      <template #center>
        个人中心
      </template>
    </top>
    <div class="content">
      <div class="content_top wbfb  p-relative">
        <div v-if="user">
          <div class="sz" @click="goto('/editinfo', '')">
            <i class="iconfont icon-weibiaoti103 f-c-w"></i>
          </div>
          <div class="tx m-auto f-w-bold f-c-w t-a-center">
            <img :src="user.avatar" width="100" height="100" />
            <div class=" f-size20 m-t-b10">欢迎您：{{ user.nickname }}</div>
            <div @click="signOut">退出登录</div>
          </div>
        </div>
        <div v-else @click="goto('/loginres', '')" class="no-login">
          <div class="tx m-auto t-a-center">
            <img
              src="../../assets/images/no-login.png"
              width="100"
              height="100"
            />
            <div class="f-size20 f-c-w">登录/注册</div>
          </div>
        </div>
      </div>
      <div class="content_bottom">
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
        <div class=" border_b" style="height:20px"></div>
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
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      //未评价的数量
      evaluate: 0
    };
  },
  components: {},
  methods: {
    //退出登录  删除vuex数据 跳转到登录页
    signOut() {
      this.$api
        .loginOut()
        .then(res => {
          // console.log(res);
          this.$store.commit("setUser", null);
          localStorage.removeItem("h5_shopping_user");
          this.$router.push("/loginres");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转页面
    goto(url, id) {
      //本页面所有功能都需要登录
      //如果点击收货地址列表  需要存储一个本地数据 标识是从个人中心点击进入的地址列表
      localStorage.setItem("addresslistItem",1)
      this.$utils.goto(url, id);
    },
    //获取未评价信息
    getTobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.evaluate = res.data.list.length;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击跳转
    checkLoginGoto(item, item1) {
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.goto,
        item: item,
        item1: item1
      });
    }
  },
  mounted() {
    this.getTobeEvaluated();
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
.content {
  .content_top {
    background: rgb(227, 12, 123);
    height: 210px;
    padding-top: 80px;
    .no-login {
      padding-top: 20px;
    }
    .sz {
      position: absolute;
      right: 10px;
      top: 50px;
      .iconfont {
        font-size: 25px;
      }
    }
    .tx {
      img {
        border-radius: 100%;
      }
    }
  }
  .content_bottom {
    padding-bottom: 80px;
    .iconfont {
      font-size: 25px;
    }
    .icon-shoucang,
    .icon-dizhiguanli.icon-liulan,
    .icon-quanbudingdan {
      font-size: 21px !important;
    }
  }
}
</style>