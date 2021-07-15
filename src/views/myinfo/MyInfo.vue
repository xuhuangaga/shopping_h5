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
        <myTop></myTop>
        <myBottom></myBottom>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import myTop from "../../components/myinfo/top/Top";
import myBottom from "../../components/myinfo/bottom/Bottom";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    myTop,
    myBottom
  },
  methods: {
    //跳转页面
    goto(url) {
      //本页面所有功能都需要登录
      //如果点击收货地址列表  需要存储一个本地数据 标识是从个人中心点击进入的地址列表
      localStorage.setItem("addresslistItem", 1);
      this.$utils.goto(url, this.index);
    },
    //退出登录  删除vuex数据 跳转到登录页
    signOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出登录?",
          confirmButtonColor: "#439ffb"
        })
        .then(() => {
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
        })
        .catch(() => {
          // on cancel
        });
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