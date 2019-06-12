<template>
  <div class="taskManger">
    <llp-table :tableHeight="tableHeight">
      <template slot="header">
          <div class="left">
            <h4>任务管理</h4>
            <searchInput
              placeholder="请输入内容"
              v-model="searchText"
              @change="searchChange"
            ></searchInput>
          </div>
          <div class="right">
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
            :height="tableHeight.height"
            :span-method="objectSpanMethod"
            :row-class-name='rowClassNameHandel'
            @sort-change='sortChange'
            v-loading="loadingTable"
            class="td_bottom--border"
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
              min-width="220"
             >
             <template slot-scope="scope">
               <div class="proName-wrappre">
                 <!-- <span class="border"> -->
                    <span>{{scope.row.proName}}</span>
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
                <img v-show="scope.row.isOverdue" class='img18' src="~/assets/img/task/isOverdue.png" alt="">
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
              prop="createTime"
              label="创建时间"
              width="170"
              sortable='custom'
              >
            </el-table-column>
            <el-table-column
              prop="expTime"
              label="截止时间"
              sortable='custom'
              width="170"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              >
              <template slot-scope="scope">
                    <el-button v-if="scope.row.status === 1 || scope.row.status === 3" type="text" size="small" disabled> 设置 </el-button>
                    <el-button v-else @click="jumpSetting(scope.row)" type="text" size="small"> 设置 </el-button>
                    <el-button @click="delTask(scope.row)" type="text" size="small"> 删除 </el-button>
                    <el-dropdown v-if="!(scope.row.status<1 && scope.row.labelNum>1)" trigger="hover" style="margin-left: 10px">
                      <el-button type="text" size="small" >导出<i class="el-icon-arrow-down el-icon--right" style="margin-left: 3px;"></i></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <a class="downTemplate" :href="domain+`/system/downAllTxt?proId=${scope.row.id}&isAll=0`" download="export.txt">有效数据</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a class="downTemplate" :href="domain+`/system/downAllTxt?proId=${scope.row.id}&isAll=1`" download="export.txt">全部数据</a>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <el-button  v-if="!(scope.row.status<1 && scope.row.labelNum>1)" type="text" size="small">
                      <a class="downTemplate" :href="domain+`/system/downAllTxt?proId=${scope.row.id}`" download="export.txt">导出</a>
                    </el-button> -->
                    <el-button type="text" size="small" disabled v-else>导出</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="标注人员"
              min-width="120"
            >
            </el-table-column>
            <el-table-column
              prop="stageName"
              label="审核状态"
              min-width="170"
            >
              <template slot-scope="scope">
                <el-button @click="toEvaluated(scope.row)" type="text" size="small" v-if="scope.row.stageName === '待评测'">{{scope.row.stageName}}</el-button>
                <el-button @click="toPendingReview(scope.row)" type="text" size="small" v-else-if="scope.row.stageName === '待审核'">{{scope.row.stageName}}</el-button>
                <span v-else>{{scope.row.stageName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="preLabelNum"
              label="个人任务量"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="taskType"
              label="检查"
              width="80"
              >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status!==3" @click="viewDetail(scope.row)" type="text" size="small"> 查看 </el-button>
                    <el-button type="text" size="small" disabled v-else>-</el-button>
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
    <!-- <el-button @click="showModal()">asd</el-button> -->
    <!-- 考核结果 -->
      <!-- 分类 -->
      <modalBox ref="result_calss"  :width='"720px"' :footerBtn='{sure:"通过",cancal:"未通过"}'  @sure='resultClassSure(2,5)' @faild='resultClassSure(2,4)'>
        <template slot="title">
            考核结果
        </template>
        <template slot="content">
          <div class="result_class-wrapper">
            <div class="top">
              <i class="green-circle"></i>
              <span class="text">考核量：{{resultClassInfor.rowsCount}}</span>
              <i class="green-circle"></i>
              <span class="text">正确率：{{resultClassInfor.percentage + '%'}}</span>
            </div>
            <llp-table :isHeader='false' :isFooter='false' class="llpMax">
              <template slot="main">
                <el-table
                  border
                  :data="resultClassArr"
                  class="modalTable"
                >
                <el-table-column
                  prop="showId"
                  label="序号"
                  width="60"
                  >
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="文件描述"
                  width="300"
                  >
                  <template slot-scope="scope">
                    <span class="ellipsis">{{scope.row.content}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cateAnswer"
                  label="正确答案"
                  >
                </el-table-column>
                <el-table-column
                  prop="cateName"
                  label="标注结果"
                  >
                </el-table-column>
                <el-table-column
                  prop="isTrue"
                  label="考核"
                  width="60"
                  >
                  <template slot-scope="scope">
                    <div class="isTrue-warpper">
                      <img v-if='scope.row.isTrue' src="~/assets/img/task/pass.png" alt="">
                      <img v-else src="~/assets/img/task/nopass.png" alt="">
                    </div>
                  </template>
                </el-table-column>

                </el-table>
              </template>
            </llp-table>
            <el-pagination
              @size-change="handelModalSizeChange(2,arguments)"
              @current-change="handelModalCurrPageChange(2,arguments)"
              :current-page.sync="resultClassPage.curPagerNo"
              :page-size="resultClassPage.pageSize"
              layout="prev, pager, next, jumper"
              :total="resultClassPage.totalPageNumber"
              style="text-align:right">
            </el-pagination>
          </div>
        </template>
      </modalBox>
      <!--  实体-->
      <modalBox ref="result_entity" :width='"1070px"' :footerBtn='{sure:"通过",cancal:"未通过"}'  @sure='resultClassSure(1,5)' @faild='resultClassSure(1,4)'>
        <template slot="title">
            考核结果
        </template>
        <template slot="content">
          <div class="result_class-wrapper">
            <div class="top">
              <i class="green-circle"></i>
              <span class="text">考核量：{{resultEntityInfor.rowsCount}}</span>
              <i class="green-circle"></i>
              <span class="text">正确率：{{resultEntityInfor.percentage + '%'}}</span>
            </div>
            <llp-table :isHeader='false' :isFooter='false' class="llpMax">
              <template slot="main">
                <el-table
                  border
                  :data="resultEntityArr"
                  class="modalTable"
                >
                <el-table-column
                  prop="showId"
                  label="序号"
                  width="60"
                  >
                </el-table-column>
                <el-table-column
                  prop="cateAnswer"
                  label="正确答案"
                  >
                  <template slot-scope="scope">
                    <div class="descript color">
                          <span class="span" v-for="(item,index) in JSON.parse(scope.row.cateAnswer)"  :key="index" :style="{background:item.background,color:item.color}">
                            {{item.value}}
                            <div  v-for="(it,i) in item.typeList" :key="i" class="typeName" :style="{background:it.background}">{{it.type}}
                            </div>
                        </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="htmlContent"
                  label="标注结果"
                  >
                  <template slot-scope="scope">
                    <div class="descript color">
                          <span class="span" v-for="(item,index) in  JSON.parse(scope.row.htmlContent)"  :key="index" :style="{background:item.background,color:item.color}">
                            {{item.value}}
                            <div  v-for="(it,i) in item.typeList" :key="i" class="typeName" :style="{background:it.background}">{{it.type}}
                            </div>
                        </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="isTrue"
                  label="考核"
                  width="60"
                  >
                  <template slot-scope="scope">
                    <div class="isTrue-warpper">
                      <img v-if='scope.row.isTrue' src="~/assets/img/task/pass.png" alt="">
                      <img v-else src="~/assets/img/task/nopass.png" alt="">
                    </div>
                  </template>
                </el-table-column>

                </el-table>
              </template>
            </llp-table>
            <el-pagination
              @size-change="handelModalSizeChange(1,arguments)"
              @current-change="handelModalCurrPageChange(1,arguments)"
              :current-page.sync="resultEntityPage.curPagerNo"
              :page-size="resultEntityPage.pageSize"
              layout="prev, pager, next, jumper"
              :total="resultEntityPage.totalPageNumber"
              style="text-align:right">
            </el-pagination>
          </div>
        </template>

      </modalBox>
    <!-- 任务提示  -->
      <modalBox ref="task_prompt" :isClickClose='false' :footerBtn='{sure:"确认"}'   @sure='pendingReset' >
        <template slot="title">
            任务提示
        </template>
        <template slot="content">
          <p>{{pedingReviewInfor.row && pedingReviewInfor.row.userName}}有未标注数据{{pedingReviewInfor.notfinish}}条，是否重新分配给他人？</p>
          <div class="task_prompt--radio">
              <el-radio-group v-model="pedingReviewInfor.radio">
                <el-radio label="重新分配"></el-radio>
                <el-radio label="全部丢弃"></el-radio>
              </el-radio-group>
          </div>
        </template>
      </modalBox>
    <!-- 任务审核  -->
    <modalBox ref="task_review" :width='"460px"'  :footerBtn='{sure:"通过",cancal:"未通过"}'  @sure='pendingReviewSure(8)' @faild='pendingReviewSure(7)'>
        <template slot="title">
            任务审核
        </template>
        <template slot="content">
          <div class="task_review--content">
            <div class="task_review--content-item">
              <div class="left">个人任务量：</div>
              <div class="right" >
                <span>{{pedingReviewInfor.total}}</span>
                <el-button type="text" @click="taskReviewView">
                  检查
                </el-button>
              </div>
            </div>
            <div class="task_review--content-item">
              <div class="left">任务进度：</div>
              <div class="right">
                <div class="right-point">
                  <i class="blue-circle"></i>
                  <span class="text">已标注：</span>
                  <i class="gary-circle"></i>
                  <span class="text">未标注：</span>
                  <i class="red-circle"></i>
                  <span class="text">丢弃：</span>
                </div>
                <div class="right-text">
                  <span>{{pedingReviewInfor.finish}}</span>
                  <span>{{pedingReviewInfor.notfinish}}</span>
                  <span>{{pedingReviewInfor.drop}}</span>
                </div>
                <div class="right-bar">
                  <div class="bar"></div>
                  <div class=" bar bar-blue" :class="pedingReviewInfor.redWidth===0?'ishave':''"  :style="{left : '0', width: pedingReviewInfor.blueWidth+'px'}"></div>
                  <div class="bar bar-red" :class="pedingReviewInfor.blueWidth===0?'ishave':''" :style="{left:pedingReviewInfor.blueWidth+'px',width:pedingReviewInfor.redWidth+'px'}"></div>
                  <b class="bar-text">{{pedingReviewInfor.prence}}%</b>
                </div>
              </div>
            </div>
            <div class="task_review--content-item">
              <div class="left">标注结果：</div>
              <div class="right right-result">
                <span v-for="(item,index) in pedingReviewInfor.result" :key="index">
                  {{item.name}}   {{item.count}}
                </span>
              </div>
            </div>
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
        height: 500
      },
      searchText: '',
      taskStatus: 1,
      tableData: [
        {
          createByName: "子平",
          createTime: "2019-05-14 14:35",
          currentLabelNum: 50,
          expTime: "2019-05-17 00:00",
          id: 4766,
          index: 1,
          isOneMarker: true,
          isSingle: 0,
          labelNum: 1,
          labelRate: 0,
          labelType: 1,
          preLabelNum: 50,
          proName: "test_script3",
          stageName: "任务标注",
          status: 0,
          status2: 5,
          statusColor: "blue",
          taskStatus: "标注中",
          taskType: "实体识别",
          userId: 132,
          userName: "子平",
        }
      ],
      taskStatusArr: [
        {
          val: 2,
          label: '全部'
        },

        {
          val: 0,
          label: '已完成'
        },
        {
          val: 1,
          label: '进行中'
        }
      ],
      currentPage: 1,
      totalPageNumber: 0,
      pageSize: 20,
      rowStashIndex: 0,
      resultClassArr: [],
      resultEntityArr: [],
      resultClassPage: {
        curPagerNo: 1,
        pageSize: 3,
        totalPageNumber: 0
      },
      resultEntityPage: {
        curPagerNo: 1,
        pageSize: 3,
        totalPageNumber: 0
      },
      resultClassInfor: {
        rowsCount: 0,
        percentage: 0,
        userId: '',
        proId: ''
      },
      resultEntityInfor: {
        rowsCount: 0,
        percentage: 0,
        userId: '',
        proId: ''
      },
      pedingReviewInfor: {
        finish: 0,
        result: [],
        drop: 0,
        notfinish: 0,
        total: 0,
        blueWidth: 0,
        redWidth: 0,
        prence: 0,
        row: null,
        radio: '重新分配'
      },
      rowArr: [],
      orderByy: 2,
      loadingTable: true
    }
  },
  computed: {
    spanArr(){
      return [].concat.apply([],this.getSpanArr(this.rowArr))
    },
    rowStyleArr(){
      return this.getRowStyleArr()
    },
    spanIndex(){
      let spanIndex = 0
      this.spanArr.forEach((element,index)=>{
        if(element > 0 ){
          spanIndex = index
        }
      })
      return spanIndex
    },
    domain(){
      return this.$store.state.domain
    },
  },
  created() {
    this.init()
  },
  mounted(){

  },
  methods: {
    init() {
      if(process.client){
        this.getProListByUser()
        this.getProlistDebounce = this.$helper.debounce(this.getProListByUser)
      }
      if(process.server){

      }
    },
    showModal(refkey){
      // this.$refs.result_calss.showModal()
      // this.$refs.result_entity.showModal()
      // this.$refs.task_prompt.showModal()
      // this.$refs.task_review.showModal()
      this.$refs[refkey].showModal()

    },
    searchChange(val){
      this.currentPage = 1
      // this.getProListByUser()
      // 解决 click change 多次调用
      this.getProlistDebounce()
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
        proName: this.searchText,
        status: this.taskStatus,
        curPagerNo: this.currentPage,
        pageSize: this.pageSize,
        orderByy: this.orderByy
      }
      Object.assign(data,option)
      const prolist = await this.$axios.$post('/census/getProjectListByToken',data)
      this.mapTable(prolist.data.list)
      this.totalPageNumber = prolist.data.rowsCount
      this.loadingTable = false
    },
    mapTable(arr){
      // 2D数组 将内部嵌套的数据转为1级 生成表格
      // 存储 需要上色的表格既然 几行合并为一行
      let rowArr = [] //行 记录
      let listArr = arr.map((item,index)=>{
        let {
          proName, //名称
          labelType, // 类型
          status, // 状态
          createByName, // 创建人
          createTimeStr, // 创建时间
          expTimeStr,
          totalNum,
          rate,
          userProject,
          id,
          isSingle,
          labelNum,
          isOverdue
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
        let parent = {
          proName,
          taskType: labelType===2? '分类':'实体识别',
          taskStatus,
          createByName,
          createTime: createTimeStr,
          expTime: expTimeStr || '-',
          currentLabelNum : totalNum || 0,
          labelRate: rate,
          statusColor,
          index: index+1,
          id,
          status,
          isSingle,
          labelType,
          labelNum,
          isOverdue
        }
        if(item.userProject && item.userProject.length > 0){
          rowArr.push(item.userProject.length)
          if(item.userProject.length === 1){
             parent.isOneMarker = true
          }else{
            if((item.userProject.filter(item=>item.stageName === '已完成').length) === (item.userProject.length-1)){
             parent.isOneMarker = true
            }else{
             parent.isOneMarker = false
            }
          }
          return item.userProject.map(item=>{
            let Obj = {
              userName: item.userName || '-',
              stageName: item.stageName || '-',
              // preLabelNum: item.preLabelNum,
              preLabelNum: item.num,
              userId: item.userId,
              status2: item.status
            }
            Object.assign(Obj,parent)
            return Obj
          })
        }else{
          // userProject 为空的问题
          rowArr.push(1)
          let Obj = {
              userName: '-',
              stageName: '-',
              preLabelNum: '-'
            }
          Object.assign(Obj,parent)
          return [Obj]
        }
      })
      //
      this.rowArr = rowArr
      // console.log(this.rowArr,'----rowArr----')
      this.tableData = [].concat.apply([], listArr);
      // console.log(this.tableData,'----tabledata----')

    },
    sortChange(arg){
      let {
        prop,
        order,
      } = arg;

      if(prop === 'createTime' && order === 'ascending'){
        this.orderByy = 1
      }
      if(prop === 'createTime' && order === 'descending'){
        this.orderByy = 2
      }
      if(prop === 'expTime' && order === 'ascending'){
        this.orderByy = 3
      }
      if(prop === 'expTime' && order === 'descending'){
        this.orderByy = 4
      }

      // let data = {
      //   orderByy, // 	0：创建人、1：创建时间、2：截止时间
      // }
      this.currentPage = 1
      this.getProListByUser()
    },
    viewDetail(row){
      let proId, userId, status = 0;
      proId = row.id
      userId = row.userId
      if(row.status === -2 || row.status === 0){
        //
        let params = {
          proId,
          userId,
          labelStatus: row.status===-2?'PREPARE_LABEL':'FORMAL_LABEL',
        }
        this.$axios.$get('/push/viewCheck',{params})
        .then(res=>{
          if(res.code === 0){
            if(res.data === 1){
              this.jumpToCheck(row,userId,proId,status)
            }else{
            // PREPARE_LABEL(-2, "预标注"),
            // CHECK_LABEL(-1, "考核标注"),
            // FORMAL_LABEL(0, "正式标注"),
            // CONFIRM_LABEL(1, "确认标注");
              // 该用户未开始标注
              this.$message({
                type: 'error',
                message: '该用户未开始标注'
              })
            }
          }
        })
      }else{
        this.jumpToCheck(row,userId,proId,status)
      }
    },
    jumpToCheck(row,userId,proId,status){
      if(row.status === -2 || row.status === -1 ){
          status = row.status
        }
        if(row.status === 1 ){
          status = row.status
        }
        if(row.status === 0){
          if( 2<= row.status2 && row.status2 <= 4 ){
            status = -1
          }
          if( 4< row.status2 && row.status2 <= 8 ){
            status = 0
          }
        }
        let query = {
          userId,
          proId,
          status
        }
        if(row.labelType === 2) {
          // classreview
          this.$router.push({
            path: '/classreview',
            query,
          })
        }else{
          // entityreview
          this.$router.push({
            path: '/entityreview',
            query,
          })
        }
    },
    rowClassNameHandel({row,rowIndex}){
      let clasName = ''
      if(rowIndex === this.spanIndex){
        clasName = 'spanIndex'
      }
      return this.rowStyleArr.indexOf(rowIndex) > -1 ? 'taskstriped '+clasName : clasName
    },
    getRowStyleArr(){
      let rowIndexArr = []
      let styleIndexArr = []
      let l = this.$_.reduce(this.rowArr,(sum,n)=>(sum+n),0)
      for(let i = 0 ; i < l ; i++){
        rowIndexArr.push(i)
      }
      styleIndexArr = this.rowArr.map((element,index)=> {
        let start = 0
        if(index !== 0){
           start = this.$_.reduce(this.rowArr.slice(0,index),(sum,n)=>(sum+n),0)
        }
        // console.log(start)
        let arr = rowIndexArr.slice(start,l)
        return this.$_.chunk(arr,element)[0]
      }).filter((item,index)=>{
        return index%2 !== 0;
      })
      return [].concat.apply([],styleIndexArr)
    },
    getSpanArr(rowArr){
     return rowArr.map(item=>{
        let everyGroup = []
        if(item > 1){
          everyGroup.push(item)
          for(let i = 1; i < item; i++ ){
            everyGroup.push(0)
          }
        }else{
          everyGroup.push(item)
        }
        return everyGroup
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 解决一开始 假表格显示不全
        if(this.loadingTable){return [1,1]}
        if (columnIndex <= 8) {
          let row = this.spanArr[rowIndex]
          let col = row === 0 ? 0 : 1
          return {
            rowspan: row,
            colspan: col
          };
        }
    },
    resultClassSure(labelType,status){
        // 	3提交验收数据4验收数据不通过5 验收通过（任务标注）6正式已提交 7 正式未通过 8 正式审核通过
      this.getComApi({
        option: {
          userId: labelType === 2 ? this.resultClassInfor.userId : this.resultEntityInfor.userId,
          proId: labelType === 2 ? this.resultClassInfor.proId : this.resultEntityInfor.proId,
          status
        },
        url: '/label/updateUserProjectStautaByProIdAndUserId'
      })
      .then(res=>{
        if(res.code === 0 ){
          this.$message({
            type: 'success',
            message: status===5?'考核通过':'考核未通过'
          })
          this.getProListByUser()
        }
      })
    },
    async pendingReviewSure(status){
      this.getComApi({
        option: {
          userId: this.pedingReviewInfor.userId,
          proId: this.pedingReviewInfor.proId,
          status
        },
        url: '/label/updateUserProjectStautaByProIdAndUserId'
      })
      .then(res=>{
        if(res.code === 0 ){
          // 交叉验证
          if(status === 8){
            this.$axios.$post(`/labelpro/getNeedCheckEachOther`,{
              proId: this.pedingReviewInfor.proId,
            })
            .then(success=>{
              if(success.code === 0){
                if(success.data === 1){
                  this.loadingTable = true
                  this.$store.dispatch('CHECK_OTHER',{
                    proId: this.pedingReviewInfor.proId,
                  })
                  .then((res)=>{
                    console.log(res)
                    if(res.code === 0){
                      this.getProListByUser()
                    }
                  })

                }else{
                  this.getProListByUser()
                }
              }
            })
          }else{
            // 未通过刷新列表
            this.getProListByUser()
          }
          this.$message({
            type: 'success',
            message: status === 8?'审核通过':'审核未通过'
          })
        }
      })
      if(this.pedingReviewInfor.notfinish > 0 && status===8){
        if(!this.pedingReviewInfor.row.isOneMarker){
          this.showModal('task_prompt')
        }else{
          // 标注人员只有1人标注 默认丢弃
          this.pendingReset(2)
        }
      }
    },
    pendingReset(ss){
      let status
      if(ss){
        status = ss
      }else{
        status = this.pedingReviewInfor.radio === '重新分配'? 1 : 2
      }
      this.getComApi({
        option: {
          userId: this.pedingReviewInfor.userId,
          proId: this.pedingReviewInfor.proId,
          status,
        },
        url: '/labelpro/dealDataRepickOrDrop'
      })
      .then(res=>{
        if(res.code === 0 ){
          this.$message({
            type: 'success',
            message: status===1? '重新分配成功': '丢弃成功'
          })
          // 刷新列表
          this.getProListByUser()
          // this.$store.dispatch('CHECK_OTHER',{
          //   proId: this.pedingReviewInfor.proId,
          // })
        }
      })
    },

    taskReviewView(){
      //任务审核  任务量检查
      this.viewDetail(this.pedingReviewInfor.row)
    },
    jumpSetting(row){
      if(row.isSingle === 1){
        this.$router.push({
          path: '/singletaskset',
          query: {
            proId: row.id
          }
        })
      }else{
        this.$router.push({
          path: '/multaskset',
          query: {
            proId: row.id
          }
        })
      }
    },
    delTask(row){
      this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{
        let data = {
          proId: row.id,
          labelType: row.labelType
        }
        this.$axios.$post('/pro/deleteProject',data)
        .then(res=>{
          if(res.code === 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          if(this.tableData.length === 1){
            this.currentPage = (this.currentPage-1)<=1? 1: (this.currentPage-1);
          }
          this.getProListByUser()
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    getComApi({url,option}){
      //  /census/getUserChenkListIsRightOrNot pageSize: 3, curPagerNo: 1
      //  /census/dealDataRepickOrDrop
      // /census/getNotFinishNum
      // /census/getUserChenkAccry
      let data = {
        userId: '',
        proId: '',
      };
      Object.assign(data,option)
      return new Promise((resolve,reject)=>{
        this.$axios.$post(url,data)
        .then(res=>{
          resolve(res)
        })
      })
    },
    toEvaluated(row){
      let labelType = row.labelType
      if(labelType === 2){
        this.showModal('result_calss')
        this.resultClassInfor.userId = row.userId
        this.resultClassInfor.proId = row.id
      }else{
        this.showModal('result_entity')
        this.resultEntityInfor.userId = row.userId
        this.resultEntityInfor.proId = row.id
      }
      this.updateResultModal(labelType)
      this.getComApi({
        option: {
          userId: row.userId,
          proId: row.id,
        },
        url: '/census/getUserChenkAccry'
      })
      .then(res=>{
        if(res.code === 0){
         labelType === 2 ? this.resultClassInfor.percentage = res.data : this.resultEntityInfor.percentage = res.data
        }
      })
    },
    updateResultModal(labelType){
      this.getComApi({
        option:{
          userId: labelType === 2 ? this.resultClassInfor.userId : this.resultEntityInfor.userId,
          proId: labelType === 2 ? this.resultClassInfor.proId : this.resultEntityInfor.proId,
          pageSize: labelType === 2 ? this.resultClassPage.pageSize : this.resultEntityPage.pageSize,
          curPagerNo: labelType === 2 ? this.resultClassPage.curPagerNo: this.resultEntityPage.curPagerNo
        },
        url: '/census/getUserChenkListIsRightOrNot'
      })
      .then(res=>{
        if(res.code === 0){
          if(labelType === 2){
            this.resultClassArr = res.data.list
            // 总条数
            this.resultClassPage.totalPageNumber = res.data.rowsCount
            this.resultClassInfor.rowsCount = res.data.rowsCount
          }else{
            this.resultEntityArr = res.data.list
            this.resultEntityPage.totalPageNumber = res.data.rowsCount
            this.resultEntityInfor.rowsCount = res.data.rowsCount
          }
        }
      })
    },
    toPendingReview(row){
      // this.$refs.result_calss.showModal()
      // this.$refs.result_entity.showModal()
      // this.$refs.task_prompt.showModal()
      let labelType = row.labelType
      this.showModal('task_review')
      this.pedingReviewInfor.userId = row.userId
      this.pedingReviewInfor.proId = row.id
      this.pedingReviewInfor.row = row
      // 获取标注进度
      this.getComApi({
        option: {
          userId: row.userId,
          proId: row.id,
          status: 0,
        },
        url: '/census/getLabelRate'
      })
      .then(res=>{
        if(res.code === 0){
          this.pedingReviewInfor.total = res.data[0].count
          this.pedingReviewInfor.finish = res.data[1].count
          this.pedingReviewInfor.drop = res.data[2].count
          this.pedingReviewInfor.notfinish = res.data[3].count
          this.pedingReviewInfor.blueWidth =  Math.floor((this.pedingReviewInfor.finish/this.pedingReviewInfor.total*220))
          this.pedingReviewInfor.redWidth =  Math.floor((this.pedingReviewInfor.drop/this.pedingReviewInfor.total*220))
          this.pedingReviewInfor.prence = Math.floor(((this.pedingReviewInfor.drop+this.pedingReviewInfor.finish)/this.pedingReviewInfor.total)*100)
        }
      })
      // 标注类型的个数
      this.getComApi({
        option: {
          userId: row.userId,
          proId: row.id,
          status: 0,
        },
        url: '/census/getEntityAndCateCensus'
      })
      .then(res=>{
        if(res.code === 0){
          this.pedingReviewInfor.result = res.data
        }
      })

    },
    handelModalSizeChange(labelType,arg){
      // console.log(...arg)
      labelType === 2 ? this.resultClassPage.pageSize = arg[0]: this.resultEntityPage.pageSize = arg[0]
      this.updateResultModal(labelType)
    },
    handelModalCurrPageChange(labelType,arg){
      labelType === 2 ? this.resultClassPage.curPagerNo = arg[0]: this.resultEntityPage.curPagerNo = arg[0]
      this.updateResultModal(labelType)
    },
    exportDetail(row){
      console.log(row)
      // status <1 labelNum > 1 灰色
        // let params = {
        //   proId: row.id,
        // }
        // this.$axios.$get('/system/downAllTxt',{params})
        // .then(res=>{

        // })

    }
  }
}
</script>

<style lang="scss" scoped>
// @import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";
.taskManger{
  position: relative;
  width: 100%;
  height: 100%;
  .ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
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
        width: 260px;
      }
    }
  }
  .proName-wrappre{
    @include classflex();
    img{
      margin-right: 5px;
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
    };
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
  .downTemplate{
    color: $blue;
  }
  .green-circle{
    @include cricle($green);
  }
  .blue-circle{
    @include cricle($blue);
  }
  .red-circle{
    @include cricle($red);
  }
  .gary-circle{
    @include cricle(#E5EAF2);
  }
  .result_class-wrapper{
    .top{
      @include classflex(flex-start);
      .text{
        margin-right: 30px;
      }
      .green-circle{
        margin-right: 5px;
      }
    }
    .llp-table {
      padding: 0;
    }
  }
  .task_review--content{
    .task_review--content-item{
      @include classflex();
      align-items: flex-start;
      line-height: 40px;
      .left{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color: rgba($color: #000000, $alpha: 0.7);
      }
      .right{
        flex: 1;
        @include classflex();
        flex-direction: row;
        flex-flow: wrap;
        .right-point{
          width: 70px;
          @include classflex(flex-start);
          flex-direction: row;
          flex-flow: wrap;
          i{
            margin-right: 5px;
          }
        }
        .right-text{
          flex: 1;
          padding-right: 30px;
          @include classflex(flex-start);
          align-items: flex-end;
          flex-direction: column;
        }
        .right-bar{
          width: 100%;
          padding-right: 30px;
          position: relative;
          height: 40px;
          @include classflex(flex-start);
          .bar{
            width: 220px;
            height: 10px;
            background: #E5EAF2;
            border-radius: 10px;
          }
          .bar-blue{
            width: 50px;
            background: $blue;
            position: absolute;
            top: 15px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            &.ishave{
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }
          .bar-red{
            left: 50px;
            width: 20px;
            background: $red;
            position: absolute;
            top: 15px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            &.ishave{
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }
          }
          .bar-text{
            position: absolute;
            right: 30px;
            font-weight: normal;
            color: #000000;
          }
        }
      }
      .right-result{
        @include classflex(flex-start);
        flex-direction: row;
        flex-flow: wrap;
        max-height: 200px;
        overflow-y: auto;
        span{
          margin-right: 30px;
        }
      }
    }
  }
  .task_prompt--radio{
    height: 40px;
    @include classflex(center);
  }
  .llpMax{
    max-height: 300px;
    overflow-y: auto;
  }
}

/deep/.el-table__row.taskstriped{
  background: $table-background-striped;
  /deep/td{
    background: $table-background-striped;
  }
}
/deep/.el-table__row:not(:last-child){
  /deep/td:nth-last-child(1){
   border-bottom: 1px solid $table-border-color;
  }
  /deep/td:nth-last-child(2){
   border-bottom: 1px solid $table-border-color;
  }
  /deep/td:nth-last-child(3){
   border-bottom: 1px solid $table-border-color;
  }
  /deep/td:nth-last-child(4){
   border-bottom: 1px solid $table-border-color;
  }
}
</style>
<style lang="scss">
.right-result{
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
</style>
