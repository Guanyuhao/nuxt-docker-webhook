<template>
  <div class="v-login--wrapper">
    <div class="v-login">
      <header class="login-header">
        <div class="logo">
          <img src="~/assets/img/logo.png" alt="">
        </div>
        <div class="right">
            <div class="item">
                <a href="http://www.elensdata.com" target="_blank">官网</a>
            </div>
            <div class="item">
              <!-- <nuxt-link to="/whitepaper"> -->
                智策
              <!-- </nuxt-link> -->
            </div>
            <div class="item">
              <!-- <nuxt-link to="/whitepaper"> -->
                智图
              <!-- </nuxt-link> -->
            </div>
            <div class="item">
                <a href="http://nlp.elensdata.com" target="_blank">智语</a>
            </div>
        </div>
      </header>
      <div class="title">
        <h1>御繁以简</h1>
        <p>让数据标注变得智能、便捷、高效</p>
      </div>
      <div class="login-warpper">
        <h4>登录</h4>
        <div class="login-error" v-show="loginError">
          {{loginError}}
        </div>
        <el-form :model="loginForm"   ref="loginform">
          <el-form-item  prop="user">
            <el-input type="text" placeholder="请输入用户名" v-model="loginForm.user" autocomplete="off" @blur="loginBlurCheck('user')"></el-input>
          </el-form-item>
          <el-form-item  prop="pass">
            <el-input type="password" placeholder="密码" v-model="loginForm.pass" autocomplete="off"  @blur="loginBlurCheck('pass')"></el-input>
          </el-form-item>
          <el-form-item  prop="code" class="code-item">
            <!-- <div class="code-wrapper">
              <el-input type="text" placeholder="请输入验证码" v-model="loginForm.code" autocomplete="off"></el-input>
              <img @click="changeImg" :src="codeImgUrl" alt="">
            </div> -->
            <dragVerify @success='dragSuccessHandle' v-model="loginForm.dragVerify"></dragVerify>

          </el-form-item>
          <el-form-item class='remember-item'>
            <el-checkbox v-model="rember" class="rembaerpass">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="sureBtn-item">
            <el-button class="logbtn"  type="primary" @click="submitForm('loginform')" >登录</el-button>
          </el-form-item>
          <el-form-item>
            <div class="passwordtip">
              如您忘记密码，请联系管理员
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer class="footer">
        ©北京一览群智数据科技有限责任公司2015京ICP备15062981号-1
      </footer>
  </div>
</template>
<script>
import dragVerify from '~/components/UI/dragVerify';

export default {
  name: 'login',
  layout: 'home',
  components: {
    dragVerify
  },
  data(){
    var validatePass = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9]{6,16}$/;
      // if (!uPattern.test(value)) {
      //   callback(new Error('密码由6~16位(区分大小写)、数字或者字母均可'));
      if( !value || value === ''){
        callback(new Error('请输入密码'))
      }else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9\S]{5,16}$/;
      // if (!uPattern.test(value)) {
        // callback(new Error('用户名由5~16位(区分大小写)、数字、字母或者符号均可'));
      if( !value || value === ''){
        callback(new Error('请输入用户名'))
      } else {
        callback();
      }
    };
    var validateCode= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
     var validateiIsDragVerify= (rule, value, callback) => {
      if (!value) {
        callback(new Error('请拖动滑块'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        user: '',
        pass: '',
        code: '',
        isDragVerify: false
      },
      rember:false, //是否记住密码
      ruleLogin: {
        user: [
          { validator: validateUser, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        // code: [
        //   { validator: validateCode, trigger: 'blur' }
        // ],
        // isDragVerify: [
        //   { validator: validateiIsDragVerify, trigger: 'click' }
        // ]
      },
      // codeImgUrl: 'http://101.254.159.164:8901/lensLabel/verifyCode',
      loginError: '',
    }
  },
  computed: {

  },
  created(){
    this.init()
  },
  mounted(){
    this.initEvent()
    this.inituser()
  },
  methods: {
    init(){
      if(process.client){
        if(this.$getCookie("logpwd")){
          this.rember = true
        }else{
          this.rember = false
        }
      }
    },
    dragSuccessHandle(){
      this.loginForm.isDragVerify = true
    },
    loginBlurCheck(type){
      if(type === 'user'){
        if(!this.loginForm.user){
          this.loginError = '请输入用户名'
          return
        }else{
          this.loginError = ''
        }
      }else if(type === 'pass'){
        if(!this.loginForm.pass){
          this.loginError = '请输入密码'
          return
        }else{
          this.loginError = ''
        }
      }
    },
    submitForm(formName){
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     if(!this.loginForm.isDragVerify){
      //       this.$message({
      //         type: 'error',
      //         message: '请拖动滑块验证'
      //       })
      //       return false
      //     }
      //     this.postLogin()
      //     .then(res=>{
      //       this.handeLogin(res)
      //     })
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '用户名密码无效'
      //     })

      //     return false;
      //   }
      // });
      if(!this.loginForm.user){
        this.loginError = '请输入用户名'
        return
      }else{
        this.loginError = ''
      }
      if(!this.loginForm.pass){
        this.loginError = '请输入密码'
        return
      }else{
        this.loginError = ''
      }
      if(!this.loginForm.isDragVerify){
        this.loginError = '请拖动滑块验证'
        return false
      }else{
        this.loginError = ''
      }
      this.postLogin()
      .then(res=>{
        this.handeLogin(res)
      })
    },
    changeImg(){
      this.codeImgUrl = `http://101.254.159.164:8901/lensLabel/verifyCode?${+new Date()}`
    },
    postLogin(){
      let data = {
        userName:this.loginForm.user,
        userPassword:this.$md5(this.loginForm.pass),
        code:this.loginForm.code,
        verifyCode_true: this.$getCookie("verifyCode_true"),
      }
      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/system/login`,data)
        .then(res=>{
          resolve(res)
        })
      })
    },
    handeLogin(res){
      if(res&&res.code==0){
          this.$setCookie("username",res.data.userName,1000*60*60*24*365);
          this.$setCookie("name",res.data.name,1000*60*60*24*365);
          this.$setCookie("token",res.data.token,1000*60*60*24*365);
          this.$setCookie("userId",res.data.userId,1000*60*60*24*365);
          this.$store.commit('setUser',{
            userName: res.data.userName,
            userId: res.data.userId,
            name: res.data.name
          })
          // 刷新用户权限
          // this.$store.dispatch('GET_ROLE',{
          //   userId: this.$getCookie("userId")
          // })
          if(this.rember){
            this.$setCookie("logname",this.loginForm.user,1000*60*60*24*7);
            this.$setCookie("logpwd",this.loginForm.pass,1000*60*60*24*7);
          }else{
            this.$setCookie("logname","",1000*60*60*24*7);
            this.$setCookie("logpwd","",1000*60*60*24*7);
          }
          this.$router.push('/')
      }else{
        // this.$message({
        //   type: 'error',
        //   message: res.msg
        // })
        this.loginError = res.msg
        // if(res.msg ==='验证码不正确，请重新输入验证码！'){
        //   this.changeImg()
        // }
      }
    },
    inituser(){
      if(this.$getCookie("logname")!=""||this.$getCookie("logname")!=null){
        this.loginForm.user = this.$getCookie("logname");
        this.loginForm.pass = this.$getCookie("logpwd");
      }else{
          this.loginForm.user = "";
          this.loginForm.pass = "";
      }
    },
    initEvent(){

      document.onkeyup = (e)=>{
          let key = e.keyCode;
          if(key==13){
            if(this.$route.path=='/login'){
                this.submitForm('loginform');
            }
          }
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/scss/mixins";
.v-login--wrapper{
  .footer{
    height: 60px;
    width: 100%;
    text-align: center;
    border-top: 1px solid #E1E1E1;
    font-size: 12px;
    line-height: 60px;
    color: rgba($color: #000000, $alpha: 0.46)
  }
  height: 100%;
  overflow-y: auto;
}
.v-login {
  height: 100%;
  background: #fbfbfb url('~assets/img/lgbk.png') no-repeat center center;
  background-size: cover;
  position: relative;
  min-width: 1366px;
  .login-header{
    width: 100%;
    height: 60px;
    background: #1f2129;
    position: fixed;
    top: 0;
    @include classflex();
    font-size: $font-base;
    .logo{
      width: 240px;
      padding-right: 50px;
      margin-left: 46px;
      @include classflex(flex-start);
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .right{
      @include classflex(flex-start);
      align-items: center;
      margin-right: 46px;
      line-height: 60px;
      .item{
        width: 60px;
        height: 60px;
        cursor: pointer;
        text-align: center;
        margin-right: 15px;
        color: rgba(255, 255, 255, 0.6);

        a{
         color: rgba(255, 255, 255, 0.6);
         display: block;
        }

        &:hover{
          border-bottom: 2px solid $blue;
          a{
            color: $blue;
          }
          color: $blue;
        }
      }
    }
  }
  .title{
    color: #ffffff;
    position: absolute;
    left: 15vw;
    top: 22vh;
    h1{
      font-weight: normal;
      line-height: 48px;
      font-size: 36px;
      margin-bottom: 10px;
    }
    p{
      font-size: 22px;
      margin-top: 20px;
      line-height: 25px;
    }
  }
  .login-warpper{
    position: absolute;
    right: 16vw;
    top: 20vh;
    width: 400px;
    min-height: 450px;
    background: #ffffff;
    border: 1px solid #E1E6EB;
    box-shadow: 0 3px 3px 0 rgba(194,206,231,0.42);
    padding: 38px 30px 20px 30px;
    h4{
      font-size: 20px;
      font-weight: normal;
      margin-bottom: 28px;
    }
    .el-form-item{
      margin-bottom : 26px;
    }
    .code-item{
      margin-bottom : 5px;
    }
    .remember-item{
      margin-bottom : 10px;
    }
    .sureBtn-item{
      margin-bottom : 35px;
    }
    .el-form-item:last-child{
      margin-bottom: 0;
    }
    .code-wrapper{
      @include classflex();
      padding-right: 20px;
      .el-input{
        width: 200px;
      }
      img{
        height: 36px;
        width: auto;
      }
    }
    .passwordtip{
      text-align: center;
      color: rgba($color: #000000, $alpha: 0.6);
      font-size: 12px;
    }
    .logbtn{
      width: 100%;
      border-radius: 2px;
      font-weight: normal;
    }
    .el-input__inner{
      font-size: 15px;
    }
    .rembaerpass{
      font-weight: normal;
      font-size: 13px;
    }
    .login-error{
      height: 36px;
      line-height: 36px;
      border: 1px solid #f25961;
      padding-left: 15px;
      background: #fff3f4;
      transform: translateY(-12px);
      margin-bottom: 8px;
      color: #d7141E;
      font-size: 14px;
    }
  }

}
@media screen and (max-width: 1466px)  {
  .v-login {
    height: 100%;
    background: #fbfbfb url('~assets/img/lgbk2.png') no-repeat center center;
    background-size: cover;
    position: relative;
    .title{
      left: 12vw;
    }
  }
}
</style>

<style>
html {
    overflow: -moz-hidden-unscrollable;
    height: 100%;
}
body::-webkit-scrollbar {
    display: none;
}
body{
  -ms-overflow-style: none;
  height: 100%;
	width: calc(100vw + 18px);
	overflow: auto;
}

</style>
