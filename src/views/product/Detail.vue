<template>
  <div class="detail_dv c_home_text">
    <!-- 返回键 -->
    <goback></goback>
    <!-- 轮播处 -->
    <banner v-if="Object.keys(info).length > 0" :info="info"></banner>
    <div class="p-10 border_b">
      <!-- 产品名称 -->
      <div>{{ info.name }}</div>
      <!-- 产品价格 -->
      <div class="floor_name">￥{{ info.present_price }}</div>
    </div>
    <!-- 运费板块 -->
    <div class="flex-j-between a-center border_b p-10 freight_dv">
      <div>运费:0</div>
      <div>剩余:{{ info.amount }}</div>
      <div class="flex-a-center">
        <collection
          v-if="Object.keys(info).length > 0"
          :info="info"
        ></collection>
      </div>
    </div>
    <div class=" border_b" style="height:20px"></div>
    <!-- 店铺信息 -->
    <div class="flex-j-between p-10">
      <div class=" flex-a-center">
        <div>
          <i class="iconfont icon-dianpu"></i>
        </div>
        <div class="p-l-r10">有赞的店</div>
        <div class=" flex-j-around a-center f-c-w official">官方</div>
      </div>
      <div class="flex a-center">
        <div>进入店铺</div>
        <div class="m-l10 flex-j-center a-center">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
    </div>
    <!-- 详情和评论板块 -->
    <van-tabs v-model="active" style="margin-bottom:80px">
      <van-tab title="商品详情">
        <div v-html="info.detail" class="m-t20"></div>
      </van-tab>
      <van-tab title="商品评论" class="m-t20">
        <div v-if="comment.length === 0" class="t-a-center">
          暂无评论...
        </div>
        <div v-else class="m-t20">
          <commentcom :comment="comment"></commentcom>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 底部 -->
    <bottom v-if="Object.keys(info).length > 0" :info="info"></bottom>
  </div>
</template>

<script>
import goback from "../../components/goback/GoBack";
// 评论
import commentcom from "../../components/product/comment/Comment";
// 收藏
import collection from "../../components/product/collection/Collection";
import banner from "../../components/product/banner/Banner";
import bottom from "../../components/product/bottom/Bottom";
export default {
  name: "",
  props: {},
  data() {
    return {
      //产品信息
      info: {},
      comment: [],
      id: "",
      active: 0,
      value: 3
    };
  },
  components: {
    goback,
    commentcom,
    collection,
    banner,
    bottom
  },
  methods: {
    //获取数据
    getData() {
      this.$api
        .getGoodsById(this.id)
        .then(res => {
          // console.log();
          if (res.goods.goodsOne) {
            this.info = res.goods.goodsOne;
            this.comment = res.goods.comment;
            // console.log(this.info);
            //页面一加载存储浏览记录到localstorage 不能重复添加
            if (this.user) {
              this.$utils.saveHistory({
                key: `${this.user.username}browse`,
                data: this.info,
                item: "id"
              });
            }
          } else {
            this.$toast("该产品已下架");
            this.$utils.goto("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消弹框
    cancle(show) {
      this.show = show;
    },
    //控制提示登录的弹框是否显示
    popup(val) {
      this.show = val;
    }
  },
  mounted() {
    //获取地址栏传入的产品id
    this.id = this.$route.query.id;
    this.getData();
    window.scrollTo(0, 0);
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
.detail_dv {
  .floor_name {
    margin-top: 5px;
  }
  .freight_dv {
    color: #ccc;
  }
  .official {
    width: 40px;
    height: 20px;
    background: red;
    padding: 2px;
    border-radius: 3px;
  }
  .icon-dianpu {
    font-size: 22px;
  }
  .comment_l {
    width: 15%;
  }
  .comment_r {
    width: 85%;
  }
}
</style>