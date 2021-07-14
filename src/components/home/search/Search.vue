<template>
  <div class="search_dv">
    <!-- 输入框有值显示数据 -->
    <div v-if="value">
      <div class="filter_content wbfb hbfb bg-c-w c_home_text">
        <div
          class="flex-j-center a-center m-20 p-20 no_data"
          v-if="list === null || list.length === 0"
        >
          暂无相关数据...
        </div>
        <div class="hbfb" v-else>
          <div
            class="p-10 filter_dv flex-a-center"
            v-for="(item, index) in list"
            :key="index"
          >
            <div>
              <img
                :src="item.image"
                width="100"
                height="100"
                @click="activeItem(item)"
              />
            </div>
            <div class="p-10">
              <div
                class="pro_name"
                v-html="
                  item.name.replace(
                    value,
                    `<span class='floor_name'>${value}</span>`
                  )
                "
                @click="activeItem(item)"
              ></div>
              <div class="flex a-center m-t10">
                <div class=" f-size16 floor_name f-w-bold">
                  ￥{{ item.present_price }}
                </div>
                <div class=" f-size14 zhx">￥{{ item.orl_price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 输入框没值显示搜索历史记录 -->
    <div v-else>
      <div
        class="flex-j-center a-center m-20 p-20 no_data"
        v-if="historyList === null || historyList.length === 0"
      >
        暂无历史记录...
      </div>
      <div v-else>
        <div class="flex-j-between a-center clear p-10">
          <div>
            搜索历史
          </div>
          <div @click="activeItem(null)">
            <i class="iconfont icon-shanchu"></i>
          </div>
        </div>
        <div class="m-r10 flex-a-center">
          <div
            class="p-10 filter_dv flex-a-center"
            v-for="(item, index) in historyList"
            :key="index"
          >
            <div class="p-10 filter_dv_dv" @click="subHistory(item)">
              {{ item }}
            </div>
          </div>
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
    },
    historyList: {
      type: Array
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      history: []
    };
  },
  components: {},
  methods: {
    //点击搜索的数据
    activeItem(item) {
      if (item) {
        let username = "";
        if (this.user) {
          username = this.user.username;
        }
        //添加搜索历史记录
        this.$utils.saveHistory({
          key: `${username}search`,
          data: this.value,
          item: "id"
        });
        //跳转页面
        this.goto("/detail", item.id);
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除搜索历史?",
            confirmButtonColor: "#439ffb"
          })
          .then(() => {
            //清空搜索的历史记录
            if (this.user)
              this.$utils.removeHistory(`${this.user.username}search`, "");
            this.$emit("changeHistory");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //跳转页面
    goto(url, id) {
      this.$utils.goto(url, id);
    },
    //点击历史记录
    subHistory(item) {
      this.$emit("subHistory", item);
    }
  },
  mounted() {},
  computed: {
    //用户信息
    user() {
      return JSON.parse(this.$store.state.user);
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
//搜索后 显示过滤产品的大盒子
.search_dv {
  margin-top: 61px;
  .clear {
    padding-top: 20px;
    padding-right: 20px;
  }
}
.filter_content {
  .filter_dv {
    border-bottom: 1px solid #eee;
    .pro_name {
      width: 250px !important;
    }
  }
}
.filter_dv_dv {
  background: #eee;
  border-radius: 18px;
}
</style>