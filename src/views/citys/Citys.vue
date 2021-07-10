<template>
  <div class="c_home_text">
    <topslot name="城市列表"></topslot>
    <div class="content hbfb content_box" :class="{ top_pom_box: show }">
      <div class="citys_dv">
        <van-search v-model="value" placeholder="请输入城市关键字" />
      </div>
      <div v-if="show" class="search_data">
        <div v-if="list.length === 0" class="flex-j-center a-center m-20 p-20">
          暂无相关数据...
        </div>
        <div v-else>
          <div
            class="p-10 filter_dv flex-a-center"
            v-for="(item, index) in list"
            :key="index"
          >
            <!-- id 商品id -->
            <div class="p-10" @click="changeCity(item)">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="p-10">当前城市</div>
        <div class="bg-c-w m-t-b10 p-tb10">
          <div class="active_city p-10 t-a-center  m-l10">
             {{ city?city:'定位中' }}
          </div>
        </div>
        <div class="p-10">热门城市</div>
        <div class="bg-c-w m-t-b10 p-tb10 flex a-center hot_cisty">
          <div
            class="active_city p-10 t-a-center  m-l10 m-b10"
            v-for="(item, index) in hotCity"
            :key="index"
            @click="changeCity(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
        <van-index-bar>
          <template v-for="(value, key, index) in cityList">
            <van-index-anchor :index="key" />
            <van-cell
              :title="item.name"
              v-for="(item, index) in value"
              @click="changeCity(item.name)"
            />
          </template>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import citydata from "../../lib/city";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      hotCity: citydata.data.hotCities,
      cityList: citydata.data.cities,
      //是否显示装搜索数据的盒子
      show: false,
      //搜索过滤的数据
      list: []
    };
  },
  components: {
  },
  methods: {
    //切换城市
    changeCity(name) {
      this.$store.commit("setCity", name);
      //存储选中的城市到localstorage
      localStorage.setItem('citys',name)
      this.$router.push("/");
    },
    //输入框获取焦点的方法
    iptFocus() {
      this.show = true;
    }
  },
  mounted() {
  },
  computed: {
    city() {
      return this.$store.state.city;
    }
  },
  watch: {
    value(val1) {
      //如果搜索内容为空就退出搜索模块
      if (!val1) {
        this.show = false;
      } else {
        this.list = [];
        this.show = true;
        for (let i in this.cityList) {
          this.cityList[i].map(item => {
            if (
              item.name.includes(val1) ||
              item.spell.includes(val1)
            ) {
              this.list.push(item.name);
            }
          });
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  background: #eee;
  .active_city {
    width: 82px;
    border: 1px solid #eee;
  }
  .hot_cisty {
    flex-wrap: wrap;
    .active_city {
      width: 22%;
    }
  }
  .abc_dv {
    div {
      border: 1px solid #eee;
    }
  }
}
</style>