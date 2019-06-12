<template>
  <div class="v-home">
    <header :class="isflexd?'isbg':''">
      <div class="content-wrapper">
          <div class="logo" @click="scrollTOP">
          <nuxt-link to="/home">
            <img src="~/assets/img/logo.png" alt="">
          </nuxt-link>
        </div>
        <div class="right">
          <div class="item">
            <nuxt-link to="/whitepaper">
              产品白皮书
            </nuxt-link>
          </div>
          <div class="item" @click="showRegister">
            申请试用
          </div>
          <div class="item" @click="showLogin">
            登录
          </div>
        </div>
      </div>
    </header>
    <section class="first">
      <img class="first-bg--img" src="~assets/img/home/home_bg.png" alt="" >
        <div class="first-bg--warpper">
          <img class="first-bg--con" src="~assets/img/home/home_bg_con.png" alt="" width="991" height="572">
          <div class="title">
            <h1>御繁以简</h1>
            <p>让数据标注变得智能、便捷、高效</p>
            <div class="btn"  @click="showRegister">
              申请试用 <i class="el-icon-back tr180"></i>
            </div>
          </div>
      </div>
    </section>
    <section class="second">
      <div class="content-wrapper">
        <div class="title-top">
          <h3>优势特点</h3>
          <p>Advantages and characteristics</p>
          <div class="smallBar"></div>
        </div>
        <div class="second-bottom--wrapper">
          <dl>
            <dt>
              <img src="~/assets/img/home/advantanges_1.png" width="70" height="77" alt="">
            </dt>
            <dd>
              <b>大幅提升</b>标注效率，从
              人工识别变为简单确认
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="~/assets/img/home/advantanges_2.png" width="80" height="78" alt="">
            </dt>
            <dd>
              支持多人标注同一数据
              提高标注<b>准确性</b>
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="~/assets/img/home/advantanges_3.png" width="83" height="90" alt="">
            </dt>
            <dd>
              任务管理机制完善，适
              用于<b>大规模</b>任务标注
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="~/assets/img/home/advantanges_4.png" width="84" height="78" alt="">
            </dt>
            <dd>
              能够有效降低标注量，
              同时提升模型<b>预测能力</b>
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="~/assets/img/home/advantanges_5.png" width="80" height="82" alt="">
            </dt>
            <dd>
              标注过程流畅，操作便
              捷，尊重<b>用户体验</b>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="three">
        <div class="content-wrapper">
          <div class="title-top">
            <h3>标注类型</h3>
            <p>Annotation type</p>
            <div class="smallBar"></div>
          </div>
          <div class="three-content--wrapper">
            <div class="left">
              <div class="item">
                <img src="~assets/img/home/annotation_1.png" width="48" height="43" alt="">
                <span>实体识别</span>
              </div>
              <div class="item">
                <img src="~assets/img/home/annotation_2.png" width="46" height="45" alt="">
                <span>分类标注</span>
              </div>
              <div class="item">
                <img src="~assets/img/home/annotation_3.png" width="50" height="44" alt="">
                <span>关系标注</span>
              </div>
              <div class="item">
                <img src="~assets/img/home/annotation_4.png" width="45" height="42" alt="">
                <span>图片标注</span>
              </div>
            </div>
            <div class="right">
              <img src="~assets/img/home/annotationtype_right.png" width="436" height="323" alt="">
            </div>
          </div>
        </div>
    </section>
    <section class="four">
      <div class="content-wrapper">
        <img  class='yinhao' src="~assets/img/home/yinhao.png" width="134" height="116" alt="">
        <div class="title-top">
          <h3>客户服务</h3>
          <p>Customer service</p>
          <div class="smallBar"></div>
        </div>
        <div class="four-content--wrapper">
          <div class="item">
            <img class="sacle" src="~/assets/img/home/customer_1.png" width="80" height="74" alt="">
            <span>金融行业</span>
          </div>
          <div class="item">
            <img class="sacle" src="~/assets/img/home/customer_2.png" width="76" height="81" alt="">
            <span>政府机构</span>
          </div>
          <div class="item">
            <img class="sacle" src="~/assets/img/home/customer_3.png" width="80" height="72" alt="">
            <span>大型企业</span>
          </div>
          <div class="item">
            <img class="sacle" src="~/assets/img/home/customer_4.png" width="56" height="70" alt="">
            <span>科研机构</span>
          </div>
        </div>
      </div>
    </section>
    <section class="footer">
      <div class="content-wrapper">
        <div class="left">
          <img src="~/assets/img/home/footer_logo.png"  width="180" height="34" alt="">
          <dl>
            <dt>行业方案</dt>
            <dd>
              媒体情报
            </dd>
            <dd>
              全系搜索
            </dd>
            <dd>
              公共安全
            </dd>
            <dd>
              金融监管
            </dd>
          </dl>
           <div class="two">
             <dl>
              <dt>咨询热线</dt>
              <dd>
                010-82608077
              </dd>
              <dd>
                business@elensdata.com
              </dd>
            </dl>
            <dl>
              <dt>技术支持</dt>
              <dd>
                010-50960134
              </dd>
              <dd>
                support@elensdata.com
              </dd>
            </dl>
           </div>
        </div>
         <div class="right">
            <img src="~/assets/img/home/wx.png"  width="85" height="86" alt="">
        </div>
      </div>
      <p class="copy">Copyright © 北京一览群智数据科技有限责任公司 2015 京ICP备15062981号-1</p>
    </section>
    <!-- login -->
    <el-dialog
      title="登录"
      :visible.sync="loginModal"
      width="400px"
      top='200px'
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      center>
      <div class="login-warpper">
        <div class="login-error" v-show="loginError">
        {{loginError}}
        </div>
        <el-form :model="loginForm"  ref="loginform">
          <el-form-item  prop="user">
            <el-input type="text" placeholder="请输入用户名" v-model="loginForm.user" @blur="loginBlurCheck('user')" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="pass" >
            <el-input type="password" placeholder="密码" v-model="loginForm.pass" @blur="loginBlurCheck('pass')" autocomplete="off"></el-input>
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
    </el-dialog>
    <!-- regitster -->
    <modalBox
      ref="register_modal"
      :width='"450px"'
      :top='"100px"'
      @sure='addApplication'
      :footerInfor='true'
      :isClickClose='false'
      :notAutoClose='true'
      class="whitePaper_modale"
      >
      <template slot="title">
            申请试用
      </template>
      <div class="register-warpper"  slot="content">
        <el-form
          :model="registerForm"
          :rules="ruleRegister"
          ref="registerForm"
          label-position="right"
          >
          <el-form-item prop="name">
            <el-input type="text" placeholder="请填写您的姓名" v-model="registerForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item   prop="company">
            <el-input type="text" placeholder="请填写您的公司名称" v-model="registerForm.company" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item prop="position">
            <el-select v-model="registerForm.position" placeholder="请选择职务" style="width:100%">
                 <el-option
                    v-for="item in positionArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input type="text" placeholder="请输入手机号" v-model="registerForm.phone" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item prop="email">
            <el-input type="text" placeholder="请输入邮箱" v-model="registerForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="textarea">
            <el-input
              type="textarea"
              placeholder="请填写您的详细需求，以便提供更为优质的服务"
              v-model="registerForm.textarea"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </modalBox>
  </div>
</template>
<script>
import modalBox from '~/components/modalBox';
import dragVerify from '~/components/UI/dragVerify';

export default {
  layout: 'defult',
  components: {
    modalBox,
    dragVerify
  },
  data(){
    var validatePass = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9]{6,16}$/;
      // if (!uPattern.test(value)) {
      //   callback(new Error('密码由6~16位(区分大小写)、数字或者字母均可'));
      if( !value || value === ''){
        callback(new Error('请输入密码'))
      }  else {
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
      if( !value || value === ''){
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    var validateName= (rule, value, callback) => {
     var regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,20}$");
      if (!regex.test(value)) {
        callback(new Error('姓名支持中文、英文、数字、1-20个字符'));
      } else {
        callback();
      }
    };
    var validatePhone= (rule, value, callback) => {
      var mPattern = /^1[34578]\d{9}$/;
      if (!mPattern.test(value)) {
        callback(new Error('手机号码无效'));
      } else {
        callback();
      }
    };
    var validateCompany= (rule, value, callback) => {
     var regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,50}$");
      if (!regex.test(value)) {
        callback(new Error('单位名称支持中文、英文、数字、1-50个字符'));
      } else {
        callback();
      }
    };
    var validatePosition=(rule, value, callback)=>{
      if( !value || value === ''){
        callback(new Error('请选择职务'));
      } else {
        callback();
      }
    };
    var validateEmail= (rule, value, callback) => {
      var mPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if ((!mPattern.test(value) && value!='') || value.length > 50) {
        callback(new Error('邮箱无效'));
      } else {
        callback();
      }
    };
    // var validateTextarea = (rule, value, callback) => {
    //   var mPattern = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){0,500}$");
    //   if (!mPattern.test(value) && value!='' ) {
    //     callback(new Error('需求信息支持中文、英文、数字、0-500个字符'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      isflexd: false,
      scrollDebounce: null,
      ruleLogin: {
        user: [
          { validator: validateUser, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        // code: [
        //   { validator: validateCode, trigger: 'blur' }
        // ]
      },
      loginForm: {
        user: '',
        pass: '',
        code: '',
        isDragVerify: false
      },
      codeImgUrl: 'http://101.254.159.164:8901/lensLabel/verifyCode',
      rember:false, //是否记住密码
      loginModal: false,
      registerModal: false,
      registerForm: {
        name: '',
        phone: '',
        company: '',
        position: '',
        email: '',
        textarea: ''
      },
      ruleRegister: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        company: [
          { validator: validateCompany, trigger: 'blur' }
        ],
        position: [
          { validator: validatePosition, trigger: 'change' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        // textarea: [
        //   { validator: validateTextarea, trigger: 'blur' }
        // ]
      },
      positionArr: [
        {
          value: 1,
          label: '算法工程师'
        },
        {
          value: 2,
          label: '数据分析师'
        },
        {
          value: 3,
          label: '开发人员/工程师'
        },
        {
          value: 4,
          label: 'IT或者技术经理'
        },
        {
          value: 5,
          label: '市场营销/销售'
        },
         {
          value: 6,
          label: '学生'
        },
         {
          value: 7,
          label: '学院/研究院'
        },
         {
          value: 8,
          label: '其他'
        },
      ],
      emailError: false,
      loginError: ''
    }
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
      // 吸顶
      if(process.client){
        this.scrollDebounce = this.$helper.debounce(()=>{
          let top = document.querySelector('.v-home') && document.querySelector('.v-home').scrollTop
          if(top && top > 0){
            this.isflexd = true
          }else{
            this.isflexd = false
          }
        },100)
        this.$nextTick(()=>{
          clearInterval(window.scrollInter)
          window.scrollInter = null
          window.scrollInter = setInterval(() => {
            this.scrollDebounce()
          },200);
        })
      }
      if(process.client){
        if(this.$getCookie("logpwd")){
          this.rember = true
        }else{
          this.rember = false
        }
      }
    },
    scrollTOP(){
      document.querySelector('.v-home').scrollTop = 0
    },
    dragSuccessHandle(){
      this.loginForm.isDragVerify = true
    },
    showLogin() {
      this.loginModal = true
    },
    showRegister() {
      this.$refs.register_modal.showModal()
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
          clearInterval(window.scrollInter)
          this.$router.push('/')
      }else{
        // this.$message({
        //   type: 'error',
        //   message: res.msg
        // })
        this.loginError = res.msg
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
            if(this.$route.path=='/home'){
              if(this.loginModal){
                this.submitForm('loginform');
              }
            }
          }
      }
    },
    addApplication(){
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          let {
            name,
            phone,
            company,
            position,
            email,
            textarea
          } = this.registerForm

          this.$axios.$post(`/app/addApplication`,{
            name,
            phone,
            company,
            position,
            appEmail: email,
            appDescription: textarea
          })
          .then(res=>{
            if(res.code === 0){
              this.$message({
                type: 'success',
                message: '信息申请成功'
              })
            }
          })
          this.$refs['registerForm'].resetFields();

          this.$refs.register_modal.closePop()
        } else {
          // this.$message({
          //   type: 'error',
          //   message: '申请信息无效'
          // })

          return false;
        }
      });
    },

    // beforeDestroy(){
    //   clearInterval(window.scrollInter)
    //   window.scrollInter = null
    // },
  },
  // beforeRouterLeave(to,form,next){
  //   console.log('beforeRouterLeave')
  //   clearInterval(window.scrollInter)
  //   window.scrollInter = null
  // }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/scss/mixins';

.v-home{
  position: relative;
  min-width: 1366px;
  height: 100vh;
  overflow-y: auto;
  .content-wrapper{
    width: 1200px;
    margin:  0 auto;
    position: relative;
    height: 100%;;
  }
  header{
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    min-width: 1366px;
    min-height: $hdHeight;
    max-height: $hdHeight;
    line-height: $hdHeight;
    color: $white;
    font-size: $font-base;
    @include classflex();
    .content-wrapper{
      @include classflex();
    }
    &.isbg{
      background: $navBackgroundColor;
    }
    .logo{
      width: 240px;
      padding-right: 50px;
      @include classflex(flex-start);
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .right{
      @include classflex(flex-start);
      .item{
        cursor: pointer;
        text-align: center;
        margin-left: 42px;
        color: rgba(255, 255, 255, 0.6);
        a:active{
          color: #ffffff;
        }
        a{
         color: rgba(255, 255, 255, 0.6);
        }
        &:active{
          color: #ffffff;
        }
      }
    }
  }
  .first{
    position: relative;
    .first-bg--img{
      height: 640px;
      overflow: hidden;
      width: 100%;
      display: block;
      min-width: 1366px;
    }
    .first-bg--con{
      position: absolute;
      z-index: 3;
      top:  100px;
      right: -120px;
      transform: scale(0.80);
    }
    .first-bg--warpper{
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      height: 100%;
      width: 1200px;
      left: 50%;
      margin-left: -600px;
      .title{
        color: #ffffff;
        position: absolute;
        left: 60px;
        top:  200px;
        h1{
          font-weight: normal;
          line-height: 48px;
          font-size: 40px;
        }
        p{
          font-size: 18px;
          margin-top: 20px;
          line-height: 25px;
        }
        .btn{
          width: 200px;
          height: 50px;
          border-radius: 29px;
          border: 1px solid $blue;
          line-height: 50px;
          text-align: center;
          margin-top: 62px;
          font-size: 18px;
          color: $blue;
          cursor: pointer;
          .tr180{
            transform: rotateY(180deg);
          }
        }
      }
    }
  }
  .second{
    background: #F9F9F9;
    height: 500px;
    padding: 40px 90px 60px 90px;
    .second-bottom--wrapper{
      padding-left: 30px;
      padding-right: 50px;
      @include classflex(center);
      flex-direction: row;
      flex-flow: wrap;
      padding-top: 20px;
      height: 80%;
      dl{
        min-width: 33%;
        @include classflex(center);
        dt{
          margin-right: 20px;
        }
        dd{
          width: 200px;
          line-height: 30px;
          font-size: 16px;
          letter-spacing: 4px;
          color: rgba($color: #000000, $alpha: 0.7);
          b{
            color: #000;
          }
        }
      }
    }
  }
  .title-top{
    padding-left: 10px;
    h3{
      font-size: 30px;
      line-height: 42px;
      color: #181818;
      font-weight: normal;
    }
    p{
      color: rgba($color: #000000, $alpha: 0.4);
      line-height: 22px;
    }
    .smallBar{
      width: 30px;
      height: 4px;
      background: $blue;
      margin-top: 20px;
    }
  }
  .three{
    background: #ffffff;
    height: 620px;
    padding: 40px 90px 40px 90px;
    .three-content--wrapper{
      height: 80%;
      @include classflex(flex-start);
      padding-left: 10px;
      .left{
        width: 60%;
        @include classflex(flex-start);
        flex-direction: row;
        flex-flow: wrap;
        .item{
          width: calc(50% - 40px);
          background: #FFFFFF;
          @include classflex(center);
          box-shadow: 0 3px 10px -3px #D4D5D8;
          border-radius: 6px;
          border-radius: 6px;
          height: 130px;
          margin-top: 20px;
          margin-right: 20px;
          img{
            margin-right: 40px;
          }
          span{
            font-size: 20px;
            color: rgba(0,0,0,0.80);
            letter-spacing: 4px;
          }
        }
      }
      .right{
        @include classflex(center);
      }
    }
  }
  .four{
    background: #F9F9F9;
    height: 480px;
    padding: 40px 90px 0 90px;
    position: relative;
    .yinhao{
      position: absolute;
      left: 200px;
      top: 60px;
    }
    .four-content--wrapper{
      @include classflex(center);
      flex-direction: row;
      flex-flow: wrap;
      padding-left: 240px;
      padding-top: 50px;
      .item{
        width: calc(25% - 20px);
        height: 180px;
        margin-right: 20px;
        background: #FFFFFF;
        box-shadow: 0 3px 10px -3px #D4D5D8;
        border-radius: 6px;
        border-radius: 6px;
        @include classflex(center);
        flex-direction: column;
        img{
          margin-bottom: 20px;
        }
        span{
          font-size: 20px;
          color: rgba(0,0,0,0.7);
          letter-spacing: 4px;
          line-height: 30px;
        }
      }
    }
  }
  .footer{
    background: #292D3A;
    background-size: 100% 100%;
    height: 246px;
    position: relative;
    overflow: hidden;
    .content-wrapper{
      @include classflex();
      height: 200px;
    }
    .right{
      width: 200px;
      height: 100%;
      padding-top: 60px;
      @include classflex();
    }
    .left{
      height: 100%;
      flex: 1;
      @include classflex(flex-start);
      flex-direction: column;
      align-items: flex-start;
      padding-top: 40px;
      img{
        margin-bottom: 40px;
      }
      dl{
        @include classflex(flex-start);
        flex-direction: row;
        height: 40px;
        line-height: 40px;
        dt{
          font-size: 16px;
          color: rgba(255,255,255,0.70);
          margin-right: 30px;
        }
        dd{
          font-size: 14px;
          color: rgba(255,255,255,0.60);
          margin-right: 24px;
        }
      }
      .two{
        @include classflex(flex-start);
        flex-direction: row;
        dl:nth-child(odd){
          margin-right: 30px;
        }
        margin-bottom: 10px;
      }
    }
    .copy{
      font-size: 12px;
      color: rgba(255,255,255,0.60);
      width: 1200px;
      text-align: left;
      height: 46px;
      line-height: 46px;
      margin: 0 auto;
      border-top: 1px solid #979797;
    }
  }
  .login-warpper{
    background: #ffffff;
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
  .v-home .first .first-bg--img {
    height: 650px;
  }
}
.sacle{
  transform: scale(0.8)
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

