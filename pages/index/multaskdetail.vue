<template>
  <div class="multask-detail">
    <div class="multask-detail--title">
      <div class="title-left"></div>
      <p>任务详情</p>
      <goBack v-if="isBackShow"></goBack>
    </div>
    <div class="detail-con" v-if="projectInfor">
      <div class="detail-con--title">
        <i class="green-circle"></i>
        <h4 class="text">任务信息</h4>
      </div>
      <p>任务名称：{{projectInfor.proName}}</p>
      <div class="time-infor">
        <p>创建时间：{{projectInfor.createTimeStr}}</p>
        <p>截至时间：{{projectInfor.expTimeStr}}</p>
      </div>
      <div class="data">
        <p>数据集：</p>
        <table class="table-detail">
          <thead>
            <tr>
              <th>序号</th>
              <th>文件名</th>
              <th>数据量</th>
              <th>文件大小</th>
              <th>上传时间</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item,index) in dataList"
                :key="index"
              >
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.num}}</td>
                <td>{{item.size}}</td>
                <td>{{item.time}}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <p class="evermarkcount">每条数据标注次数：{{projectInfor.labelNum}}</p>
      <p>标注类型：{{projectInfor.labelType === 2? '分类':'实体识别'}}</p>
      <p>{{projectInfor.labelType === 2? '分类名':'实体识别'}}：{{typeValue.join(' / ')}}</p>
      <div class="detail-con--standard">
        <!--
            默认编译的时候，会过滤
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
             /* autoprefixer: on */
        -->
        <span style="margin-right: 10px;">标注规范:</span>
        <span v-if="projectInfor.standardFile" style="margin: 10px 0">
          <a class="downTemplate" :href="domain+'/pro/downloadStandardAccessory?standardFile='+projectInfor.standardFile+'&showStandardFile='+projectInfor.showStandardName" >获取上传附件</a>
        </span>
        <span v-else-if="projectInfor.standard === '暂无标注规范'">暂无标注规范</span>
        <div v-else class="stadart-text">
          <div ref="standard_p" class='standarddiv'  v-html="''+(projectInfor.standard || '无')"></div>
          <!-- <p ref="standard_p" class='standard' :style="lineClanmp" v-html="(projectInfor.standard || '无')"></p> -->
          <!-- <el-button class="right" v-if="isStandrdText" @click="fixStandard" type="text">{{standrdText}}<i class="el-icon-d-arrow-right"></i></el-button> -->
        </div>
      </div>
      <div class="detail-con--title">
        <i class="green-circle"></i>
        <h4 class="text">任务分配</h4>
      </div>

      <div class="data">
        <p>任务统计：</p>
        <table class="table-detail">
          <thead>
            <tr>
              <th>任务状态</th>
              <th>任务量</th>
              <th>示例数量</th>
              <th>考核数量</th>
              <th>任务进度</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{{projectInfor.status===-2?'预标注':projectInfor.status===0?'标注中':'确认标注'}}</td>
                <td>{{projectInfor.totalNum}}</td>
                <td>{{projectInfor.sampleNum}}</td>
                <td>{{projectInfor.checkNum}}</td>
                <td width='600'>
                  <div class="progress-detail">
                    <llpProgress type='detail' :percentage='projectInfor.rate'></llpProgress>
                    <span class="text-dec">{{projectInfor.rate + '%'}}</span>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="data" ref="people_config">
        <div class="peopleconfig">
          <span>人员分配：</span>
          <div class="right">
            <div class="fang-warpper" @click="peopleListChange(1)">
              <i class="fang" :class="[isHeiActive === 1?'hei':'']"></i>
              <span>进行中</span>
            </div>
            <div class="fang-warpper" @click="peopleListChange(2)">
              <i class="fang " :class="[isHeiActive === 2?'hei':'']"></i>
              <span>已完成</span>
            </div>
            <div class="fang-warpper" @click="peopleListChange(3)">
              <i class="fang " :class="[isHeiActive === 3?'hei':'']"></i>
              <span>未开始</span>
            </div>
          </div>
        </div>
        <table class="table-detail">
          <thead>
            <tr>
              <th>序号</th>
              <th>姓名</th>
              <th>审核状态</th>
              <th>个人任务量</th>
              <th>个人进度</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(user,index) in userList"
                :key="index"
              >
                <td>{{index+1}}</td>
                <td>{{user.userName}}</td>
                <td>{{user.stageName === '正式标注'?'任务标注':user.stageName}}</td>
                <td>{{user.taskNum}}</td>
                <td width='600'>
                  <div class="progress-detail">
                    <llpProgress type='detail' :percentage='user.rate'></llpProgress>
                    <span class="text-dec">{{user.rate + '%'}}</span>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// 任务量 totalNum  sampleNum shili  chenckNum 考核
//
import goBack from '~/components/UI/back';
import llpProgress from '~/components/UI/llpProgress';

export default {
  layout: 'home',
  components: {
    goBack,
    llpProgress
  },
  data() {
    return {
      dataList: [],
      projectInfor: null,
      typeValue: [],
      userList: [],
      lineClanmp: {
        '-webkit-line-clamp': 'unset',
        '-webkit-box-orient': 'vertical',
      },
      standrdText: '查看更多',
      isHeiActive: 1,
      isStandrdText: false,
    }
  },
  created(){
    this.init()
  },
   computed: {
    isBackShow(){
      return this.$route.query.back !== 'none'
    },
    domain(){
      return this.$store.state.domain
    },
  },
  mounted(){

  },
  methods: {
    init() {
      if(this.$route.query.proId){
        this.getProjectDetailPage()
        this.getProjectDataListById()
        this.getTypeValueByProId()
        this.getProjectUserListById()
      }
    },
    async getProjectDataListById(){
      let data = {
        proId: this.$route.query.proId
      }
      let prolist = await this.$axios.$post('/labelpro/getProjectDataListById',data);
      this.dataList = prolist.data
    },
    async getProjectDetailPage(){
      let data = {
        proId: this.$route.query.proId
      }
      let prolist = await this.$axios.$post('/labelpro/getProjectDetailPage',data);
      this.projectInfor = prolist.data
      // 这个接口最慢
      this.nextMounted()
    },
    async getTypeValueByProId(){
      let data = {
        proId: this.$route.query.proId
      }
      let prolist = await this.$axios.$post('/label/getTypeValueByProId',data);
      this.typeValue = prolist.data.map(item=>item.name)
    },
     async getProjectUserListById(option){
      let data = {
        proId: this.$route.query.proId,
        status: 1
      }
      Object.assign(data,option)
      let prolist = await this.$axios.$post('/labelpro/getProjectUserListById',data);
      this.userList = prolist.data
    },
    async nextMounted(){
      await this.$nextTick()
      this.setViewMore()
      if(this.$route.query.jump ==='jump'){
        this.scrollPeopleConfig()
      }
    },
    filterDate(str){
      let time = new Date(str)
      let year = time.getFullYear()
      let month = time.getMonth()+1
      let day = time.getDate()
      let h = time.getHours()
      let m = time.getMinutes()
      return `${year}-${month}-${day}   ${h}:${m}`
    },
    fixStandard(){
      if(this.standrdText === '查看更多'){
        this.lineClanmp['-webkit-line-clamp'] = 'unset'
        this.standrdText = '收起'
      }else{
        this.lineClanmp['-webkit-line-clamp'] = 3
        this.standrdText = '查看更多'
      }
    },
    peopleListChange(status){
      this.getProjectUserListById({
        status,
      })
      this.isHeiActive = status
    },
    setViewMore(){
      let ph = this.$refs.standard_p && this.$refs.standard_p.offsetHeight
      if(ph > 120){
        this.isStandrdText = true
        // this.lineClanmp['-webkit-line-clamp'] = 3
      }
    },
    scrollPeopleConfig(){
      let top = this.$refs.people_config.offsetTop
      document.querySelector('.main-container').scrollTop = (top - 40)
    }
  },

}
</script>

<style lang="scss" >
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";
.multask-detail {
  padding-top: 32px;
  width: 82%;
  margin: 0 auto;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  .multask-detail--title{
    position: relative;
    @include classflex();
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    .title-left{
      @include verticalLine();
    }
    p{
      padding-left: 15px;
      font-weight: 700;
      font-size: 16px;
      color: rgba($color: #000000 , $alpha: 0.8);
    }
  }
  .detail-con{
    background-color: #F6F6F8;
    border: 1px solid #DCE2EA;
    padding: 0 30px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    min-height: 560px;
    font-size: 14px;
    color: rgba($color: #000000 , $alpha: 0.8);
    p{
      margin-bottom: 10px;
    }
    .data{
      p{
        margin-bottom: 10px;
      }

    }
    .detail-con--title{
      @include classflex(flex-start);
      color: rgba($color: #000000 , $alpha: 0.8);
      padding: 25px 0 15px 0;
      .text{
        font-size: 15px;
        margin-left: 10px;
      }
    }
    .table-detail{
      width: 100%;
      font-size: 14px;
      font-weight: normal;
      thead{
        line-height: 36px;
        height: 36px;
        text-align: center;
        color: rgba($color: #000000 , $alpha: 0.6);
        background: #EDEEF1;
        border: 1px solid #DCE2EA;
        th{
          font-weight: normal;
        }
      }
      tbody{
        border-left: 1px solid #DCE2EA;
        border-right: 1px solid #DCE2EA;
        border-bottom: 1px solid #DCE2EA;
        tr{
          height: 40px;
          line-height: 40px;
          td{
            border-right: 1px solid;
            border-color: rgba($color: #DCE2EA , $alpha: 0.4);
            &:last-child{
              border-right: none;
            }
            text-align: center;
            background: #ffffff;
            color: rgba($color: #000000 , $alpha: 0.8);
          }
          &:nth-child(2n){
            td{
              background: #F3F3F6;
            }
          }
        }
      }
    }

    .progress-detail{
      @include classflex(center);
      .text-dec{
        margin-left: 10px;
      }
    }
    .detail-con--standard{
      overflow: hidden;
      .standard{
        display: -webkit-box;
        overflow: hidden;
      }
      .right{
        float: right;
      }

    }
    .peopleconfig{
      @include classflex();
      height: 40px;
      .right{
        @include classflex(flex-start);
        .fang-warpper{
          cursor: pointer;
          @include classflex(flex-start);
          span{
            margin: 0 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .green-circle{
    @include cricle($green);
  }
  .subfix{
    cursor: pointer;
  }
  .fang{
    width: 6px;
    height: 6px;
    background: #AAAAAA;
    display: block;
    &.hei{
      background: #000000;
    }
  }
  .ql-size-small{
    font-size: 10px;
  }
  .ql-size-large{
    font-size: 16px;
  }
  .ql-size-huge{
    font-size: 20px;
  }
  .ql-align-center{
    text-align: center;
  }
  .ql-align-right{
    text-align: right;
  }
  .ql-align-justify{
    text-align: justify;
  }
  .downTemplate{
    color: $blue;
  }
  .stadart-text{
    max-height: 200px;
    overflow-y: auto;
     &::-webkit-scrollbar-track {
      box-shadow: none;
      border-radius: 1px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(144,147,153,.3);
    }
  }
  .evermarkcount{
    margin-top: 15px;
  }
}
</style>


