<template>
  <div class="c_home_text">
    <topslot name="评价中心"></topslot>
    <div class="content_box p_fixed" style="z-index:999">
      <img
        src="../../assets/images/evaluate.jpg"
        class=" wbfb hbfb data_list"
      />
    </div>
    <div class="tab bg-c-w">
      <div class="tab_box evaluate_tabs_dv">
        <van-tabs v-model="active" @change="change">
          <van-tab title="待评价">
            <van-pull-refresh v-model="refreshing">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <No :evaluateList="evaluateList"></No>
              </van-list>
            </van-pull-refresh>
          </van-tab>
          <van-tab title="已评价">
            <van-pull-refresh v-model="refreshing">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <Yes :alreadyEvaluated="alreadyEvaluated"></Yes>
              </van-list>
            </van-pull-refresh>
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
      page: 1
    };
  },
  components: {
    No,
    Yes
  },
  methods: {
    //获取未评价的数据
    getNoData() {
      this.$api
        .tobeEvaluated(this.page)
        .then(res => {
          // console.log(res.data);
          if (res.code === 200) {
            this.evaluateList = this.evaluateList.concat(res.data.list);
            this.page++;
            if (this.evaluateList.length >= res.data.count) {
              this.finished = true;
            } else {
              this.loading = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取已评价的数据
    getYesData() {
      this.$api
        .alreadyEvaluated(this.page)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.alreadyEvaluated = this.alreadyEvaluated.concat(res.data.list);
            this.page++;
            if (this.alreadyEvaluated.length >= res.data.count) {
              this.finished = true;
            } else {
              this.loading = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //下拉刷新
    onLoad() {
      if (this.refreshing) {
        this.evaluateList = [];
        this.alreadyEvaluated = [];
        this.refreshing = false;
      }
      if (this.page === 1) {
        this.active === 0 ? this.getNoData() : this.getYesData();
      } else {
        setTimeout(() => {
          this.active === 0 ? this.getNoData() : this.getYesData();
        }, 1000);
      }
    },
    change(index) {
      this.alreadyEvaluated = [];
      this.evaluateList = [];
      this.refreshing = false;
      this.page = 1;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>