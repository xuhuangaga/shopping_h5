<template>
  <div class="hom_dv">
    <!-- 顶部 -->
    <top class="f-size14 hpm_top wbfb" :class="{ hpm_top_show: show }">
      <template #left>
        <div class="city" @click="goto('/citys', '')">
          {{ city ? city : "定位中" }}
          <i class="iconfont icon-xjt"></i>
        </div>
      </template>
      <template #center>
        <div :class="{ ipt_dv: !show }" class="ipt">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            @focus="iptFocus"
          />
        </div>
      </template>
      <template #right>
        <div class="c_home_text wbfb" @click="cancle" v-show="show">取消</div>
      </template>
    </top>
    <!-- 显示搜索的数据列表 -->
    <div v-show="show">
      <search
        :list="list"
        :historyList="history"
        :value="value"
        @subHistory="subHistory"
        @changeHistory="changeHistory"
      ></search>
    </div>
    <div v-show="!show" class="content">
      <!-- banner -->
      <banner v-if="slides" :slides="slides"></banner>
      <!-- 分类板块 -->
      <classify
        v-if="category"
        :category="category"
        :advertesPicture="advertesPicture"
      ></classify>
      <!-- 推荐商品 -->
      <recommend v-if="recommend" :recommend="recommend"></recommend>
      <!-- 楼层一 -->
      <floor
        v-if="floor1"
        :floor="floor1"
        index="1F"
        :floorname="floorName.floor1"
      ></floor>
      <!-- 楼层二 -->
      <floor
        v-if="floor2"
        :floor="floor2"
        index="2F"
        :floorname="floorName.floor2"
      ></floor>
      <!-- 楼层三 -->
      <floor
        v-if="floor3"
        :floor="floor3"
        index="3F"
        :floorname="floorName.floor3"
      ></floor>
      <!-- 热销商品 -->
      <hot v-if="hot" :hot="hot"></hot>
      <bottom></bottom>
    </div>
  </div>
</template>

<script>
import banner from "../components/home/banner/Banner";
import classify from "../components/home/classify/Classify";
import recommend from "../components/home/recommend/Recommend";
import floor from "../components/home/floor/Floor";
import hot from "../components/home/hot/Hot";
import search from "../components/home/search/Search";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 轮播图数据
      slides: null,
      // 搜索框的值
      value: "",
      //分类板块数据
      category: [],
      //推荐商品数据
      recommend: null,
      //楼层1的数据
      floor1: [],
      //楼层2的数据
      floor2: [],
      //楼层3的数据
      floor3: [],
      //热销商品
      hot: null,
      //搜索内容框是否显示
      show: false,
      //搜索时的数据
      list: [],
      //搜索的历史记录
      history: [],
      //楼层名称对象
      floorName: {},
      advertesPicture: ""
    };
  },
  components: {
    banner,
    classify,
    recommend,
    floor,
    hot,
    search
  },
  methods: {
    //定位
    getLocaltion() {
      let that = this;
      AMap.plugin("AMap.Geolocation", function() {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          // console.log(data);
          that.$store.commit("setCity", data.addressComponent.city);
          localStorage.setItem("citys", data.addressComponent.city);
        }

        function onError(data) {
          // 定位出错
          console.log(data);
          that.$toast.fail("定位失败,请手动选择城市");
        }
      });
    },
    //获取首页数据
    getData() {
      this.$api
        .getHomeData()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            //轮播图
            this.slides = res.data.slides;
            //分类模块
            this.category = res.data.category;
            //存储分类信息到localstorage  分类页要用
            localStorage.setItem("classify", JSON.stringify(res.data.category));
            this.advertesPicture = res.data.advertesPicture.PICTURE_ADDRESS;
            //推荐商品
            this.recommend = res.data.recommend;
            this.floorName = res.data.floorName;
            // 楼层一
            this.floor1 = res.data.floor1;
            // 楼层二
            this.floor2 = res.data.floor2;
            // 楼层三
            this.floor3 = res.data.floor3;
            //热销商品
            this.hot = res.data.hotGoods;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //输入框获取焦点的方法
    iptFocus() {
      this.show = true;
      this.value = this.value;
      this.history = this.$utils.getHistory("search");
    },
    //点击取消
    cancle() {
      this.show = false;
      this.value = "";
    },
    //跳转页面
    goto(url, id) {
      this.$utils.goto(url, id);
    },
    //点击历史记录
    subHistory(val) {
      this.value = val;
    },
    //清除历史记录
    changeHistory() {
      this.history = this.$utils.getHistory("search");
    }
  },
  mounted() {
    if (!this.city) {
      //判断vuex里面的城市是否是定位中 如果是定位中就请求高德api  如果不是则显示vuex里面的值
      this.getLocaltion();
    }
    this.getData();
  },
  computed: {
    city() {
      return this.$store.state.city;
    }
  },
  watch: {
    value(val1) {
      if (val1) {
        this.value = val1;
        this.history = [];
        this.$api
          .homeSearch({ value: val1 })
          .then(res => {
            if (res.code === 200) {
              this.list = res.data.list;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //获取搜索的历史记录
        this.history = this.$utils.getHistory("search");
        this.list = [];
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.hom_dv {
  overflow: hidden;
  .hpm_top_show {
    width: 95%;
  }
  .content {
    margin-top: 61px;
  }

  .ipt_dv {
    width: 270px;
  }
  .ipt {
    padding: 5px;
  }
}
</style>