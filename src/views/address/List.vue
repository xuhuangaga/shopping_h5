<template>
  <div class="c_home_text">
    <topslot name="地址列表"></topslot>
    <div class="content_box">
      <div class="nodata t-a-center" v-if="list.length === 0">
        暂无收货地址~~
      </div>
    </div>
    <div class=" f-c-w wbfb pay_submit_van-submit-bar content content_box">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="goto('/addaddress')"
        @edit="onEdit"
        @select="select"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      list: []
    };
  },
  components: {},
  methods: {
    onEdit(item) {
      localStorage.setItem("addressItem", JSON.stringify(item));
      this.$utils.goto("/editaddress");
    },
    //跳转页面
    goto(url) {
      this.$utils.goto(url);
    },
    //获取数据
    getData() {
      this.$api
        .getAddress()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.list = res.address;
            //默认的收货地址对象
            let isDefaultInfo = null;
            this.list.map((item, index) => {
              this.$set(item, "id", item._id);
              if (item.isDefault) {
                isDefaultInfo = item;
                //删除当前的默认收货地址
                this.list.splice(index, 1);
                //在头部添加默认的收货地址
                this.list.unshift(isDefaultInfo);
                this.chosenAddressId = item._id;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //切换选中的地址触发的事件
    select(item) {
      localStorage.setItem("selectedAddItem", JSON.stringify(item));
      //如果是个人中心点击进入的收货地址列表 就不跳转结算页
      if (!Number(localStorage.getItem("addresslistItem"))) {
        this.$utils.goto("/pay");
      }
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
.nodata {
  padding: 50px;
}
.content {
  background: #f7f8fa;
  min-height: 600px;
  max-height: 100%;
}
</style>