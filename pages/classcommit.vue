<template>
  <div class='container'>
    <!--标注分类-->
    <div
      class="left-side"
      :class="{hide:hide,showActive:showActive}"
      v-show="show"
    >
      <div
        class="retract"
        @click="hideClick"
      >
        <img src="~assets/img/close.png">
      </div>
      <aside-name :title='proName'></aside-name>
      <aside-infor :num='sampleNum' @taskStand='taskStand' @taskDetail='taskDetail' :isSingle="isSingle"></aside-infor>
      <div class="aside-item aside-tag">
        <!-- 任务名称 -->
        <div class="message">
          <div class="title">任务阶段</div>
          <div class="tag">
            <img
              class="icon"
              src="~/assets/img/task.png"
              alt=""
            >
            <div class="txt">确认标注</div>
          </div>
        </div>
      </div>
      <aside-progress :message="message" :drop='true'></aside-progress>
      <aside-result :list='resultList'></aside-result>
      <model-accuracy :num="model" @showChart='showChart'></model-accuracy>
      <aside-task @task="task" @goDetail="goDetail" :isSingle="isSingle"></aside-task>
    </div>
    <div
      class="little-left-side"
      v-show="!show"
    >
      <div
        class="recovery"
        @click="showClick"
      >
        <img src="~assets/img/open.png">
      </div>
      <div class="title">
        确认标注
      </div>
      <aside-little-progress :message="message"></aside-little-progress>
      <aside-list :list='resultList'></aside-list>
    </div>
    <div class="right-content">
      <div class="right-txt">
        <div class="white-space">
          <div class="textarea clearfix">
            <div class="title">{{item.showId}} {{item.name}}</div>
            <div class="txt-bar">
              <div class="font">
                <img
                  src="~assets/img/font.png"
                  class="fontimg"
                  alt=""
                  @click="showFont"
                >
                <div
                  class="fontList"
                  v-show="showfont"
                >
                  <div
                    class="fontsize"
                    @click="setFont"
                  >12</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >13</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >14</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >16</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >18</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >20</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >24</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >28</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >32</div>
                  <div
                    class="fontsize"
                    @click="setFont"
                  >36</div>
                </div>
              </div>
              <div class="reduct">
                <img
                  src="~assets/img/reduct.png"
                  alt=""
                  @click="resetFont"
                >
              </div>
            </div>
          </div>
          <div
            class="content"
            :style="{fontSize:activeSize}"
            v-html="item.content"
          >
           
          </div>
          <div class="bottom-group clearfix">
            <el-tooltip
              class="item"
              effect="dark"
              content="预测分类"
              placement="top"
            >
              <div
                class="pre-choose"
                v-show="item.preShow"
                @click="tagClass(item.preObj.id,item.preObj)"
              >
                 <div class="name" :title="item.preObj.name">{{item.preObj.name}}</div> 
                   <div class="key" v-show="item.preObj.valu">【 {{item.preObj.valu}} 】</div>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="已选分类"
              placement="top"
            >
              <div
                class="already-choose"
                v-show="already.length"
                @click="tagClass(readyObj.id,readyObj)"
              >
                  <div class="name" :title="readyObj.name">{{readyObj.name}}</div>
                 <div class='key' v-show="readyObj.valu" >【 {{readyObj.valu}} 】</div>
              </div>
            </el-tooltip>

            <div class="type-list clearfix">
              <div
                class="item"
                v-for="(it,index) in item.preList"
                :key="index"
                :title="it.name"
                :style="{color:colorArr[it.valu-1].color,background:colorArr[it.valu-1].background}"
                @click="tagClass(it.id,it)"
                v-show="it.id!=readyObj.id"
              >
               <div class="name" :title="it.name">{{it.name}}</div>
                 <div class='key'>【 {{it.valu}} 】</div>
              </div>
            </div>
            <div
              class="moreList"
              v-show="moreShow"
            >
              <div
                class="icon"
                @click="showMoreList"
              ></div>
              <div class="list">
                <more-choose
                  ref="morelist"
                  :list='item.moreList'
                  @tag="tagClass"
                > </more-choose>
              </div>
            </div>
            <div class="gruop clearfix">
              <el-tooltip class="item" effect="dark" content="上一篇" placement="top-start">
              <div
                class="pre"
                @click="preClick"
              >
                <img
                  src="~assets/img/pre.png"
                  alt=""
                >
              </div></el-tooltip>
               <el-tooltip class="item" effect="dark" content="下一篇" placement="top-start">
              <div
                class="next"
                @click="nextClick"
              >
                <img
                  src="~assets/img/next.png"
                  alt=""
                >
              </div></el-tooltip>
               <el-tooltip class="item" effect="dark" content="丢弃" placement="top-start">
              <div
                class="delete"
                @click="deleteClick"
              >
                <img
                  src="~assets/img/delete.png"
                  alt=""
                >
              </div></el-tooltip>
            </div>
          </div>
        </div>

      </div>
      <bot-com
        ref="bottomlist"
        @setIndex="setIndex"
        @changePage='changeBottom'
        :activeIndex="activeIndex"
        :type="false"
        :list="bottomList"
        :total="total"
        @next='nextPage'
        @pre="prePage"
      ></bot-com>
    </div>
    <more-tip
      ref="tip"
      @sure='endPro'
    ></more-tip>
    <stand-modal ref="stand"  :txt='txt'></stand-modal>
  </div>
</template>
<script>
import asideName from "../components/aside/asideName.vue";
import asideInfor from "../components/classaside/checkInfor.vue";
import moreTip from "../components/classaside/moreTip.vue";
import asideProgress from "../components/classaside/clsProcess.vue";
import asideResult from "../components/aside/asideResult.vue";
import modelAccuracy from "../components/aside/modelAccuracy.vue";
import asideTask from "../components/classaside/classexampTask.vue";
import asideLittleProgress from "../components/littleside/asideProgress.vue";
import asideList from "../components/littleside/asideList.vue";
import littleModel from "../components/littleside/littleModel.vue";
import toolBar from "../components/toolbar/index";
import botCom from "../components/bottom/btmCom.vue";
import moreChoose from "../components/classaside/moreChoose";
import standModal from '../components/standModal'
import { async } from "q";
export default {
  layout: "home",
  components: {
    asideName,
    asideInfor,
    asideProgress,
    asideResult,
    modelAccuracy,
    asideTask,
    asideLittleProgress,
    asideList,
    littleModel,
    toolBar,
    moreTip,
    botCom,
    moreChoose,
    standModal
  },
  computed: {
    readyObj() {
      if (this.already.length) {
        return this.already[0];
      } else {
        return {
          name: "1",
          id: 0
        };
      }
    },
      moreShow(){
      if(this.item.moreList){
        if(this.item.moreList.length==0){
           return false
        }else{
          return true
        }  
      }else{
        return false
      }
    }
  },
   destroyed(){
    document.onkeydown = null;
  },
  mounted() {
     if(this.$route.query.page){
         console.log(this.$route.query.page)
        this.curPagerNo = Number(this.$route.query.page) ;
     
    }
    
    this.initProject();
    
    document.onkeydown = null;
    //键盘事件
    let vm = this;
    document.onkeydown = function(e) {
      let key = e.keyCode;
      let num = String.fromCharCode(key);
      if(vm.targetName!="el-input__inner"){
      console.log(num);
      if (key == 37) {
        vm.preClick();
      }
      if(key==46){
        vm.deleteClick()
      }
      if (key == 13) {
        if(vm.already.length==0){
            if(vm.item.preShow){
              
              vm.tagClass(vm.item.preObj.id,vm.item.preObj)
            }
        }else{  
           vm.nextClick();
        }
      }
      if (key == 39) {
        vm.nextClick();
      }
      
      if (vm.keyObject[num]) {
        vm.tagClass(vm.keyObject[num].id, vm.keyObject[num]);
      }
      }
    };
    document.onclick = function(e) {
      console.log(e.target.className);
       vm.targetName = e.target.className;
      if (e.target.className != "fontimg" && e.target.className != "fontsize") {
        vm.showfont = false;
      }
    };
  },
  data() {
    return {
      show: true,
      hide: false,
      showActive: false,
      str:
        "空间的十分开机速度快付款几点睡，阿斗积分时间，防守打法艾尔，第三方桑撒的，是打发顺风玩的，撒旦法三国杀的飞洒，撒地方阿士大夫撒旦法师，撒地方萨嘎，师大环境法律框架阿萨德了开机费卢卡斯。撒旦个沙发上阿斯顿发生，阿斯蒂芬噶水电费啥打法是否，勾搭法尔范第三方。",
      colorArr: [
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#22894B", background: "#DFEEE7" },
        { color: "#086B91", background: "#DBEFF7" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
         { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#22894B", background: "#DFEEE7" },
        { color: "#086B91", background: "#DBEFF7" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
         { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#22894B", background: "#DFEEE7" },
        { color: "#086B91", background: "#DBEFF7" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" }
      ],
      classArr: [],
      list: [],
      activeType: "",
      // 项目接受的参数
      proid: 4195,
      stage: "示例标注",
      bottomList: [],
      total: 0,
      activeIndex: 0,
      item: {
        preShow: false,
        preObj: {
          name: "",
          id: 0
        },
        preList: [{ valu: 1 }],
        moreList: []
      },
      proName: "",
      message: {
        finish: { count: 1, rate: "50%" },
        notfinish: { count: 1, rate: "50%" },
        total: { count: 1, rate: "50%" },
        drop: { count: 1, rate: "50%" }
      },
      showfont: false,
      activeSize: "16px",
      resultList: [],
      tagList: [],
      moreTagList: [],
      keyObject: {},
      curPagerNo: 1,
      already: [],
      sampleNum:0,
      pre: {
        show: false,
        id: 0,
        obj: {
          name: "",
          valu: ""
        }
      },
      model:0,
      txt:"",
      isSingle:1,
      totalPageNumber:0,
      targetName:"",
      standLink:"",
      showStandardName:""
    };
  },
  methods: {
    taskStand(){
       if(this.standLink){
          //this.$axios.$get("/pro/downloadStandardAccessory?standardFile="+'1558092051232.txt')
          window.location.href =  this.$store.state.domain + "/pro/downloadStandardAccessory?standardFile="+this.standLink+"&showStandardFile="+this.showStandardName
        }else{
          this.$refs.stand.show()
        }
    },
      //模型准确度
    async initModel(){
        let {data} = await this.$axios.$post("/census/getLabelAccuracy",{
            proId:this.$route.query.proId,
            labelType:2
        })
        this.model = data;
    },
     goDetail(){
        this.$router.push({path:'classcheckresult',query:{status:1,proId:this.$route.query.proId}})
    },
    nextPage() {
      this.$refs.morelist.hide();
    
      if(this.curPagerNo >=this.totalPageNumber){
         this.$message({
            message: "已经是最后一页了",
            type: "warning"
          });
          this.initBottom()
      }else{
          this.curPagerNo++;
          this.$router.push({path:`/classcommit?page=${this.curPagerNo}`+"&proId="+this.$route.query.proId})
          this.initBottom();
      }
    
    },
    prePage() {
      this.$refs.morelist.hide();
      if (this.curPagerNo != 1) {
        this.curPagerNo--;
        this.$router.push({path:`/classcommit?page=${this.curPagerNo}`+"&proId="+this.$route.query.proId})
        this.initBottom();
       
      } else {
        this.$message({
          message: "已经是第一页了",
          type: "warning"
        });
      }
    },
    taskDetail(){
             if(this.isSingle){
                  let {href} = this.$router.resolve({
                      path:"/singletaskdetail",
                       query:{proId:this.$route.query.proId,back:"none"}
                  })
                  window.open(href,"_blank")
              }else{
                   let {href} =  this.$router.resolve({
                         path:"/multaskdetail",
                        query:{proId:this.$route.query.proId,back:"none"}
                  })
                  window.open(href,"_blank")
              }
          },
    hideClick() {
      if (this.show) {
        
          this.show = false;
          this.hide = false;
       
      }
    },
    goDetail(){
        this.$router.push({path:'classcheckresult',query:{status:1,proId:this.$route.query.proId}})
    },
    showChart(){
        this.initModel()
    },
    changeBottom(page) {
      this.curPagerNo = page;
       this.$router.push({path:`/classcommit?page=${this.curPagerNo}`+"&proId="+this.$route.query.proId})
      this.initBottom();
    },
    resetFont() {
      this.activeSize = "16px";
    },
    setFont(e) {
      this.activeSize = e.target.innerHTML + "px";
      this.showfont = false;
    },
    setIndex(index) {
      this.activeIndex = index;
      this.item = this.bottomList[this.activeIndex];
      this.item.content = this.item.content.replace(/\/n/ig,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;")
       this.item.name = this.item.name.replace(/\/n|\/t/ig,"")
      this.already = this.bottomList[this.activeIndex].already;
      this.$refs.morelist.hide();
    },

    showClick() {
      if (!this.show) {
        this.showActive = true;
        this.show = true;
      }
    },
    async initBottom() {
      let { msg, code, data } = await this.$axios.$post(
        "label/getConfirmListByProId",
        {
          curPagerNo: this.curPagerNo,
          pageSize: 10,
          proId: this.$route.query.proId
        }
      );
       this.totalPageNumber = data.totalPageNumber;
       this.activeIndex = 0
      if (code == 4003) {
        this.$message({
          message: msg,
          type: "warning"
        });
       
        
      } else if (code == 0) {
        this.bottomList = data.list;
        for (let i in this.bottomList) {
          this.bottomList[i].already = [];
          if (this.bottomList[i].drop != 0) {
            this.bottomList[i].color = "#97183E";
            let arr = this.copy(this.tagList);
            this.bottomList[i].preList = arr.slice(0, 6);
            this.bottomList[i].preObj = {
                  name: "",
                  id: 0
            };
          } else {
            this.bottomList[i].preObj = {
                    name: "",
                    id: 0
                  };
            if (this.bottomList[i].status == 1) {
              for (let j in this.tagList) {
                if (this.tagList[j].id == this.bottomList[i].trueCate) {
                  this.bottomList[i].already.push(this.tagList[j])
                   this.bottomList[i].color = "#346739";
                   let arr = this.copy(this.tagList);
                  arr.splice(j, 1);
                  this.bottomList[i].preList = arr.slice(0, 3);
                  this.bottomList[i].moreList = arr.slice(3, arr.length);
                }
              }
            } else if (this.bottomList[i].status == -1) { 
              if (this.bottomList[i].preCate) {
                for (let j in this.tagList) {
                  if (this.tagList[j].id == this.bottomList[i].preCate) {
                    this.bottomList[i].preShow = true;
                    this.bottomList[i].preObj = this.copy(this.tagList[j]);
                    
                    let arr = this.copy(this.tagList);
                    console.log(arr);
                    arr.splice(j, 1);
                    this.bottomList[i].preList = arr.slice(0, 3);
                    this.bottomList[i].moreList = arr.slice(3, arr.length);
                  }
                }
              } else {
                let arr = this.copy(this.tagList);
                this.bottomList[i].preList = arr.slice(0, 6);
                this.bottomList[i].moreList = arr.slice(6, arr.length);
              }
            }
          }
        }
        this.item = this.bottomList[this.activeIndex];
        this.item.content = this.item.content.replace(/\/n/ig,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;")
         this.item.name = this.item.name.replace(/\/n|\/t/ig,"")
        this.already = this.bottomList[this.activeIndex].already;
        this.total = data.rowsCount;
        this.$refs.bottomlist.currentPage = this.curPagerNo;

      }
      if(this.$route.query.id){
        for(let i in this.bottomList){
          if(this.bottomList[i].id==this.$route.query.id){
            this.activeIndex = i;
            this.item = this.bottomList[i];
            this.already = this.bottomList[this.activeIndex].already;
          }
        }
      }
    },
    showMoreList() {
      this.$refs.morelist.show();
    },
    copy(arr) {
      return JSON.parse(JSON.stringify(arr));
    },
    async initProject() {
      let { data } = await this.$axios.$post("/labelpro/getProjectDetailById", {
        proId: this.$route.query.proId,
        status:1
      });
        this.proName = data.proName;
        this.sampleNum = data.sampleNum;
        this.txt = data.standard;
         this.showStandardName = data.showStandardName;
         this.standLink = data.standardFile;
         this.isSingle = data.isSingle;
        this.initModel();
        this.initMessage();
        this.initTypeList();
        this.initTagList();
        this.initBottom();
    },
    async initMessage() {
      let { data } = await this.$axios.$post("/census/getLabelRate", {
        proId: this.$route.query.proId
      });
      let obj = {};
      for (let i in data) {
        obj[data[i].name] = { count: data[i].count, rate: data[i].rate };
      }
      this.message = obj;
    },
    //侧边栏
    async initTypeList() {
      let { data } = await this.$axios.$post("/census/getEntityAndCateCensus", {
        proId: this.$route.query.proId,
        userId: this.$getCookie("userId"),
        status: 1
      });
      this.resultList = data;
    },
    showFont() {
      if (!this.showfont) {
        this.showfont = true;
      }
    },
    async initTagList() {
      let { data } = await this.$axios.$post("/label/getTypeValueByProId", {
        proId: this.$route.query.proId
      });
      for (let i in data) {
        this.keyObject[data[i].valu] = data[i];
      }
      if (data.length > 6) {
        this.tagList = data;

        for (let i in this.tagList) {
          if (i > this.colorArr.length) {
          } else {
            this.tagList[i].color = this.colorArr[i].color;
            this.tagList[i].background = this.colorArr[i].background;
          }
        }
      } else {
        this.tagList = data;
        for (let i in this.tagList) {
          if (i > this.colorArr.length) {
          } else {
            this.tagList[i].color = this.colorArr[i].color;
            this.tagList[i].background = this.colorArr[i].background;
          }
        }
      }
    },
    async tagClass(truecate, obj) {
      let { code, msg } = await this.$axios.$post(
        "/label/doLabelNotExampleOperation",
        {
          proId: this.$route.query.proId,
          dataId: this.bottomList[this.activeIndex].id,
          trueCate: truecate
        }
      );
      if (code == 0) {
        this.bottomList[this.activeIndex].color = "#346739";
        this.bottomList[this.activeIndex].already = [];
        this.bottomList[this.activeIndex].already.push(obj);
        this.bottomList[this.activeIndex].preShow = false;
        for (let i in this.tagList) {
          if (obj.id == this.tagList[i].id) {
            let arr = this.copy(this.tagList);
            arr.splice(i, 1);
            this.bottomList[this.activeIndex].preList = arr.slice(0, 3);
            this.bottomList[this.activeIndex].moreList = arr.slice(
              3,
              this.tagList.length - 1
            );
          }
        }
        this.nextClick();
        this.initMessage();
        this.initTypeList();
        this.initModel();
      } else if (code == 9998) {
        this.$message({
          message: msg,
          type: "warning"
        });
      }
    },
    async endPro() {
      let { code } = await this.$axios.$post("/label/updateProjectStautaById", {
        proId:this.$route.query.proId,
        status: 3
      });
    },
    preClick() {
      this.$refs.morelist.hide();
      if (this.activeIndex == 0) {
        if (this.curPagerNo != 1) {
          this.curPagerNo--;
          this.$router.push({path:`/classcommit?page=${this.curPagerNo}`+"&proId="+this.$route.query.proId})
          this.activeIndex = 9;

          this.initBottom();
          this.$refs.bottomlist.currentPage = this.curPagerNo;
        } else {
          this.$message({
            message: "已经是第一页了",
            type: "warning"
          });
        }
      } else {
        this.activeIndex--;
        this.item = this.bottomList[this.activeIndex];
        this.item.content = this.item.content.replace(/\/n/ig,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;")
         this.item.name = this.item.name.replace(/\/n|\/t/ig,"")
        this.already = this.bottomList[this.activeIndex].already;
      }
    },
    nextClick() {
      this.$refs.morelist.hide();
      if (this.activeIndex >= this.bottomList.length - 1) {
        if(this.curPagerNo>=this.totalPageNumber){
           this.$message({
            message: "已经是最后一页了",
            type: "warning"
          });
          this.initBottom();
        }else{
           this.curPagerNo++;
          this.$router.push({path:`/classcommit?page=${this.curPagerNo}`+"&proId="+this.$route.query.proId})
          this.$refs.bottomlist.currentPage = this.curPagerNo;
          this.activeIndex = 0;
          this.initBottom();
        }
      } else {
        this.activeIndex++;
        this.item = this.bottomList[this.activeIndex];
        this.item.content = this.item.content.replace(/\/n/ig,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;")
         this.item.name = this.item.name.replace(/\/n|\/t/ig,"")
        this.already = this.bottomList[this.activeIndex].already;
      }
    },
    async deleteClick() {
      let { code } = await this.$axios.$post("/label/dropOperation", {
        dataId: this.item.id,
        proId: this.$route.query.proId
      });
      if (code == 0) {
        this.bottomList[this.activeIndex].color = "#97183E";
        this.$refs.bottomlist.$forceUpdate();
        this.initMessage();
        this.initTypeList();
        this.nextClick();
      } else if (code == 4005) {
        this.$refs.tip.show();
      }
    },
    //提交任务
    async task() {
      let { code, msg } =await this.$axios.$post("label/commitConfirmDataByProId", {
        proId: this.$route.query.proId,
       
      });
      if (code == 0) {
           this.$message({
            message: msg,
            type: "success"
          });
          setTimeout(()=>{
              this.$router.push({path:"/"})
          },1000)
      } else{
        this.$message({
            message: msg,
            type: "warning"
          });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.aside-tag {
  height: 91px;
  box-sizing: border-box;
  padding: 17px 16px 16px 26px;
  border-bottom: 1px solid #1D1E1F;

  .tag {
    .icon {
      float: left;
      width: 16px;
      height: 16px;
      margin-top: 2px;
      margin-right: 8px;
    }

    .txt {
      float: left;
      font-size: 14px;
      color: #FFFFFF;
    }
  }
}

.message .title {
  font-size: 16px;
  color: #8794AA;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.message p {
  font-size: 14px;
  color: #D6DCE0;
}

@keyframes hideline {
  from {
    left: 0;
    width 273px
  }

  to {
    left: -200px;
    width 76px
  }
}

@keyframes showline {
  from {
    left: -200px;
    width 76px
  }

  to {
    width 273px
    left: 0;
  }
}

.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.left-side {
  width: 273px;
  height: 100%;
  overflow: auto;
  background: #313440;
  position: relative;
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hide {
 
}

.showActive {
 
}

.little-left-side {
  width: 76px;
  height: 100%;
  box-sizing: border-box;
  padding-left: 6px;
  padding-right: 6px;
  overflow: auto;
  background: #313440;
  position: relative;

  .title {
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #1D1E1F;
    ont-size: 14px;
    color: #8794aa;
  }
}

.right-txt {
  width: 100%;
  flex: 1;
  overflow: hidden;
}

.retract {
  position: absolute;
  right: 0;
  cursor: pointer;
  top: 236px;
}

.retract img {
  width: 14px;
  height: 41px;
}

.recovery {
  position: absolute;
  right: 0;
  cursor: pointer;
  top: 236px;
}

.recovery img {
  width: 14px;
  height: 41px;
}

.right-txt {
  padding: 12px 26px 16px 10px;
  background: #262832;
  box-sizing: border-box;

  .white-space {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;

    .textarea {
      padding-left: 30px;
      padding-right: 16px;
      box-sizing: border-box;
      border-bottom: 1px solid #E0E6ED;

      .title {
        float: left;
        font-weight:600;
        font-size: 17px;
        color: rgba(0,0,0,0.9);
        margin-top: 12px;
        font-wight 600
      }

      .txt-bar {
        float: right;

        .font {
          float: left;
          cursor: pointer;
          position: relative;

          img {
            width: 24px;
            height: 24px;
            margin-top: 12px;
            margin-right: 12px;
          }

          .fontList {
            position: absolute;
            left: -12px;
            z-index 1000
            background: #FAFAFA;
            margin-top: 2px;
            box-shadow: 0 1px 2px 0 rgba(49, 71, 103, 0.5);

            .fontsize {
              width: 58px;
              text-align: center;
              height: 22px;
              line-height: 22px;
            }

            .fontsize:hover {
              background: #E7F0FF;
            }
          }
        }

        .reduct {
          float: left;
          cursor: pointer;

          img {
            width: 24px;
            height: 24px;
            margin-top: 12px;
            margin-right: 12px;
          }
        }
      }
    }
  }
}

.content {
  padding: 16px;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 0.6px;
  text-align: justify;
  
  flex: 1;
  overflow: auto;
}

.bottom-group {
  min-height: 58px;
  background: rgba(195, 215, 232, 0.18);

  .already-choose {
    float: left;
    width: 138px;
    color: white;
    cursor pointer
    height: 32px;
    line-height: 32px;
    margin-right: 102px;
    background: #3888ff;
    text-align: center;
    margin-left: 16px;
    margin-top: 13px;
    .name{
      float left
      width 80px
      overflow hidden
      text-overflow  ellipsis
      white-space nowrap
    }
    .key{
      float left
      width 56px
      text-align left
    }
  }

  .pre-choose {
    float: left;
    width: 138px;
    color: white;
    height: 32px;
    cursor pointer
    line-height: 32px;
    margin-right: 102px;
    background: #3888ff;
    text-align: center;
    margin-left: 16px;
    margin-top: 13px;
    .name{
      float left
      width 80px
      overflow hidden
      text-overflow  ellipsis
      white-space nowrap
    }
    .key{
      float left
      width 56px
      text-align left
    }
  }

  .type-list {
    float: left;
    margin-top: 13px;

    .item {
      cursor: pointer;
      float: left;
      width: 138px;
      height: 32px;
      margin-left: 20px;
      line-height: 32px;
      text-align: center;
      .name{
        float left
        width 80px
        overflow hidden
        text-overflow  ellipsis
        white-space nowrap
      }
      .key{
        float left
        width 56px
        text-align left
      }
    }
  }

  .moreList {
    float: left;
    margin-top: 24px;
    margin-left: 16px;
    cursor: pointer;

    .icon {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 10px solid #79838E;
      border-radius: 2px;
    }

    .list {
      position: relative;
    }
  }

  .gruop {
    float: right;
    
    .pre {
      cursor: pointer;
      float: left;
      width: 60px;
      height: 36px;
      margin-top: 12px;
      text-align: center;
      background: #626C76;
      border-radius: 2px;
      border-radius: 2px;

      img {
        width: 25px;
        height: 25px;
        margin-top: 6px;
      }
    }

    .next {
      cursor: pointer;
      float: left;
      width: 60px;
      height: 36px;
      margin-left: 16px;
      margin-top: 12px;
      text-align: center;
      background: #626C76;
      border-radius: 2px;
      border-radius: 2px;

      img {
        width: 25px;
        height: 25px;
        margin-top: 6px;
      }
    }

    .yes {
      cursor: pointer;
      float: left;
      width: 60px;
      height: 36px;
      margin-left: 34px;
      margin-top: 12px;
      text-align: center;
      background: #10B66F;
      border-radius: 2px;
      border-radius: 2px;

      img {
        width: 25px;
        height: 25px;
        margin-top: 6px;
      }
    }

    .delete {
      cursor: pointer;
      float: left;
      width: 60px;
      height: 36px;
      margin-left: 16px;
      margin-top: 12px;
      margin-right: 30px;
      text-align: center;
      background: #D12B2B;
      border-radius: 2px;
      border-radius: 2px;

      img {
        width: 25px;
        height: 25px;
        margin-top: 6px;
      }
    }
  }
}
</style>
