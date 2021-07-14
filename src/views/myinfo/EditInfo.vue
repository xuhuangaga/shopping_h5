<template>
  <div class="c_home_text editinfo_dv">
    <topslot name="个人资料"></topslot>
    <div class="content content_box">
      <van-form
        validate-first
        @failed="onFailed"
        v-model="userInfo"
        @submit="submit"
      >
        <div class="p-10 border_b">{{ userInfo.nickname }}</div>
        <div class="p-10 flex-j-between a-center border_b">
          <div>头像</div>
          <div class="flex-a-center">
            <img :src="userInfo.avatar" width="60" height="60" />
            <i class="iconfont icon-youjiantou m-l10"></i>
          </div>
        </div>
        <div class="p-10 border_b flex-a-center a-center">
          <div class="content_l">用户名</div>
          <div class="content_r">{{ userInfo.username }}</div>
        </div>
        <div class="p-10 border_b flex-a-center a-center">
          <div class="content_l">昵称</div>
          <div class="content_r">
            <van-field
              v-model="userInfo.nickname"
              placeholder="请输入昵称"
              name="validatorUName"
              :rules="[
                {
                  validator: validatorUName,
                  message: '请输入4到16位(字母，数字，下划线，减号)'
                }
              ]"
            />
          </div>
        </div>
        <div class="p-10 border_b flex-a-center a-center">
          <div class="content_l">性别</div>
          <div class="content_r">
            <van-radio-group
              v-model="userInfo.gender"
              class=" flex-j-around"
              style="margin-left:-22px"
            >
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
              <van-radio name="保密">保密</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="p-10 border_b flex-a-center a-center">
          <div class="content_l">出生年月</div>
          <div class="content_r">
            <van-field
              v-model="birthday"
              placeholder="请选择出生年月"
              @click="show=true"
              readonly
            />
            <van-calendar
              v-model="show"
              @confirm="onConfirm"
              title="请选择出生年月"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </div>
        </div>
        <div class="p-l-r20 m-t10">
          <van-button type="primary" block>保存</van-button>
        </div>
      </van-form>
      <div class="p-l-r20 m-t10">
        <van-button block @click="goBack">取消</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      birthday: "",
      show: false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      userInfo: {}
    };
  },
  components: {},
  methods: {
    //返回
    goBack() {
      this.$router.back();
    },
    //验证不通过触发的事件
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    //验证通过触发的事件
    submit() {
      //修改vuex的用户信息  修改localstorage的用户信息
      this.$store.commit("setUser", JSON.stringify(this.userInfo));
      //存储用户信息到localstorage
      localStorage.setItem("h5_shopping_user", JSON.stringify(this.userInfo));
      this.$toast.success("保存成功");
      // this.$utils.goto("/myinfo", "");
    },
    //验证昵称
    validatorUName(val) {
      return /^[a-zA-Z0-9_-]{4,16}$/.test(val);
    },
    formatDate(date) {
      this.userInfo.year = date.getFullYear();
      this.userInfo.month = date.getMonth() + 1;
      this.userInfo.day = date.getDate();
      this.birthday = `${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
    },
    //选择年月日
    onConfirm(date) {
      this.show = false;
      this.formatDate(date);
    },
    // 获取数据
    getData() {
      this.userInfo = JSON.parse(this.$store.state.user);
      this.birthday = `${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
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
.content {
  .content_l {
    width: 30%;
  }
  .content_r {
    width: 70%;
  }
}
</style>