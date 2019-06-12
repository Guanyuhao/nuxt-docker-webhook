<template>
    <div class='container'>
        <!--标注分类-->
        <div class="left-side" :class="{hide:hide,showActive:showActive}" v-show="show">
           
            <back-tool></back-tool>
            <aside-name :title='proName'></aside-name>
            <aside-infor :num='sampleNum'  @taskStand='taskStand' @taskDetail='taskDetail' :isSingle="showexam" @goExamp='goExamp' :guifan='isSingle'></aside-infor>
            <div class="aside-item aside-tag" v-show="!isSingle">
                <!-- 任务名称 -->
                <div class="message">
                 <div class="title">任务阶段</div>
                <div class="tag">
                            <img class="icon" :src="imgSrc" alt="">
                            <div class="txt">{{txt}}</div>
                        </div>
                </div>
            </div>
            <aside-progress :message="message" :drop="drop"></aside-progress>
            <aside-result :list='resultList'></aside-result> 
            <div v-show="$route.query.status==0">
                <model-accuracy :num="model" ></model-accuracy>
            </div>
             
        </div>
      
        <div class="right-content">
            <div class="right-txt">
                <div class="white-space">
                    <div class="title">查看结果</div>
                    <search-input v-model="searhValue" @change="search"></search-input>
                    <div class="table">
                        <div class="tableHeader">
                            <div class="number color">序号</div>
                            <div class="descript color">文件描述</div>
                            <div class="tagTime color">标注时间
                            </div>
                        </div>
                        <div class="tableBody" v-for="(item,index) in list" :key="index" @click="back(item.dataId)">
                            <div class="number color">{{item.showId}}</div>
                            <div class="descript color" >
                                <!--防止空格-->
                                 <span class="span" v-for="(item,index) in item.htmlContent"  :key="index" :style="{background:item.background,color:item.color}" :class="{addClass:item.typeList.length}">{{item.value}}<div  v-for="(it,i) in item.typeList" :key="i" class="typeName" :style="{background:it.background}">{{it.type}}</div></span>
                            </div>
                            <div class="tagTime color">{{item.createTimeStr}}</div>
                        </div>
                          <div class="nodata" v-show="list.length==0">
                            <div class="center">
                                <img src="~/assets/img/nodata.png" alt="">
                                
                            </div>     
                        </div>
                        <div class="page" v-show="pageshow">
                             <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <stand-modal ref="stand"  :txt='stand'></stand-modal>
    </div>
</template>
<script>
import asideName from '../components/aside/asideName.vue'
import asideInfor from '../components/entityaside/checkInfor.vue'
import asideProgress from '../components/classaside/clsProcess.vue'
import asideResult from '../components/aside/asideResult.vue'
import modelAccuracy from '../components/aside/modelAccuracy.vue'
import asideTask from '../components/classaside/classexampTask.vue'
import asideLittleProgress from '../components/littleside/asideProgress.vue'
import asideList from '../components/littleside/asideList.vue'
import toolBar from '../components/toolbar/index'
import backTool from '../components/UI/backtool.vue'
import botCom from '../components/bottom/btmCom.vue'
import searchInput from '../components/UI/searchInput.vue'
import { async } from 'q';
import standModal from '../components/standModal'
export default {
      layout: 'home',
      components:{
          asideName,
          asideInfor,
          asideProgress,
          asideResult,
          modelAccuracy,
          asideTask,
          asideLittleProgress,
          asideList,
          toolBar,
          searchInput,
          backTool,
          botCom,
          standModal
      },
      computed:{
          txt(){
              if(this.$route.query.status==-2){
                 
                  if(this.haveExam==1&&this.haveCheck==1){
                        this.imgSrc = '/label/ks.png'
                        return "示例标注+考核答案"
                  }else if(this.haveExam==0&&this.haveCheck==1){
                        this.imgSrc = '/label/ks.png'
                        return "考核答案"
                  }else{
                       this.imgSrc = '/label/shili.png'
                      return "示例标注"
                  }
              }else if(this.$route.query.status==-1){
                   this.imgSrc = '/label/kaohe.png'
                  return "考核标注"
              }else if(this.$route.query.status==0){
                   this.imgSrc = '/label/task.png'
                  this.drop = true;
                  return "任务标注"
              }else if(this.$route.query.status==1){
                  return "确认标注"
              }
          },
          pageshow(){
              return !this.list.length==0;
          }
      },
        mounted() { 
           
            this.initProject();
           
        },
      data (){
          return {
                show:true,
                hide:false,
                showActive:false,
                isSingle:1,
                list:[],
                // 项目接受的参数
                proid:4195,
                stage:"考核标注",
                currentPage:1,
                tableList:[
                    {
                        num:1,
                        descript:"美少年方会计师都能看是",
                        result:"分类",
                        tagtime:"2018/10/10  10:00"
                    },
                     {
                        num:2,
                        descript:"美少年方会计师都能看是",
                        result:"分类",
                        tagtime:"2018/10/10  10:00"
                    }
                ],
                searhValue:"",
                currentPage:1,
                total:10,
                sampleNum:0,
                proName:"",
                resultList:[],
                message: {
                    finish: { count: 1, rate: "50%" },
                    notfinish: { count: 1, rate: "50%" },
                    total: { count: 1, rate: "50%" },
                    drop: { count: 1, rate: "50%" }
                },
                stand:"",
                model:"",
                showexam:0,
                haveExam:0,
                haveCheck:0,
                standLink:"",
                drop:false,
                imgSrc:"",
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
          search(){
              this.currentPage = 1;
              this.initList()
          },
          hideClick() {
              if(this.show){
                   
                        this.show = false;
                        this.hide = false
                     
              }
          },
          handleCurrentChange(page){
              this.currentPage = page;
              this.initList()
          },
          showClick() {
              if(!this.show){
                  this.showActive = true;
                  this.show = true
              }
          },
           taskStand(){
                if(this.standLink){
                //this.$axios.$get("/pro/downloadStandardAccessory?standardFile="+'1558092051232.txt')
                window.location.href =  this.$store.state.domain + "/pro/downloadStandardAccessory?standardFile="+this.standLink+"&showStandardFile="+this.showStandardName
                }else{
                this.$refs.stand.show()
                }
            },
        async initList(){
            let {data} = await this.$axios.$post("/census/censusLabelData",{
                proId:this.$route.query.proId,
                curPagerNo:this.currentPage,
                status:this.$route.query.status,
                userId:this.$getCookie("userId"),
                pageSize:10,
                content:this.searhValue
            })
            this.list = data.list;
             
            for(let i in this.list){
                this.list[i].htmlContent = JSON.parse(this.list[i].htmlContent)
            }
            console.log(this.list)
            this.total = data.rowsCount;
        },
          async initProject() {
            let { code,data } = await this.$axios.$post("/labelpro/getProjectDetailById", {
                proId: this.$route.query.proId,
                status:this.$route.query.status
            });
            if(code!=0){
                this.$router.push({path:"/404"})
            }else{
                this.initList();
                this.initTypeList();
                this.initModel()
                this.initMessage();
                this.proName = data.proName;
                this.sampleNum = data.sampleNum;
                this.stand = data.standard;
                 this.showStandardName = data.showStandardName;
                 this.standLink = data.standardFile;
                this.isSingle = data.isSingle;
                if(this.isSingle){
                    this.drop = true;
                }
                 this.haveExam = data.haveExam;
                 this.haveCheck = data.haveCheck;
                    if(this.isSingle||!this.haveExam){
                        this.showexam = false
                    }else{
                        this.showexam = true
                    }
            }
           
    },
     goExamp(){
              this.$router.push({path:"entityexampview",query:{proId:this.$route.query.proId}})
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
                  //模型准确度
            async initModel(){
                let {data} = await this.$axios.$post("/census/getLabelAccuracy",{
                    proId:this.$route.query.proId,
                    labelType:1
                })
                this.model = data;
            },
    //侧边栏
    async initTypeList() {
      let { data } = await this.$axios.$post("/census/getEntityAndCateCensus", {
        proId: this.$route.query.proId,
        userId: this.$getCookie("userId"),
        status: this.$route.query.status
      });
      this.resultList = data;
    },
      async back(id){
        let {data} = await this.$axios.$post("/labelpro/getDataNum", {
        proId: this.$route.query.proId,
        userId: this.$getCookie("userId"),
        status: this.$route.query.status,
        dataId:id
      });
      if(this.$route.query.status==-2){
            this.$router.push({path:`/entityexample?page=${data}&proId=`+this.$route.query.proId+"&id="+id})
      }else if(this.$route.query.status==-1){
            this.$router.push({path:`/entitycheck?page=${data}&proId=`+this.$route.query.proId+"&id="+id})
      }else if(this.$route.query.status==0){
            this.$router.push({path:`/entityformal?page=${data}&proId=`+this.$route.query.proId+"&id="+id})
      }
       
    },    
      }
}
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
.typeName{
    display: inline;
    color: #fff;
    margin-left: 0px;
    padding-left: 6px;
    margin-right 6px
    padding-right: 0px;
    overflow: hidden;
    padding-right: 5px;
    
    position: relative;
    img{
        width 16px
        height 16px
        position relative
        cursor pointer
        right: 0px;
        top: 3px;
    }
}
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
.span{
    float left
}
.tableHeader{
    width 100%
    height 36px
    margin-top 24px
    background: #EDEEF1;
    display flex
    background: #E7ECF3;
    border 1px solid #dce2ec
    border-bottom 0
    flex-direction row
    .color{
        font-size: 14px;
        color: rgba(0,0,0,0.68);
    }
    .number{
        width 49px
        line-height 36px
        text-align center
    }
    .descript{
        flex 1
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .tagResult{
        width 180px
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .tagTime{
        width 180px
        line-height 36px
        text-align left 
        padding-left 20px
    }

}
.nodata{
    height 400px
    border 1px solid #dbe6f4;
    position relative
    .center{
        width 267px
        height 240px
        position absolute
        left 50%
        top 50%
        margin-left -120px
        margin-top -120px
        text-align center
        img{
            width 267px 
            height auto
        }
        h4{
            color: #909399;
            font-size 14px

            font-weight normal
            text-align center
        }
    }
    
}
.addClass{
    margin-right:5px
}
.tableBody{
    width 100%
    cursor pointer
    display flex
    flex-direction row
    .color{
        font-size: 14px;
        color: rgba(0,0,0,0.68);
    }
    .number{
        width 49px
        display flex
        align-items center
        justify-content center
        text-align left 
        border-left:1px solid #DCE2EA;
        border-right:1px solid #DCE2EA;
    }
    .descript{
        flex 1
        overflow hidden
        padding: 9px;
        padding-left: 20px;
        border-right:1px solid #DCE2EA;
       
    }
    .tagResult{
        width 180px
        line-height 36px
        text-align left 
        padding-left 20px
       
    }
    .tagTime{
        width 180px
        display flex
        align-items center
        justify-content center
        border-left:1px solid #DCE2EA;
        border-right:1px solid #DCE2EA;
        text-align left 
        padding-left 8px
    }
}
.tableBody:nth-child(odd){
    background: #F6F6F6;
}
.tableBody{
    border-bottom :1px solid #DCE2EA; 
}
.page{
    margin-top 31px;
    text-align center
}
.container{
    width 100%
    height 100%
    position relative
    display flex
}

.left-side {
    width 273px;
    height 100%;
    overflow  auto
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
        border-bottom: 1px solid #1D1E1F;
        ont-size: 14px;
        color: #8794aa;
    }
}
.right-txt{
    width 100%
    flex 1
    overflow hidden
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
.right-txt{
    padding 12px 26px 16px 10px
    background #262832
    box-sizing: border-box;
    .white-space{
        width 100%
        height 100%
        background white
        overflow auto
        padding 24px 26px
        .title{
            font-size: 18px;
            margin-top 10px
            color: rgba(0,0,0,0.80);
            margin-bottom 18px
        }
    }
}
.aside-tag {
  height: 112px;
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
.message .title  {
  font-size: 16px;
  color: #8794AA;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.message p {
  font-size: 14px;
  color: #D6DCE0;
}
.content{
    padding 16px 
    box-sizing border-box
    font-size: 14px;
    color: rgba(0,0,0,0.80);
    letter-spacing: -1px;
    text-align: justify;
    line-height: 25px;
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
