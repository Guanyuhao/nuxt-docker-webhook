<template>
  <div class="singleTask-setting">
    <div class="title">
      <div class="title-left"></div>
      <p>任务设置</p>
      <goBack></goBack>
    </div>
    <div class="task-con">
      <el-form size="small" ref="form" :model="setttingForm" label-width="80px">
          <el-form-item label="任务名称">
            <el-input v-model="setttingForm.name" @blur="checkTaskName" ></el-input>
            <i v-show="errorTaskNameShow" class="error task-name-error">{{errorTaskNameTxt}}</i>
          </el-form-item>
          <el-form-item :label="projectInfor.labelType === 2? '分类名' :'实体名称'">
            <div class="set-tag">
              <div class="set-tag--left">
                <el-tag
                  v-for="(tag,index) in dynamicTags"
                  :key="index"
                  @close="handleTagClose(index)"
                  :closable='isTagClose'
                  :disableTransitions='true'
                  size="medium"
                  type="setting"
                >
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-show="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
              </div>

              <div class="set-tag--right">
                <img class="img16" src="~/assets/img/task/plus.png" @click="showTag(true)" alt="">
                <!-- <img src="~/assets/img/task/mul.png" @click="showTag(false)" alt=""> -->
              </div>
            </div>
          </el-form-item>
          <el-form-item label="追加数据" class="mt6">
            <div class="upload-data">
              <taskBtn  size='small' type='upload' @click="uploadData">
                <img class="img12" src="~/assets/img/task/upload.png" alt="">
                上传
              </taskBtn>
              <div class="upload-infor">
                <div v-show="singleTaskSetFile.name" class="linkbg" :class="[uploadError?'uploaderror':'']"></div>
                <div class="infor-text">
                  {{singleTaskSetFile.name+(singleTaskSetFile.length?('('+singleTaskSetFile.length + '条）'):'')}}
                </div>
                <div class="del el-icon-close" :class="[uploadError?'delerror':'']" v-show='singleTaskSetFile.name' @click="delFile"></div>
                <div class="bar" ref="uploadBar" :style="{'width':barWidth}"></div>
              </div>

              <input
                type="file"
                name="file"
                accept=".txt,.doc,.docx,.xls,.zip,.xlsx"
                class="el-upload__input"
                ref="singleUpload"
                @change='handleFiles($event)'
             />
            </div>
          </el-form-item>
          <el-form-item class="footer-btn">
            <taskBtn type='primary' size='medium' @click="submit">
              确定
            </taskBtn>
           <taskBtn  size='medium' @click="cancal">
              取消
            </taskBtn>
          </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>


import taskBtn from '~/components/UI/taskButton';
import modalBox from '~/components/modalBox';
import goBack from '~/components/UI/back';


export default {
  layout: 'home',
  components: {
    taskBtn,
    modalBox,
    goBack
  },
  data() {
    return {
      setttingForm: {
        name: '',
        type: '分类'
      },
      singleTaskSetFile: {
        name: '',
        length: '',
        redisKey: '',
        fileLength: '',
        fileName: '',
        fileSize: ''
      },
      errorTaskNameShow: false,
      errorTaskNameTxt: '',
      uploadError: false, //上传数据失败
      barWidth: 0,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      isTagClose: false,
      projectInfor: {}
    }
  },
  computed: {
    labelContent(){
      return this.dynamicTags.map(item=>({labelName:item}))
    },
  },
  created(){
    this.init()
  },
  methods: {
    init() {
      if(this.$route.query.proId){
        this.showProject()
      }
      this.submitDebounce = this.$helper.debounce(this.onSubmit,1000,true)
    },
    // 校验任务名称
    checkTaskName(){
      let {name} = this.setttingForm
      let trimSpace = /\s*/g;
      if(!(name.replace(trimSpace,''))){
        this.errorTaskNameTxt ='请输入任务名称'
        this.errorTaskNameShow = true
        return false
      }

      if(name.length > 50){
        this.errorTaskNameTxt ='最多允许输入50个汉字'
        this.errorTaskNameShow = true
        return false
      }
      if(name === this.projectInfor.proName){
        this.errorTaskNameShow = false
        return false
      }
      return new Promise((resolve,reject)=>{
        this.$axios.$post('/pro/checkProName',{
          proName: name
        })
        .then(res=>{
          if(res.data.num !== 0) {
            this.errorTaskNameTxt ='任务名称已存在'
            this.errorTaskNameShow = true
          }else if(res.data.num === 0){
            this.errorTaskNameShow = false
          }
          resolve(res)
        })
      })
    },
    handleTagClose(index) {
      if(this.projectInfor.labelType === 2){
        if(this.dynamicTags.length <= 2){
          this.$message({
            type: 'error',
            message: '至少输入2个分类名称'
          })
          return
        }
      }else{
        if(this.dynamicTags.length <= 1){
          this.$message({
            type: 'error',
            message: '实体名称至少有1个'
          })
          return
        }
      }
      this.dynamicTags.splice(index, 1);
      this.isTagClose = false
    },
    showTag(drag){
      if(drag){
        this.inputVisible = true
        // this.isTagClose = false
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }else{
        this.isTagClose = true
        // this.inputVisible = false
      }
    },
    handleInputConfirm() {
      let trimSpace = /\s*/g;
      let inputValue = this.inputValue.replace(trimSpace,'');
      if (inputValue) {
        if(inputValue.length > 10){
          this.$message({
            type: 'error',
            message: '最多允许输入10个汉字'
          })
          return
        }
        if(this.dynamicTags.indexOf(inputValue) > -1){
          this.$message({
            type: 'error',
            message: '分类名称存在重复'
          })
          return
        }
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    chenckType(){
      this.$helper.isRepeat(this.dynamicTags)
    },
    delFile(){
      let singleUpload = this.$refs.singleUpload;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
            redisKey:this.singleTaskSetFile.redisKey
        }
        this.$axios.$get('/pro/deleteRedisKey',{params})
        .then(res=>{
            if(res.code === 0){
              singleUpload.value = '';
              Object.keys(this.singleTaskSetFile).forEach(key => {
                  this.singleTaskSetFile[key] = ''
              })
              this.barWidth = 0;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.uploadError = true
            }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 上传数据
    uploadData(){
      let singleUpload = this.$refs.singleUpload;
      singleUpload.value = ''; // 清空
      singleUpload.click()
    },
    // 数据变更
    handleFiles($event){
      let file = $event.target.files[0]
      let reg = /.(?=docx|doc|txt|xls|zip|xlsx)/i;
      if(reg.test(file.name)){
        this.singleTaskSetFile.name = file.name.substr(0,file.name.indexOf('.'))
        this.postFile({
          url: '/pro/uploadDataToRedis',
          data: {file,}
        },{
            onUploadProgress: progressEvent => {
              let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
              this.barWidth = complete
            },
          })
        .then(res=>{
          if(res.code === 0){
            let {data} = res
            let {fileName, fileLength} = data
            Object.assign(this.singleTaskSetFile,data)
            this.singleTaskSetFile.length = fileLength
            this.uploadError = false;
            this.$message({
              message: `上传成功，新增数据${fileLength}条`,
              type: 'success'
            })
          }else{
            this.uploadError = true;
            this.barWidth = 0
          }
        })
      }else{
        this.$message({
          message: '请选择有效的上传文件格式',
          type: 'warning'
        });
      }

    },
    postFile({url,data},option){
      let form = new FormData()
      Object.keys(data).forEach((key)=>{
        form.append(key, data[key])
      })
      // form.append('id', id)
      let token = this.$getCookie("token")
      form.append('token', token)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      Object.assign(config,option)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(url,form,config)
        .then(res=>{
          resolve(res)
        })
      })
    },
    submit(){
      this.submitDebounce()
    },
    async onSubmit() {
      let {redisKey} = this.singleTaskSetFile;
      if(this.errorTaskNameShow || !this.setttingForm.name){
       if(!this.setttingForm.name){
          this.errorTaskNameShow = true
          this.errorTaskNameTxt = '请输入任务名称'
        }
        return
      }
      if(this.barWidth !==0 && this.barWidth !== '100%' ){
        this.$message({
          message: '追加数据未上传完成',
          type: 'warning'
        });
        return
      }
      this.labelContent.forEach((item)=>{
        if(Object.prototype.toString.call(item.labelDict) !== "[object Array]"){
          item.labelDict = []
        }
        if(Object.prototype.toString.call(item.labelScript) !== "[object Array]"){
          item.labelScript = []
        }
      })
      if(this.projectInfor.labelType === 2){
        if(this.dynamicTags.length < 2){
          this.$message({
            type: 'error',
            message: '至少输入2个分类名称'
          })
          return
        }
      }else{
        if(this.dynamicTags.length < 1){
          this.$message({
            type: 'error',
            message: '至少输入1个实体名称'
          })
          return
        }
      }
      this.updateSingleProject({
        redisKey,
      })
      .then(res=>{
        if(res.code === 0){
            if(res.data.isBatch === 1){
               this.$store.dispatch('SEND_INFOR',{
                proId: this.$route.query.proId,
                labelType: this.projectInfor.labelType,
                batchCount: res.data.batchCount
              })
            }
            this.$message({
              type: 'success',
              message: '单人任务设置成功',
              duration: 1000,
              onClose: ()=>{
                this.$router.go(-1)
              }
            })
        }
      })
    },
    // 取消
    cancal(){
      this.$router.go(-1)
    },
    updateSingleProject(option){
      let data = {
        // token,
        proName: this.setttingForm.name,
        labelType: this.projectInfor.labelType,
        labelContent: JSON.stringify(this.labelContent),
        proId: this.$route.query.proId,
        fileLength: this.singleTaskSetFile.fileLength,
        fileName: this.singleTaskSetFile.fileName,
        fileSize: this.singleTaskSetFile.fileSize,
        // redisKey,

      }
      Object.assign(data,option)
      // console.log(data)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/pro/updateSingleProject`,data)
        .then(res=>{
          resolve(res)
        })
      })
    },
    async showProject(){
      let prolist = await this.$axios.$post(`/pro/echoProjectInfo`,{
        proId: this.$route.query.proId
      })
      this.projectInfor = prolist.data
      this.mapProject()
    },
    mapProject(){
      this.setttingForm.name = this.projectInfor.proName
      this.dynamicTags = this.projectInfor.typeValues.map(item=>item.name)
    }
  },

}
</script>

<style lang="scss" >
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";

.singleTask-setting {
  padding-top: 32px;
  width: 65%;
  margin: 0 auto;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  .title{
    position: relative;
    @include classflex();
    height: 40px;
    line-height: 40px;
    .title-left{
      @include verticalLine();
    }
    p{
      padding-left: 15px;
    }
  }
  .task-con{
    padding-top: 20px;
    position: relative;
    padding-right: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-form{
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      .footer-btn{
        position: absolute;
        height: 40px;
        width: 100%;
        bottom: 0;
        @include classflex();
        .task-button{
          margin-right: 30px;
        }
      }
      .set-tag{
        @include classflex(flex-start);
        .set-tag--left{
          width: calc(100% - 40px);
          @include classflex(flex-start);
          flex-direction: row;
          flex-flow: wrap;
          .el-tag{
            margin-right: 10px;
            margin-top: 5px;

          }
          .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
          }
        }
        .set-tag--right{
          width: 40px;
          @include classflex();
          img{
            cursor: pointer;
          }
        }
      }
    }
    .upload-data{
      @include classflex();
      position: relative;
      flex-direction: row;
      flex-flow: wrap;
      width: 100%;
      .upload-infor{
        position: relative;
        width: 100%;
        height: 32px;
        margin-top: 8px;
        padding-left: 28px;
        padding-right: 10px;
        border: 1px solid #DCE2EA;
        background:#F6F6F8;
        @include clearfix();
        .infor-text{
          color: rgba($color: #000000, $alpha: 0.8);
          float: left;
          font-size: 13px;
          line-height: 30px;
        }
        .linkbg{
          position: absolute;
          left: 5px;
          top: 10px;
          width: 12px;
          height: 12px;
          background: url('~assets/img/task/uploadlink.png') no-repeat;
          background-size: contain;
          &.uploaderror{
            background: url('~assets/img/task/errorlink.png') no-repeat;
            background-size: contain;
          }
        }
        .del{
          line-height: 30px;
          cursor: pointer;
          color: $blue;
          float: right;
          &.delerror{
            color: $red;
          }
        }
        .bar{
          position: absolute;
          bottom: 0;
          height: 2px;
          left: 0;
          background: $green;
        }
      }
    }
  }

  .el-form-item{
    position: relative;
    .error{
      position: absolute;
      line-height: 20px;
      right: -210px;
      top: 8px;
      color: $red;
      width: 200px;
    }

  }
  .green-circle{
    @include cricle($green);
  }
  .subfix{
    cursor: pointer;
  }

}
</style>


