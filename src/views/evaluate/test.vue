<template>
  <div>
    <div class="classifyTitle" ref="wrapper">
      <ul>
        <li v-for="(item, index) in 10">
          <div>{{ item-- - index }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {});
        console.log(this.scroll);
      }
    });
  }
};
</script>

<style lang='scss' scoped>
</style>