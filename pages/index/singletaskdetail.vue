<template>
  <div class="singleTask-detail">
    <div class="title">
      <div class="title-left"></div>
      <p>任务详情</p>
      <goBack v-if="isBackShow"></goBack>
    </div>
    <div class="detail-con" v-if="projectInfor">
      <p>任务名称： {{projectInfor.proName}}</p>
      <p>创建时间：{{filterDate(projectInfor.createTime)}}</p>
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
      <p>标注类型： {{projectInfor.labelType === 2? '分类':'实体识别'}}</p>
      <p>{{projectInfor.labelType === 2? '分类名':'实体识别'}}：{{typeValue.join('/')}}</p>
      <div class="task-rate">
        <p>任务进度：</p>
        <div class="progress-detail">
          <llpProgress type='detail' :percentage='projectInfor.rate'></llpProgress>
          <span class="text-dec">{{projectInfor.rate + '%'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

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
    }
  },
  computed: {
    isBackShow(){
      return this.$route.query.back !== 'none'
    }
  },
  created(){
    this.init()
  },
  methods: {
    init() {
      if(this.$route.query.proId){
        this.getProjectDetailPage()
        this.getProjectDataListById()
        this.getTypeValueByProId()
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
    },
    async getTypeValueByProId(){
      let data = {
        proId: this.$route.query.proId
      }
      let prolist = await this.$axios.$post('/label/getTypeValueByProId',data);
      this.typeValue = prolist.data.map(item=>item.name)
    },
    filterDate(str){
      let time = new Date(str)
      let year = time.getFullYear()
      let month = time.getMonth()+1
      let day = time.getDate()
      let h = time.getHours()
      let m = time.getMinutes()
      return `${year}/${month}/${day}   ${h}:${m}`
    }
  },

}
</script>

<style lang="scss" >
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";
.singleTask-detail {
  padding-top: 32px;
  width: 82%;
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
      font-weight: 700;
      font-size: 16px;
      color: rgba($color: #000000 , $alpha: 0.8);
    }
    margin-bottom: 12px;
  }
  .detail-con{
    background-color: rgba($color: #F6F6F8 , $alpha: 0.6);
    border: 1px solid #DCE2EA;
    padding: 30px;
    min-height: 560px;
    font-size: 14px;
    p{
      margin-bottom: 18px;
    }
    .data{
      p{
        margin-bottom: 10px;
      }

    }
    color: rgba($color: #000000 , $alpha: 0.8);
    .table-detail{
      width: 100%;
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 18px;
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
    .task-rate{
        @include classflex(flex-start);
        p{
          margin-bottom: 0;
        }
        margin-top: -8px;
        height: 40px;
        line-height: 40px;
      .progress-detail{
        @include classflex(flex-start);
        height: 40px;
        .text-dec{
          margin-left: 10px;
        }
      }
    }

  }
  .subfix{
    cursor: pointer;
  }

}
</style>


