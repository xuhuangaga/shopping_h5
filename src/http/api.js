// 封装所有的请求
import http from './index'

export default {
  //获取首页数据
  getHomeData() {
    return http.get('/recommend')
  },
  //首页搜索
  // 参数: value: 搜索关键词
  homeSearch({ value }) {
    return http.post('/search', { value })
  },
  //分类查询
  // id:默认分类的id
  classification(id) {
    return http.get(`/classification?mallSubId=${id}`)
  },
  //查询获取购物车数据
  getCarsData() {
    return http.post('/getCard')
  },
  //购物车加减商品
  // count: 购物车数量
  // id: 商品id
  // mallPrice: 价格
  editCart({ count, id, mallPrice }) {
    return http.post('/editCart', { count, id, mallPrice })
  },
  //购物车商品删除
  // 商品cid(数组) 直接传入数组
  deleteShop(cid) {
    return http.post('/deleteShop', cid)
  },
  //购物车支付
  // address:收货地址
  // tel:电话
  // orderId:所有商品的id(数组)
  // totalPrice:总价格
  // idDirect:用来判断是购物车结算还是直接购买(直接购买为true,购物车结算为false)
  // count:商品数量 (购物车购物传入第一个商品的count)
  pay({ address, tel, orderId, totalPrice, idDirect, count }) {
    return http.post('/order', { address, tel, orderId, totalPrice, idDirect, count })
  },
  //单个商品详情
  // id:商品的id
  getGoodsById(id) {
    return http.get(`/goods/one?id=${id}`)
  },
  //收藏单个商品
  // goods：商品的详情信息(传商品对象)
  collection(goods) {
    return http.post('/collection', goods)
  },
  //取消收藏
  // id:商品的id
  cancelCollection({ id }) {
    return http.post('/cancelCollection', { id })
  },
  // 查询商品是否已收藏
  // id:商品的id
  isCollection({ id }) {
    return http.post('/isCollection', { id })
  },
  // 加入购物车
  // id:商品的id
  addShop({ id }) {
    return http.post('/addShop', { id })
  },
  //退出登录
  loginOut() {
    return http.post('/loginOut')
  },
  //获取用户信息
  queryUser() {
    return http.post('/queryUser')
  },
  // 修改保存用户信息
  // gender: 性别
  // year: 年
  // month: 月
  // day: 日
  // id: 用户id
  // nickname: 昵称
  saveUser({ gender, year, month, day, id, nickname }) {
    return http.post({ gender, year, month, day, id, nickname })
  },
  // 商品评论
  // id: 商品cid
  // rate: 分数
  // content: 内容
  // anonymous: 是否匿名 
  // _id: 商品的_id
  // order_id: 商品的order_id
  // image: [](图片上传接口有问题，image就直接传入写死的空数组)
  subComment({ id, rate, content, anonymous, _id, order_id, image }) {
    return http.post('/goodsOne/comment', { id, rate, content, anonymous, _id, order_id, image })
  },
  // 获取登录注册默认验证码
  verify() {
    return http.get('/verify')
  },
  // 查询用户收货地址
  getAddress() {
    return http.get('/getAddress')
  },
  //查询默认收货地址
  getDefaultAddress() {
    return http.get('/getDefaultAddress')
  },
  // 设置默认收货地址
  // id: 地址id
  setDefaultAddress({ id }) {
    return http.post('/setDefaultAddress', { id })
  },
  // 增加收货地址
  // name:用户名
  // tel:电话
  // address:(省+市+区+详情地址)
  // isDefault:是否默认
  // province:省
  // city:市
  // county:区
  // addressDetail:详情地址，
  // areaCode:地区代码
  // id:修改地址时候要传id
  addAddress({ name, tel, address, isDefault, province, city, county, addressDetail, areaCode, id }) {
    return http.post('/address', { name, tel, address, isDefault, province, city, county, addressDetail, areaCode, id })
  },
  // 删除地址
  // id:地址_id
  deleteAddress({ id }) {
    return http.post('/deleteAddress', { id })
  },
  // 注册
  // nickname: 用户名
  // password:密码
  // verify:验证码
  register({ nickname, password, verify }) {
    return http.post('/register', { nickname, password, verify })
  },
  // 登录
  // nickname: 用户名
  // password:密码
  // verify:验证码
  login({ nickname, password, verify }) {
    return http.post('/login', { nickname, password, verify })
  },
  // 订单查询
  myOrder() {
    return http.get('/myOrder')
  },
  // 查询已评价
  alreadyEvaluated() {
    return http.get('/alreadyEvaluated')
  },
  // 查询未评价
  tobeEvaluated(page = 1) {
    return http.get('/tobeEvaluated', {
      params: { page }
    })
  },
  // 查询单条评论
  // id:商品id
  // _id:数据库的那条id
  evaluateOne({ id, _id }) {
    return http.post('/evaluateOne', { id, _id })
  }
}