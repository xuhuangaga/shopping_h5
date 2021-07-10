<template>
  <div class="c_home_text">
    <topslot name="新建地址"></topslot>
    <div class="content_box pay_submit_van-submit-bar">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import area from "../../lib/area";
export default {
  name: "",
  props: {},
  data() {
    return {
      areaList: area
    };
  },
  components: {
  },
  methods: {
    //新增地址
    onSave(addressInfo) {
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
          areaCode: addressInfo.areaCode
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
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>