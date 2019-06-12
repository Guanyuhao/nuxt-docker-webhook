<template>
  <div class="multask">
    <div class="title">
      <div class="title-left"></div>
      <p>创建多人任务</p>

    </div>
    <div class="task-con">
      <el-form size="small" ref="form" :model="singleTaskForm" label-width="80px">
          <el-form-item class='isRequire' label="任务名称">
            <el-input
            v-model="singleTaskForm.name"
            type="text"
            @blur="checkTaskName"
            ></el-input>
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
                    <img v-show="!plusDrag"  class="img16" src="~/assets/img/task/plusx.png"
                    @click="fixTypeInput(true)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img  v-show="mulDrag"  class="img16" src="~/assets/img/task/mul.png"
                    @click="fixTypeInput(false)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img v-show="!mulDrag"  class="img16" src="~/assets/img/task/mulx.png"
                    @click="fixTypeInput(false)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                  </div>
                  <div class="type-select__right">
                    <div class="tasktype-load" @click="uploadType('typeUpload_calss')">{{templateNameText?'已上传分类类别':'上传分类类别'}}
                      <el-tooltip class="main-top__help--small smallhelp" placement="top">
                        <div slot="content">支持上传xls。</div>
                        <div></div>
                      </el-tooltip>
                    </div>
                    <div v-show="templateNameText && templateNameText !=='已载入示例数据' " class="uploadTypeShow">
                      <p>{{templateNameText}}</p>
                      <i v-if="templateNameText !=='已载入示例数据'" @click="closeTemplate('typeUpload_calss')" class="el-icon-close"></i>
                    </div>
                    <input
                      type="file"
                      name="file"
                      accept=".xls"
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
                    :disabled="!isFixTypeInput.classification || item.disabled"
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
                    <img v-show="plusDrags"  class="img16" src="~/assets/img/task/plus.png"
                    @click="fixTypeInput(true)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img v-show="!plusDrags"  class="img16" src="~/assets/img/task/plusx.png"
                    @click="fixTypeInput(true)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img  v-show="mulDrags"   class="img16" src="~/assets/img/task/mul.png"
                    @click="fixTypeInput(false)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                    <img v-show="!mulDrags"  class="img16" src="~/assets/img/task/mulx.png"
                    @click="fixTypeInput(false)"
                    :class="['icon',isFixTypeInput.classification?'':'not']"
                    alt="">
                  </div>
                  <div class="type-select__right">
                    <div class="tasktype-load" @click="uploadType('typeUpload_entity')">{{templateNameText?'已上传实体类别':'上传实体类别'}}
                      <el-tooltip class="main-top__help--small smallhelp" placement="top">
                        <div slot="content">支持上传xls。</div>
                        <div></div>
                      </el-tooltip>
                    </div>
                    <div v-show="templateNameText" class="uploadTypeShow">
                      <p>{{templateNameText}}</p>
                      <i v-if="templateNameText !=='已载入示例数据'" @click="closeTemplate('typeUpload_entity')" class="el-icon-close"></i>
                    </div>
                    <a class="downTemplate" :href="domain+'/system/downloadExcelTemplate?labelType=1'" download="Lens_Label_Template.xls">获取模板</a>

                    <!-- <span  @click="downTemplate('/system/downloadExcelTemplate?labelType=1')">获取模板</span> -->
                    <input
                        type="file"
                        name="file"
                        accept=".xls"
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
          <el-form-item  class='isRequire' label="上传数据" style="margin-top: 6px;">
            <div class="upload-data">
              <taskBtn  size='small' type='upload' @click="uploadData">
                <img class="img12" src="~/assets/img/task/upload.png" alt="">
                上传
                <el-tooltip class="main-top__help loadFileInfor" placement="top">
                  <div slot="content">支持上传doc,docx,xls,xlsx,txt,zip等格式，每行一条数据</div>
                  <div></div>
                </el-tooltip>
              </taskBtn>
              <!-- <span class="acceptFileType">支持上传doc,docx,xls,xlsx,zip等格式，每行一条数据。</span> -->
              <div class="upload-infor" v-show="singleFile.name">
                <div v-show="singleFile.name" class="linkbg" :class="[uploadError?'uploaderror':'']"></div>
                <div class="infor-text">
                  {{singleFile.name+(singleFile.length?('('+singleFile.length + '条）'):'')}}
                </div>
                <div class="del el-icon-close" :class="[uploadError?'delerror':'']" v-show='singleFile.name' @click="delFile"></div>
                <div class="bar" ref="uploadBar" :style="{'width':barWidth}"></div>
              </div>
              <div v-show="!singleFile.name" style="width:100%;"></div>
              <div class="modal-dec" @click="loadSampleData">
                <div class="point"></div>
                <span>载入示例数据</span>
              </div>
              <input
                type="file"
                name="file"
                accept=".txt,.doc,.docx,.xls,.zip,.xlsx"
                class="el-upload__input"
                ref="singleUpload"
                @change='handleFiles($event)'
             />
              <i v-show="errorInforText.uploadData" class="error uploadData-error">{{errorInforText.uploadData}}</i>
            </div>
          </el-form-item>
          <el-form-item class='isRequire' label="任务配置" style="margin-top: 2px;margin-bottom: 24px;" v-if="taskConfigShow">
            <div class="task-config">
              <div class="task-config--ex">
                <span class="ex--text">是否需要标注示例数据？</span>
                <el-radio-group v-model="taskConfig.radio1">
                  <el-radio :label="1">需要</el-radio>
                  <el-radio :label="2">不需要</el-radio>
                </el-radio-group>

                <span class="demonstration">示例数量</span>
                <el-slider :disabled="taskConfig.radio1===2" :min="taskConfig.min" :step="taskConfig.step" :max="taskConfig.max" v-model="taskConfig.slider1" :show-tooltip="false"></el-slider>
                <div class="sele-mark-num">
                  <el-input-number
                    class="mark-num-input"
                    v-model="taskConfig.num1"
                    controls-position="right"
                    @change="changeTaskConfigNum(1,arguments)"
                    :disabled="taskConfig.radio1===2"
                    :min="taskConfig.min"
                    :max="taskConfig.max">
                    </el-input-number>
                    <div class="right-num">
                      <div class="right-num-left"></div>
                      <div class="right-btn-top" @click="taskConfigEXNum(true)">
                        <i class="el-icon-caret-top"></i>
                      </div>
                      <div class="right-btn-line"></div>
                      <div class="right-btn-bottom" @click="taskConfigEXNum(false)">
                        <i class="el-icon-caret-bottom"></i>
                      </div>
                    </div>
                </div>
                 <el-tooltip class="main-top__help" placement="top">
                  <div slot="content">示例标注的作用：<br/>
1、示例标注有利于其他标注人员深入的理解任务的<br/>具体要求，以作范例之用。<br/>
2、有利于预测模型的快速启动，使得后续标注效率<br/>更高。</div>
                  <div></div>
                </el-tooltip>
              </div>
              <div class="task-config--ex">
                <span class="ex--text">标注人员是否需要考核？</span>
                <el-radio-group v-model="taskConfig.radio2">
                  <el-radio :label="1">需要</el-radio>
                  <el-radio :label="2">不需要</el-radio>
                </el-radio-group>

                <span class="demonstration">考核数量</span>
                <el-slider :disabled="taskConfig.radio2===2" :min="taskConfig.min" :step="taskConfig.step" :max="taskConfig.max" v-model="taskConfig.slider2" :show-tooltip="false"></el-slider>
                <div class="sele-mark-num">
                  <el-input-number
                    class="mark-num-input"
                    v-model="taskConfig.num2"
                    controls-position="right"
                    @change="changeTaskConfigNum(2,arguments)"
                    :disabled="taskConfig.radio2===2"
                    :min="taskConfig.min"
                    :max="taskConfig.max">
                    </el-input-number>
                    <div class="right-num">
                      <div class="right-num-left"></div>
                      <div class="right-btn-top" @click="taskConfigCheckNum(true)">
                        <i class="el-icon-caret-top"></i>
                      </div>
                      <div class="right-btn-line"></div>
                      <div class="right-btn-bottom" @click="taskConfigCheckNum(false)">
                        <i class="el-icon-caret-bottom"></i>
                      </div>
                    </div>
                  </div>
                   <el-tooltip class="main-top__help" placement="top">
                  <div slot="content">考核标注的作用：<br/>
1、有利于判断标注人员是否充分理解任务<br/>要求，是否能够达到标注的水平。<br/>
2、管理人员需要针对考核数据进行预标注，以<br/>此作为判断依据。</div>
                  <div></div>
                </el-tooltip>
              </div>
            </div>
          </el-form-item>
          <el-form-item  label="每条数据标注次数" class="mark-wrapper isRequire" v-show="singleTaskForm.type!=='实体识别'">
            <div class="mark-num">
              <el-input-number
              class="mark-num-input"
              v-model="dataNum"
              controls-position="right"
              @change="numChange"
              @blur="markNumBlur"
              :min="1"
              :max="dataNumMax">
              </el-input-number>
              <div class="right-num">
                <div class="right-num-left"></div>
                <div class="right-btn-top" @click="dataNumAdd">
                   <i class="el-icon-caret-top"></i>
                </div>
                <div class="right-btn-line"></div>
                <div class="right-btn-bottom" @click="dataNumMul">
                   <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <img v-show="dataNum>1" class="img20" src="~/assets/img/task/everdata.png" alt="" @click="showDateSettingModal">
              <div class="mark-num-introduction">
                  <div class="modal-dec" @click="showHelpInforModal(1)">
                    <div class="point"></div>
                    <span>为什么每条数据要标注多次</span>
                  </div>
                  <div class="modal-dec" @click="showHelpInforModal(2)">
                    <div class="point"></div>
                    <span>标注规则</span>
                  </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class='isRequire' label="标注人员" style="margin-top: 6px;">
            <div class="marker">
              <div class='marker-input' @click="selectMarker">
                <el-tag v-for='(tag,index) in markerArr' :key='index' size="mini"
                :type="tag.isTask?'info':''">
                  {{tag.name}}
                </el-tag>
              </div>
              <taskBtn @click="selectMarker">
                选择
              </taskBtn>
            </div>
          </el-form-item>
          <el-form-item class='isRequire' label="截止时间" style="margin-top:4px">
            <div class='endtime'>
              <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择日期时间"
                format='yyyy-MM-dd HH:mm'
                value-format='yyyy-MM-dd HH:mm'
                prefixIcon=' '
                ref="datePicker"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
              <img class="sufficon img20" @click="focuDatePicker"  src="~/assets/img/task/time.png" alt="" srcset="">
              <div class="endtime-right">
                <span class="span-label">
                  算法选择
                </span>
                <el-select
                  v-model="algorithm"
                >
                  <el-option :value="singleTaskForm.type==='分类'?'SVM':'CRF'"></el-option>
                  <!-- <el-option value="KNN"></el-option> -->
                  <!-- <el-option value="KNN"></el-option> -->

                </el-select>

                 <i class="algorithm-dec">(非专业人员建议使用默认算法)</i>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="标注规范"  class="markRule-wrapper" style="margin-top:16px;">
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
                 <!-- <span class="main-top__help" @click="showHelpInforModal(6)"></span> -->
                <el-tooltip class="main-top__help" placement="top">
                    <div slot="content">支持上传doc,docx,xls,xlsx,txt等格式</div>
                    <div></div>
                </el-tooltip>
              </div>
              <llpEditor
                @onEditorChange='handleEditorChange'
                ref="llpEditor"
              ></llpEditor>
              <div class="mark-rule-remark">
                <div class="modal-dec" @click="showHelpInforModal(3)">
                    <div class="point"></div>
                    <span>了解标注规范的作用</span>
                  </div>
                  <div class="modal-dec" @click="showHelpInforModal(4)">
                    <div class="point"></div>
                    <span>标注规范包含哪些内容？</span>
                  </div>
                  <div class="modal-dec"  @click="showHelpInforModal(5)">
                    <div class="point"></div>
                    <span>示例</span>
                  </div>
                  <div class="right-text-limt">{{characterLimit}}/5000</div>
              </div>
            </div>

          </el-form-item>
          <el-form-item label="规则配置">
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
                  <el-tooltip class="main-top__help right20" placement="top">
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
      <!-- 内置模型 -->
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
        <!-- 选择人员 -->
        <selectPeople :initData='initSelectPeopleData' ref="selectPeople" @sure='handelSure' :auth='peopleAuth' :everyDataMarkCount='dataNum'></selectPeople>
        <!-- 载入示例数据 -->
        <modalBox ref="sample_load" :width='"720px"' @sure='handelSampleLoad'>
          <template slot="title">
              载入示例数据
          </template>
          <template slot="content">
            <div class="sampleLoader-wrapper">
              <llp-table :isHeader='false' :isFooter='false'>
                <template slot="main">
                  <el-table
                    border
                    :data="sampleLoadArrCurr"
                    class="modalTable"
                    stripe
                  >
                  <el-table-column
                    label="选择"
                    width="90"
                    >
                    <template slot-scope="scope">
                      <div class="sampleLoader-radio-wrapper">
                        <el-radio v-model="sampleRadio" :label="scope.row.index" ></el-radio>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="数据名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="calssName"
                    label="分类名称"
                    width=""
                    >
                  </el-table-column>

                  <el-table-column
                    prop="num"
                    label="数据量"
                    >
                  </el-table-column>

                  </el-table>
                </template>
              </llp-table>
            </div>
          </template>
        </modalBox>
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
              <ul class="helpinfor-text" v-show="isHelpInforDrag===1">
                <li>在进行高要求的训练任务时，为了提高数据标注质量，通常会将一条数据标注多次，以少数服从多数的原则选择最优的标注结果。</li>
                <li>例如：一个二分类问题，其中一条数据同时被5个人标注过，4个人选A，1个人选B，那么，最终的标注结果则是A。</li>
              </ul>
              <ul class="helpinfor-text" v-show="isHelpInforDrag===2">
                <li>1、少数服从多数原则。</li>
                <li>2、大于、等于50%的人丢弃的数据，让用户选择：丢弃、 重新标注（重新指定1人标注，以其结果为准）。</li>
                <li>3、标注结果均等的情况下，让用户选择：丢弃、 重新标注（每条数据将重新指定1人标注，以其结果为准）。</li>
                <li v-text="'4、所选人数最多的两个分类的结果所占比例之差，<= 20%，允许用户选择丢弃、或者重新标注。'"></li>
              </ul>
              <ul class="helpinfor-text" v-show="isHelpInforDrag===3">
                <li>数据标注是一项繁冗、复杂的工作，不同任务的标注要求，常常大相径庭，这就要求每一个标注任务都要有尽可能详尽的要求和规范。任务管理者发布的标注规范越详尽，标注人员的准确度和工作效率将会越高。</li>
                <li>建议用户在书写标注规范的同时，附上相应的示例，便于标注人员理解，记忆。</li>
              </ul>
              <ul class="helpinfor-text" v-show="isHelpInforDrag===4">
                <li>1、分类名或实体名称的具体定义、涵盖范围；</li>
                <li>2、详细、具体的标注要求；</li>
                <li>3、特殊情况如何处理；</li>
                <li>4、对于准确率、时效的要求；</li>
                <li>5、易出问题的总结；</li>
                <li>6、其他。</li>
              </ul>
              <ul class="helpinfor-text" v-show="isHelpInforDrag===5">
                  <li>1、实体类别：人名、地名、机构名</li>
                  <li>
                    2、要求
                    <ul>
                      <li>① 需要将数据中的所有命名实体尽数标注出来；</li>
                      <li>② 机构名包含政府机构的名称，“协会”不列入此次标注的范围；</li>
                      <li>③ 机构名称的全称和简称都需要进行标注；</li>
                      <li>④ 标注人名时，对于“张老师”、“王院长”这种都需要进行标注，而“习近平总书记”这种情况，只需要标注习近平三个字即可。</li>
                    </ul>
                  </li>
                  <li>
                    3、示例
                    <ul>
                      <li>① 会议指出，<span class="red">习近平（人名）</span>总书记在全国教育大会上的重要讲话，站在新时代党和<span class="blue">国家事业发展全局（机构名）</span>的高度，深刻回顾了党的十八大以来我国教育事业发展取得的显著成就。</li>
                      <li>② 昨日， 教育厅发出通知，在<span class="darkblue">湖北省（地名）</span>大学生、中小学生以及幼儿园儿童中广泛开展诚信教育，学生诚信教育要融入课程教学全过程。</li>
                    </ul>
                  </li>
              </ul>
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
        <!-- 设置 -->
        <modalBox ref="data_setting"
        :notAutoClose='true'
        @sure='handerDataSetting'
        width='540px'>
          <template slot="title">
            设置
          </template>
          <template slot="content">
            <el-form size="small" :model="dataSettingForm" label-width="140px">
              <el-form-item label="多数人丢弃数据：">
                <el-radio-group v-model="dataSettingForm.throw">
                  <el-radio label="丢弃"></el-radio>
                  <el-radio label="重新标注"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="结果均等或近似：">
                <el-radio-group v-model="dataSettingForm.result">
                  <el-radio label="丢弃"></el-radio>
                  <el-radio label="重新标注"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="(dataSettingForm.throw === '重新标注' || dataSettingForm.result==='重新标注')">
                  <el-select
                    v-model="dataSettingForm.value"
                    multiple
                    placeholder="请选择标注人员"
                    size="small"
                    style="width:90%"
                    filterable
                    remote
                    :remote-method="remoteMethod"
                    :loading="dataSettingLoading"
                    >
                    <el-option
                      v-for="(item,index) in dataSettingForm.userList"
                      :key="index"
                      :label="item.name"
                      :value="item.userId">
                    </el-option>
                  </el-select>
              </el-form-item>

            </el-form>
          </template>
        </modalBox>
    </div>
  </div>
</template>
<script>
import llpCode from '~/components/task/llpCodeMirror';
import llpEditor from '~/components/task/llpEditor';
import llpTable from '~/components/table/llpTable';

import taskBtn from '~/components/UI/taskButton';
import modalBox from '~/components/modalBox';
import selectPeople from '~/components/task/selectPeople';

export default {
  layout: 'home',
  components: {
    llpCode,
    taskBtn,
    llpEditor,
    modalBox,
    selectPeople,
    llpTable
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
      dataNum: 1, // 每条数据标注的次数
      dataNumMax: 1,
      endTime:  '',
      markerArr: [],
      algorithm: 'SVM', // 算法
      editor: null,
      characterLimit: 0,
      sampleLoadArr: [
        {
          index: 1,
          name: '媒体新闻分类',
          calssName: '食品安全，司法要闻',
          num: 470,
          labelType: 2
        },
        {
          index: 2,
          name: '命名实体识别示例',
          calssName: '人名，地名，机构名',
          num: 550,
          labelType: 1
        },
        {
          index: 3,
          name: '医疗类语料实体识别示例',
          calssName: '疾病，症状，药品',
          num: 520,
          labelType: 1
        }
      ], //示例数据
      sampleRadio: 1,
      isHelpInforDrag: true,
      taskConfigShow: false,
      taskConfig: {
        radio1: 1, //1 示例标注
        radio2: 1, //2 考核标注
        slider1: 50,
        slider2: 50,
        num1: 0,
        mun2: 0,
        step: 1,
        btnStep: 1,
        min: 5
      },
      dataSettingForm: {
        throw: '丢弃',
        result: '丢弃',
        value: [],
        userList: [],
      },
      sureDateSetForm:{
        throw: '丢弃',
        result: '丢弃',
        value: [],
        userList: [],
      },
      initSelectPeopleData:{
        taskMarkArr:[],
        exMarkArr: [],
      },
      limitPeople: 0,
      isResetTask: false,
      dataSettingLoading: false,
      labelUsers: {
        labelUsers: [],
        checkUsers: [],
        finalUsers: []
      }, //标注人员json格式的字符串
      labelStandard: '',
      similarDrop: 1,  // 丢弃 重新标注
      moreDrop: 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      standardFile: {
        name: '',
        fileName: '',
        isExit: false
      },
      errorInforText: {
        uploadData: '',
        markRule: ''
      },
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
    peopleAuth(){
      // 控制
      let arr = [];
      (this.taskConfig.radio1 === 1 && this.taskConfigShow)?arr[0] = 2:'';
      (this.taskConfig.radio2 === 1 && this.taskConfigShow)?arr[1] = 2:'';
      return arr
    },
    userListLength(){
      return this.$store.state.userList.length
    },
    sampleLoadArrCurr(){
      // 示例数据
      let labelType = this.isClassification? 2 : 1;
      let result = this.sampleLoadArr.filter(item=>item.labelType === labelType);
      this.sampleRadio = result[0].index;
      return result
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
      let time = new Date().getTime() + 3600*1000*24*7
      let data7 = new Date(time)
      this.endTime = data7.getFullYear()+'-'+((data7.getMonth()+1)>9?(data7.getMonth()+1):'0'+(data7.getMonth()+1)) +'-'+ (data7.getDate()>9?data7.getDate(): '0'+data7.getDate() ) +' 00:00'
    },
    setDataMaxNum(){
      this.dataNumMax = this.userListLength
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
          let index = dom.getAttribute('data-index')
          let modal_id = dom.getAttribute('data-id')
          let type = this.isClassification?'classification':'entity'
          if((this.typeInput[type].length <= 1 && type==='entity')){
            // 实体名称不少与1个
            this.mulDrags = false
            this.$message({
              type: 'warning',
              message: '至少输入1个实体名称'
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
      // console.log(this.isResetTask)
      if(this.isResetTask){
        this.resetTaskConfig()
        return
      }
      let singleUpload = this.$refs.singleUpload;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.postDelFile()
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    postDelFile(){
      let singleUpload = this.$refs.singleUpload;
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
           if(this.isloadSampleFile){
              this.typeDrag = false
              // 分类名称填充
              let type = this.isClassification?'classification':'entity'
              this.typeInput[type] = [{ val: ''},{val:''}]
              this.isFixTypeInput[type] = true
              this.templateNameText = ''
              this.isloadSampleFile = false
           }
          }else{
            this.uploadError = true
          }
      })
    },
    resetTaskConfig(){
      return new Promise((resolve,reject)=>{
        if(this.isResetTask){
          this.$confirm('此操作会重置任务配置,示例与考核人员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            this.clearMarkerArr()
            this.taskConfigShow = false
            this.postDelFile()
            resolve()
          })
          .catch(()=>{
            this.$message({
              type: 'info',
              message: '取消操作'
            });
            reject()
          })
        }else{
          resolve()
        }
      })
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
      let reg = /.(?=docx|doc|txt|xls|zip|xlsx)/i;
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
            // 开启任务配置
            if(data.fileLength >= 50){
              this.isResetTask = true
              this.taskConfigShow = true
              this.initTaskConfig(data.fileLength)
            }else{
              this.taskConfigShow = false
              this.isResetTask = false
            }
            this.$message({
              message: '上传成功',
              type: 'success'
            });
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
        this.algorithm = 'CRF'
        // 初始化 分类
      }else{
        this.isClassification = true
        this.algorithm = 'SVM'
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
        // this.subFixInput = false

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
      if(this.errorTaskNameShow || !this.singleTaskForm.name ){
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
        // this.$message({
        //   message: '任务类型有误',
        //   type: 'warning'
        // });
        return
      }
      if(!redisKey){
        this.$message({
          message: '请上传数据',
          type: 'warning'
        });
        // this.errorInforText.uploadData = '请上传数据'
        return
      }
      if(this.uploadError){
        this.$message({
          message: '上传数据有误',
          type: 'warning'
        });
        return
      }
      if(fileLength < 50){
        this.$message({
          message: '上传数据不能小于50条',
          type: 'warning'
        });
        return
      }
      if(this.markerArr.length <= 0){
        this.$message({
          message: '请选择标注人员',
          type: 'warning'
        });
        return
      }

      // console.log(this.markerArr.filter(item=>!item.isTask).length <= 0,(this.taskConfig.radio1 === 1 || this.taskConfig.radio2 === 1 ))
      if(this.markerArr.filter(item=>!item.isTask).length <= 0 &&(this.taskConfig.radio1 === 1 || this.taskConfig.radio2 === 1 )){
        this.$message({
          message: '请选择示例或者考核的标注人员',
          type: 'warning'
        });
        return
      }
      if(!this.endTime){
        this.$message({
          message: '请选择截止时间',
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
      // labelUsers
      this.markerArr.forEach((item)=> {
        if(item.isTask){
          this.labelUsers.labelUsers.push({
            id: item.userId,
            rate: item.num
          })
        }else{
          this.labelUsers.checkUsers.push({
            id: item.userId,
            rate: item.num
          })
        }
      })
      this.createSingleProject({
        labelType,
        redisKey,
        fileName,
        fileSize,
        fileLength,
        existingModelIds: labelType===2?'':this.existingModelIds.join(','),
        labelNum: labelType===1?1:this.dataNum,
        expTime: this.endTime+':00',
        labelUsers: JSON.stringify(this.labelUsers),
        labelStandard: this.labelStandard,
        haveExam: this.taskConfig.radio1 === 1? 1 : 0,
        haveCheck: this.taskConfig.radio2 === 1? 1 : 0,
        sampleNum: this.taskConfig.radio1 === 1 && this.peopleAuth[0]=== 2? this.taskConfig.num1 : 0,
        checkNum: this.taskConfig.radio2 === 1 && this.peopleAuth[1]=== 2? this.taskConfig.num2 : 0,
        similarDrop: this.similarDrop,
        moreDrop: this.moreDrop,
        standardFile: this.standardFile.fileName,
        showStandardFile: this.standardFile.name
      })
      .then(res=>{
        if(res.code === 0){
          this.$store.dispatch('SEND_INFOR',{
            proId: res.data.proId,
            labelType: res.data.labelType,
          })
          this.$message({
            type: 'success',
            message: '创建多人任务成功',
            duration: 1000,
            onClose: ()=>{
              this.$router.push('/')
            }
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
      // 人民，地名，机构名 1000147，1000148,1000149
      // 地名--LOC,机构名--ORG,人名--PER
     this.existingModelIds = this.modalInList.map((item)=>{
        if(item === '地名--LOC'){
          this.pushModel('地名',1000148)
          return  1000148
        }
        if(item === '机构名--ORG'){
          this.pushModel('机构名',1000149)
          return  1000149
        }
        if(item === '人名--PER'){
          this.pushModel('人名',1000147)
          return  1000147
        }
      })
      let Allarr = [1000148,1000149,1000147]
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
    createSingleProject(option){
      console.log(option)
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
      // console.log(data)

      return new Promise((resolve,reject)=>{
        this.$axios.$post(`/pro/createMultiProgect`,data)
        .then(res=>{
          resolve(res)
        })
      })
    },
    numChange(val){
      // console.log(val)
    },
    markNumBlur($event){
      if(!$event.target.value){
        this.dataNum = 1
        $event.target.value = 1
      }
    },
    // 载入示例数据
    loadSampleData(){
      this.$refs.sample_load.showModal()
    },
    // 示例数据的选择
    handelSampleLoad(){
      let name = this.sampleLoadArr[this.sampleRadio-1].name
      let calssName = this.sampleLoadArr[this.sampleRadio-1].calssName
      this.postLoadSampleDate(name)
      .then(res=>{
        if(res.code === 0){
          let data = res.data
          Object.assign(this.singleFile,data)
          this.singleFile.name = name
          this.singleFile.length = data.fileLength
          // 开启任务配置
          this.initTaskConfig(data.fileLength)
          // 禁用分类切换
          this.typeDrag = true
          // 分类名称填充
          let type = this.isClassification?'classification':'entity'
          this.typeInput[type] = []
          this.isFixTypeInput[type] = false
          calssName.split('，').forEach(item=>{
            this.typeInput[type].push({
              val: item,
              disabled: true,
              isSample: true
            })
          })
          this.templateNameText = '已载入示例数据'
          this.isloadSampleFile = true
          this.$message({
            message: '载入示例数据成功',
            type: 'success'
          });
          // 分类名称重新校验
          this.blurCheckType()
        }
      })
    },
    // 任务配置初始化
    initTaskConfig(fileLength){
      if(fileLength >= 50){
        this.isResetTask = true
        this.taskConfigShow = true
        this.taskConfig.btnStep = 1
        if(fileLength > 100){
          this.taskConfig.btnStep = 5
        }
        if(fileLength > 1000){
          this.taskConfig.btnStep = 10
        }
        if(fileLength > 10000){
          this.taskConfig.btnStep = 50
        }
        this.taskConfig.max = Math.floor(fileLength*0.1)
        this.taskConfig.slider1 = Math.floor(fileLength*0.05)
        this.taskConfig.slider2 = Math.floor(fileLength*0.05)
      }else{
        this.isResetTask = false
      }
    },
    // 载入示例数据
    postLoadSampleDate(name){
      // /pro/loadSampleData
      let data = {
        fileName: name
      }
      return new Promise((resolve,reject)=>{
        this.$axios.$post('/pro/loadSampleData',data)
        .then(res=>{
          resolve(res)
        })
      })

    },
    // 任务配置 考核数量 btn
    taskConfigCheckNum(drag){
      if(this.taskConfig.radio2===2){
        return
      }
      if(drag){
        // add
        this.taskConfig.num2 += this.taskConfig.btnStep
      }else{
        this.taskConfig.num2 -= this.taskConfig.btnStep
      }
      this.taskConfig.slider2 = this.taskConfig.num2
    },
    // 任务配置 示例 btn
    taskConfigEXNum(drag){
      if(this.taskConfig.radio1===2){
        return
      }
      if(drag){
        // add
        this.taskConfig.num1 += this.taskConfig.btnStep
      }else{
        this.taskConfig.num1 -= this.taskConfig.btnStep
      }
      this.taskConfig.slider1 = this.taskConfig.num1
    },
    changeTaskConfigNum(num,arg){
      if(num === 1){
        // 示例数量

        this.taskConfig.num1 = arg[0]
        this.taskConfig.slider1 = arg[0]
      }else{

        this.taskConfig.num2 = arg[0]
        this.taskConfig.slider2 = arg[0]
      }
    },
    // 每条数据的设置
    showDateSettingModal(){
      Object.assign(this.dataSettingForm,this.sureDateSetForm)
      this.$refs.data_setting.showModal()
      // 填充userlist
      if(this.dataSettingForm.userList.length <= 0){
        this.getUserByCompany()
      }
    },
    handerDataSetting(){
      let obj = this.dataSettingForm
      let oldObj = this.sureDateSetForm
      if(this.dataSettingForm.throw === '丢弃' && this.dataSettingForm.result === '丢弃' ){
        this.labelUsers.finalUsers = []
        this.$refs.data_setting.closePop()
        Object.assign(oldObj,obj)
        return
      }
      if(this.dataSettingForm.value.length <= 0 ){
        this.$message({
          type: 'error',
          message: '请选择重新标注的人员'
        })
        return
      }
      Object.assign(oldObj,obj)
      if(obj.throw === '重新标注'){
        this.moreDrop = 0
      }else{
        this.moreDrop = 1
      }
      if(obj.result === '重新标注'){
        this.similarDrop = 0
      }else{
        this.similarDrop = 1
      }
      // 标注人员的json
      this.labelUsers.finalUsers = this.dataSettingForm.value.map(id=>({id,rate:0}))
      this.$refs.data_setting.closePop()

    },
    remoteMethod(query) {
      if(this.dataSettingLoading){
        return
      }
      this.dataSettingLoading = true
      let data = {
        condition: query,
        userIdsStr: ''
      }
      this.$axios.$post('/pro/showUserByCondition',data)
      .then((res)=>{
        if(res.code === 0){
          this.dataSettingLoading = false;
          this.dataSettingForm.userList = res.data.array
        }
      })
    },
    //  标注次数增加
    dataNumAdd(){
      // limitPeople >0 代表选择过标注人员
      this.limitPeople === 0 ? this.dataNumMax = this.userListLength: null
      let l = this.markerArr.filter((item)=>item.isTask).length
      if(this.dataNum >= l && this.limitPeople > 0){
        this.$message({
          type: 'error',
          message:'标注人员数量必须大于等于每条数据标注的次数'
        })
        return
      }
      if(this.dataNum >= this.dataNumMax){
        this.$message({
          type: 'error',
          message:'标注人员数量必须大于等于每条数据标注的次数'
        })
        return
      }
      this.dataNum += 1
    },
    //  标注次数增加
    dataNumMul(){
      if(this.dataNum <= 1){
        this.$message({
          type: 'error',
          message:'每条标注数据的次数必须大于等1'
        })
        return
      }
      this.dataNum -= 1
    },
    // 选择标注人员
    showSelectPeople(){
      this.$refs.selectPeople.showModal()
    },
    selectMarker(){
      if(!this.singleFile.name){
        this.$message({
          type: 'error',
          message: '请先上传数据'
        })
        return
      }
      this.showSelectPeople()
    },
    handelSure(isGo,twoArr){
      // 示例数量 必须大于或等于 示例标注人的数量
      if(!isGo){
        return
      }
      let taskPeople = twoArr[0].length
      let exPeople = twoArr[1].length
      let limitPeople = 0
      let auth = this.peopleAuth
      if(this.taskConfig.radio1 === 1){
        limitPeople += this.taskConfig.num1
      }
      if(this.taskConfig.radio2 === 1){
        limitPeople += this.taskConfig.num2
      }
      if(exPeople > limitPeople && auth.length>0){
        let text = (auth[1]===2&&auth[0]===2)?'示例标注+考核答案':auth[0]===2?'示例标注':'考核答案';
        let texts = (auth[1]===2&&auth[0]===2)?'示例数量+考核数量':auth[0]===2?'示例数量':'考核数量';
        this.$message({
          type: 'error',
          message: `${text}人的数量必须小于等于${texts}`
        })
        return
      }
       // 限制任素
      this.limitPeople = limitPeople
      // 限制 任务配置的最小值
      this.taskConfig.min = (auth[1]===2&&auth[0]===2)?Math.ceil(exPeople/2)>5?Math.ceil(exPeople/2):5:exPeople>5?exPeople:5;

      this.dataNumMax = taskPeople // 每条数据标注次数的最大值
      // ss
      console.log(this.dataNumMax)
      this.initSelectPeopleData.taskMarkArr = JSON.parse(JSON.stringify(twoArr[0]))
      this.initSelectPeopleData.exMarkArr = JSON.parse(JSON.stringify(twoArr[1]))

      this.markerArr = [].concat.apply([],twoArr).map((item,index)=>{
        if((index+1) <= taskPeople){
          item.isTask = true
        }else{
          item.isTask = false
        }
        return item
      })
      this.$refs.selectPeople.closePop()

    },
    isCliear(){
      return this.markerArr.filter((item)=>!item.isTask).length > 0;
    },
    clearMarkerArr(){
      this.markerArr = this.markerArr.filter((item)=>item.isTask);
      // 重置组件内 数据 保持数据同步
      this.$refs.selectPeople.clearExMarkArr();
      // 重置初始化的数据
      this.initSelectPeopleData.exMarkArr = []
    },
    // 展示每条数据的 弹框
    showHelpInforModal(drag){
      this.isHelpInforDrag = drag
      this.$refs.help_infor.showModal()
    },
    handleEditorChange( editor, html, text ){
      console.log('editor change!', editor, html, text)
      this.characterLimit = text.length-1
      this.labelStandard = html

    },
    async getUserByCompany(){
      if(!this.$store.state.userList){
        await this.$store.dispatch('GET_USERLIST')
      }
     this.dataSettingForm.userList = this.$store.state.userList
    },
    focuDatePicker(){
      this.$refs.datePicker.focus()
    },
    // 上传标注规范
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
            // this.labelStandard = res.data.standard
            // this.$refs.llpEditor.setContent(this.labelStandard)
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
  },
  watch: {
    'taskConfig.slider1'(newVal,oldVal){
      this.taskConfig.num1 = newVal
    },
    'taskConfig.slider2'(newVal,oldVal){
      this.taskConfig.num2 = newVal
    },
    'taskConfig.radio1'(newVal,oldVal){
      if(newVal !== oldVal){
        if(this.limitPeople > 0 && newVal === 2 && this.isCliear()){
          // 选择过人员
          this.$confirm('此操作将会删除示例标注人员,是否继续','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            this.clearMarkerArr()
            this.$message({
              type: 'success',
              message: '操作成功'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已经取消操作'
            });
            this.taskConfig.radio1 = 1
          });
        }
      }
    },
    'taskConfig.radio2'(newVal,oldVal){
       if(newVal !== oldVal){
         if(this.limitPeople > 0  && newVal === 2 && this.isCliear()){
          // 选择过人员
          this.$confirm('此操作将会删除示例标注人员,是否继续','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            this.clearMarkerArr()
            this.$message({
              type: 'success',
              message: '操作成功'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已经取消操作'
            });
            this.taskConfig.radio2 = 1
          });
        }
      }
    }
  }
}
</script>

<style lang="scss" >
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";

.multask {
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
      padding-top: 4px;
      left: 0;
      top: 0;
      cursor: pointer;
      .point{
        width: 4px;
        height: 4px;
        background: $blue;
        position: absolute;
        left: 2px;
        top: 9px;
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
        margin-top: 6px;
        padding-left: 20px;
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
    .mark-wrapper.el-form-item--small {
      .el-form-item__label{
        line-height: 20px;
      }
    }
    .task-config{
      width: 100%;
      background: #F6F6F8;
      border: 1px solid #DCE2EA;
      padding:  0 10px;
      line-height: 38px;
      color: rgba($color: #000000, $alpha: 0.6);
      .demonstration{
        margin-left: 10px;
      }
      .task-config--ex{
        @include classflex(flex-start);
        flex-direction: row;
        .main-top__help{
          margin: 4px 0 0 10px;
        }
        .sele-mark-num{
          width: 70px;
          height: 26px;
          position: relative;
          line-height: 26px;
          .el-input__inner{
            height: 26px;
            line-height: 26px;
            padding-left: 5px;
            padding-right: 25px;
          }
          .mark-num-input{
            width: 70px;
            height: 26px;
            line-height: 26px;
          }

          .right-num{
            position: absolute;
            z-index: 2;
            left: 45px;
            top: 1px;
            height: 26px;
            width: 25px;
            text-align: center;
            .right-num-left{
              position: absolute;
              width: 1px;
              background: $table-border-color;
              height: 20px;
              top: 5px;
            }
            .right-btn-top{
              line-height: 15px;
              color: #B5B5B5;
              font-size: 12px;
              cursor: pointer;
              &:active{
                color: $blue;
              }
            }
            .right-btn-line{
              width: 18px;
              position: absolute;
              top: 14px;
              left: 3px;
              height: 1px;
              z-index: 5;
              background: #DCE2EA;
            }
            .right-btn-bottom{
              line-height: 12px;
              color: #B5B5B5;
              font-size: 12px;
              cursor: pointer;
              &:active{
                color: $blue;
              }
            }
          }
        }
      }
      .el-slider{
        margin-left: 10px;
        width: 160px;
        margin-right: 20px;
      }
      .el-radio{
        margin-right: 10px;
      }
    }
    .mark-num{
      @include classflex(flex-start);
      height: 40px;
      width: 100%;
      position: relative;
      .mark-num-input{
        width: 260px;
        margin-right: 10px;
      }
      .right-num{
        position: absolute;
        z-index: 2;
        left: 235px;
        top: 4px;
        height: 32px;
        width: 25px;
        text-align: center;
        .right-num-left{
          position: absolute;
          width: 1px;
          background: $table-border-color;
          height: 20px;
          top: 7px;
        }
        .right-btn-top{
          line-height: 17px;
          color: #B5B5B5;
          font-size: 12px;
          cursor: pointer;
          &:active{
            color: $blue;
          }
        }
        .right-btn-line{
          width: 18px;
          position: absolute;
          top: 16px;
          left: 3px;
          height: 1px;
          z-index: 5;
          background: #DCE2EA;
        }
        .right-btn-bottom{
          line-height: 16px;
          color: #B5B5B5;
          font-size: 12px;
          cursor: pointer;
          &:active{
            color: $blue;
          }
        }
      }
      img{
        cursor: pointer;
      }
      .mark-num-introduction{
        position: absolute;
        top: 36px;
        width: 100%;
        @include clearfix();
        .modal-dec{
          float: left;
          cursor: pointer;
          margin-right: 10px;
        }
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
      .endtime-right{
        position: relative;
        .span-label{
          width: 80px;
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #606266;
          padding: 0 12px 0 0;
          box-sizing: border-box;
          &::before{
            content: "*";
            color: $red;
          }
        }
        .el-select{
          width: 260px;
          height: 32px;
          .el-input__inner{
            background: #f6f6f8;
            color: #000;
          }
        }
        .algorithm-dec{
          position: absolute;
          left: 80px;
          color: #b7b7b7;
          font-size: 13px;
          line-height: 20px;
          padding-top: 4px;
        }
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
        .modal-dec{
          margin-right: 10px;
        }
        .right-text-limt{
          color: #A5A5A5;
          font-size: 12px;
          position: absolute;
          right: 0;
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
          color: rgba($color: #000000, $alpha: 0.8);
          position: relative;
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

        .right20{
          position: absolute;
          right: 20px;
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
  .main-top__help{
    width: 16px;
    height: 16px;
    background: url('~assets/img/task/help.png') no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .main-top__help--small{
    width: 10px;
    height: 10px;
    background: url('~assets/img/task/smallhelp.png') no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .loadFileInfor{
    position: absolute;
    right: -25px;
    top: 0;
  }
  // 帮助信息
  .helpinfor-warpper{
    @include classflex(flex-start);
    padding-bottom: 10px;
    h4{
      margin-left: 10px;
      font-size: 16px;
      font-weight: normal;
      color: #000000;
    }
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
  .blue-circle{
    @include cricle($blue);
  }
  .subfix{
    cursor: pointer;
  }
  .red{
    color: $red;
  }
  .blue{
    color: $blue;
  }
  .darkblue{
    color: #001A00;
  }
  .el-input-number .el-input__inner{
  text-align: left;
  }
  .el-input-number__decrease{
    display: none;
  }
  .el-input-number__increase{
    display: none;
  }
  .el-slider__button-wrapper:focus{
    outline: none;
  }
  .el-slider__button{
    background: $blue;

    border-color: $white;
  }
  .el-slider__runway.disabled .el-slider__button{
    background: $white;
  }
  .acceptFileType{
    font-size: 12px;
    color:rgba(0, 0, 0, 0.6);
  }
}

</style>
