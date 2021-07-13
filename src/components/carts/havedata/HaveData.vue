<template>
  <div>
    <div class="carts_dv">
      <div
        class=" flex-j-around a-center p-10"
        v-for="(item, index) in list"
        :key="index"
      >
        <div>
          <input
            type="checkbox"
            v-model="item.check"
            @change="checkItem"
            class="check"
          />
        </div>
        <div class="car_proimg" @click="goto('/detail',item.cid)">
          <img :src="item.image_path" width="100" height="100" />
        </div>
        <div>
          <div class="floor_name car_proname sl-one" @click="goto('/detail',item.cid)">
            {{ item.name }}
          </div>
          <div class="flex-j-between a-center">
            <div class="floor_name">￥{{ item.mallPrice.toFixed(2) }}</div>
            <div>
              <van-stepper
                v-model="item.count"
                theme="round"
                button-size="22"
                disable-input
                @change="change(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-j-between a-center pay_bottom">
      <div class="flex-a-center">
        <input
          type="checkbox"
          v-model="checked"
          @change="checkAll"
          class="check"
        /> 
        <div class="m-l10">全选</div>
      </div>
      <div class=" flex-a-center p-r10">
        <div>
          合计:<span class="floor_name">￥{{ totalMoney.toFixed(2) }}</span>
        </div>
        <div class="m-l10">
          <van-button type="danger" @click="del">删除</van-button>
        </div>
        <div class="m-l10">
          <van-button type="primary" @click="goPay">去结算</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      checked: false
    };
  },
  components: {},
  methods: {
    //跳转页面
    goto(url,id) {
      this.$utils.goto(url, id);
    },
    //点击步进器的事件
    change(item) {
      this.$api
        .editCart({
          count: item.count,
          id: item.cid,
          mallPrice: item.mallPrice
        })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //非全选按钮的点击事件
    checkItem() {
      this.checked = this.list.every(item => {
        return item.check;
      });
    },
    //全选点击事件
    checkAll(checked) {
      this.list.map(item => {
        item.check = this.checked;
      });
    },
    //删除
    del() {
      let cid = [];
      //获取选中的数组
      let checkList = this.list.filter(item => {
        if (item.check) {
          cid.push(item.cid);
        }
        return item.check;
      });
      if (checkList.length === 0) {
        this.$toast("请选择需要删除的商品");
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除商品?",
            confirmButtonColor: "#439ffb"
          })
          .then(() => {
            this.$api
              .deleteShop(cid)
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  this.$toast.success(res.msg);
                  this.$emit("del", "");
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //去结算 需要传选择的商品
    goPay() {
      let cid = [];
      //获取选中的数组
      let checkList = this.list.filter(item => {
        if (item.check) {
          cid.push(item.cid);
        }
        return item.check;
      });
      if (checkList.length === 0) {
        this.$toast("请选择需要结算的商品");
      } else {
        let checked = this.list.filter(item => {
          return item.check;
        });
        localStorage.setItem('checked',JSON.stringify(checked))
        localStorage.setItem('totalMoney',this.totalMoney)
        localStorage.setItem('idDirect',0)
        this.goto('/pay','')
      }
    }
  },
  mounted() {},
  computed: {
    // 总金额
    totalMoney() {
      let money = 0;
      this.list.filter(item => {
        if (item.check) {
          money += item.mallPrice*item.count;
        }
      });
      return money;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.car_proname {
  width: 150px !important;
  margin-bottom: 50px;
}
.total {
  width: 110px;
}
.check {
  width: 18px;
  height: 18px;
}
.car_proimg {
  border: 1px solid #eee;
  padding: 5px;
}
.pay_bottom {
  position: fixed;
  bottom: 50px;
  left: 0px;
  z-index: 999;
  padding: 20px 10px;
  background: #eee;
  width: 98%;
}
.carts_dv {
  margin-bottom: 150px;
}
</style>