export default {
  token: '',
  user:null,//用户信息
  navActive: -1,
  // domain:'101.254.159.164:8901',//'101.254.159.164:8901',//'192.168.1.231:8901'
  // gc
  domain:process.env.API_URL || 'http://192.168.1.233:7901/lensLabel', //api 地址
  userList: null,
  userRole: null, // 用户权限
  sendCount: 0, //推送次数 创建设置
  sendCheck: 0, //交叉验证
  headerStatus: 'home',
}
