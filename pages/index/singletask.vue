<template>
  <div class="createSingleTask">
    <div class="title">
      <div class="title-left"></div>
      <p>创建单人任务</p>
    </div>
    <div class="task-con">
      <el-form size="small" ref="form" :model="singleTaskForm" label-width="80px">
          <el-form-item class='isRequire' label="任务名称">
            <el-input v-model="singleTaskForm.name" @blur="checkTaskName" ></el-input>
            <i v-show="errorTaskNameShow" class="error task-name-error">{{errorTaskNameTxt}}</i>
          </el-form-item>
          <el-form-item class='isRequire' label="任务类型">
            <el-radio-group v-model="singleTaskForm.type" @change='handelTypeChange' :disabled='typeDrag'>
              <el-radio label="分类"></el-radio>
              <el-radio label="实体识别"></el-radio>
            </el-radio-group>
            <div class="type-select">
              <div class="classification" v-show="isClassification">
                <div class="type-top-title">
                  <div class="type-select__left">
                    <i class="green-circle"></i>
                    <span class="text">分类名</span>
                    <img v-show="plusDrag" class="img16" src="~/assets/img/task/plus.png"
                    @click="fixTypeInput(true)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img v-show="!plusDrag" class="img16" src="~/assets/img/task/plusx.png"
                    @click="fixTypeInput(true)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img  v-show="mulDrag" class="img16" src="~/assets/img/task/mul.png"
                    @click="fixTypeInput(false)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img v-show="!mulDrag" class="img16" src="~/assets/img/task/mulx.png"
                    @click="fixTypeInput(false)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                  </div>
                  <div class="type-select__right">
                    <!-- <span @click="uploadType('typeUpload_calss')">{{templateNameText?'已上传分类类别':'上传分类类别'}}</span> -->
                    <div class="tasktype-load" @click="uploadType('typeUpload_calss')">{{templateNameText?'已上传分类类别':'上传分类类别'}}
                      <el-tooltip class="main-top__help--small smallhelp" placement="top">
                        <div slot="content">支持上传xls。</div>
                        <div></div>
                      </el-tooltip>
                    </div>
                    <div v-show="templateNameText" class="uploadTypeShow">
                      <p>{{templateNameText}}</p>
                      <i @click="closeTemplate('typeUpload_calss')" class="el-icon-close"></i>
                    </div>
                    <input
                      type="file"
                      name="file"
                      accept=".txt,.doc,.docx,.xls"
                      class="el-upload__input"
                      ref="typeUpload_calss"
                      @change='handleUploadType($event,2)'
                    />
                    <a class="downTemplate" :href="domain+'/system/downloadExcelTemplate?labelType=2'" download="Lens_Label_Template.xls">获取模板</a>
                    <!-- <span @click="downTemplate('/system/downloadExcelTemplate?labelType=2')">获取模板</span> -->
                  </div>
                </div>
                <div class="type-center-input" ref="typeInput">
                  <!-- <el-input
                    v-for="(item,index) in typeInput.classification.slice(0*np,10+10*np)"
                    v-model="item.val"
                    class="input-item"
                    :disabled="!isFixTypeInput.classification"
                    placeholder="请输入分类名"
                    :suffix-icon="subFixInput?'el-icon-close subfix':''"
                    :key="index"
                    :data-index='index'
                    @blur="blurCheckType"
                  >
                  </el-input> -->
                   <div class="type-center-input--wrapper"
                    v-for="(item,index) in typeInput.classification.slice(0*np,10+10*np)"
                    :data-index='index'
                   >
                    <el-input
                      v-model="item.val"
                      class="input-item"
                      :disabled="!isFixTypeInput.classification || item.disabled"
                      placeholder="请输入分类名"
                      :key="index"
                      @blur="blurCheckType"
                    >
                    </el-input>
                    <!-- :suffix-icon="subFixInput?'el-icon-close subfix':''" -->
                    <i v-show="subFixInput" class="el-icon-close subfix"></i>
                  </div>
                </div>
                <div class="moreInput" v-if="typeInput.classification.length>10">略...</div>
                <div v-show="typeInputErrorText" class="type-input-error">{{typeInputErrorText}}</div>
              </div>
              <div class="entity-recognition" v-show="!isClassification">
                <div class="type-top-title">
                  <div class="type-select__left">
                    <i class="green-circle"></i>
                    <span class="text">实体名称</span>
                      <img v-show="plusDrags" class="img16"  src="~/assets/img/task/plus.png"
                      @click="fixTypeInput(true)"
                      :class="['icon',isFixTypeInput.classification?'':'not']"
                      alt="">
                      <img v-show="!plusDrags" class="img16" src="~/assets/img/task/plusx.png"
                      @click="fixTypeInput(true)"
                      :class="['icon',isFixTypeInput.classification?'':'not']"
                      alt="">
                      <img  v-show="mulDrags" class="img16" src="~/assets/img/task/mul.png"
                      @click="fixTypeInput(false)"
                      :class="['icon',isFixTypeInput.classification?'':'not']"
                      alt="">
                      <img v-show="!mulDrags" class="img16" src="~/assets/img/task/mulx.png"
                      @click="fixTypeInput(false)"
                      :class="['icon',isFixTypeInput.classification?'':'not']"
                      alt="">
                  </div>
                  <div class="type-select__right">
                    <!-- <span @click="uploadType('typeUpload_entity')">{{templateNameText?'已上传实体类别':'上传实体类别'}}</span> -->
                    <div class="tasktype-load" @click="uploadType('typeUpload_entity')">{{templateNameText?'已上传实体类别':'上传实体类别'}}
                      <el-tooltip class="main-top__help--small smallhelp" placement="top">
                        <div slot="content">支持上传xls。</div>
                        <div></div>
                      </el-tooltip>
                    </div>
                    <div v-show="templateNameText" class="uploadTypeShow">
                      <p>{{templateNameText}}</p>
                      <i @click="closeTemplate('typeUpload_entity')" class="el-icon-close"></i>
                    </div>
                    <a class="downTemplate" :href="domain+'/system/downloadExcelTemplate?labelType=1'" download="Lens_Label_Template.xls">获取模板</a>
                    <!-- <span  @click="downTemplate('/system/downloadExcelTemplate?labelType=1')">获取板</span> -->
                    <input
                        type="file"
                        name="file"
                        accept=".txt,.doc,.docx,.xls"
                        class="el-upload__input"
                        ref="typeUpload_entity"
                        @change='handleUploadType($event,1)'
                    />
                  </div>
                </div>
                <div class="type-center-input" ref="typeInput">
                  <!-- <el-input
                    v-for="(item,index) in typeInput.entity.slice(0*np,10+10*np)"
                    v-model="item.val"
                    class="input-item"
                    placeholder="请输入实体名称"
                    :suffix-icon="subFixInput?'el-icon-close subfix':''"
                    :disabled="!isFixTypeInput.entity || item.disabled"
                    :key="index"
                    :data-index='index'
                    @blur="blurCheckType"
                  >
                  </el-input> -->
                  <div class="type-center-input--wrapper"
                    v-for="(item,index) in typeInput.entity.slice(0*np,10+10*np)"
                    :data-index='index'
                    :data-id='item.id'
                  >
                    <el-input
                      v-model="item.val"
                      class="input-item"
                      placeholder="请输入实体名称"
                      :disabled="!isFixTypeInput.entity || item.disabled"
                      :key="index"
                      @blur="blurCheckType"
                    >
                    </el-input>
                      <!-- :suffix-icon="subFixInput?'el-icon-close subfix':''" -->
                    <i v-show="subFixInput" class="el-icon-close subfix"></i>
                  </div>
                </div>
                <div class="moreInput" v-if="typeInput.entity.length>10">略...</div>
                <div v-show="typeInputErrorText" class="type-input-error">{{typeInputErrorText}}</div>
                <div class="type-bottom-modal modal-dec" @click="showModal">
                  <div class="point"></div>
                  <span>使用内置模型</span>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class='isRequire' label="上传数据" style="margin-top: 6px">
            <div class="upload-data">
              <taskBtn  size='small' type='upload' @click="uploadData">
                <img class="img12" src="~/assets/img/task/upload.png" alt="">
                上传
                <el-tooltip class="main-top__help loadFileInfor" placement="top">
                  <div slot="content">支持上传doc,docx,xls,xlsx,txt,zip等格式，每行一条数据</div>
                  <div></div>
                </el-tooltip>
              </taskBtn>
              <!-- <span class="acceptFileType">支持上传doc,docx,xls,xlsx,txt,zip等格式，每行一条数据</span> -->
              <div class="upload-infor" v-show="singleFile.name">
                <div v-show="singleFile.name" class="linkbg" :class="[uploadError?'uploaderror':'']"></div>
                <div class="infor-text">
                  {{singleFile.name+(singleFile.length?('('+singleFile.length + '条）'):'')}}
                </div>
                <div class="del el-icon-close" :class="[uploadError?'delerror':'']" v-show='singleFile.name' @click="delFile"></div>
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
              <i v-show="errorInforText.uploadData" class="error ">{{errorInforText.uploadData}}</i>
            </div>
          </el-form-item>
          <el-form-item label="规则配置" style="margin-top:6px;">
            <div class="rule-config">
              <img v-if="ruleDrag || !(codeArr&&codeArr.length>0) " @click="isOpenRuleConfig" class="img18" src="~/assets/img/task/ruleconfig.png" alt="">
              <div v-else-if="!ruleDrag && (codeArr&&codeArr.length>0)" class="rule-main">
                <div class="rule-main__top">
                  <div class="item"  v-for="(item,index) in ruleSpanArr" :key="index" @click="ruleSpanActiveChange(index)">
                    <div :class="['item-span',ruleItemSpanActive===index?'active':'']">
                      {{item}}
                    </div>
                    <!-- <div v-if="index<(ruleSpanArr.length-1)" class="right-border" :style="{'left':(index*82)+82+'px'}"></div> -->
                  </div>
                  <el-tooltip class="main-top__help" placement="top">
                    <div slot="content">{{ruleItemSpanActive === 1? '支持通过正则表达式进行文本匹配。':'支持关键词分行输入，多个关键词同时检索，同一行内用“#”隔开。'}}</div>
                    <div></div>
                  </el-tooltip>
                </div>
                <div class="rule-main__code">
                  <!-- 分类 实体 -->
                  <div v-show="ruleItemSpanActive===0" class="code-dictionary code-wrapper">
                    <div  v-for="(codeItem,index) in codeArr" :key="index">
                      <div class="code-title">
                        <div class="left">
                          <i class="green-circle"></i>
                          <span>{{codeItem}}</span>
                        </div>
                        <div class="right">
                          <div class="right-upload" @click="uploadDictionary(index)">
                            <img class="img12" src="~/assets/img/task/upload.png" alt="">
                            <span class="right-upload--text">上传</span>
                          </div>
                          <el-tooltip class="main-top__help--small smallhelp" placement="top">
                            <div slot="content">支持上传txt格式，每行一条数据。</div>
                            <div></div>
                          </el-tooltip>
                          <input
                            type="file"
                            name="file"
                            accept=".txt"
                            class="el-upload__input"
                            :ref="'upload_dictionary__'+index"
                            @change='handelUploadDictionary($event,index)'
                          />
                        </div>
                      </div>
                      <llpCode :ref="'llpcode_'+index" @onCminput='getCodeValue(codeItem,arguments)'></llpCode>
                    </div>
                  </div>
                  <div v-show="ruleItemSpanActive===1" class="code-script code-wrapper">
                    <div  v-for="(codeItem,index) in codeArr" :key="index">
                      <div class="code-title">
                        <div class="left">
                          <i class="green-circle"></i>
                          <span>{{codeItem}}</span>
                        </div>

                      </div>
                      <llpCode @onCminput='getScriptValue(codeItem,arguments)'></llpCode>
                    </div>
                    <!-- <llpCode
                    :option='{code:"</"+codeArr.join(">$$$$</")+">$$$"}'
                    @onCmBlur='getScriptValue'
                    ></llpCode> -->
                  </div>

                </div>
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
        <modalBox ref="modal_in" @sure='makSuer'>
          <div slot="title">
            内置模型
          </div>
          <div slot="content">
            <div class="modal_in">
              <span class="modal_in--title">您可以选择以下模型</span>
              <el-checkbox-group v-model="modalInList" class="modal_in--group">
                <el-checkbox label="地名--LOC"></el-checkbox>
                <el-checkbox label="机构名--ORG"></el-checkbox>
                <el-checkbox label="人名--PER"></el-checkbox>
              </el-checkbox-group>
            </div>
           </div>
        </modalBox>
    </div>
  </div>
</template>
<script>
import llpCode from '~/components/task/llpCodeMirror';
import llpEditor from '~/components/task/llpEditor';

import taskBtn from '~/components/UI/taskButton';
import modalBox from '~/components/modalBox';

export default {
  layout: 'home',
  components: {
    llpCode,
    taskBtn,
    llpEditor,
    modalBox
  },
  data() {
    return {
      singleTaskForm: {
        name: '',
        type: '分类'
      },
      typeDrag: false,
      typeInput: {
        classification: [
          {
            val: '',

          },
          {
            val: '',

          },
        ],
        entity: [
          {
            val: ''
          },
          {
            val: ''
          }
        ]

      },
      np: 0,
      isClassification: true,
      ruleSpanArr: ['字典','脚本',],
      modalBoxShow: false,
      singleFile: {
        name: '',
        length: ''
      },
      errorTaskNameShow: false,
      errorTaskNameTxt: '',
      modalInList: [],
      barWidth: 0,
      ruleDrag: true,
      ruleItemSpanActive: 0,
      isFixTypeInput: {
        classification: true,
        entity: true
      },
      subFixInput: false,
      existingModelIds: [],
      uploadError: false, //上传数据失败
      typeInputErrorText: '', //分类inpout 校验失败问题提示
      templateNameText: '', //上传模板名字
      plusDrag: true,
      mulDrag: true,
      plusDrags: true,
      mulDrags: true,
      errorInforText: {
        uploadData: '',

      }
    }
  },
  computed:{
    codeArr(){
      let type = this.isClassification?'classification':'entity'
      return this.typeInput[type].map((item)=>item.val).filter((item)=>Boolean(item))
    },
    currTypeValArr(){
      let type = this.isClassification?'classification':'entity';
      let trimSpace = /\s*/g;
      this.typeInput[type].map((item)=>item.val)
      return this.typeInput[type].map((item)=>item.val.replace(trimSpace,''))
    },
    labelContent(){
      // console.log(this.codeArr.map(item=>({labelName:item})))
      return this.codeArr.map(item=>({labelName:item}))
    },
    domain(){
      return this.$store.state.domain
    },
    labelType(){
      return this.isClassification? 2 : 1;
    }
  },
  created(){
    this.init()
  },
  mounted(){
    this.initEvent()
  },
  methods: {
    init() {
      this.submitDebounce = this.$helper.debounce(this.onSubmit,1000,true)

    },
    resetTypeInput(){
      this.typeInput.classification = [{val:''},{val:''}]
      this.typeInput.entity = [{val:''},{val:''}]
      this.isFixTypeInput.classification = true
      this.isFixTypeInput.entity = true
    },
    initEvent(){
      document.querySelector('.type-select').addEventListener('click',(event)=>{
        let target = event.target
        if(target.classList.contains('subfix')){
          let dom = target.parentElement;
          let index = dom.getAttribute('data-index');
          let modal_id = dom.getAttribute('data-id');
          let type = this.isClassification?'classification':'entity';
          if((this.typeInput[type].length <= 1 && type==='entity')){
            // 实体名称不少与1个
            this.mulDrags = false
            this.$message({
              type: 'warning',
              message: '实体名称至少有1个'
            });
           this.subFixInput = false
            return
          }
          if((this.typeInput[type].length <= 2 && type==='classification')){
            // 分类名称不少于2个
            this.mulDrag = false
            this.$message({
              type: 'warning',
              message: '至少输入2个分类名称'
            });
           this.subFixInput = false
            return
          }
          // console.log('data-index',dom,this.typeInput[type])
          // console.log('data-id',modal_id)
          this.typeInput[type].splice(index,1);
          if(modal_id){
            let allObj = {
              100148:'地名--LOC',
              100149:'机构名--ORG',
              100147: '人名--PER'
            }
            let model_index = this.modalInList.indexOf(allObj[modal_id])
            model_index>-1 ? this.modalInList.splice(model_index,1) : null;
            this.existingModelIds = this.modalInList.map((item)=>{
              if(item === '地名--LOC'){
                return  100148
              }
              if(item === '机构名--ORG'){
                return  100149
              }
              if(item === '人名--PER'){
                return  100147
              }
            })
          }
          (this.typeInput[type].length < 10 && type==='classification')?this.plusDrag = true: this.plusDrags = true;
          this.subFixInput = false
        }
      })
    },
    // 校验任务名称
    checkTaskName(){
      let {name} = this.singleTaskForm
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
    // 删除上传模板
    closeTemplate(type){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清楚文件
        let typeDom = this.$refs[type];
        typeDom.value = ''
        this.templateNameText = ''
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 打开分类选择开关
        this.typeDrag = false
        this.resetTypeInput()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    blurCheckType(){
      let arr = this.currTypeValArr
          ,l = arr.length
          ,i
          ,isgogo = true
      for( i = 0; i<l; i++){
        if(arr[i].length > 10){
          this.typeInputErrorText = '最多允许输入10个汉字';
          isgogo = false
          break;
        }
      }
      if(!isgogo){
        return
      }
      let labelType = this.isClassification? 2 : 1;
      function isRepeat(arr){
          let hash = {};
          for(let i in arr) {
              if(hash[arr[i]])
                  return true;
              hash[arr[i]] = true;
          }
          return false;
      }
      if(labelType === 2){
        //分类
        let valArr = this.currTypeValArr;
        let isGo = valArr.every((item)=>!item);
        if(isGo){
          this.typeInputErrorText = '请输入分类名称';
          return
        }
        // if(valArr.filter((item=>item)).length < 2){
        //   this.typeInputErrorText = '至少输入2个分类名称';
        //   return
        // }

        valArr = valArr.filter(val=>val)
        if(isRepeat(valArr)){
          this.typeInputErrorText = '分类名称存在重复';
          return
        }
      }else if(labelType === 1){
        //实体
        let valArr = this.currTypeValArr;
        let isGo = valArr.every((item)=>!item);
        if(isGo){
          // this.$message({
          //   message: '请输入实体名称',
          //   type: 'warning'
          // });
          this.typeInputErrorText = '请输入实体名称';
          return
        }
        valArr = valArr.filter(val=>val)
        if(isRepeat(valArr)){
          this.$message({
            message: '实体名称存在重复',
            type: 'warning'
          });
          this.typeInputErrorText = '实体名称存在重复';
          return
        }
      }
      // 校验通过
        this.typeInputErrorText = ''
    },
    delFile(){
      let singleUpload = this.$refs.singleUpload;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(!this.singleFile.redisKey){
          singleUpload.value = '';
          this.singleFile.name = '';
          this.singleFile.length = 0;
          this.barWidth = 0;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          return
        }
        let params = {
            redisKey:this.singleFile.redisKey
        }
        this.$axios.$get('/pro/deleteRedisKey',{params})
        .then(res=>{
            if(res.code === 0){
              singleUpload.value = '';
              this.singleFile.name = '';
              this.singleFile.length = 0;
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
    // 上传分类类别 typeUpload_calss 上传实体类别 typeUpload_entity
    uploadType(type) {
      let typeDom = this.$refs[type];
      if(this.templateNameText){
        return
      }
      // console.log(typeDom)
      typeDom.value = ''; // 清空
      typeDom.click()
    },
    // type 2 分类  1 实体
    // 分类上传之后 限制不可输入
    handleUploadType($event,type){
      let file = $event.target.files[0];
      let reg = /.(?=docx|doc|txt|xls)/i;
      if(reg.test(file.name)){
         this.postFile({
           url: '/pro/uploadExcelModel',
           data: {
             file,
             labelType: type
           }
         })
         .then(res=>{
           if(res.code === 0){
            if(type === 1){
              // 实体
              // let type = this.isClassification?'classification':'entity'
              var newArr = res.data.array.map((item)=>({val:item.labelName}))
              if(newArr.length <= 0){
                this.$message({
                  type: 'error',
                  message: '上传有效文件'
                });
                return
              }
              this.typeInput['entity'] =  newArr
              this.makSuer() // 重置内置模型

              this.isFixTypeInput.entity = false
            }else if(type === 2){
              // 分类
              var newArr = res.data.array.map((item)=>({val:item.labelName}))
              if(newArr.length <= 0){
                this.$message({
                  type: 'error',
                  message: '上传有效文件'
                });
                return
              }
              this.$set(this.typeInput,'classification',newArr)
              this.isFixTypeInput.classification = false
            }
            // 不可以选择
            this.templateNameText = file.name.substr(0,file.name.indexOf('.'));
            this.typeDrag = true
            this.typeInputErrorText = ''
           }

         })
      }else{
        this.$message({
          message: '请选择有效的上传文件格式',
          type: 'warning'
        });
      }
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
        this.singleFile.name = file.name.substr(0,file.name.indexOf('.'))
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
            Object.assign(this.singleFile,data)
            this.singleFile.length = fileLength
            this.uploadError = false;
            this.$message({
              message: `上传成功`,
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
    // 任务类型切换
    handelTypeChange(val){
      if(val === '实体识别'){
        this.isClassification = false
        // 初始化 分类
      }else{
        this.isClassification = true
      }
      // 关闭配置规则
      this.ruleDrag = true
      // 关闭分类错误提示
      this.typeInputErrorText = ''
    },
    //增加--减少 分类名
    fixTypeInput(drag){
      // 手动加不超过10个
      let type = this.isClassification?'classification':'entity'
      if(!this.isFixTypeInput[type]){
        return
      }
      if(drag){
        // add

        if( this.typeInput[type].length >= 10 && drag){
        //限制 分类个数 10个
          type==='classification'?this.plusDrag = false: this.plusDrags = false
          if(type === 'classification'){
            this.$message({
              type: 'warning',
              message: '如分类名多于10个，请选择上传分类类别。'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '如实体名称多于10个，请选择上传实体类别。'
            });
          }
          return
        }
        type==='classification'?this.plusDrag = true: this.plusDrags = true

        this.typeInput[type].push({
          val: ''
        })
        if(this.typeInput['classification'].length > 2){
          this.mulDrag = true
        }
        if(this.typeInput['entity'].length > 1){
          this.mulDrags = true
        }
      }else{

        this.subFixInput = true
        // this.typeInput[type].pop()
      }
    },
    downTemplate(path){
      let domain = this.$store.state.domain;
      // console.log(domain)
      // labelType 分类2  实体1
      window.open(domain+path)
    },
    ruleSpanActiveChange(index){
      this.ruleItemSpanActive = index
    },
    // 上传字典
    uploadDictionary(index){

      let upload_dictionary = this.$refs[`upload_dictionary__${index}`][0]
      // console.log(upload_dictionary)
      upload_dictionary.value = ''; // 清空
      upload_dictionary.click()

    },
    handelUploadDictionary($event,index){
      let file = $event.target.files[0]
      let reg = /.(?=txt)/i;
      if(reg.test(file.name)){
        this.postFile({
          url: '/pro/uploadDictOrScript',
          data: {file,}
        })
        .then(res=>{
            let llpcode = this.$refs[`llpcode_${index}`];
            let codemirror = llpcode[0].codemirror;
            let arr = res.data.array.map((item)=>item.content)
            codemirror.setValue(arr.join('/n/r'))
        })
      }else{
        this.$message({
          message: '请选择有效的上传文件格式',
          type: 'warning'
        });
      }

    },
    getCodeValue(item,arg){
      let labelContent = this.labelContent;
      let le = labelContent.length;
      if(le > 0){
        let lableNameArr = this.labelContent.map((item)=>item.labelName)
        let index = lableNameArr.indexOf(item)
        if(index > -1){
          labelContent[index].labelDict = arg[0].split('/n/r');
        }else{
          labelContent.push({labelName:item,labelDict:arg[0].split('/n/r')})
        }
      }else{
        labelContent.push({labelName:item,labelDict:arg[0].split('/n/r')})
      }
    },
    getScriptValue(item,arg){
      let labelContent = this.labelContent;
      let le = labelContent.length;
      if(le > 0){
        let lableNameArr = this.labelContent.map((item)=>item.labelName)
        let index = lableNameArr.indexOf(item)
        if(index > -1){
          labelContent[index].labelScript = arg[0].split('/n/r');
        }else{
          labelContent.push({labelName:item,labelScript:arg[0].split('/n/r')})
        }
      }else{
        labelContent.push({labelName:item,labelScript:arg[0].split('/n/r')})
      }
    },
    submit(){
      this.submitDebounce()
    },
    async onSubmit() {
      let {redisKey,fileName,fileSize,fileLength} = this.singleFile;
      let labelType = this.isClassification? 2 : 1;
      // await this.checkTaskName();
      if(this.errorTaskNameShow || !this.singleTaskForm.name){
        if(!this.singleTaskForm.name){
          this.errorTaskNameShow = true
          this.errorTaskNameTxt = '请输入任务名称'
        }
        return
      }
      let valArr = this.currTypeValArr
      let isGo = valArr.every((item)=>!item);
      if(isGo){
        this.typeInputErrorText = labelType===2?'请输入分类名称':'请输入实体名称';
        return
      }
      if(valArr.filter((item=>item)).length < 2 && labelType===2){
          this.typeInputErrorText = '至少输入2个分类名称';
          return
      }
      if(valArr.filter((item=>item)).length < 1 && labelType===1){
          this.typeInputErrorText = '至少输入1个实体名称';
          return
      }
      if(this.typeInputErrorText){
        return
      }
      if(!redisKey){
        // this.$message({
        //   message: '请上传数据',
        //   type: 'warning'
        // });
        this.errorInforText.uploadData = '请上传数据'
        return
      }

      if(this.uploadError){
        this.$message({
          message: '上传数据有误',
          type: 'warning'
        });
        return
      }
      // 保证 对象的属性有值
      this.labelContent.forEach((item)=>{
        if(Object.prototype.toString.call(item.labelDict) !== "[object Array]"){
          item.labelDict = []
        }
        if(Object.prototype.toString.call(item.labelScript) !== "[object Array]"){
          item.labelScript = []
        }
      })
      this.createSingleProject({
        labelType,
        redisKey,
        fileName,
        fileSize,
        fileLength,
        existingModelIds: labelType===2?'':this.existingModelIds.join(',')
      })
      .then(res=>{
        if(res.code === 0){
          this.$store.dispatch('SEND_INFOR',{
            proId: res.data.proId,
            labelType: res.data.labelType,
          })
          this.$message({
            type: 'success',
            message: '创建单人任务成功',
            duration: 1000,
            onClose: ()=>{
              this.$router.push({
                path: labelType === 2?'/classformal' : '/entityformal',
                query: {
                  proId: res.data.proId,
                }
              })
            },
          })
        }
      })
    },
    showModal(){
      this.$refs.modal_in.showModal()
    },
    // 取消
    cancal(){
      this.$router.go(-1)
    },
    // 选择内置模型
    makSuer(){
      // existingModelIds 内置模型
      // 人民，地名，机构名 100147，100148,100149
      // 地名--LOC,机构名--ORG,人名--PER
     this.existingModelIds = this.modalInList.map((item)=>{
        if(item === '地名--LOC'){
          this.pushModel('地名',100148)
          return  100148
        }
        if(item === '机构名--ORG'){
          this.pushModel('机构名',100149)
          return  100149
        }
        if(item === '人名--PER'){
          this.pushModel('人名',100147)
          return  100147
        }
      })
      let Allarr = [100148,100149,100147]
      this.$_.difference(Allarr,this.existingModelIds).forEach(id=>{
        let i = this.$_.findIndex(this.typeInput['entity'],(o)=>(o.id=== id))
        if(i > -1){
          this.typeInput['entity'].splice(i,1)
        }
      })
      this.blurCheckType()
    },
    pushModel(val,id){
      let i = this.$_.findIndex(this.typeInput['entity'],(o)=>(o.val=== val))
      if(i > -1){
        this.typeInput['entity'][i].id = id
        this.$set(this.typeInput['entity'][i],'disabled',true)
      }else{
        this.typeInput['entity'].unshift({
          val: val,
          disabled: true,
          id: id
        })
      }
    },
    isOpenRuleConfig(){
      if(this.codeArr&&this.codeArr.length>0){
        this.ruleDrag=false
      }else{
        this.$message({
          type: 'error',
          message: this.labelType===2?'请输入分类名称':'请输入实体名称'
        })
      }
    },
    createSingleProject(option){

      let data = {
        // token,
        proName: this.singleTaskForm.name,
        // labelType,
        labelContent: JSON.stringify(this.labelContent),
        // redisKey,
        // fileName,
        // fileSize,
        // fileLength
        // existingModelIds: this.existingModelIds.join(',')
      }
      Object.assign(data,option)
      console.log(data)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/pro/createSingleProject`,data)
        .then(res=>{
          resolve(res)
        })
      })
    }
  },

}
</script>

<style lang="scss">
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";

.createSingleTask {
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
    }
    .type-select{
      margin-top: 8px;
      background: $gray-white;
      border: 1px solid $table-border-color;
      .classification,.entity-recognition{
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
      }
      .type-top-title{
        height: 40px;
        line-height: 40px;
        width: 100%;
        @include classflex();
        .type-select__left{
          @include classflex(flex-start);
          .icon{
            width: 16px;
            height: 16px;
            vertical-align: middle;
            cursor: pointer;
            margin-right: 12px;
            &.not{
              cursor: not-allowed;
            }
          }

          .text{
            padding-left: 12px;
            padding-right: 20px;
            color: rgba($color: #000000, $alpha: 0.7);
          }
        }
        .type-select__right{
          @include classflex(flex-start);
          .tasktype-load{
            color: $blue;
            cursor: pointer;
            @include classflex(flex-start);
            position: relative;
            padding-right: 24px;
            .smallhelp{
              position: absolute;
              right: 12px;
              top: 8px;
            }
          }
          .downTemplate{
            color: $blue;
          }
          .uploadTypeShow{
            width: 96px;
            height: 16px;
            background: $white;
            font-size: 10px;
            line-height: 16px;
            margin-right: 10px;
            p{
              font-weight: normal;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              width: 70px;
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
        }

      }
      .type-center-input{
        @include classflex(flex-start);
        flex-direction: row;
        flex-flow: wrap;
        width: 100%;
        .type-center-input--wrapper{
          width: calc(50% - 5px);
          margin-bottom: 10px;
          @include classflex();
          &:nth-child(odd){
            margin-right: 10px;
          }
          .input-item{
            width: calc(100% - 20px);
          }
          .el-icon-close{
            color: $red;
          }
        }
      }
      .type-input-error{
        line-height: 20px;
        color: $red;
      }
      .moreInput{
        line-height: 20px;
        color: $blue;
      }
      .type-bottom-modal{
        color: $blue;
        position: relative;
        line-height: 20px;

      }
    }
    // 模态框 提示
    .modal-dec{
      position: relative;
      color: $blue;
      line-height: 20px;
      left: 0;
      top: 0;
      cursor: pointer;
      .point{
        width: 4px;
        height: 4px;
        background: $blue;
        position: absolute;
        left: 2px;
        top: 5px;
      }
      span{
        padding-left: 10px;
        font-size: 12px;
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
    .rule-config{
      margin-bottom: 50px;
      img{
        vertical-align: middle;
        cursor: pointer;
      }
      .rule-main__top{
        height: 32px;
        line-height: 32px;
        background:#F6F6F8;
        margin-bottom: 10px;
        @include classflex(flex-start);
        flex-direction: row;
        position: relative;
        .item{
          width: 82px;
          padding-left: 6px;
          padding-right: 6px;
          position: relative;
          color: rgba($color: #000000, $alpha: 0.8);
          .item-span{
            width: 100%;
            text-align: center;
            cursor: pointer;
          }
          .active{
            border-bottom: 2px solid $blue;
            color: $blue;
          }
          .right-border{
            position: absolute;
            height: 18px;
            width: 1px;
            background: #DCE2EA;
            top: 8px;
          }
        }
        .main-top__help{
          position: absolute;
          width: 16px;
          height: 16px;
          background: url('~assets/img/task/help.png') no-repeat;
          right: 20px;
          background-size: contain;
          cursor: pointer;
        }
      }
      .rule-main__code{
        .code-wrapper{
          .code-title{
            @include classflex();
            display: flex;
            height: 40px;
            line-height: 40px;
            color: $blue;
            .left{
              @include classflex(flex-start);
              i{
                margin-right: 10px;
              }
            }
            .right{
              cursor: pointer;
              @include classflex(flex-start);
              position: relative;
              padding-right: 8px;
              .smallhelp{
                position: absolute;
                right: 0;
                top: 8px;
              }
              .right-upload{
                @include classflex(flex-start);
                .right-upload--text{
                  color: rgba($color: #000000, $alpha: 0.6);
                  padding: 0 5px;
                }
              }
            }
          }
        }
      }

    }

  }
  .loadFileInfor{
    position: absolute;
    right: -25px;
    top: 0;
  }
  .main-top__help{
    width: 16px;
    height: 16px;
    background: url('~assets/img/task/help.png') no-repeat;
    cursor: pointer;
    background-size: contain;
  }
  .main-top__help--small{
    width: 10px;
    height: 10px;
    background: url('~assets/img/task/smallhelp.png') no-repeat;
    cursor: pointer;
    background-size: contain;
  }
  .acceptFileType{
    font-size: 12px;
    color:rgba(0, 0, 0, 0.6);
  }
  .modal_in{
    padding-left: 30px;
    .modal_in--title{
      font-size: 16px;
    }
    .modal_in--group{
      margin-top: 30px;
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


