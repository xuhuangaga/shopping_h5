<template>
  <div class="c_home_text">
    <topslot name="编辑地址"></topslot>
    <div class="content_box pay_submit_van-submit-bar">
      <div v-if="addressInfo">
        <van-address-edit
          :area-list="areaList"
          :address-info="addressInfo"
          show-delete
          show-set-default
          show-search-result
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
        />
      </div>
      <div v-else class="p-20 flex-j-center a-center">
        暂无可编辑的收货地址...
      </div>
    </div>
    <van-loading size="24px" v-show="show">加载中...</van-loading>
  </div>
</template>

<script>
import area from "../../lib/area";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      addressInfo: null,
      areaList: area,
      show: false
    };
  },
  components: {},
  methods: {
    onSave(addressInfo) {
      // console.log(addressInfo);
      this.$api
        .addAddress({
          name: addressInfo.name,
          tel: addressInfo.tel,
          address: `${addressInfo.province}${addressInfo.city}${addressInfo.county}${addressInfo.addressDetail}`,
          isDefault: addressInfo.isDefault,
          province: addressInfo.province,
          city: addressInfo.city,
          county: addressInfo.county,
          addressDetail: addressInfo.addressDetail,
          areaCode: addressInfo.areaCode,
          id: addressInfo.id
        })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$toast(res.msg);
          }
          this.$utils.goto("/addresslist", "");
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDelete() {
      this.$api
        .deleteAddress({ id: this.addressInfo.id })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$toast(res.msg);
            //删除localstorage里面存储的对象
            localStorage.removeItem("addressItem");
            this.$utils.goto("/addresslist");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取传过来的地址对象
    getData() {
      // console.log(this.addressInfo);
      if (JSON.parse(localStorage.getItem("addressItem"))) {
        this.addressInfo = JSON.parse(localStorage.getItem("addressItem"));
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
</style>