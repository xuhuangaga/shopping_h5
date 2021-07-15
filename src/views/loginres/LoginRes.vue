<template>
  <div class="loginres_dv p-l-r10 flex-j-center a-center p-relative">
    <!-- 返回键 -->
    <goback></goback>
    <div class="box p-10 bg-c-w">
      <div class=" p-l-r20 m-b20 f-size16">登录 / 注册</div>
      <van-form
        validate-first
        @failed="onFailed"
        v-model="data"
        @submit="submit"
      >
        <van-field
          v-model.trim="data.nickname"
          placeholder="USERNAME"
          name="validatorUName"
          :rules="[
            {
              validator: validatorUName,
              message: '请输入4到16位(字母，数字，下划线，减号)'
            }
          ]"
        />
        <van-field
          v-model.trim="data.password"
          placeholder="PASSWORD"
          name="validatorPsd"
          type="password"
          :rules="[
            { validator: validatorPsd, message: '请输入6-10位的数字密码' }
          ]"
        />
        <!-- :rules="[{ validator: validatorPsd, message: '6~10位由数字和26个英文字母混合而成的密码' }]" -->
        <!-- :rules="[{ validator:validatorPhone, message: '请输入正确的手机号码' }]" -->
        <van-field
          v-model.trim="data.phone"
          name="validatorPhone"
          label="手机号码"
          placeholder="仅注册需要"
        />
        <van-field
          v-model="data.msgCode"
          center
          clearable
          label="短信验证码"
          placeholder="仅注册需要"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              ref="send"
              @click="sendCode"
              :class="{ send_disabled: time > 0 }"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="data.verify"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <div v-html="vrificationCode" @click="changeCode"></div>
          </template>
        </van-field>
        <div class="btn_dv flex-a-center loginres_btn_dv">
          <div class="m-r10">
            <van-button type="primary" class="wbfb" @click="changeFlag(true)"
              >登录</van-button
            >
          </div>
          <div>
            <van-button type="danger" class="wbfb fj" @click="changeFlag(false)"
              >注册</van-button
            >
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import goback from "../../components/goback/GoBack";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: {
        nickname: "",
        password: "",
        verify: "",
        phone: "",
        msgCode: ""
      },
      //后端返回的验证码
      vrificationCode: "",
      //倒计时
      time: 0,
      //是否登录 登录为true 注册为false
      isLogin: false
    };
  },
  components: {
    goback
  },
  methods: {
    //验证用户名
    validatorUName(val) {
      return /^[a-zA-Z0-9_-]{4,16}$/.test(val);
    },
    //验证密码
    validatorPsd(val) {
      // return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(val);
      return /\d{6,10}/.test(val);
    },
    //验证手机号
    validatorPhone() {
      return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
        this.data.phone
      );
    },
    //验证不通过触发的事件
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    //验证通过触发的事件
    submit() {
      // console.log(this.isLogin);
      //登录
      if (this.isLogin) {
        this.$api
          .login(this.data)
          .then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.getCartNum()
              //跳转到个人中心页面  并且存储数据
              this.$toast.success("登录成功");
              this.$store.commit("setUser", JSON.stringify(res.userInfo));
              //存储用户信息到localstorage
              localStorage.setItem(
                "h5_shopping_user",
                JSON.stringify(res.userInfo)
              );
              this.$router.push("/myinfo");
            } else {
              if (res.msg === "验证码错误") {
                this.data.verify = "";
              }
              this.$toast.fail(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //跳转到个人中心页面  并且存储数据
        this.$api
          .register(this.data)
          .then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.getCartNum()
              this.$toast.success("注册成功");
              this.$store.commit("setUser", JSON.stringify(res.userInfo));
              //存储用户信息到localstorage
              localStorage.setItem(
                "h5_shopping_user",
                JSON.stringify(res.userInfo)
              );
              this.$router.push("/myinfo");
            } else {
              this.$toast.fail(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //发送短信验证码
    sendCode() {
      if (this.time === 0) {
        this.time = 10;
        let timer = setInterval(item => {
          this.time--;
          if (this.time !== 0) {
            this.$refs.send.innerText = `${this.time}s之后重新发送`;
          } else {
            this.$refs.send.innerText = "发送验证码";
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    //获取验证码
    getCode() {
      this.$api
        .verify()
        .then(res => {
          // console.log(res);
          this.vrificationCode = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击登录 / 注册
    changeFlag(flag) {
      this.isLogin = flag;
    },
    //切换验证码
    changeCode() {
      this.getCode();
    },
    //更新当前登录用户的购物车数量
    getCartNum() {
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
  },
  mounted() {
    this.getCode();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.loginres_dv {
  background: url("../../assets/images/login.jpg");
  min-height: 667px;
  .btn_dv {
    margin: 16px;
    div {
      width: 100px;
    }
  }
  .send_disabled {
    background: #ccc;
    // color: #999;
    cursor: not-allowed;
    border: none;
  }
  .van-cell {
    border-bottom: 1px solid #eee;
  }
}
</style>