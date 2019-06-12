<template>
  <div class="task-list">
    <llp-table :tableHeight="tableHeight">
      <template slot="header">
          <dropDown :handelSelect='handelSelect' :dropMenu='dropMenu.filter(item=>item.auth)'></dropDown>
          <div class="right">
              <searchInput
                placeholder="请输入关键字"
                v-model="searchText"
                @change="searchChange"
              ></searchInput>
              <span class="mr16 f14">
                任务类型
              </span>
              <el-select
                size="small"
                v-model="taskType"
                @change="selectChange"

              >
                <el-option v-for="(item,index) in taskTypeArr" :key="index" :value="item.val" :label="item.label"></el-option>
              </el-select>
              <span class="mr16 f14">
                任务状态
              </span>
              <el-select
                size="small"
                v-model="taskStatus"
                @change="selectChange"
              >
                <el-option v-for="(item,index) in taskStatusArr" :key="index" :value="item.val" :label="item.label"></el-option>
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
            @cell-click='jumpNext'
            v-if="firstTableLoad"
            v-loading="loadingTable"
            style="width: 100%">
            <el-table-column
              prop="proName"
              label="任务名称"
              min-width="220"
              >
              <template slot-scope="scope">
               <div class="proName-wrappre">
                 <!-- <span class="border"> -->
                    <span class='blue' >{{scope.row.proName}}</span>
                    <img class="img18" v-show="scope.row.isSingle===1" src="~/assets/img/task/sample.png" alt="">
                 <!-- </span> -->
               </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="taskType"
              label="任务类型"
              min-width="100"
              >
            </el-table-column>
            <el-table-column
              prop="taskStatus"
              label="任务状态"
              min-width="130"
             >
             <template slot-scope="scope">
               <div class="taskStatus-wrappre">
                <div class='taskStatus-wrappre--left'>
                  <i class="taskpoint" :class="[scope.row.statusColor]"></i>
                  <span>{{scope.row.taskStatus}}</span>
                </div>
                <img class='img18' v-show="scope.row.isOverdue"  src="~/assets/img/task/isOverdue.png" alt="">
                <!-- <i class="taskpoint" :class="scope.row.isOverdue?'el-icon-warning':''"></i> -->
               </div>
             </template>
            </el-table-column>
            <el-table-column
              prop="currentLabelNum"
              label="当前任务量"
              min-width="110"
              >
            </el-table-column>
            <el-table-column
              label="当前进度"
              width="200"
             >
              <template slot-scope="scope">
                <div class="progress-wrapper">
                  <llpProgress :percentage='scope.row.labelRate'></llpProgress>
                  <span class="text-dec">{{scope.row.labelRate + '%'}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createByName"
              label="创建人"
              sortable='custom'
              min-width="120"
              >
            </el-table-column>
            <el-table-column
              prop="labelUserCount"
              label="标注人员"
              min-width="100"
             >
            <template slot-scope="scope">
              <div class="labelUserCount-wrappre">
                  <!-- <span class="border">{{scope.row.labelUserCount}}</span> -->
                  <span class="blue">{{scope.row.labelUserCount}}</span>
              </div>
            </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable='custom'
              width='170'
            >
            </el-table-column>
            <el-table-column
              prop="expTime"
              label="截止时间"
              sortable='custom'
              width='170'
            >
            </el-table-column>
            <el-table-column
              label="任务详情"
              min-width="100"
             >
                <template slot-scope="scope">
                    <el-button  @click="viewDetail(scope.row)" type="text" size="small"> 查看 </el-button>
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
                :total="totalNum">
              </el-pagination>
      </template>
    </llp-table>
  </div>
</template>

<script>

import llpTable from '~/components/table/llpTable';
import dropDown from '~/components/UI/dropDown';
import searchInput from '~/components/UI/searchInput';
import llpProgress from '~/components/UI/llpProgress';


export default {
  layout: 'home',
  components: {
    llpTable,
    dropDown,
    searchInput,
    llpProgress
  },
  async asyncData(context) {
    // 渲染组件之前获取数据

  },
  data() {
    return {
      tableHeight: {
        height: 500
      },
      dropMenu: [
        {
          name: '创建单人任务',
          auth: true
        },
        {
          name: '创建多人任务',
          auth: false
        },
      ],
      searchText: '',
      taskStatus: 5,
      taskType: 3,
      tableData: [
        {
          createByName:"雨龙",
          createTime:"2019-05-08 14:29",
          currentLabelNum:45,
          expTime:"2019-05-31 00:00",
          id:4684,
          isSingle:0,
          labelRate:17,
          labelType:1,
          labelUserCount:2,
          proName:"实体四十四",
          status:0,
          statusColor:"blue",
          taskStatus:"标注中",
          taskType:"实体识别",
        }
      ],
      loadingTable: true,
      firstTableLoad: false,
      currentPage: 1,
      totalNum: 0,
      pageSize: 20,
      taskTypeArr: [
        {
          val: 3,
          label: '全部'
        },
        {
          val: 1,
          label: '实体识别'
        },
        {
          val: 2,
          label: '分类'
        }
      ],
      taskStatusArr: [
        {
          val: 5,
          label: '全部'
        },
        {
          val: -2,
          label: '预标注'
        },
        {
          val: 0,
          label: '标注中'
        },
        {
          val: 1,
          label: '确认标注'
        },
         {
          val: 2,
          label: '已逾期'
        },
        {
          val: 3,
          label: '已完成'
        },
      ],
      orderObj: {
        sort : 0,
        orderBy: 0
      }
    }
  },
  computed: {
    userRole(){
      return this.$store.state.userRole
    }
  },
  created() {
    this.init()

  },
  mounted() {
    this.$nextTick(()=>{
      this.firstTableLoad = true
      this.getRole()
    })

  },
  methods: {
    init() {
      if(process.client){
        this.getProListByUser()
      }
      if(process.server){

      }
    },
    handelSelect(item) {
      // console.log(item)
      let {name} = item
      if(name === '创建多人任务'){
        // console.log(this.$router)
        this.$router.push('/multask')
      }else if(name === '创建单人任务'){
        this.$router.push('/singletask')
      }
    },
    searchChange(val){
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
    selectChange(){
      this.currentPage = 1
      this.getProListByUser()
    },
    async getProListByUser(option){
      this.loadingTable = true
      let status = this.taskStatus
      let isOverdue = 2
      if(this.taskStatus === 2){
        isOverdue = 1
        status = 5
      }
      let data = {
        keyword:this.searchText,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        labelType: this.taskType, //	1 ：实体识别、2：分类、3：全部
        status, // 	-2：预标注、0：标注中、1：确认标注、2：已逾期、3：已完成 . 4：已删除、5：全部
        orderBy: this.orderObj.orderBy, // 	0：创建人、1：创建时间、2：截止时间
        sort: this.orderObj.sort, //	0：降序、1：升序
        isUpdate: 1, // 跳转到首页的时候传1不跳转页面的时候传0
        isOverdue,
      }
      Object.assign(data,option)
      const prolist = await this.$axios.$post('/pro/showProList',data)
      // console.log(prolist.data)
      // All_list = prolist.data.resultList
      this.totalNum = prolist.data.totalNum
      // if(All_list.length> 0){
      //   let max = Math.floor(this.totalNum/this.pageSize)
      //   this.mapTable(All_list[this.currentPage-1 < max?(this.currentPage-1):max])
      // }else{
      //   this.mapTable([])
      // }
      this.mapTable(prolist.data.resultList)
      this.loadingTable = false
    },
    mapTable(arr){
      this.tableData = arr.map(item=>{
        let {
          proName,
          labelType,
          status,
          createByName,
          createTime,
          expTime,
          currentLabelNum,
          labelRate,
          labelUserCount,
          isOverdue,
          id,
          isSingle,
          pageNumber
        } = item;
        let taskStatus = ''
            ,statusColor =''
            if(isOverdue){
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
          proName,
          taskType: labelType===2? '分类':'实体识别',
          taskStatus,
          createByName,
          createTime,
          expTime,
          currentLabelNum,
          labelRate,
          labelUserCount,
          statusColor,
          id,
          labelType,
          status,
          isSingle,
          pageNumber,
          isOverdue
        }
      })
    },
    sortChange(arg){
      let {
        prop,
        order,
      } = arg;

      if(prop === 'createByName'){
        this.orderObj.orderBy = 0
      }
      if(prop === 'createTime'){
        this.orderObj.orderBy = 1
      }
      if(prop === 'expTime'){
        this.orderObj.orderBy = 2
      }
      if(order === 'ascending'){
        this.orderObj.sort = 1
      }
      if(order === 'descending'){
        this.orderObj.sort = 0
      }
      //   orderBy, // 	0：创建人、1：创建时间、2：截止时间
      //   sort, //	0：降序、1：升序
      this.currentPage = 1 // 排序跳转第一页
      this.getProListByUser()
    },
    viewDetail(row){
      if(row.isSingle === 1){
        // 单人
        this.$router.push({
          path: '/singletaskdetail',
          query: {
            proId: row.id
          }
        })
      }else{
        this.$router.push({
          path: '/multaskdetail',
          query: {
            proId: row.id
          }
        })
      }
    },
    async jumpNext(row, column, cell, event){
      // row, column, cell, event
      if(column.property === "proName"){
       let jumpStatus =  await this.getUserLabelPage({
          labelType: row.labelType,
          proId: row.id,
        })
        let statusObj = {
          '-10': '您不是该阶段的标注人',
          1: '预标注数据已提交',
          3: '验收数据已提交',
          6: '正式标注数据已提交',
          8: '正式标注数据已审核通过',
          11: '确认标注已完成',
          14: '该项目已完成'
        }
        if(statusObj[jumpStatus] ){
          this.$message({
            type: 'infor',
            message: statusObj[jumpStatus]
          })
        }else{
          let pathObj = {
            0: ['/entityexample','/classexamp'],
            2: ['/entitycheck','/classcheck'],
            4: ['/entitycheck','/classcheck'],
            5: ['/entityformal','/classformal'],
            7: ['/entityformal','/classformal'],
            10: ['/classcommit','/classcommit'],
          }
          this.$router.push({
            path: pathObj[jumpStatus][row.labelType-1] || '/',
            query: {
              proId: row.id,
              page: row.pageNumber
            }
          })
        }
      }
      if(column.property === "labelUserCount"){
        this.$router.push({
          path:  row.isSingle === 1? '/singletaskdetail': '/multaskdetail',
          query: {
            proId: row.id,
            jump: 'jump',
          }
        })
      }
    },
    async getUserLabelPage(option){
       let data = {
        labelType: '', //	1：实体识别、2：分类、3：全部
        proId: '',
        userId: this.$getCookie('userId')
      }
      Object.assign(data,option)
      const prolist = await this.$axios.$post('/labelpro/getUserLabelPage',data)
      return prolist.data
    },
    async getRole() {
      if(!this.$store.state.userRole){
        await this.$store.dispatch('GET_ROLE',{
          userId: this.$getCookie("userId")
        })
      }
      this.initAuth()
    },
    initAuth(){
      if(this.userRole){
        this.dropMenu[1].auth = this.userRole.taskManger
        // console.log(this.dropMenu[0].auth)
      }
    },

  },
  watch: {
    userRole(newVal, oldVal){
      // console.log('tasklist userRole')
      if(newVal){
        this.initAuth()
      }
    }
  }
}
</script>

<style lang="scss">
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";
.task-list{
  position: relative;
  width: 100%;
  height: 100%;
  .progress-wrapper{
    width: 100%;
    @include classflex();
    .text-dec{
      padding-left: 10px;
    }
  }
  .llp-table main .el-table__body tbody td:nth-child(1){
    cursor: pointer;
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
  .proName-wrappre{
    @include classflex();
    cursor: pointer;
    img{
      margin-right: 5px;
    }
    &:hover{
      .border{
        border-bottom: 1px solid $blue;
      }
    }
    .blue{
      color: $blue;
    }
  }
  .labelUserCount-wrappre{
    @include classflex();
    cursor: pointer;
    &:hover{
      .border{
        border-bottom: 1px solid $blue;
      }
    }
    .blue{
      color: $blue;
    }
  }
}
</style>
