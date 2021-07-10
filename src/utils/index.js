// 模块化(es6提供): esmodule
// 导入和导出
// 其余文件可以使用到该文件的变量和方法

// export default: 默认导出 导出变量 数组 对象 方法 只能导出一次
// export: 导出 导出变量 数组 对象 方法 但是要加let或者const 能导出多次

import { Dialog, Toast } from 'vant';
//导入路由
import router from '../router';

export default {
  //检测用户是否登录
  // key:本地存储用户信息的key
  // next:传入一个函数 下一步的操作
  // item,item1:next函数需要的参数
  checkLogin({ key, next, item, item1 }) {
    //检测本地有没有用户信息
    let user = localStorage.getItem(key)
    if (user) {
      //已经登录 继续下一步操作
      next(item, item1)
    } else {
      //未登录 提示用户是否跳转
      Dialog.confirm({
        title: '登录后才可使用此功能',
        message: '点击跳转登录/注册',
        confirmButtonColor: "#439ffb"
      }).then(res => {
        //跳转到登录页
        router.push('./loginres')
      }).catch(() => {
        Toast('您取消了操作')
      })
    }
  },
  //存储记录
  //浏览历史 browse
  //搜索历史 search
  //收藏历史 collection
  //key:存储的名字
  //item:根据什么属性名来去重
  saveHistory({ key, data,item }) {
    //拼接一个名字
    let name = key + 'History'
    let history = localStorage.getItem(name)
    let arr = []
    if (history) {
      //已经存储过了 将以前的数据一起保存下来
      arr = JSON.parse(history)
    }
    arr.push(data)
    if (typeof (data) === "string") {
      //简单数据类型去重
      arr = Array.from(new Set(arr));
    } else {
      //复杂数据类型去重
      const res = new Map();
      arr = arr.filter(arr => !res.has(arr[item]) && res.set(arr[item], 1))
    }
    localStorage.setItem(name, JSON.stringify(arr))
  },
  //获取存储记录
  getHistory(key) {
    let name = key + 'History'
    let arr = localStorage.getItem(name)
    if (arr) return JSON.parse(arr)
    else return null
  },
  //删除存储记录
  //key:browse(浏览记录) search(搜索记录：做清空操作) collection(收藏记录)
  //id:商品对象id
  removeHistory(key, id) {
    let name = key + 'History'
    let arr = this.getHistory(key)
    if (arr !== null) {
      //传入的id不为空 则做过滤操作
      if (id) {
        // 将以前存的数据转换成数组
        arr = arr.filter(item => {
          return item.id !== id;
        });
        localStorage.setItem(name, JSON.stringify(arr));
      } else {
        //传入的id为空 则清空该历史（用于清空搜索历史）
        localStorage.setItem(name, []);
      }
    }
    Toast("删除成功");
  },
  //跳转页面
  goto(url, id) {
    if (id) {
      router.push({
        path: url,
        query: {
          id: id
        }
      })
    } else {
      router.push(url)
    }
  },
}