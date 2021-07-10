<template>
  <div class="c_home_text">
    <topslot name="订单结算"></topslot>
    <div class="content_box">
      <payadd :obj="obj"></payadd>
      <showdata
        v-if="list"
        :list="list"
        :totalMoney="totalMoney"
        :obj="obj"
        :idDirect="idDirect"
      ></showdata>
    </div>
  </div>
</template>

<script>
import payadd from "../../components/pay/address/Address";
import showdata from "../../components/pay/showdata/ShowData";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
      totalMoney: 0,
      obj: null,
      idDirect:0
    };
  },
  components: {
    payadd,
    showdata
  },
  methods: {
    getAddress() {
      let selectedAddItem = localStorage.getItem("selectedAddItem");
      // 如果切换了地址 就显示切换后的  如果没有切换地址就显示默认的收货地址
      if (selectedAddItem) {
        this.obj = JSON.parse(selectedAddItem);
      } else {
        //查询默认收货地址
        this.$api
          .getDefaultAddress()
          .then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.obj = res.defaultAdd;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      localStorage.removeItem("selectedAddItem")
    }
  },
  mounted() {
    window.scrollTo(0,0)
    this.list=JSON.parse(localStorage.getItem('checked'))
    this.totalMoney=Number(localStorage.getItem('totalMoney'))
    this.idDirect=Number(localStorage.getItem('idDirect'))
    //获取默认收货地址
    this.getAddress();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>