<template>
  <div class="reset-wrapper">
    <div class="reset-pwd">

      <div class="conHeader">
          <h3>修改密码</h3>
          <back-btn backpath='/' ></back-btn>
      </div>
      <div class="changePass" v-if="show">
        <div class="oldPass clearfix">
            <div class="oldName tr">原密码</div>
            <div class="oldInput" :class="{error:oldMsg}">
                <el-input type="password" v-model="oldPass" @blur="oldTest" maxlength="16" ></el-input>
                <div class="errorTip" v-show="oldMsg"  ref="fixTops">{{oldTip}}</div>
            </div>
        </div>
        <div class="newPass clearfix">
            <div class="newName tr">新密码</div>
            <div class="newInput" :class="{error:test}">
                <el-input type="password" v-model="newPass" @blur="passwordTest" maxlength="16" ></el-input>
                <div class="errorTip" v-show="test" ref="fixTop">{{errorTip}}</div>
            </div>
        </div>
        <div class="surePass clearfix">
            <div class="surePassWord tr">确认密码</div>
            <div class="sureInput" :class="{error:noEqual}">
                <el-input type="password" v-model="surePass" @blur="confimPwd"  maxlength="16" ></el-input>
                <div class="errorTip" v-show="noEqual" ref="fixTopss">{{equalError}}</div>
            </div>
        </div>
      </div>
      <div class="btnGroup"  v-if="show">
          <div class="changeBtn" @click="handleSubmit">
              确定
          </div>
      </div>
      <div class="success"  v-if="!show">
          <div class='successTip clearfix'>
              <div class="icon">
                  <img src="~/assets/img/changeSuccess.png" alt="">
              </div>
              <div class="text">恭喜你，修改密码成功！</div>
          </div>
          <div class='link' @click="link">
              {{time}}秒后自动跳转
          </div>
      </div>
    </div>
  </div>


</template>
<script>

import backBtn from "~/components/UI/back";

export default {
  layout: 'home',
  name:"resetpwd",
  components:{
      backBtn
  },
  data() {
      return{
        noEqual:false,
        test:false,
        newPass:"",
        oldPass:"",
        surePass:"",
        oldTip:"",
        equalError: '',
        errorTip:'密码由6~16位字母（区分大小写）、数字或符号组成',
        time:5,
        show:true,
        oldMsg:false,
        passconfirm:false,
        passsurePass:false
      }
  },
  methods: {
    back(){
        this.$router.push({name:'index'});
    },
    passwordTest(){
        // if(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(this.newPass)){
          if(this.newPass==""){
            this.test = true;
            this.errorTip = '密码不能为空';

            return false
        }
        if(/^[a-zA-Z0-9]{6,16}$/.test(this.newPass)){
          this.test = false;
        }else{
            this.test = true;
            this.errorTip = '密码由6~16位(区分大小写)、数字或者字母均可';

            return false
        }
        return true

    },
    confimPwd(){
      if(this.surePass==""){
          this.noEqual = true;
          this.equalError = "密码不能为空";

          return false
      }
      // '两次输入密码不一致
      if(/^[a-zA-Z0-9]{6,16}$/.test(this.surePass)){
          this.noEqual = false;
      }else{
          this.noEqual = true;
          this.equalError = '密码由6~16位(区分大小写)、数字或者字母均可';

          return false
      }
      if(this.newPass!=this.surePass){
          this.noEqual = true;
          this.equalError = '两次密码不一致'

          return false
        }else{
          this.noEqual = false;
          this.passsurePass=true;
          return true
        }
    },
    handleSubmit(){
        // if(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(this.newPass)){
        // new code

        // fix old function
        if(!this.oldTest() || !this.passwordTest() || !this.confimPwd()){
          return false
        }
        this.$axios.$post("/elensuser/checkpwd",{
            userId:this.$getCookie("userId"),
            oldpwd:this.$md5(this.oldPass),
        }).then((res)=>{
          //  console.log(res)
            if(res.data==1){
              this.oldMsg = false;
              this.changePWd()
            }else{
              this.oldMsg = true;
              this.oldTip = "密码错误";
            }
        })
        // odl code
        // if(/^[a-zA-Z0-9]{6,16}$/.test(this.newPass)){
        //     this.test = false;
        //     this.passconfirm=true;
        // }else{
        //     this.test = true;
        // }
        // if(this.newPass!=this.surePass){
        //       this.noEqual = true;
        // }else{
        //    this.noEqual = false;
        //    this.passsurePass=true;
        // }
        // // 验证密码是否为空，是否符合条件，全部符合再跳转页面请求成功！
        // if(this.newPass!='' && this.surePass != '' && this.passconfirm && this.passsurePass&& !this.oldMsg){
        //     this.changePWd()
        // }

    },
    oldTest(){
      if(this.oldPass==""){
          this.oldMsg = true;
          this.oldTip = "密码不能为空";

          return false
      }

      if(/^[a-zA-Z0-9]{6,16}$/.test(this.oldPass)){
          this.oldMsg = false;
      }else{
          this.oldMsg = true;
          this.oldTip = '密码由6~16位(区分大小写)、数字或者字母均可';

          return false
      }
      return true
    },
    changePWd(){
        const userId = this.$getCookie('userId')
          this.$axios.$post('/elensuser/getPassword',{
                userId:userId,
                userPassword:this.$md5(this.surePass)
            }).then(this.handleSuccChangePWd.bind(this))
    },
    handleSuccChangePWd(res){
        clearInterval(window.passAutoJump)
        if(res.code==0){
            this.time = 5
            this.show = false;
            window.passAutoJump = setInterval(()=>{
                  this.time--;
                if(this.time === 0 ){
                    this.time = 5
                    clearInterval(window.passAutoJump)
                    this.$router.push({name:"index"})
                }
            },1000)
        }
    },
    link(){
      this.link = true
      this.$router.push({name:"index"})
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>

<style lang='scss' scoped>
@import "~assets/styles/scss/mixins";

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
.oldPass{
  margin-bottom: 38px;
}
.reset-wrapper{
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: row;
  background: $mainColor;
  padding: 60px 130px;
  .reset-pwd{
    width: 100%;
    background: $white;
  }
  .tr{
    text-align: right;
    padding-right: 15px;
  }
}
.conHeader {
  @include classflex();
  width: 100%;
  height: 56px;
  background: #f6f7f8;
  padding-left: 34px;
  padding-right: 34px;
  h3{
    font-size: 16px;
    color: rgba(0,0,0,0.8);
  }

}
.oldInput,.newInput,.sureInput{
  height: 40px;
  position: relative;
  line-height: 40px;
  float: left;
  @include classflex(flex-start);
  .el-input{
    width: 480px;
  }
  .errorTip{
    position: absolute;
    font-size: 12px;
    color: $red;
    line-height: 20px;
    left: 490px;
    width: 260px;
    top: 10px;
  }
}
.changePass{
  width: 100%;
  @include classflex(flex-start);
  padding-top: 90px;
  flex-direction: column;
  height: 340px;
}
.oldName{
  float: left;
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #363636;
}
.newName{
    float: left;
    width: 80px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #363636;
}

.oldInput  input{
    width: 540px;
    height: 40px;
    border: 1px solid #CDCDCD;
    border-radius: 2px;
    padding-left: 14px;
    font-size: 16px;
}


.surePassWord{
    float: left;
     width: 80px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #363636;
}

.newInput input{
    width: 540px;
    height: 40px;
    border: 1px solid #CDCDCD;
    border-radius: 2px;
}
.surePass{
    margin-top: 38px;
}

.sureInput input{
    width: 540px;
    height: 40px;
    border: 1px solid #CDCDCD;
    border-radius: 2px;
}
.changeBtn{
    width: 340px;
    height: 40px;
    // background-image: linear-gradient(-252deg, #76B6FD 0%, #5D72FB 100%);
    background: $blue;
    border-radius: 2px;
    text-align: center;
    line-height: 40px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    margin: 0 auto;
}
.cancleBtn{
    width: 122px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-image: linear-gradient(-252deg, #76B6FD 0%, #5D72FB 100%);
    border-radius: 4px;
    color: white;
    float: left;
    margin-left: 28px;
    cursor: pointer;
}
.btnGroup{
  width: 100%;
  @include classflex();
  padding-top: 40px;
}
.newInput input{
    padding-left: 14px;
    font-size: 16px;
}
.sureInput input{
    padding-left: 14px;
    font-size: 16px;
}
.successTip .text{
    float: left;
    font-weight: bold;
    font-size: 20px;
    color: rgba(0,0,0,0.87);
    margin-top: 4px;
    margin-left: 20px;
}
.successTip .icon{float: left;}
.success{width: 300px;margin: 0 auto;margin-top: 120px;}
.link{
    font-size: 14px;
    color: $blue;
    cursor: pointer;
    text-decoration: underline;
    width: 100px;
    margin: 0 auto;
    margin-top: 18px;
}
</style>
<style lang="stylus" scoped>
.error{
  >>>.el-input__inner{
    border 1px solid red
  }
}
</style>