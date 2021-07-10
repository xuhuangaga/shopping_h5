<template>
  <div>
    <div
      class="bg-c-w order_dv p-10 m-b10"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="border_b p-tb10 flex-j-between a-center">
        <div>订单编号:{{ item.order_id }}</div>
        <div class="floor_name">交易完成</div>
      </div>
      <div class="border_b">
        <div
          class=" flex-j-around  p-tb10"
          v-for="(item1, index1) in item.order_list"
          :key="index1"
          @click="goto('/detail', item1.cid)"
        >
          <div class="car_proimg">
            <img :src="item1.image_path" width="100" height="100" />
          </div>
          <div class="flex">
            <div class="car_proname">
              {{ item1.name }}
            </div>
            <div>
              <div>￥{{ item1.present_price.toFixed(2) }}</div>
              <div class="count t-a-right">x{{ item1.count }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="t-a-right pro_bottom m-t10">
        <div>创建时间:{{ item.add_time }}</div>
        <div>收货地址:{{ item.address }}</div>
        <div>
          共 {{ item.order_list.length }} 件商品 合计: {{ item.mallPrice }}
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
      type: Array
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //跳转页面
    goto(url, id) {
      this.$utils.goto(url, id);
    }
  },
  mounted() {},
  computed: {
    totalMoney() {}
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.order_dv {
  border-radius: 10px;
}
.car_proimg {
  border: 1px solid #eee;
  padding: 5px;
}
.count {
  color: #ccc;
}
.car_proname {
  width: 120px;
}
.pro_bottom {
  line-height: 26px;
}
</style>