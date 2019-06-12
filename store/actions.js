export default {
  async GET_USERLIST({commit}){
    const userList = await this.$axios.$post('/pro/showUserByCompany')
    commit('SET_USERLIST',userList.data.array)
  },
  async SEND_INFOR({commit},option){
    let data = {
      proId: '',
      labelType: '',
      batchCount: 0
    }
    Object.assign(data,option)
    this.$axios.$post('/model/prepareExecuteModel',data)
    .then(res=>{
      commit('SEND_COUNT',res.data)
    })
  },
  async CHECK_OTHER({commit},option){
    let data = {
      proId: '',
    }
    Object.assign(data,option)
    return new Promise((resolve,)=>{
      this.$axios.$post('/pro/checkEachOther',data)
      .then(res=>{
        commit('SEND_CHECK',res.data)
        resolve(res)
      })
    })
  },
  async GET_ROLE({commit},option){
    let data = {
      userId: ''
    }
    Object.assign(data,option)
    const userRole = await this.$axios.$post('/elensuser/getUserRole',data)
    let Role = {
      default: true,
      taskManger: false,
      peopleManger: false,
      userMnager: false,
      roleManger: false
    }
    userRole.data.forEach(item => {
      let name = item.name
      if(name === '默认权限'){
        Role.default = (item.dr === 1 ? true : false)
      }
      if(name === '任务管理'){
        Role.taskManger = (item.dr === 1 ? true : false)
        Role.peopleManger = (item.dr === 1 ? true : false)
      }
      if(name === '角色管理'){
        Role.roleManger = (item.dr === 1 ? true : false)
      }
      if(name === '用户管理'){
        Role.userMnager = (item.dr === 1 ? true : false)
      }
    });
    commit('SET_ROLE',Role)
  }
}
