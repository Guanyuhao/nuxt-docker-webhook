export default {
  //gc
  setToken(state,token){
    state.token = token
  },
  setHeader(state,status){
    state.headerStatus = status
  },
  setUser(state,user){
    state.user = user
  },
  SET_USERLIST(state,userlist){
    state.userList = userlist
  },
  SEND_COUNT(state,){
    //sendCount 预处理模型的次数
    state.sendCount += 1
  },
  SEND_CHECK(state,){
    // checkEachOther 交叉验证的 次数
    state.sendCheck += 1
  },
  SET_ROLE(state,role){
    state.userRole = role
  },
  setNavActive(state,num){
    state.navActive = num
  }
}
