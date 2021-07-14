<template>
  <div class="c_home_text">
    <topslot name="我的收藏"></topslot>
    <div class="content_box">
      <div
        v-if="!list || list.length === 0"
        class="flex-j-center a-center p-tb20"
      >
        暂无收藏记录...
      </div>
      <div v-else>
        <div
          class=" flex-j-around a-center p-10"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="car_proimg" @click="goto('/detail', item.cid)">
            <img :src="item.image_path" width="100" height="100" />
          </div>
          <div>
            <div class="car_proname sl-one" @click="goto('/detail', item.cid)">
              {{ item.name }}
            </div>
            <div class="floor_name">￥{{ item.present_price.toFixed(2) }}</div>
          </div>
          <div @click="del(item.id)">
            <i class="iconfont icon-guanbi"></i>
          </div>
        </div>
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
      list: []
    };
  },
  components: {},
  methods: {
    getData() {
      this.list = this.$utils.getHistory(`${this.user.username}collection`);
    },
    //跳转页面
    goto(url, id) {
      this.$utils.goto(url, id);
    },
    //删除收藏
    del(id) {
      this.$api
        .cancelCollection({ id: id })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$utils.removeHistory(`${this.user.username}collection`, id);
            this.list = this.$utils.getHistory(`${this.user.username}collection`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //获取数据
    this.getData();
  },
  computed: {
    //获取登录的用户信息
    user() {
      return JSON.parse(this.$store.state.user);
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.car_proimg {
  border: 1px solid #eee;
  padding: 5px;
}
.car_proname {
  width: 150px !important;
  margin-bottom: 50px;
}
</style>