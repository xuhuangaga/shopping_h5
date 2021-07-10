<template>
  <div>
    <div v-if="!collection" class="m-r10" @click="checkLoginsc">
      收藏商品:<i class="iconfont icon-shoucang"></i>
    </div>
    <div v-else class="m-r10" @click="checkLoginqx">
      取消收藏:
      <i class="iconfont icon-collection"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    // 商品对象
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collection: false
    };
  },
  components: {},
  methods: {
    //获取该商品是否被收藏
    getIsCollection() {
      this.$api
        .isCollection({
          id: this.info.id
        })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.collection = res.isCollection;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //收藏商品  必须登录
    chenageCollection() {
      //调用收藏商品的接口
      this.$api
        .collection(this.info)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.collection = true;
            this.$utils.saveHistory({
              key: "collection",
              data: this.info,
              item: "id"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消收藏 必须登录
    chenageUncollection() {
      this.$api
        .cancelCollection({ id: this.info.id })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.collection = false;
            //取消成功需要删除本地存储的相关数据
            let history = this.$utils.getHistory("collection");
            if (history !== null) {
              // 将以前存的数据转换成数组
              let newHistory = history.filter(item => {
                return item.id !== this.info.id;
              });
              localStorage.setItem(
                "collectionHistory",
                JSON.stringify(newHistory)
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //检查是否登录 再收藏
    checkLoginsc() {
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.chenageCollection
      });
    },
    //检查是否登录 再取消收藏
    checkLoginqx() {
      this.$utils.checkLogin({
        key: "h5_shopping_user",
        next: this.chenageUncollection
      });
    }
  },
  mounted() {
    //用户登录了才做这一步操作
    if (this.user) {
      //获取该商品是否被收藏
      this.getIsCollection();
    }
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
.icon-collection {
  color: red;
}
</style>