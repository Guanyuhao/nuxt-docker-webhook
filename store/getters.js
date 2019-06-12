export default {
  getLoginStatus (state) {
    return state.login
  },
  getUser (state) {
    return state.user
  },
  getToken(state) {
    return state.token
  },
  getName(state){
    return (state.user && state.user.name)? state.user.name : '';
  }
}
