<template>
  <div class="userManger">
    <llp-table :tableHeight="tableHeight">
      <template slot="header">
          <div class="left">
            <h4>人员管理</h4>
            <searchInput
              placeholder="请输入内容"
              v-model="searchText"
              @change="searchChange"
            ></searchInput>
          </div>
          <div class="right">
              <span class="mr16 f14">
                人员状态
              </span>
               <el-select
                size="small"
                v-model="userStatus"
                @change="selectChange"
              >
                <el-option v-for="(item,index) in userStatusArr" :key="index" :value="item.val" :label="item.label"></el-option>
              </el-select>
              <span class="mr16 f14">
                综合评价
              </span>
              <el-select
                size="small"
                v-model="rateBetween"
                @change="selectChange"
              >
                <el-option v-for="(item,index) in rateBetweenArr" :key="index" :value="item.val" :label="item.label"></el-option>
              </el-select>
          </div>
      </template>
      <template slot="main">
          <el-table
            :data="tableData"
            border
            stripe
            :height="tableHeight.height"
            @sort-change='sortChange'
            v-loading="loadingTable"
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="60">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="账号">
            </el-table-column>
            <el-table-column
              prop="userCompany"
              label="部门"
              width="200">
            </el-table-column>
            <el-table-column
              prop="score"
              label="综合评价"
              sortable='custom'
              >
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.scoreValue"
                  disabled
                  show-score
                  text-color="#ff9900"
                  :score-template='scope.row.score+""'>
                </el-rate>
              </template>
            </el-table-column>

            <el-table-column
              prop="totalLabel"
              label="标注总量"
              sortable='custom'
              >
            </el-table-column>
            <el-table-column
              prop="nowNum"
              label="当前任务">
              <template slot-scope="scope">
                    <el-button @click="viewDetail(scope.row,true)" type="text" size="small"> {{scope.row.nowNum}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
              prop="oldNum"
              label="历史任务">
                <template slot-scope="scope">
                    <el-button @click="viewDetail(scope.row,false)" type="text" size="small"> {{scope.row.oldNum}} </el-button>
                </template>
            </el-table-column>
          </el-table>
      </template>
      <template slot="footer">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalPageNumber">
              </el-pagination>
      </template>
    </llp-table>
    <!-- modal -->
    <modalBox ref="task_user" :isFooterBtn='false' :width='dialogObj.width'>
        <template slot="title">
            {{dialogObj.title}}
        </template>
        <template slot="content">
          <div class="result_class-wrapper">
            <llp-table :isHeader='false' :isFooter='false'>
              <template slot="main">
                <el-table
                  border
                  :data="userTaskArr"
                  class="modalTable"
                  :max-height="400"
                  v-show="dialogObj.isCurr"
                >
                <el-table-column
                  prop="index"
                  label="序号"
                  width="60"
                  >
                </el-table-column>
                <el-table-column
                  prop="proName"
                  label="任务名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="timeStatus"
                  label="任务时段"
                  >
                </el-table-column>
                <el-table-column
                    prop="taskStatus"
                    label="任务状态"
                    width="130"
                  >
                  <template slot-scope="scope">
                   <div class="taskStatus-wrappre">
                      <div class='taskStatus-wrappre--left'>
                        <i class="taskpoint" :class="[scope.row.statusColor]"></i>
                        <span>{{scope.row.taskStatus}}</span>
                      </div>
                      <img v-show="scope.row.isOverdue" class='img18' src="~/assets/img/task/isOverdue.png" alt="">
                      <!-- <i class="taskpoint" :class="scope.row.isOverdue?'el-icon-warning':''"></i> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalNum"
                  label="当前任务量"
                  width="100"
                  >
                </el-table-column>
                <el-table-column
                  label="当前进度"
                  width="195"
                  >
                  <template slot-scope="scope">
                    <div class="progress-wrapper">
                      <llpProgress :percentage='scope.row.labelRate'></llpProgress>
                      <span class="text-dec">{{scope.row.labelRate + '%'}}</span>
                    </div>
                  </template>
                </el-table-column>
                </el-table>

                <el-table
                  border
                  :data="userTaskArr"
                  class="modalTable"
                  :max-height="400"
                  v-show="!dialogObj.isCurr"
                >
                   <el-table-column
                    prop="index"
                    label="序号"
                    width="60"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="proName"
                    label="任务名称"
                    >
                  </el-table-column>
                   <el-table-column
                    prop="taskType"
                    label="标注类型"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="totalNum"
                    label="个人标注量"
                    width="100"
                    >
                  </el-table-column>
                </el-table>
              </template>
            </llp-table>
            <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalPageNumber"
              style="text-align:right">
            </el-pagination> -->
          </div>
        </template>
      </modalBox>
  </div>
</template>

<script>
import llpTable from '~/components/table/llpTable';
import dropDown from '~/components/UI/dropDown';
import searchInput from '~/components/UI/searchInput';
import llpProgress from '~/components/UI/llpProgress';
import modalBox from '~/components/modalBox';

export default {
  layout: 'home',
  components: {
    llpTable,
    dropDown,
    searchInput,
    llpProgress,
    modalBox
  },
  async asyncData(context) {
    // 渲染组件之前获取数据

  },
  data() {
    return {
      tableHeight: {
        height: 0
      },
      dropMenu: [
        {
          name: '创建多人任务',
        },
        {
          name: '创建单人任务'
        }
      ],
      searchText: '',
      userStatus: 2,
      rateBetween: '0-100',
      userStatusArr: [
        {
          val: 2,
          label: '全部'
        },
        {
          val: 1,
          label: '有任务'
        },
        {
          val: 0,
          label: '空闲'
        },

      ],
      rateBetweenArr:[
        {
          val: '0-100',
          label: '全部'
        },
        {
          val: '0-29',
          label: '0-29分'
        },
        {
          val: '30-59',
          label: '30-59分'
        },
        {
          val: '60-79',
          label: '60-79分'
        },
        {
          val: '80-100',
          label: '80-100分'
        },
      ],
      tableData: [
        {
          index:1,
          name:"曹丽蒙",
          nowNum:54,
          oldNum:4,
          score:42,
          totalLabel:1071,
          userCompany:"技术部",
          userId:161,
          userName:"caolimeng",
        }
      ],
      currentPage: 1,
      totalPageNumber: 0,
      pageSize: 20,
      dialogObj: {
        title: '当前任务',
        width: '824px',
        isCurr: true
      },
      userTaskArr: [],
      orderByy: 1,
      loadingTable: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if(process.client){
        this.getProListByUser()
      }
      if(process.server){

      }
    },
    showModal(){
      this.$refs.task_user.showModal()
    },
    searchChange(val){
      this.currentPage = 1
      this.getProListByUser()
    },
    selectChange(){
      this.currentPage = 1
      this.getProListByUser()
    },
    handleSizeChange(val){
      console.log(val)
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.getProListByUser()
    },
    async getProListByUser(option){
      this.loadingTable = true
      let data = {
        userName:this.searchText,
        status: this.userStatus,
        curPagerNo: this.currentPage,
        pageSize: this.pageSize,
        rateBetween: this.rateBetween,
        orderByy: this.orderByy //默认1得分倒叙，2得分正序，3标注量正序，4标注量倒叙
      }
      Object.assign(data,option)
      const prolist = await this.$axios.$post('/census/getUserListByToken',data)
      this.mapTable(prolist.data.list)
      this.totalPageNumber = prolist.data.rowsCount
      this.loadingTable = false

    },
    mapTable(arr){
      this.tableData = arr.map((item,index)=>{
        let {
          name,
          userName,
          userCompany,
          score,
          totalLabel,
          nowNum,
          oldNum,
          userId
        } = item
        let scoreValue = 0
        if(score%20 === 0){
          scoreValue = score/20
        }else{
          scoreValue = (score/20).toFixed(1)
        }
        return {
          index: index+1,
          name,
          userName,
          userCompany: userCompany|| '-',
          score,
          totalLabel,
          nowNum,
          oldNum,
          userId,
          scoreValue: new Number(scoreValue)
        }
      })
    },
    sortChange(arg){
      let {
        prop,
        order,
      } = arg;
      // let orderByy = 0

      if(prop === 'totalLabel' && order === 'ascending'){
        this.orderByy = 3
      }
      if(prop === 'totalLabel' && order === 'descending'){
        this.orderByy = 4
      }
      if(prop === 'score' && order === 'ascending'){
        this.orderByy = 2
      }
      if(prop === 'score' && order === 'descending'){
        this.orderByy = 1
      }

      // let data = {
      //   orderByy, // 	0：创建人、1：创建时间、2：截止时间
      // }
      this.currentPage = 1
      // this.getProListByUser(data)
      this.getProListByUser()
    },
    async getModalTable(option){
      let data = {
        status: 1,
        userId: ''
      }
      Object.assign(data,option)
      const prolist = await this.$axios.$post('/census/getNowOrHistoryProList',data)
      this.mapModalTable(prolist.data)
    },
    mapModalTable(arr){
      this.userTaskArr = arr.map((item,index)=>{
        let {
          proName,
          status,
          createByName,
          createTimeStr,
          expTimeStr,
          totalNum,
          isOverdue,
          rate
        } = item;
        let taskStatus = ''
            ,statusColor =''
            if(status !== 3 && isOverdue){
              // status = 2
            }
        switch(status){
          case -2:
            taskStatus = '预标注'
            statusColor = 'puple'
          break;
          case 0:
            taskStatus = '标注中'
            statusColor = 'blue'
          break;
          case 1:
            taskStatus = '确认标注'
            statusColor = 'green'
          break;
          case 2:
            taskStatus = '已逾期'
            // statusColor = 'el-icon-warning'
            statusColor = 'red'
          break;
          case 3:
            taskStatus = '已完成'
            statusColor = 'green'
          break;
          case 4:
            taskStatus = '已删除'
            statusColor = 'red'
          break;
          default:
            taskStatus = '全部'
        }
        return {
          index: index+1,
          proName,
          taskStatus,
          timeStatus: (createTimeStr?createTimeStr.replace(/-/g,'/') :'') + (expTimeStr?' - '+expTimeStr.replace(/-/g,'/') :''),
          totalNum,
          statusColor,
          taskType: status===2? '分类': '实体识别',
          labelRate: rate,
          isOverdue
        }
      })
    },
    async viewDetail(row,drag){
      if(drag){
        // 当前任务
        this.dialogObj.title = '当前任务'
        this.dialogObj.width = '824px'
        this.dialogObj.isCurr = true

      }else{
        this.dialogObj.title = '历史任务'
        this.dialogObj.width = '670px'
        this.dialogObj.isCurr = false
      }
      await this.getModalTable({
        status: this.dialogObj.isCurr? 1 : 0,
        userId: row.userId
      })
      this.showModal()
    },
  },


}
</script>

<style lang="scss">
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";
.userManger{
  position: relative;
  width: 100%;
  height: 100%;

  header{
    .left{
      @include classflex(flex-start);
      align-items: flex-start;
      flex-direction: column;
      height: 72px;
      h4{
        margin-bottom: 15px;
        color: rgba($color: #000000, $alpha: 0.8);
      }
    }
    .right{
      height: 72px;
      padding-top: 40px;
      .el-select{
        width: 180px;
      }
    }
  }
  .progress-wrapper{
    width: 100%;
    @include classflex();
    .text-dec{
      padding-left: 10px;
    }
  }
  .taskStatus-wrappre{
      @include classflex();
      width: 100%;
      .taskStatus-wrappre--left{
        @include classflex(flex-start);
      }
      .taskpoint{
      width: 4px;
      height: 4px;
      display: inline-block;
      margin-right: 4px;
      &.puple{
        background: $puple;
      }
      &.red{
        background: $red;
      }
      &.blue{
        background: $blue;
      }
      &.green{
        background: $green;
      }
      &.el-icon-warning{
        color: $red;
        width: 14px;
        height: 14px;;
      }
    }
  }
}
</style>
