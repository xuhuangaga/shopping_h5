<template>
  <div class="c_home_text p-relative">
    <topslot name="评价中心"></topslot>
    <div class="content_box p_fixed" style="z-index:999">
      <img
        src="../../assets/images/evaluate.jpg"
        class=" wbfb hbfb data_list"
      />
    </div>
    <div class="tab bg-c-w">
      <div class="tab_box p-relative evaluate_tabs_dv">
        <van-tabs v-model="active">
          <van-tab title="待评价">
            <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list -->
            <!-- v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              > -->
            <No :evaluateList="evaluateList" @fetchData="fetchData"></No>
            <!-- </van-list>
            </van-pull-refresh> -->
          </van-tab>
          <van-tab title="已评价">
            <Yes :alreadyEvaluated="alreadyEvaluated"></Yes>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import No from "../../components/evaluate/No";
import Yes from "../../components/evaluate/Yes";
import BetterScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      //已评价数据
      alreadyEvaluated: [],
      //未评价数据
      evaluateList: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      count: 0
    };
  },
  components: {
    No,
    Yes
  },
  methods: {
    //跳转页面
    goto(item) {
      this.$utils.goto("/commentcenter", JSON.stringify(item));
    },
    gotodetail(cid, _id) {
      this.$router.push({
        path: "/evaluatedetail",
        query: {
          id: cid,
          _id: _id
        }
      });
    },
    //获取已评价数据
    alreadyData() {
      this.$api
        .alreadyEvaluated()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.alreadyEvaluated = res.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, //获取未评价信息
    getTobeEvaluated() {
      this.$api
        .tobeEvaluated(this.page)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
             this.evaluateList=this.evaluateList.concat(res.data.list);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.evaluateList = [];
          this.refreshing = false;
        }
        this.$api
          .tobeEvaluated(this.page)
          .then(res => {
            // console.log(res.data);
            if (res.code === 200) {
              this.count = res.data.count;
              this.evaluateList = this.evaluateList.concat(res.data.list);
              this.page++;
              if (this.evaluateList.length >= this.count) {
                this.finished = true;
              } else {
                this.loading = false;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    fetchData() {
      this.page++;
      this.getTobeEvaluated();
    }
  },
  mounted() {
    this.alreadyData();
    this.getTobeEvaluated();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>