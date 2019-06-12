<template>
  <Header class="header">
    <div class="logo">
      <nuxt-link to="/">
          <img src="~/assets/img/logo.png" alt="">
      </nuxt-link>
    </div>
    <ul class="header-menu">
      <li v-for="(nav,index) in menuArr.filter(item=>item.auth)" :key="index" :class="activeIndex===index?'active':''"  @click="changeActive(index)">
        <nuxt-link :to="nav.path">
          {{nav.name}}
        </nuxt-link>
      </li>
    </ul>
    <div class="hedare-right">
      <div class="item help"  :class="activeIndex===3?'active':''"  @click="changeActive(3)">
        <nuxt-link to="/help">
           帮助中心
        </nuxt-link>
      </div>
      <div class="item infor"  :class="activeIndex===4?'active':''"  @click="changeActive(4)">
          <nuxt-link class="" to="/infor">
            <i class="el-icon-bell infor-bell"></i>
          </nuxt-link>
          <el-badge is-dot :hidden="state" ></el-badge>
      </div>
      <el-dropdown class="item user" trigger='hover'>
        <div class="el-dropdown-link userWrapper">
        <span class="text-elli">{{name?name:userName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="userMangerAuth">
            <nuxt-link class="" to="/usermange">
              用户管理
            </nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="roleMangerAuth">
            <!-- el-icon-edit -->
            <nuxt-link class="" to="/rolemange">
              角色管理
            </nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- el-icon-setting -->
            <nuxt-link class="" to="/reset">
              修改密码
            </nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item >
            <!-- <i class="el-icon-setting">退出</i> -->
            <div @click="signOut">退出</div>

          </el-dropdown-item>
          <!--  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </Header>
</template>
<script>
export default {
  data(){
    return {
      menuArr: [
        {
          name: '任务列表',
          path: '/',
          auth: true
        },
        {
          name: '任务管理',
          path: '/taskmanger',
          auth: true
        },
        {
          name: '人员管理',
          path: '/usermanger',
          auth: false
        },
      ],
      authArr: ['login','home'],
      userName: '',
      userMangerAuth: false,
      roleMangerAuth: false,
      state:false
    }
  },
  created(){
    // 解决刷新问题

    if(this.$route.path === '/taskmanger'){
      this.$store.commit('setNavActive',1)
    }
    if(this.$route.path === '/usermanger'){
      this.$store.commit('setNavActive',2)
    }
    if(this.$route.path === '/help'){
      this.$store.commit('setNavActive',3)
    }
    if(this.$route.path === '/infor'){
      this.$store.commit('setNavActive',4)
    }
    if(this.$route.path === '/'){
      this.$store.commit('setNavActive',0)
    }

  },
  computed: {

    name(){
      return this.$store.getters.getName
    },
    userRole(){
      return this.$store.state.userRole
    },
    activeIndex(){
      return this.$store.state.navActive
    }
  },
  mounted() {
      this.$nextTick(()=>{
        this.userName = this.$getCookie('name')
        this.getRole()
      })
      this.$axios.$post("/message/getHavenotReadorNot",{
      }).then((res)=>{
        if(res.data>=1){
          this.state = false
        }else{
          this.state = true;
        }
      })
      this.$on("header",()=>{
       this.$axios.$post("/message/getHavenotReadorNot",{
        }).then((res)=>{
          if(res.data>=1){
            this.state = false
          }else{
            this.state = true;
          }
        })
      })
  },
  methods: {
    signOut() {
      console.log('out')
      this.$delCookie('')
      this.$router.push('/login')
    },
    async getRole() {
      if(!this.$store.state.userRole){
        await this.$store.dispatch('GET_ROLE',{
          userId: this.$getCookie("userId")
        })
      }
      this.initAuth()
    },
    initAuth(){
      if(this.userRole){
        this.menuArr[2].auth = this.userRole.peopleManger
        this.userMangerAuth = this.userRole.userMnager
        this.roleMangerAuth =this.userRole.roleManger
      }
    },
    changeActive(index){
      this.$store.commit('setNavActive',index)
    }
  },
  watch: {
    userRole(newVal, oldVal){
      // console.log('header userRole')
      if(newVal){
        this.initAuth()

      }
    },
    $route(){
      this.$emit("header")
    }
  }

}
</script>
<style>
.el-badge__content.is-dot {
    height: 5px;
    width: 5px;
    padding: 0;
    margin-top: 18px;
    right: 0;
    border-radius: 50%;
}
</style>

<style lang="scss">
@import '~assets/styles/scss/mixins';

.header{
  width: 100%;
  min-height: $hdHeight;
  max-height: $hdHeight;
  line-height: $hdHeight;
  background: $navBackgroundColor;
  color: $white;
  height: 50px;
  font-size: $font-base;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @include classflex();
  .logo{
    width: 240px;
    padding-left: 26px;
    padding-right: 50px;
    @include classflex(flex-start);
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .header-menu{
    @include classflex(flex-start);
    flex: 1;
    li{
      padding-right: 32px;
      a{
        color: rgba($color: #f8f8f8, $alpha: 0.6);
        display: block;
      }
      &.active{
        a{
          color: #ffffff;
        }
      }
    }
  }
  .hedare-right{
    width: 340px;
    @include classflex(flex-end);
    padding-right: 20px;
    .item{
      cursor: pointer;
      text-align: center;
      margin-left: 20px;
      a{
         color: rgba(255, 255, 255, 0.6);
         font-weight: normal;
         display: block;
      }
      &:nth-child(1){
        color: rgba(255, 255, 255, 0.6);
      }
      &:nth-child(3){
        color: $white;
        color: rgba(255, 255, 255, 0.6);
      }
      &:nth-child(2){
        color: rgba(255, 255, 255, 0.6);
      }
      &.active{
        a{
          color: #ffffff;
        }
      }
    }
    .infor-bell{
      font-size: 16px;
    }
    .infor{
      position: relative;
      @include classflex(center);
      .el-badge{
        position: absolute;
        right: 0;
        top: -5px;
      }
    }
  }
}
.userWrapper{
  @include classflex(flex-start);
  flex-direction: row;
  flex-flow: wrap;
}
.text-elli{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80px;
}
.el-dropdown-menu__item{
  a{
    color: #606266;
    display: block;
  }
}
</style>
