import {getCookie} from '../utils/cookie'

export default ({ store, redirect, route })=>{
  // 权限控制
  let path = route.path
  let authArr = ['login','home']
  if(path === '/login'){
    store.commit('setHeader','login')
  }else if(path === '/home'){
    store.commit('setHeader','home')
  }else if(path === '/whitepaper'){
    store.commit('setHeader','home')
  }else{
    store.commit('setHeader','normal')
  }
  if(path === '/taskmanger'){
    store.commit('setNavActive',1)
  }else if(path === '/usermanger'){
    store.commit('setNavActive',2)
  }else if(path === '/help'){
    store.commit('setNavActive',3)
  }else if(path === '/infor'){
    store.commit('setNavActive',4)
  }else if(path === '/'){
    store.commit('setNavActive',0)
  }else{
    store.commit('setNavActive',-1)
  }
  let isAuth = authArr.indexOf(store.state.headerStatus) > -1? false : true

  if(process.client){
    if(isAuth){
      store.dispatch("GET_ROLE",{
        userId:getCookie("userId")
      });
      if(!store.state.userRole){
        return
      }
      // if(path=="/taskmanger"){
      //   if(!store.state.userRole.taskManger){
      //     redirect('/403')
      //   }
      // }
      if(path=="/usermanger"){
        if(!store.state.userRole.peopleManger){
          redirect('/403')
        }
      }
      if(path=="/usermange"){
        if(!store.state.userRole.userMnager){
          redirect('/403')
        }
      }
      if(path=="/rolemange"){
        if(!store.state.userRole.roleManger){
          redirect('/403')
        }
      }

    }
    clearInterval(window.scrollInter)
    window.scrollInter = null
    clearInterval(window.passAutoJump)
    window.passAutoJum = null

  }

}
