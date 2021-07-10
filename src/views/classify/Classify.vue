<template>
  <div class="c_home_text">
    <top class="f-size14 wbfb border_b top_pom_box">
      <template #center>
        商品分类
      </template>
    </top>
    <div class="content flex-a-center p-relative hbfb content_box">
      <div class="content_l hbfb">
        <van-sidebar v-model="activeKey" class="p_fixed hbfb" style="background:#f7f8fa;margin-top: -12px;">
          <van-sidebar-item
            :title="item.mallCategoryName"
            v-for="(item, index) in list"
            :key="index"
            @click="onChange(index)"
          />
        </van-sidebar>
      </div>
      <div class="content_r classify_content_r p-t10 hbfb">
        <van-tabs v-model="active" @change="onChangeTwo" class="classfiy_dv_van-tab" :ellipsis="false">
          <van-tab
            :title="item.mallSubName"
            v-for="(item, index) in subList"
            :key="index"
          >
            <div
              class=" flex-a-center m-t-b10 m-t20 p-t20"
              v-for="(item1, index1) in proList"
              :key="index1"
              @click="goto(item1.id)"
            >
              <div class="img_dv p-10">
                <img :src="item1.image" width="100" height="100" />
              </div>
              <div class="p-l-r20">
                <div class="floor_name m-b20">
                  {{ item1.name }}
                </div>
                <div class=" flex-a-center m-t-b20">
                  <div class="f-size16 floor_name">
                    ￥{{ item1.present_price }}
                  </div>
                  <div class="f-size14 zhx floor_name">
                    ￥{{ item1.orl_price }}
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
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
      activeKey: 0,
      active: 0,
      id: 0,
      //一级分类
      list: [],
      //二级分类
      subList: [],
      //商品数据
      proList: []
    };
  },
  components: {},
  methods: {
    //切换一级分类导航
    onChange(index) {
      this.subList = this.list[index].bxMallSubDto;
      this.getData(this.subList[0].mallSubId);
      this.active = 0;
    },
    //切换二级分类导航 name:选中的二级分类下标
    onChangeTwo(name) {
      this.getData(this.subList[name].mallSubId);
    },
    //跳转页面
    goto(id) {
      this.$utils.goto("/detail", id);
    },
    //获取数据
    getData(id) {
      this.$api
        .classification(id)
        .then(res => {
          //  console.log(res);
          if (res.code === 200) {
            this.proList = res.dataList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取全部分类数据   从localstorage里面获取
    getClassifyData() {
      this.list = JSON.parse(localStorage.getItem("classify"));
      if (this.list.length > 0) {
        //获取首页传过来的分类id 如果没有id就获取默认二级分类id（下标为0的一级分类下的二级分类id）
        this.id = this.$route.query.id
          ? this.$route.query.id
          : this.list[0].bxMallSubDto[0].mallSubId;
        //设置一级分类的默认选中下标
        this.activeKey = this.$route.query.index
          ? Number(this.$route.query.index)
          : 0;
        //获取选中的一级分类下的所有二级分类
        this.subList = this.list[this.activeKey].bxMallSubDto;
        // console.log(this.subList);
        //获取选中二级分类下的所有商品
        this.getData(this.id);
      }
    }
  },
  mounted() {
    this.getClassifyData();
  },
  computed: {
    classify() {
      return this.$store.state.classify;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.content {
  .content_l,
  .content_r {
    position: absolute;
    top: 0px;
  }
  .content_l {
    width: 25%;
    left: 0px;
  }
  .content_r {
    width: 75%;
    right: 0px;
    .img_dv {
      border: 1px solid #eee;
    }
    .zhx {
      color: #999;
      margin-left: 10px !important;
    }
  }
}
</style>