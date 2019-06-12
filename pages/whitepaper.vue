<template>
  <div class="v-whitepaper">
    <header class='isbg'>
      <div class="content-wrapper">
        <div class="logo">
          <nuxt-link to="/home">
            <img src="~/assets/img/logo.png" alt="">
          </nuxt-link>
        </div>
        <div class="right">
          <div class="item">
            <nuxt-link to="/home">
              首页
            </nuxt-link>
          </div>
        </div>
      </div>
    </header>
    <section class="whitepaper">
      <div class="content-wrapper">
        <div class="left-infor">
          <h2>产品白皮书</h2>
          <p class="p1">智语自然语言处理平台基于深度学习理论与分布式架构，涵盖文本分析全链条，快速让机器获得精准灵活高效理解和处理文本的能力，并且能够灵活适配不同的文本处理场景</p>
          <p class="p2">产品白皮书将为您详细介绍ENLP产品的文档资料，以便您快速理解一下内容</p>
          <ul>
            <li>1、NLP技术的应用场景介绍</li>
            <li>2、NLP相关算法的最新进展与介绍</li>
            <li>3、ENLP产品的详尽产品说明</li>
          </ul>
        </div>
        <div class="whitepaper-form">
          <h4>请提供详细信息并提交</h4>
          <el-form :model="whitepaperForm"  :rules="rule" ref="whitepaperForm">
            <el-form-item  prop="name">
              <el-input type="text" placeholder="请填写您的姓名" v-model="whitepaperForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="company">
              <el-input type="text" placeholder="请填写您的公司名称" v-model="whitepaperForm.company" autocomplete="off"></el-input>
            </el-form-item >
            <el-form-item prop="position">
              <el-select v-model="whitepaperForm.position" placeholder="请选择职务" style="width:100%">
                  <el-option
                      v-for="item in positionArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
              </el-select>
            </el-form-item >
            <el-form-item prop="phone">
              <el-input type="text" placeholder="请输入手机号码" v-model="whitepaperForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" >
              <el-input type="text" placeholder="请输入邮箱" v-model="whitepaperForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="textarea">
              <el-input
                type="textarea"
                placeholder="请填写您的详细需求，以便提供更为优质的服务"
                v-model="whitepaperForm.textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="logbtn"  type="primary" @click="addApplication('whitepaperForm')" >提交申请</el-button>
            </el-form-item>
            <el-form-item>
              <div class="passwordtip">
                提交申请后，24小时内将有专业客服人员为您提供服务。
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import modalBox from '~/components/modalBox';

export default {
  layout: 'defult',
  components: {
    modalBox
  },
  data(){
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
       if (value === '') {
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
      whitepaperForm: {
        name: '',
        company: '',
        position: '',
        phone: '',
        email: '',
        textarea: ''

      },
      rule: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        company: [
          { validator: validateCompany, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
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
      value: '',
      emailError: false,
    }
  },
  created(){
    this.init()
  },
  mounted(){

  },
  methods: {
    init(){

    },
    addApplication(){
      this.$refs['whitepaperForm'].validate((valid) => {

        if (valid) {
          let {
            name,
            phone,
            company,
            position,
            email,
            textarea
          } = this.whitepaperForm
          this.$axios.$post(`/app/addApplication`,{
            name,
            phone,
            company,
            position,
            appEmail: email,
            appDescription: textarea
          })
          .then(res=>{
            this.$refs['whitepaperForm'].resetFields();
            if(res.code === 0){
              this.$message({
                type: 'success',
                message: '信息申请成功'
              })
            }
          })
        } else {
          // this.$message({
          //   type: 'error',
          //   message: '申请信息无效'
          // })

          return false;
        }
      });
    },
  },

}
</script>
<style lang="scss" scoped>
@import '~assets/styles/scss/mixins';

.v-whitepaper{
  position: relative;
  min-width: 1366px;
  height: 100vh;
  overflow: auto;
  .content-wrapper{
    width: 1200px;
    margin:  0 auto;
    position: relative;
    height: 100%;;
  }
  header{
    width: 100%;
    min-width: 1366px;
    min-height: $hdHeight;
    max-height: $hdHeight;
    line-height: $hdHeight;
    color: $white;
    font-size: $font-base;
    @include classflex();
    background: $navBackgroundColor;
    .content-wrapper{
      @include classflex();
    }
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
      flex: 1;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
       a:active{
        color: #ffffff;
      }
      a{
        color: rgba(255, 255, 255, 0.6);
      }
  }
  }
  .whitepaper{
    height: calc(100% - 50px);
    background: url('~assets/img/lgbk.png') no-repeat;
    background-size: cover;
    position: relative;
    .whitepaper-form{
      position: absolute;
      width: 450px;
      height: 580px;
      background: #FFFFFF;
      box-shadow: 0 0 7px 0 rgba(18,98,233,0.25);
      right: 0;
      top: 60px;
      padding: 30px;
      h4{
        margin-bottom: 15px;
        font-size: 18px;
        font-weight: normal;
      }
      .passwordtip{
        text-align: center;
        color: $blue;
        font-size: 12px;
      }
      .logbtn{
        width: 100%;
      }
    }
    .left-infor{
      position: absolute;
      top: 80px;
      width: 507px;
      font-weight: normal;
      left: 0;
      h2{
        font-weight: normal;
        font-size: 36px;
        color: #ffffff;
        margin-bottom: 35px;
      }
      .p1{
        font-size: 14px;
        color: rgba(255,255,255,0.80);
        letter-spacing: 2.8px;
        line-height: 26px;
        margin-bottom: 30px;
      }
      .p2{
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 3.2px;
        line-height: 30px;
        margin-bottom: 20px;
      }
      ul{
        li{
          font-size: 14px;
          color: rgba(255,255,255,0.80);
          letter-spacing: 2.8px;
          line-height: 30px
        }
      }
    }
  }
}

</style>


