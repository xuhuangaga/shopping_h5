<template>
  <div class="c_home_text">
    <topslot name="评价中心"></topslot>
    <div class="content_box">
      <img src="../../assets/images/evaluate.jpg" class=" wbfb hbfb" />
    </div>
    <div class="tab bg-c-w">
      <div class="tab_box p-relative evaluate_tabs_dv">
        <van-tabs v-model="active">
          <van-tab title="待评价">
            <div v-if="evaluateList" class="p-10 m-t20">
              <div
                v-for="(item, index) in evaluateList"
                :key="index"
                class="flex border_b p-10"
              >
                <div>
                  <img :src="item.image_path" width="100" height="100" />
                </div>
                <div class="wbfb m-l10">
                  <div>{{ item.name }}</div>
                  <div class="comment flex-j-end a-center">
                    <van-icon name="chat-o" />
                    <div class="comment_dv" @click="goto(item)">评论晒单</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-20 t-a-center">暂无待评价的订单...</div>
          </van-tab>
          <van-tab title="已评价">
            <div v-if="alreadyEvaluated.length>0" class="p-10 m-t20">
              <div
                v-for="(item, index) in alreadyEvaluated"
                :key="index"
                class="flex border_b p-10"
              >
                <div>
                  <img :src="item.goods[0].image_path" width="100" height="100" />
                </div>
                <div class="wbfb m-l10">
                  <div>{{ item.goods[0].name }}</div>
                  <div class="comment_show flex-j-end a-center">
                    <van-icon name="chat-o" />
                    <div class="no_comment_dv" @click="gotodetail(item.cid,item._id)">查看评价</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-20 t-a-center">暂无已评价的订单...</div>
          </van-tab>
        </van-tabs>
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
      active: 0,
      //已评价数据
      alreadyEvaluated: [],
      //未评价数据
      evaluateList: [],
    };
  },
  components: {
  },
  methods: {
    //跳转页面
    goto(item){
      this.$utils.goto('/commentcenter',JSON.stringify(item))
    },
    gotodetail(cid,_id){
      this.$router.push({
        path:'/evaluatedetail',
        query:{
          id:cid,
          _id:_id
        }
      })
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
    },
     //获取未评价信息
    getTobeEvaluated(){
      this.$api.tobeEvaluated()
      .then(res=>{
        // console.log(res);
        if (res.code===200) {
          this.evaluateList=res.data.list
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.alreadyData();
    this.getTobeEvaluated()
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.comment,.comment_show {
  margin-top: 8vw;
  border: 1px solid red;
  border-radius: 15px;
  width: 90px;
  padding: 4px 15px;
  color:red;
  position:absolute;
  right: 10px;
}
.comment_show {
  color:#6c6c6c !important ;
  border: 1px solid #6c6c6c !important;
}
  .comment_dv,.no_comment_dv {
    margin-left: 5px;
  }
</style>