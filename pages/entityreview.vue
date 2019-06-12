<template>
    <div class='container'>
        <!--标注实体-->
        <div class="left-side" :class="{hide:hide,showActive:showActive}" v-show="show">
           
            <aside-name :title='proName'></aside-name>
            <div class="aside-item aside-name">
                <!-- 任务名称 -->
                
                <div class="message">
                <div class="title" style="margin-bottom:10px;">标注人员</div>
                <p>{{name}}</p>
                </div>
            </div>
            <div class="aside-item aside-tag" v-show="!isSingle">
                <!-- 任务名称 -->
                <div class="message">
                 <div class="title">任务阶段</div>
                <div class="tag">
                    <img
                    class="icon"
                    src="~/assets/img/task.png"
                    alt=""
                    >
                    <div class="txt">{{stageName}}</div>
                </div>
                </div>
            </div>
            <aside-progress :message="message"></aside-progress>
            <aside-result :list='resultList'></aside-result>
              <model-accuracy :num="model"  @showChart='showChart'></model-accuracy>
         
        </div>
        <div class="little-left-side" v-show="!show">
            <div class="recovery" @click="showClick">
                 <img src="~assets/img/open.png">
            </div>
            <div class="title">
                任务标注
            </div>
            <aside-little-progress :message="message"></aside-little-progress>
            <aside-list></aside-list>
            <little-model :num="model"></little-model>
        </div>
        <div class="right-content">
            <div class="right-txt">
                <div class="white-space">
                    <div class="textarea clearfix">
                        <div class="title clearfix">
                            <div style="float:left;margin-right:16px;font-size: 17px;">{{item.showId}}</div>      
                            <div style="float:left;margin-right:16px;font-size: 17px;color: rgba(0,0,0,0.9);font-weight:600;">{{item.name}}</div>  
                            </div>
                        <div class="txt-bar">
                            <div class="font">
                                <img src="~assets/img/font.png" alt=""  class="fontimg"  @click="showFont">
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
                                <img src="~assets/img/reduct.png" alt="" @click="resetFont">
                            </div>
                        </div>
                    </div>
                    <div class="content"  >
                        <span class="span" v-for="(item,index) in dataArr"   :key="index" :style="{background:item.background,color:item.color,fontSize:activeSize}" :class="{addClass:item.typeList.length}">
                            {{item.value}}
                            <div  v-for="(it,i) in item.typeList" :key="i" class="typeName" :style="{background:it.background}">{{it.type}}
                              
                                <div class="tri"  :style="{borderRightColor:it.background}"></div>
                            </div>
                        </span>
                    </div>
                    <div class="bottom-group clearfix">
                        <div class="gruop clearfix">
                            <div class="pre">
                                <img src="~assets/img/pre.png" alt="" @click="preClick">
                            </div>
                            <div class="next" style="margin-right:20px">
                                <img src="~assets/img/next.png" alt="" @click="nextClick">
                            </div>
                           
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
              <more-tip
            ref="tip"
            @sure='endPro'
            ></more-tip>
            <diction-model :list="classArr" ref="diction" @change="changSelect" @search="search" :preList='preList' @deleteName='deleteName'></diction-model>
        </div>
        <stand-modal ref="stand"  :txt='txt'></stand-modal>
  
    </div>
</template>
<script>
import asideName from '../components/aside/asideName.vue'
import asideInfor from '../components/entityaside/taskAside.vue'
import asideProgress from '../components/classaside/clsProcess.vue'
import asideResult from '../components/aside/asideResult.vue'
import modelAccuracy from '../components/aside/modelAccuracy.vue'
import asideTask from '../components/classaside/classexampTask.vue'
import asideLittleProgress from '../components/littleside/asideProgress.vue'
import asideList from '../components/littleside/asideList.vue'
import littleModel from '../components/littleside/littleModel.vue'
import toolBar from '../components/toolbar/index'
import botCom from '../components/bottom/btmCom.vue'
import moreTip from "../components/classaside/moreTip.vue";
import dictionModel from '../components/toolbar/dictionModel'
import { async } from 'q';
import standModal from '../components/standModal'
import lineChart from '../components/aside/lineChart'
export default {
      layout: 'home',
      components:{
          asideName,
          asideInfor,
          asideProgress,
          asideResult,
          modelAccuracy,
          lineChart,
          asideTask,
          asideLittleProgress,
          asideList,
          littleModel,
          toolBar,
          botCom,
          moreTip,
          dictionModel,
          standModal
      },
       mounted() {
           if(this.$route.query.page){
                this.curPagerNo = Number(this.$route.query.page)
            }
            this.initProject(); 
            for(let i in this.str){
                let obj = {};
                obj.value = this.str[i];
                obj.background = 'white';
                obj.color = 'black';
                obj.typeList = [];
                this.dataArr.push(obj)
            }
            
            let vm = this;
            document.onclick = function(e) {
                console.log(e.target.className);
                if (e.target.className != "fontimg" && e.target.className != "fontsize") {
                    vm.showfont = false;
                }
            };
             document.onkeydown = function(e) {
                let key = e.keyCode;
                let num = String.fromCharCode(key);
               
                if (key == 37) {
                    vm.preClick();
                }
                if (key == 39) {
                    vm.nextClick();
                }
                if (key == 46) {
                    vm.deleteClick();
                }
                if (key == 13) {
                    if(!vm.$refs.diction.state){
                        vm.submit();
                    }
                    
                }
            };
        },
       watch:{
           activeIndex(newValue,oldValue){
                this.str = this.bottomList[newValue].content;
                this.item = this.bottomList[newValue];
                 this.item.name = this.item.name.replace(/\/n|\/t/ig,"")
                if(this.item.already){
                    this.backContent();
                }else{
                     this.initContent();
                    if(this.item.htmlContent&&this.item.drop!=1){
                        this.dataArr = JSON.parse(this.item.htmlContent)
                    }
                }

           }
       }, 
      data (){
          return {
                show:true,
                hide:false,
                showActive:false,
                str:'空间的十分开机速度快付款几点睡，阿斗积分时间，防守打法艾尔，第三方桑撒的，是打发顺风玩的，撒旦法三国杀的飞洒，撒地方阿士大夫撒旦法师，撒地方萨嘎，师大环境法律框架阿萨德了开机费卢卡斯。撒旦个沙发上阿斯顿发生，阿斯蒂芬噶水电费啥打法是否，勾搭法尔范第三方。',
                start:false,
                dataArr:[],
                index:0,
                activeColor:"#ccc",
                colorArr:[{color:'#2873EE',background:'#E6F0FF'},{color: '#22894B',background: 'rgba(108,176,143,0.22)'},{color: '#D12B2B',background: '#FFF3F3'},{color: '#AC3796',background: '#FDF6FB'},{color: '#525DD7',background: 'rgba(158,161,255,0.22)'}],
                classArr:[],
                list:[],
                startIndex:0,
                endIndex:0,
                activeType:"",
                activeSize: "16px",
                showfont: false,
                timer:null,
                allReplace:true,
                selection:"",
                ingore:true,
                stageName:"",
                // 项目接受的参数
                proid:4195,
                autoPre:true,
                stage:"预标注",
                message: {
                    finish: { count: 1, rate: "50%" },
                    notfinish: { count: 1, rate: "50%" },
                    total: { count: 1, rate: "50%" },
                    drop: { count: 1, rate: "50%" }
                },
                activeIndex:0,
                curPagerNo:1,
                bottomList:[],
                total:10,
                item:{
                    id:0,
                    name:""
                },
                proName:"",
                resultList:[],
                typeMap:{},
                preList:[{wordName:"",id:1}],
                txt:"",
                model:0,
                chartState:false,
                position:{
                    left:200,
                    top:200
                },
                isSingle:1,
                name:"",
                showStandardName:""
          }
      },
      methods:{
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
        async initName() {
            let {data} = await this.$axios.$post('/labelpro/getUserName',{
                userId:this.$route.query.userId
            }) 
            this.name =  data;
        },
          showChart(e){
             this.initModel()
          },
          hideChart(){
              //  this.chartState = false
          },
           taskStand(){
                this.$refs.stand.show()
            },
          async submit(){
               if(this.getTag()=="{}"){
                  this.$message({
                        message: "请标注数据!",
                        type: "warning"
                 });
                 return 
              }
              let { code,msg } = await this.$axios.$post("/label/doLabelNotExampleOperation", {
                    proId: this.$route.query.proId,
                    dataId:this.item.id,
                    labelContent:this.getTag(),
                    htmlContent:JSON.stringify(this.dataArr)
                });
                if(code==0){
                    this.bottomList[this.activeIndex].already = JSON.stringify(this.dataArr);
                    this.bottomList[this.activeIndex].color = "#346739";
                    this.$refs.bottomlist.$forceUpdate();
                    this.nextClick();
                    this.initMessage();
                    this.initTypeList();
                   
                }else{
                     this.$message({
                    message: msg,
                    type: "warning"
                });
                }
                
          },
          goExamp(){
              this.$router.push({path:"entityexampview",query:{proId:this.$route.query.proId}})
          },
         async dictionClick(){
              let {data} =  await this.$axios.$post("/dict/getDictList",{
                  proId:this.$route.query.proId,
                  typeId:this.classArr[0].id,
                  curPagerNo:1,
                  pageSize:100
              })
                this.preList = data.list;
              this.$refs.diction.show()
          },
         async deleteName(id){
             let {code} = await this.$axios.$post("/dict/delDict",{
                 id:id
             });
             this.changSelect()
         },
          backContent(){
              this.dataArr = [];
              let labelContent = this.item.already;
              this.dataArr = JSON.parse(labelContent);
              
          },
         async changSelect(){
               let {data} =  await this.$axios.$post("/dict/getDictList",{
                  proId:this.$route.query.proId,
                  typeId:this.$refs.diction.value,
                  curPagerNo:1,
                  pageSize:100
              })
                this.preList = data.list;
          },
            goDetail(){
                this.$router.push({path:'entityresultview',query:{status:0,proId:this.$route.query.proId}})
            },
          async search(){
              if(this.$refs.diction.searchValue==""){
                  return
              }
              let {data} = await this.$axios.$post("/dict/getHaveDictOrNot",{
                  proId:this.$route.query.proId,
                  typeId:this.$refs.diction.value,
                  wordName:this.$refs.diction.searchValue.replace(/\s/ig,"")
              })
              if(data>0){
                this.$message({
                    message: "名字已存在",
                    type: "warning"
                });
              }else{
                  if(this.$refs.diction.searchValue){
                    let {data} = await this.$axios.$post("/dict/addDict",{
                        proId:this.$route.query.proId,
                        typeId:this.$refs.diction.value,
                        wordName:this.$refs.diction.searchValue
                    })
                    this.changSelect()
                  }
                 
              }
          },
            async deleteClick() {
                let { code } = await this.$axios.$post("/label/dropOperation", {
                    dataId: this.item.id,
                    proId: this.$route.query.proId
                });
                if (code == 0) {
                    this.bottomList[this.activeIndex].color = "#97183E";
                    this.bottomList[this.activeIndex].already = false;
                    this.initMessage();
                    this.initTypeList();
                    this.nextClick();

                } else if (code == 4005) {
                    this.$refs.tip.show();
                }
            },
                        //模型准确度
            async initModel(){
                let {data} = await this.$axios.$post("/census/getLabelAccuracy",{
                    proId:this.$route.query.proId,
                    labelType:1
                })
                this.model = data;
            },
            async auto(){
                 let { data } = await this.$axios.$post("/dict/getDictListContantAll", {
                    proId: this.$route.query.proId,
                  
                });
                let list =  data;
                let obj = {};
                for(let i in this.classArr){
                    if(i>=this.colorArr.length){
                        if(!obj[this.classArr[i].id]){
                        obj[this.classArr[i].id] = {
                            name:this.classArr[i].name,
                            cateCode:this.classArr[i].cateCode,
                            color:this.colorArr[0].color
                        }
                     }
                    }else{
                         if(!obj[this.classArr[i].id]){
                        obj[this.classArr[i].id] = {
                            name:this.classArr[i].name,
                            cateCode:this.classArr[i].cateCode,
                            color:this.colorArr[i].color
                        }
                     }
                    }  
                }
                
                let ner = this.bottomList[this.activeIndex].nerLabel;
                ner = JSON.parse(ner);
                let nerObj = {};

                for(let key in ner){
                    let arr = [];
                   arr =  ner[key].split("_");
                    nerObj[key] = {
                           type:"",
                           arr:[]
                       }
                   for(let j in arr){
                      nerObj[key].type = arr[j].split("#")[1];
                      nerObj[key].arr.push(arr[j].split("#")[0]);
                   }
                }
                if(ner){
                     for(let key in nerObj){
                        if(!this.bottomList[this.activeIndex].htmlContent){
                            for(let i in nerObj[key].arr){
                                for(let k in obj){
                                    if(obj[k].cateCode ==nerObj[key].type ){
                                        this.activeType = obj[k].name;
                                        this.activeColor = obj[k].color;
                                    }
                                }
                                let start = nerObj[key].arr[i].split(",")[0].replace(/\(|\)/ig,"");
                                let end = nerObj[key].arr[i].split(",")[1].replace(/\)|\(/ig,"");
                                if(this.first(start,end,this.dataArr)){
                                    this.changeColor(start,end)
                                }else{
                                    this.changeBack(start,end)
                                }
                            }
                            
                        }
                    }
                }
                let active = this.activeType;
                let color  = this.activeColor;
                for(let i in list){
                    if(obj[list[i].typeId]){
                        if(!this.bottomList[this.activeIndex].htmlContent){
                            this.activeType = obj[list[i].typeId].name;
                            this.activeColor = obj[list[i].typeId].color;
                            this.changeStr(list[i].wordName)
                        }
                        
                    }
                }
                this.activeType = active;
                this.activeColor = color;
                console.log(data)
            },
            //提交任务
            async task() {
                let { code, msg } =await this.$axios.$post("/label/updateUserProjectStautaByProIdAndUserId", {
                    proId: this.$route.query.proId,
                    userId:this.$getCookie("userId"),
                    status:6
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
            },
          //侧边栏
          async initProject() {
                let { code,data } = await this.$axios.$post("/labelpro/getProjectDetailPage", {
                    proId: this.$route.query.proId,
                    status:this.$route.query.status
                });
                if(code!=0){
                    this.$router.push({path:"/404"})
                }else{
                    this.proName = data.proName;
                    this.txt = data.standard;
                     this.showStandardName = data.showStandardName;
                    this.isSingle = data.isSingle;
                    if(this.$route.query.status==-2){
                         if(data.haveExam==1&&data.haveCheck==1){
                        this.stageName = '示例标注+考核答案'
                        }else if(data.haveExam==1&&data.haveCheck==0){
                        this.stageName = '示例标注'
                        }else if(data.haveExam==0&&data.haveCheck==1) {
                        this.stageName = '考核答案'
                        }else{
                        this.stageName = '示例标注'
                        }
                    }else if(this.$route.query.status==-1){
                    this.stageName = '考核标注'
                    }else if(this.$route.query.status==0){
                    this.stageName = '任务标注'
                    }
                    this.initMessage();
                    this.initTypeList();
                    this.initClass();
                    this.initName();
                    this.initBottom();
                     this.initModel();
                }
                },
            async initMessage() {
                let { data } = await this.$axios.$post("/census/getLabelRate", {
                    proId: this.$route.query.proId,
                    userId:this.$route.query.userId
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
                    userId: this.$route.query.userId,
                    status: this.$route.query.status
                });
                this.resultList = data;
            },
            async endPro() {
                let { code } = await this.$axios.$post("/label/updateProjectStautaById", {
                    proId: this.$route.query.proId,
                    status: 3
                });
            },
          //下一页
            nextPage() {
                 if(this.curPagerNo>=this.totalPageNumber){
                        this.$message({
                        message: "已经是最后一页了",
                        type: "warning"
                        });
                    }else{
                        this.curPagerNo++;
                        this.initBottom();
                    }
            },
            prePage() {
                if (this.curPagerNo != 1) {
                    this.curPagerNo--;
                    this.initBottom();
                } else {
                    this.$message({
                    message: "已经是第一页了",
                    type: "warning"
                    });
                }
            },
            resetFont() {
                this.activeSize = "16px";
            },
            setFont(e) {
            this.activeSize = e.target.innerHTML + "px";
            this.showfont = false;
            },
            preClick() {
            if (this.activeIndex == 0) {
                if (this.curPagerNo != 1) {
                this.curPagerNo--;
                this.$refs.bottomlist.currentPage = this.curPagerNo;
                this.activeIndex = 9;
                this.initBottom();
                } else {
                this.$message({
                    message: "已经是第一页了",
                    type: "warning"
                });
                }
            } else {
                this.activeIndex--;
            }
            },
            nextClick() {
                if (this.activeIndex >= this.bottomList.length - 1) {
                    if(this.bottomList.length<10){
                        this.$message({
                            message: "已经是最后一条了",
                            type: "warning"
                        });
                    }else{
                        if(this.curPagerNo>=this.totalPageNumber){
                            this.$message({
                            message: "已经是最后一页了",
                            type: "warning"
                            });
                        }else{
                            this.curPagerNo++;
                            this.initBottom();
                             this.activeIndex = 0;
                        }
                    }
                } else {
                    this.activeIndex++;
                }
            },
            showFont() {
                if (!this.showfont) {
                    this.showfont = true;
                }
            }, 
          //特殊字符
          changSpecial(){
              this.ingore = this.$refs.toolbar.speacilWord;
          },
          //初始化所有标签
            initContent(){
                this.dataArr = [];
                 for(let i in this.str){
                    let obj = {};
                    obj.value = this.str[i];
                    obj.background = 'white';
                    obj.color = 'black';
                    obj.typeList = [];
                    this.dataArr.push(obj)
                }
                if(this.autoPre){
                    if(!this.bottomList[this.activeIndex].htmlContent){
                        this.auto()
                    }   
                }
            },
          //全文匹配
          changReplace(){
              this.allReplace = this.$refs.toolbar.replaceAll;
          },
          //自动预测
          autoChange(){
              this.autoPre = this.$refs.toolbar.autoForecast;
          },
          clearAll(){
              for(let i in this.dataArr){
                  this.dataArr[i].background = 'white' 
                  this.dataArr[i].color = 'black'
                  this.dataArr[i].typeList = []
              }
          },
          hideClick() {
              if(this.show){
                this.show = false;
                this.hide = false 
              }
          },
          showClick() {
              if(!this.show){
                  this.showActive = true;
                  this.show = true
              }
          },
          colorRgb(str){
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = str.toLowerCase();
            if(sColor && reg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
                }
                return "RGB(" + sColorChange.join(",") + ",0.2)";
            }else{
                return sColor;	
            }
        },
          //鼠标抬起
           enter(index){
            if(this.start){
                if(this.index==index-1||this.index==index+1){
                    if(this.timer!=null){
                        clearTimeout(this.timer)
                    }
                    this.index = index;
                    //this.dataArr[index].color = this.activeColor
                    this.endIndex = this.index;
                   //
                    this.timer = setTimeout(()=>{
                     if(this.activeType){
                         //this.small(); //不完全匹配
                        // console.log('----selection',this.selection)
                        this.correct() //修正索引
                        if(this.allReplace){
                            this.all();    //完全匹配
                        }else{
                            this.small(); //不完全匹配
                        }
                     }
                    },1200)
                }
            }
        },
        //修正索引
        correct(){
            let str =  window.getSelection().toString().replace(/\s/g,"")
            if(this.startIndex<this.endIndex){
                let strat = this.startIndex;
                let end = this.endIndex;
                 for(let i=strat;i<=end;i++){
                        if(this.dataArr[i].value==str[0]){
                            this.startIndex = i;
                           break;
                        }
                    }
                    for(let i=strat;i<=end;i++){
                        if(this.dataArr[i].value==str[str.length-1]){
                            this.endIndex = i;
                        }
                    }
            }else{
                let strat = this.startIndex;
                let end = this.endIndex;
               for(let i=strat;i<=end;i++){
                        if(this.dataArr[i].value==str[0]){
                            this.startIndex = i;
                            break
                        }
                    }
                for(let i=strat;i<=end;i++){
                    if(this.dataArr[i].value==str[str.length-1]){
                        this.endIndex = i;
                    }
                }
            }
        },
        out(){

        },
        star(index){
            this.start = true
            //this.dataArr[index].color = this.activeColor;
            this.index = index;
            this.startIndex = index;
        },
        end(){
            this.start = false
        },
        small(){
                if(!this.ingore){
                    let reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
                    let re = new RegExp(reg)
                    if(re.test(this.dataArr[this.startIndex].value)){
                        this.startIndex++;
                    }
                    if(re.test(this.dataArr[this.endIndex].value)){
                        this.endIndex--;
                    }
                }
              if(this.first(this.startIndex,this.endIndex,this.dataArr)){
                    this.changeColor(this.startIndex,this.endIndex)
                }else{
                    this.changeBack(this.startIndex,this.endIndex)
                }
        },
        all(){
            let str;
            if(this.startIndex>this.endIndex){
                  str = this.str.substring(this.endIndex,this.startIndex+1)
            }else{
                  str = this.str.substring(this.startIndex,this.endIndex+1)
            }
            if(!this.ingore){
                str = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g,""); 
            }
            this.changeStr(str)
        },
        changeStr(str){
            let length = 0;
            for(let i=0;i<this.dataArr.length;i++){
                if(this.dataArr[i].value==str[0]){
                    length=0;
                    for(let j = 0;j<str.length;j++){
                        if(this.dataArr[i+j]&&this.dataArr[i+j].value==str[j]){
                            length++
                        }
                    }
                }
                if(length==str.length){
                    if(this.first(i,i+str.length,this.dataArr)){
                        this.changeColor(i,i+str.length-1)
                        length=0;
                    }else{
                        this.changeBack(i,i+str.length-1)
                        length=0;
                    }
                }
            }
        },
        setClass(i){
            this.activeColor = this.list[i].color;
            this.activeType = this.classArr[i]
            for(let j in this.list){
                if(j!=i){
                    this.list[j].class = ""
                }else{
                    this.list[j].class = "active"
                }
            }
        },
        first(start,end,arr){
             for(let i = start;i<end;i++){
                if(arr[i].color!="black"){
                    return false
                }
            }
            return true
        },
        changeColor(start,end){
             for(let i = start;i<=end;i++){
                this.dataArr[i].color = this.activeColor;
            }
            this.dataArr[end].typeList.push({
                type:this.activeType,
                background:this.activeColor,
                index:[start,end],
                back:"color",
                value:this.str.substring(start,end+1)
            })
        },
        changeBack(start,end){
                for(let i = start;i<=end;i++){
                    console.log(this.activeColor)
                    this.dataArr[i].background = this.colorRgb(this.activeColor);
                    //this.dataArr[i].color = 'white'
                }
                //this.dataArr[this.startIndex].background = this.activeColor;
                //this.dataArr[index].background = this.activeColor
                this.dataArr[end].typeList.push({
                    type:this.activeType,
                    background:this.activeColor,
                    index:[start,end],
                    back:"background",
                    value:this.str.substring(start,end+1)
                })
        },
        deleteType(index,i,list){
            if(this.allReplace){
                let str = list.value;
                for(let i=0;i<this.dataArr.length;i++){
                    if(this.dataArr[i].typeList.length!=0){
                        for(let j=0;j<this.dataArr[i].typeList.length;j++){
                            if(str==this.dataArr[i].typeList[j].value){
                                if(this.dataArr[i].typeList[j].back=="background"){
                                    for(let z=this.dataArr[i].typeList[j].index[0];z<=this.dataArr[i].typeList[j].index[1];z++){
                                        this.dataArr[z].background = "white"
                                    }
                                }else{
                                    for(let z=this.dataArr[i].typeList[j].index[0];z<=this.dataArr[i].typeList[j].index[1];z++){
                                        this.dataArr[z].color = "black"
                                    }
                                }
                                this.dataArr[i].typeList.splice(j,1)
                            }
                        }
                    }
                }

            }else{
                if(list.back=='background'){
                    for(let i=list.index[0];i<=list.index[1];i++){
                        this.dataArr[i].background = "white"
                    }
                }else{
                    for(let i=list.index[0];i<=list.index[1];i++){
                        this.dataArr[i].color = "black"
                    }
                }
                this.dataArr[index].typeList.splice(i,1)
            }
        },
        async initClass(){
            let {data} = await this.$axios.$post("label/getTypeValueByProId",{
               proId: this.$route.query.proId,
            })
            for(let i in data){
                this.typeMap[data[i].name] = data[i].cateCode;
            }
            this.classArr = data;
            for(let i in this.classArr){
                if(i>=this.colorArr.length){
                     this.list.push({
                        type:this.classArr[i].name,
                        color:this.colorArr[0].color,
                        background:this.colorArr[0].background,
                        class:""
                    })
                }else{
                    this.list.push({
                        type:this.classArr[i].name,
                        color:this.colorArr[i].color,
                        background:this.colorArr[i].background,
                        class:""
                    })
                }
              
            }
            this.list[0].class = 'active';
            this.activeType =  this.list[0].type;
            this.activeColor = this.list[0].color;
        },
       
        getIndex(index,type){
            for(let i in this.list){
                this.list[i].class = "";
            }
             this.list[index].class = 'active';
             this.activeType = type;
             this.activeColor = this.list[index].color;
            
        },
         setIndex(index) {
            this.activeIndex = index;
           
        },
         changeBottom(page) {
           
           
            
        this.curPagerNo = page;
        this.initBottom();
            this.activeIndex = 0;
                      
           
        },
        getTag(){
            let str = "";
            let obj = {};
            let item = {};
            for(let i in this.dataArr){
                if(this.dataArr[i].typeList.length){
                    item = this.dataArr[i].typeList[0];
                    if(obj[item.value]){
                         obj[item.value] += "_("+item.index[0]+","+item.index[1]+")"+"#"+this.typeMap[item.type];
                    }else{
                        obj[item.value] = "("+item.index[0]+","+item.index[1]+")"+"#"+this.typeMap[item.type]
                    }
                }
            }
            return JSON.stringify(obj)
        },
        async initBottom() {
            let url =  ""
            if(this.$route.query.status == -2){
            url = 'label/getExampleListByProId_ner'
            }else if(this.$route.query.status == -1){
            url = '/label/getCheckListByProId'
            }else if(this.$route.query.status == 0){
            url = '/push/push'
            }else if(this.$route.query.status == 1){
            url = ''
            }
            let obj = {};
            if(this.$route.query.status == 0){
                    obj = {
                    labelType: 1,
                    currentPageNumber: this.curPagerNo,
                    pageSize: 10,
                    isWatch:1,
                    proId: this.$route.query.proId,
                    userId:this.$route.query.userId
                    }
            }else{
                obj = {
                labelType: 1,
                curPagerNo: this.curPagerNo,
                pageSize: 10,
                isWatch:1,
                proId: this.$route.query.proId,
                userId:this.$route.query.userId
                }
            }



            let { msg, code, data } = await this.$axios.$post(
                url,
                obj
            )
            this.totalPageNumber = data.totalPageNumber;
            this.total = data.rowsCount;
            this.$refs.bottomlist.currentPage = this.curPagerNo ;
            if(code!=0){
                 this.$message({
                    message: msg,
                    type: "warning"
                    });
            }else{
                this.bottomList = data.list;
                this.str = this.bottomList[this.activeIndex].content;
                this.initContent();
                this.item = this.bottomList[this.activeIndex];
                 this.item.name = this.item.name.replace(/\/n|\/t/ig,"")
                if(this.item.htmlContent&&this.item.drop!=1){
                    this.dataArr = JSON.parse(this.item.htmlContent);
                }
              
                for(let i in this.bottomList){
                    if(this.bottomList[i].drop != 0){
                         this.bottomList[i].color = "#97183E";
                    }else{
                        if(this.bottomList[i].status==1){
                            this.bottomList[i].color = "#346739";
                        }else{

                        }
                    }
                }
            }
            if(this.$route.query.id){
                for(let i in this.bottomList){
                if(this.bottomList[i].id==this.$route.query.id){
                    this.activeIndex = i;
                }
                }
            }
        }
      }
}
</script>
<style lang="stylus" scoped>
@keyframes hideline {
    from{
        left 0
    }
    to{
        left -200px
       
    }
}
@keyframes showline {
    from{
        left -200px
    }
    to{
        left 0
       
    }
}
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
.container{
    width 100%
    height 100%
    position relative
    display flex
}
.tri{
    width: 0;
    left: -10px;
    height: 0;
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-top-color:transparent;
    border-left-color:transparent;
    border-bottom-color:transparent;
    position: absolute;
    top: 0px;
    border-radius: 2px;
}
.typeName{
    display inline
    color white
    margin-left 12px
    margin-right 6px
    padding-left 6px
    margin-right: 6px;
    padding-right 0px
    overflow hidden
    
    position relative
    img{
        width 16px
        height 16px
        position relative
        cursor pointer
        right: 0px;
        top: 3px;
    }
}
.left-side {
    width 273px;
    height 100%;
    overflow-y   visible
    overflow-x auto 
    background: #313440;
    position relative
}
.right-content{
    flex 1
    display flex
    flex-direction column
    overflow hidden
}
.hide{
   
}
.showActive{
   
}
.little-left-side{
    width 76px;
    height 100%;
    box-sizing border-box
    padding-left 6px
    padding-right 6px
    overflow  auto
    background: #313440;
    position relative
    .title{
        height 54px
        line-height 54px
        text-align center
        border-bottom: 1px solid #1D1E1F;
        font-size: 14px;
        color: #8794aa;
    }
}
.right-txt{
    width 100%
    flex 1
    overflow hidden
}
.addClass{
    margin-right:5px
}
.retract{
    position absolute
    right 0
    cursor pointer
    top 236px
}
.retract img{
    width 14px;
    height 41px
}
.recovery{
    position absolute
    right 0
    cursor pointer
    top 236px
}
.recovery img{
    width 14px;
    height 41px
}
.aside-name{
  height: 93px;
  box-sizing border-box
  padding 17px 16px 16px 26px
  border-bottom : 1px solid #1D1E1F;

}
.message .title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 15px
  letter-spacing: 1px;
}
.title{
  font-size: 18px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.message p{
  font-size: 14px;
  color: #D6DCE0;
}
.right-txt{
    padding 12px 26px 16px 10px
    background #262832
    box-sizing: border-box;
    .white-space{
        width 100%
        height 100%
        background white
        display flex
        flex-direction column
        .textarea{
            padding-left 30px
            padding-right 16px
            box-sizing border-box
            border-bottom : 1px solid #E0E6ED;
            .title{
                float left
                font-size: 14px;
                color: #252D3F;
                font-weight 600
                margin-top 12px
            }
            .txt-bar{
                float right 
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
                .reduct{
                    float left
                    cursor pointer
                    img{
                        width 24px
                        height 24px
                        margin-top 12px
                        margin-right 12px
                    }
                }

            }
        }
    }
}
.content{
    padding 16px 
    padding-left: 30px;
    padding-right: 30px;
    box-sizing border-box
    font-size: 14px;
    color: rgba(0,0,0,0.80);
    letter-spacing: -1px;
    text-align: justify;
    flex 1
    overflow auto
}
.bottom-group{
    height 58px
    background: rgba(195,215,232,0.18);
    .gruop{
        float right 
        .pre{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-top 12px
            text-align center
            background: #626C76;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
        .next{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-left 16px
            margin-top 12px
            text-align center
            background: #626C76;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
        .yes{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-left 34px
            margin-top 12px

            text-align center
            background: #10B66F;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
        .delete{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-left 16px
            margin-top 12px
            margin-right 30px
            text-align center
            background: #D12B2B;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
    }
}
</style>
