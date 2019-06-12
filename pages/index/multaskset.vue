<template>
  <div class="multask-setting">
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
          <el-form-item label="标注人员">
            <div class="marker">
              <div class='marker-input' @click="showSelectPeople">
                <el-tag v-for='(tag,index) in markerArr' :key='index' size="mini"
                type="info"
                :disableTransitions='true'
                >
                  {{tag.name}}
                </el-tag>
              </div>
              <taskBtn @click="showSelectPeople">
                选择
              </taskBtn>
            </div>
          </el-form-item>
          <el-form-item :label="projectInfor.labelType === 2? '分类名' :'实体名称'">
            <div class="set-tag">
              <div class="set-tag--left">
                <el-tag
                  v-for="(tag,index) in dynamicTags"
                  :key="index"
                  @close="handleTagClose(index)"
                  :closable='isTagClose'
                  size="medium"
                  type="setting"
                  :disableTransitions='true'
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
          <el-form-item label="追加数据" class="mr6">
            <div class="upload-data">
              <taskBtn  size='small' type='upload' @click="uploadData">
                <img class="img12" src="~/assets/img/task/upload.png" alt="">
                上传
              </taskBtn>
              <div class="upload-infor" v-show="multaskSetFile.name">
                <div v-show="multaskSetFile.name" class="linkbg" :class="[uploadError?'uploaderror':'']"></div>
                <div class="infor-text">
                  {{multaskSetFile.name+(multaskSetFile.length?('('+multaskSetFile.length + '条）'):'')}}
                </div>
                <div class="del el-icon-close" :class="[uploadError?'delerror':'']" v-show='multaskSetFile.name' @click="delFile"></div>
                <div class="bar" ref="uploadBar" :style="{'width':barWidth}"></div>
              </div>

              <input
                type="file"
                name="file"
                accept=".txt,.doc,.docx,.xls,.xlsx,.zip"
                class="el-upload__input"
                ref="singleUpload"
                @change='handleFiles($event)'
             />
            </div>
          </el-form-item>
          <el-form-item label="截止时间">
            <div class='endtime'>
              <el-date-picker
                v-model='endTime'
                type="datetime"
                placeholder="选择日期时间"
                format='yyyy-MM-dd HH:mm'
                value-format='yyyy-MM-dd HH:mm'
                prefixIcon=' '
                :picker-options="pickerOptions"
                ref="datePicker"
              >
              </el-date-picker>
              <img class="sufficon img20" @click="focuDatePicker" src="~/assets/img/task/time.png" alt="" srcset="">
            </div>
          </el-form-item>
          <el-form-item label="标注规范"  class="markRule-wrapper">
            <div class="mark-rule">
              <input
                type="file"
                name="file"
                accept=".txt,.doc,.docx,.xls,.xlsx"
                class="el-upload__input"
                ref="upload_rule"
                @change='handleUploadMarkRule($event)'
             />
             <div class="mark-rule-upload">
                <div v-show="standardFile.name" class="uploadTypeShow">
                  <p>{{standardFile.name}}</p>
                  <i @click="delstandradFile('upload_rule')" class="el-icon-close"></i>
                </div>
                <span :class="standardFile.isExit?'isExit':''" @click="uploadMarkRule">{{!standardFile.isExit?'上传标注规范':'已上传标注规范'}}</span>
                 <span class="main-top__help" @click="showHelpInforModal(6)"></span>
                <!-- <el-tooltip class="main-top__help" placement="top">
                    <div slot="content">上传标注规范</div>
                    <div></div>
                </el-tooltip> -->
              </div>
              <llpEditor
                @onEditorChange='handleEditorChange'
                @onEditorReady='handelEditorReady'
                ref="llpEditor"
              ></llpEditor>
              <div class="mark-rule-remark">
                <div class="right-text-limt">{{characterLimit}}/5000</div>
              </div>
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
     <!-- 选择人员 -->
     <selectPeople
      :isSetting='true'
      :initData='initSelectPeopleData'
      ref="selectPeople"
      @sure='handelSure'
      :everyDataMarkCount='projectInfor.labelNum'></selectPeople>
       <!-- 帮助信息 -->
        <modalBox ref="help_infor" :isFooterBtn='false' :width='"720px"'>
          <template slot="title">
              帮助信息
          </template>
          <template slot="content">
            <div class="helpinfor-warpper">
              <i class="blue-circle"></i>
              <h4>
                {{isHelpInforDrag===1?'为什么每条数据需要标注多次？':isHelpInforDrag===2?'标注结果选择的规则如下': isHelpInforDrag===3?'为什么要输入标注规范？':isHelpInforDrag===4?'标注规范可以包含哪些内容？':isHelpInforDrag===5?'A001实体识别任务标注示例':'上传标注规范'}}
              </h4>
            </div>
              <ul class="helpinfor-text" v-show="isHelpInforDrag===6">
                <li>1、分类名或实体名称的具体定义、涵盖范围；</li>
                <li>2、详细、具体的标注要求；</li>
                <li>3、特殊情况如何处理；</li>
                <li>4、对于准确率、时效的要求；</li>
                <li>5、易出问题的总结；</li>
                <li>6、支持.txt,.doc,.docx,.xls,.xlsx。</li>
                <li>7、其他。</li>
              </ul>
          </template>
        </modalBox>
  </div>
</template>
<script>


import taskBtn from '~/components/UI/taskButton';
import modalBox from '~/components/modalBox';
import goBack from '~/components/UI/back';
import selectPeople from '~/components/task/selectPeople';
import llpEditor from '~/components/task/llpEditor';


export default {
  layout: 'home',
  components: {
    taskBtn,
    modalBox,
    goBack,
    selectPeople,
    llpEditor
  },
  data() {
    return {
      setttingForm: {
        name: '',
        type: '分类'
      },
      multaskSetFile: {
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
      projectInfor: {},
      markerArr: [],
      endTime: new Date(),
      initSelectPeopleData:{
        taskMarkArr:[],
        userList: []
      },
      labelUsers: [],
      characterLimit: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      expUser: [],
      labelCommitUser: [],
      standardFile: {
        name: '',
        fileName: '',
        isExit: false
      },
      isHelpInforDrag: 6
    }
  },
  computed: {
    labelContent(){
      return this.dynamicTags.map(item=>({labelName:item}))
    },
    peopleAuth(){
      // 只能选择任务标注的人员
      return []
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
            redisKey:this.multaskSetFile.redisKey
        }
        this.$axios.$get('/pro/deleteRedisKey',{params})
        .then(res=>{
            if(res.code === 0){
              singleUpload.value = '';

              Object.keys(this.multaskSetFile).forEach(key => {
                  this.multaskSetFile[key] = ''
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
      let reg = /.(?=docx|doc|txt|xls|xlsx|zip)/i;
      if(reg.test(file.name)){
        this.multaskSetFile.name = file.name.substr(0,file.name.indexOf('.'))
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
            Object.assign(this.multaskSetFile,data)
            this.multaskSetFile.length = fileLength
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
      let {redisKey} = this.multaskSetFile;
      if(this.errorTaskNameShow || !this.setttingForm.name){
        this.$message({
          message: '任务名称有误',
          type: 'warning'
        });
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
            message: '实体名称至少有1个'
          })
          return
        }
      }
      if(!this.endTime){
        this.$message({
          message: '请选择截止时间',
          type: 'warning'
        });
        return
      }
      // 注意只有任务标注人员
      this.markerArr.forEach((item)=> {
        this.labelUsers.push({
          id: item.userId,
          rate: item.num || 0
        })
      })
      let requireDelUser = this.labelCommitUser
      if(requireDelUser && requireDelUser.length > 0){
        this.labelCommitOrDelete({
          userId: requireDelUser.map(item=>item.userId).join(','),
          isCommite: this.projectInfor.labelNum === 1? 0 : 1,
        })
        .then(ress=>{
          if(ress.code === 0){
            // console.log('重新分配成功', item.userId)
            this.updateMultiProject({
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
                    message: '多人任务设置成功',
                    duration: 1000,
                    onClose: ()=>{
                      this.$router.go(-1)
                    }
                  })
              }
            })
          }
        })
      }else{
        this.updateMultiProject({
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
                message: '多人任务设置成功',
                duration: 1000,
                onClose: ()=>{
                  this.$router.go(-1)
                }
              })
          }
        })
      }

    },
    // 删除标注规范
    delstandradFile(type){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let typeDom = this.$refs[type];
        typeDom.value = ''
        this.standardFile.name = ''
        this.standardFile.fileName = ''
        this.standardFile.isExit = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 取消
    cancal(){
      this.$router.go(-1)
    },
    updateMultiProject(option){
      let data = {
        // token,
        proName: this.setttingForm.name,
        labelType: this.projectInfor.labelType,
        labelContent: JSON.stringify(this.labelContent),
        proId: this.$route.query.proId,
        expTime: this.endTime+':00',
        labelStandard: this.projectInfor.labelStandard,
        labelUsers: JSON.stringify(this.expUser.concat(this.labelUsers)),
        fileLength: this.multaskSetFile.fileLength,
        fileName: this.multaskSetFile.fileName,
        fileSize: this.multaskSetFile.fileSize,
        // redisKey,
        standardFile: this.standardFile.fileName,
        showStandardFile: this.standardFile.name
      }
      Object.assign(data,option)
      // console.log(data)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/pro/updateMultiProject`,data)
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
      this.markerArr = this.projectInfor.right
      this.initSelectPeopleData.taskMarkArr = JSON.parse(JSON.stringify(this.projectInfor.right))
      this.initSelectPeopleData.userList = JSON.parse(JSON.stringify(this.projectInfor.left))
      this.endTime = this.projectInfor.expTime
      this.$nextTick(()=>{
        this.$refs.llpEditor.setContent(this.projectInfor.labelStandard)
      })
      if(this.projectInfor.standardFile){
        this.standardFile.name = this.projectInfor.showStandardFile
        this.standardFile.fileName = this.projectInfor.standardFile
        this.standardFile.isExit = true
      }
    },
    // 选择标注人员
    showSelectPeople(){
      this.$refs.selectPeople.showModal()
    },
    handelSure(isGo,twoArr,requireDelUser){
      if(!isGo){
        return
      }
      // 初始化选择数据
      // console.log(twoArr)
      this.initSelectPeopleData.taskMarkArr = JSON.parse(JSON.stringify(twoArr[0]))
      this.markerArr = [].concat.apply([],twoArr).map((item,index)=>{
        return item
      })
      this.labelCommitUser = requireDelUser
      this.$refs.selectPeople.closePop()
    },
    focuDatePicker(){
      this.$refs.datePicker.focus()
    },
    handleEditorChange( editor, html, text ){
      // console.log('editor change!', editor, html, text)
      this.characterLimit = text.length
      this.projectInfor.labelStandard = html
    },
    handelEditorReady(arg){

    },
    uploadMarkRule(){
      if(this.standardFile.isExit){
        return
      }
      let upload_rule = this.$refs.upload_rule;
      upload_rule.value = ''; // 清空
      upload_rule.click()
    },
    handleUploadMarkRule($event){
      let file = $event.target.files[0]
      let reg = /.(?=docx|doc|txt|xls|xlsx)/i;
      if(reg.test(file.name)){
        this.postFile({
          // url: '/pro/uploadStandard',
          url: '/pro/uploadStandardAccessory',
          data: {file,}
        })
        .then(res=>{
          if(res.code === 0){
            // this.$nextTick(()=>{
            // this.projectInfor.labelStandard = res.data.standard
            // console.log(this.projectInfor.labelStandard )
            // this.$refs.llpEditor.setContent(this.projectInfor.labelStandard)
            // })
            this.standardFile = {
              name: res.data.showName,
              fileName: res.data.fileName,
              isExit: true
            }
          }
        })
      }else{
        this.$message({
          message: '请选择有效的上传文件格式',
          type: 'warning'
        });
      }
    },
    labelCommitOrDelete(option){
      let data = {
        userId: '',
        proId: this.$route.query.proId,
        isCommite: 0,
        labelType: this.projectInfor.labelType,
        labelNum: this.projectInfor.labelNum
      }
      Object.assign(data,option)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/pro/labelCommitOrDelete`,data)
        .then(res=>{
            resolve(res)
        })
      })
    },
    getLabelDataNum(option){
      let data = {
        userId: '',
        proId: this.$route.query.proId,
        labelType: this.projectInfor.labelType,
      }
      Object.assign(data,option)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/pro/getLabelDataNum`,data)
        .then(res=>{
            resolve(res)
        })
      })
    },
    setExpUser(id){
      this.expUser.push({
        id,
        rate: 0
      })
    },
    showHelpInforModal(drag){
      this.isHelpInforDrag = drag
      this.$refs.help_infor.showModal()
    },
  },

}
</script>

<style lang="scss" >
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";

.multask-setting {
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
        height: 40px;
        width: 100%;
        bottom: 0;
        @include classflex();
        .task-button{
          margin-right: 30px;
        }
      }
      .marker{
        @include classflex();
        position: relative;
        width: 100%;
        .marker-input{
          width: calc(100% - 82px);
          border: 1px solid #BDC7D4;
          height: 32px;
          overflow-y: auto;
          @include classflex(flex-start);
          flex-direction: row;
          flex-flow: wrap;
          padding-left: 10px;
          cursor: pointer;
          .el-tag{
            margin-right: 5px;
          }
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
      .endtime{
        position: relative;
        @include classflex();
        width: 100%;
        .sufficon{
          position: absolute;
          left: 230px;
          cursor: pointer;
          }
        .el-input__inner{
          width: 260px;
          padding-left: 10px;
        }
      }
      .markRule-wrapper{
        position: relative;
        .el-form-item__label{
          position: absolute;
          top: 30px;
        }
      }
      .mark-rule{
        @include classflex(flex-start);
        flex-direction: column;
        .mark-rule-upload{
          line-height: 32px;
          text-align: right;
          color: $blue;
          align-self: flex-end;
          cursor: pointer;
          @include classflex(flex-start);
          .isExit{
            cursor: default;
          }
        }
        span{
          margin-right: 5px;
        }
        .uploadTypeShow{
          width: 96px;
          height: 16px;
          background: #f6f6f8;
          font-size: 10px;
          line-height: 16px;
          margin-right: 10px;
          p{
            font-weight: normal;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 70px;
            text-align: left;
            float: left;
            color: rgba($color: #000000, $alpha: 0.5)
          }
          i{
            color: $blue;
            cursor: pointer;
            float: right;
            line-height: 16px;
          }
        }
        .llp-editor{
          width: 100%;
        }
        .mark-rule-remark{
          @include classflex(flex-start);
          flex-direction: row;
          position: relative;
          width: 100%;
          line-height: 20px;
          height: 20px;
          .right-text-limt{
            color: #A5A5A5;
            font-size: 12px;
            position: absolute;
            right: 0;
          }
        }
      }
      .main-top__help{
        width: 16px;
        height: 16px;
        background: url('~assets/img/task/help.png') no-repeat;
        background-size: contain;
        cursor: pointer;
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
        margin-top: 6px;
        padding-left: 20px;
        padding-right: 10px;
        border: 1px solid #DCE2EA;
        background:#F6F6F8;
        @include clearfix();
        .infor-text{
          color: #000;
          float: left;
        }
        .linkbg{
          position: absolute;
          left: 5px;
          top: 10px;
          width: 12px;
          height: 12px;
          background-size: contain;
          background: url('~assets/img/task/uploadlink.png') no-repeat;
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
  .helpinfor-text{
    li{
      line-height: 25px;
      padding-top: 5px;
      ul{
        padding-left: 20px;

      }
    }
  }

}
</style>


