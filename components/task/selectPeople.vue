<template>
  <el-dialog
    :visible.sync='modalBoxShow'
    @open='handelOpen'
    @opened='handelOpened'
    @close='handelClose'
    @closed='handelClosed'
    width="900px"
    top='10vh'
    title="选择标注人员"
    custom-class='select-people'
    :close-on-click-modal='isClickClose'
    :close-on-press-escape='isClickClose'
  >
    <div class="content">
      <div class="left">
        <searchInput v-model="searchVal" size='modal' @change="search"></searchInput>
        <ul class="mark-list">
          <li class="mark-list__item" v-for="(item,index) in markListArr" :key="index">
            <div class="span"><span>{{item.name}}</span></div>
            <div class="span"><span>{{item.dept}}</span></div>
            <div class="span">
              <img @click="addMarkPeople(item,index)" class="img16" src="~/assets/img/task/plus.png" alt="" srcset="">
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="top">
           <div class="top-title">
             <el-radio v-model="radioMark" label="1">任务标注</el-radio>
             <div class="top-title-right">
               <span v-if="everyDataMarkCount<=1">{{remainder1}}</span><img v-if="!isSetting" @click="allDel(true)" class="img20" src="~/assets/img/task/rubbish.png" alt="">
             </div>
           </div>
           <ul class="taskMark" :class="auth.length>0?'':'h400'">
             <li class="taskMark-item" v-for="(task,index) in taskMarkArr" :key="index">
               <span class="item-span">{{task.name}}</span>
                <span class="item-span">{{task.dept}}</span>
                <span class="item-span" v-show="everyDataMarkCount === 1">
                  <div class="sele-mark-num">
                    <el-input-number
                      class="mark-num-input"
                      v-model="task.num"
                      controls-position="right"
                      @change="numChange(true,task,arguments)"
                      @focus="radioSure(true)"
                      :min="isSetting?0:1"
                      :max="100">
                      </el-input-number>
                      <div class="right-num">
                        <div class="right-num-left"></div>
                        <div class="right-btn-top" @click="add(true,index,'taskMarkArr')">
                          <i class="el-icon-caret-top"></i>
                        </div>
                        <div class="right-btn-line"></div>
                        <div class="right-btn-bottom" @click="mul(true,index,'taskMarkArr')">
                          <i class="el-icon-caret-bottom"></i>
                        </div>
                      </div>
                  </div><span>%</span>
                </span>
                <span class="item-span last">
                  <img @click="delMarkPeople(task,index,true)" class="img16" src="~/assets/img/task/mul.png" alt="" srcset="">
                </span>
             </li>
           </ul>
        </div>
        <div class="bottom" v-if="auth.length>0 && !isSetting">
          <div class="top-title">
            <el-radio v-model="radioMark" label="2">{{(auth[1]===2&&auth[0]===2)?'示例标注+考核答案':auth[0]===2?'示例标注':'考核答案'}}</el-radio>
             <div class="top-title-right">
               <span v-if="everyDataMarkCount<=1">{{remainder2}}</span><img @click="allDel(false)" class="img20" src="~/assets/img/task/rubbish.png" alt="">
             </div>
           </div>
           <ul class="exMarkArr">
             <li class="exMarkArr-item" v-for="(task,index) in exMarkArr" :key="index">
               <span class="item-span">{{task.name}}</span>
                <span class="item-span">{{task.dept}}</span>
                <span class="item-span" v-show="everyDataMarkCount === 1">
                  <div class="sele-mark-num">
                    <el-input-number
                      class="mark-num-input"
                      v-model="task.num"
                      controls-position="right"
                      @change="numChange(false,task,arguments)"
                      :min="isSetting?0:1"
                      @focus="radioSure(false)"
                      :max="100">
                      </el-input-number>
                      <div class="right-num">
                        <div class="right-num-left"></div>
                        <div class="right-btn-top" @click="add(false,index,'exMarkArr')">
                          <i class="el-icon-caret-top"></i>
                        </div>
                        <div class="right-btn-line"></div>
                        <div class="right-btn-bottom" @click="mul(false,index,'exMarkArr')">
                          <i class="el-icon-caret-bottom"></i>
                        </div>
                      </div>
                  </div><span>%</span>
                </span>
                <span class="item-span last">
                  <img @click="delMarkPeople(task,index,false)" class="img16" src="~/assets/img/task/mul.png" alt="" srcset="" >
                </span>
             </li>
           </ul>
        </div>
      </div>
    </div>
  <!-- 任务提示  sure:"强制提交",-->
    <modalBox
      ref="del_promt"
      :footerBtn='{cancal:"直接删除"}'
      @sure='delModalSuccess(1)'
      @faild='delModalSuccess(0)'
      :innerModal='true'
      :isClickClose='false'
    >
      <template slot="title">
          任务提示
      </template>
      <template slot="content">
        <!-- <p>是否强制提交数据并删除该人？</p> -->
        <p>删除标注人员将重新分配他标注过的数据，请确认。</p>
      </template>
    </modalBox>
    <!-- footer -->
    <div slot="footer" class="dialog-footer">
      <taskBtn size='modal' type="primary" @click="makeSure">确定</taskBtn>
      <taskBtn size='modal' @click="closePop">取消</taskBtn>
    </div>
  </el-dialog>
</template>
<script>
import taskBtn from '~/components/UI/taskButton';
import searchInput from '~/components/UI/searchInput';
import modalBox from '~/components/modalBox';
import { Promise } from 'q';

export default {
  props: {
    auth: {
      type: Array,
      default: ()=>[]
    },
    everyDataMarkCount:{
      type: Number,
      default: 1
    },
    initData: {
      type: Object,
      default: ()=>{}
    },
    isSetting: {
      type: Boolean,
      default: false
    },
    isClickClose: {
      type: Boolean,
      default: false
    }
  },
  components: {
    taskBtn,
    searchInput,
    modalBox
  },
  data(){
    return {
      modalBoxShow: false,
      searchVal: '',
      userList: [],
      markListArr: [],
      markListArr1: [],
      markListArr2: [],
      taskMarkArr:[],
      exMarkArr: [],
      radioMark: '1',
      remainder1: '',
      remainder2: '',
      isDelDrag: true,
      isFirst: true,
      isetDelUser: [],
      requireDelUser: [],
      modalObj: null,
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      this.isSetting? null : this.getUserByCompany();
    },
    async showDeauftData(){
      if(this.searchVal){
        this.searchVal = ''
      }
      await this.getUserByCompany()
      if(this.initData.taskMarkArr && this.initData.taskMarkArr.length >0){
        this.taskMarkArr = JSON.parse(JSON.stringify(this.initData.taskMarkArr))
        if(this.isFirst){
          this.isetDelUser = this.initData.taskMarkArr.map(item=>item.userId)
          this.isFirst = false
        }
        this.setRemainder(true)
      }
      if(this.initData.exMarkArr && this.initData.exMarkArr.length >0){
        this.exMarkArr = JSON.parse(JSON.stringify(this.initData.exMarkArr))
        this.setRemainder(false)
      }
      if(this.initData.userList && this.initData.userList.length >0 ){
        let userList = this.initData.userList
        this.userList = userList
        // this.markListArr1 = JSON.parse(JSON.stringify(userList))
        this.markListArr1 = JSON.parse(JSON.stringify(this.$_.differenceBy(userList,this.taskMarkArr,'userId')))
        this.markListArr = this.markListArr1
        // this.markListArr2 = JSON.parse(JSON.stringify(userList))
        this.markListArr2 = JSON.parse(JSON.stringify(this.$_.differenceBy(userList,this.exMarkArr,'userId')))
      }
    },
    search(){
      this.postSearchUser()
    },
    async postSearchUser(Option){
      let data = {
        condition: this.searchVal,
        // userIdsStr: this.radioMark === '1'?this.taskMarkArr.map(item=>item.userId).join(','):this.exMarkArr.map(item=>item.userId).join(',')
        userIdsStr: ''
      }
      let prolist = await this.$axios.$post('/pro/showUserByCondition',data);
      this.userList = prolist.data.array
      // this.markListArr1 = JSON.parse(JSON.stringify(prolist.data.array))
      // this.markListArr = this.markListArr1
      // this.markListArr2 = JSON.parse(JSON.stringify(prolist.data.array))

      // 数组求差
      this.markListArr1 = JSON.parse(JSON.stringify(this.$_.differenceBy(prolist.data.array,this.taskMarkArr,'userId')))
      this.markListArr2 = JSON.parse(JSON.stringify(this.$_.differenceBy(prolist.data.array,this.exMarkArr,'userId')))
      this.markListArr = this.radioMark === '1'? this.markListArr1 : this.markListArr2;

    },
    showModal(){
      this.modalBoxShow = true
      this.showDeauftData()
    },
    makeSure()  {
      let isgo = true
      if(this.taskMarkArr.length <=0){
        this.$message({
          message: '请选择任务标注的标注人员',
          type: 'error'
        });
        return
        isgo = false
      }
      if(this.taskMarkArr.length < this.everyDataMarkCount){
        this.$message({
          type: 'error',
          message: '标注人员的数量必须大于等于每条数据标注的次数'
        })
        isgo = false
      }

      if(this.remainder1 !== '' && this.everyDataMarkCount <= 1){
        this.$message({
          message: '任务标注分配任务有误',
          type: 'error'
        });
        isgo = false
      }
      let auth = this.auth
      let text = (auth[1]===2&&auth[0]===2)?'示例标注+考核答案':auth[0]===2?'示例标注':'考核答案';
      if(this.remainder2 !== ''  && this.everyDataMarkCount <= 1){
        this.$message({
          message: `${text}分配任务有误`,
          type: 'error'
        });
        isgo = false
      }
      if(this.auth.length > 0 && this.exMarkArr.length < 1){
        this.$message({
          message: `请选择${text}的标注人员`,
          type: 'error'
        });
        isgo = false
      }
      // 确认操作 重新分配
      // 这块不提示的 直接重新分配
      // if(this.requireDelUser.length > 0){
      //   this.requireDelUser.forEach(item=>{
      //     this.$parent.labelCommitOrDelete({
      //       userId: item.userId,
      //       isCommite: item.isCommite,
      //     })
      //     .then(res=>{
      //       if(res.code === 0){
      //         // console.log('重新分配成功', item.userId)
      //       }
      //     })
      //   })
      // }
      this.$emit('sure',isgo,[this.taskMarkArr,this.exMarkArr],this.requireDelUser)
    },
    closePop() {
      this.modalBoxShow = false
    },
    handelOpen(){
      if(!this.search){
        this.searchVal = ''
        this.search()
      }
      this.$emit('open')
    },
    handelOpened(){
      this.$emit('opened')
    },
    handelClose(){
      this.$emit('close')
    },
    handelClosed(){
      this.$emit('closed')
    },
      // 增加标注人员
    addMarkPeople(item,index){
      if(this.radioMark === '1'){
        this.taskMarkArr.push(item)
        this.avgMarkNum('taskMarkArr')
        this.markListArr1.splice(index,1)
        this.markListArr = this.markListArr1
      }else{
        this.exMarkArr.push(item)
        this.avgMarkNum('exMarkArr')
        this.markListArr2.splice(index,1)
        this.markListArr = this.markListArr2
      }
    },
    // 删除分配人员
    delMarkPeople(task,index,isMark){
      isMark?this.radioMark = '1': this.radioMark = '2';
      let auth = this.auth
      let text = (auth[1]===2&&auth[0]===2)?'示例标注+考核答案':auth[0]===2?'示例标注':'考核答案';
      if(this.radioMark === '1' && isMark){
        // if(this.taskMarkArr.length <= this.everyDataMarkCount){
        //   this.$message({
        //     type: 'error',
        //     message: '任务标注人员的数量必须大于等于标注次数'
        //   })
        //   return
        // }
        if(this.isSetting){
          let userId = this.taskMarkArr[index].userId
          let delIndex = this.isetDelUser.indexOf(userId)
          if(delIndex > -1){
            if(this.everyDataMarkCount === 1 && this.isSetting){
              this.$parent.getLabelDataNum({
                userId
              })
              .then(res=>{
                if(res.code === 0){
                  if(res.data.num > 0){
                    this.modalObj= {
                      index,
                      task,
                      userId
                    }
                    this.$refs.del_promt.showModal()
                  }else{
                    if(res.data.num === -1){
                      this.$parent.setExpUser(userId)
                    }
                    this.taskMarkArr.splice(index,1)
                    this.avgMarkNum('taskMarkArr')
                    this.markListArr1.unshift(task)
                    this.markListArr = this.markListArr1
                     let isExit = this.requireDelUser.map(item=>item.userId).indexOf(userId)
                     if(isExit > -1){
                        // this.requireDelUser[isExit].isCommite = isCommite
                      }else{
                        this.requireDelUser.push({
                          userId,
                          // isCommite: 1
                          isCommite: this.everyDataMarkCount === 1?0 : 1
                        })
                      }
                  }
                }
              })
            }
            if(this.everyDataMarkCount > 1){
              this.taskMarkArr.splice(index,1)
              this.avgMarkNum('taskMarkArr')
              this.markListArr1.unshift(task)
              this.markListArr = this.markListArr1

              let isExit = this.requireDelUser.map(item=>item.userId).indexOf(userId)
              if(isExit > -1){
                  // this.requireDelUser[isExit].isCommite = isCommite
                }else{
                  this.requireDelUser.push({
                    userId,
                    // isCommite: 1
                    isCommite: this.everyDataMarkCount === 1?0 : 1
                  })
                }
            }
            // this.isetDelUser.splice(delIndex,1)
            // this.$refs.del_promt.showModal()


          }else{
            this.taskMarkArr.splice(index,1)
            this.avgMarkNum('taskMarkArr')
            this.markListArr1.unshift(task)
            this.markListArr = this.markListArr1
          }
        }else{
          this.taskMarkArr.splice(index,1)
          this.avgMarkNum('taskMarkArr')
          this.markListArr1.unshift(task)
          this.markListArr = this.markListArr1
        }
      }else if(this.radioMark === '2' && !isMark){
        // if(this.exMarkArr.length < 1){
        //   this.$message({
        //     type: 'error',
        //     message: `${text}的人员数量必须大于等于1`
        //   })
        //   return
        // }
        this.exMarkArr.splice(index,1)
        this.avgMarkNum('exMarkArr')
        this.markListArr2.unshift(task)
        this.markListArr = this.markListArr2
      }

    },
    delpeople(index,task){
      this.taskMarkArr.splice(index,1)
      this.avgMarkNum('taskMarkArr')
      this.markListArr1.unshift(task)
      this.markListArr = this.markListArr1
    },
    delModalSuccess(isCommite){
      // 1
      let {
        userId,
        index,
        task
      } = this.modalObj
      let isExit = this.requireDelUser.map(item=>item.userId).indexOf(userId)
      if(isExit > -1){
        this.requireDelUser[isExit].isCommite = isCommite
      }else{
        this.requireDelUser.push({
          userId,
          isCommite: isCommite
        })
      }
      this.delpeople(index,task)
    },
    avgMarkNum(arg){
      let l = this[arg].length
      let remainder = 100%l;
      let quotient = Math.floor(100/l);
      this[arg] = this[arg].map(item=>{
        this.$set(item,'num',quotient)
        return item
      })
      if(arg === 'taskMarkArr'){
        this.setRemainder(true)
      }else{
        this.setRemainder(false)
      }
    },
    numChange(isMark,task,arg){
      task.num = arg[0]
      this.setRemainder(isMark)
    },
    add(isMark,index,arg){
      if(this[arg][index].num < 100){
        this[arg][index].num += 1
      }
      this.setRemainder(isMark)
    },
    mul(isMark,index,arg){

      if(this[arg][index].num > 0){
        this[arg][index].num -=1
      }
      this.setRemainder(isMark)
    },
    radioSure(isMark){
      isMark?this.radioMark = '1': this.radioMark = '2';
    },
    setRemainder(isMark){
      this.radioSure(isMark)
      if(isMark){
        let numSum = this.$_.reduce(this.taskMarkArr,(sum,n)=>(sum+=n.num),0)
        let remainder = (numSum - 100)
        if(this.everyDataMarkCount > 1){
          this.remainder1 = ''
        }else{
          if( remainder > 0){
            this.remainder1 = `任务分配超出${Math.abs(remainder)}%`
          }else if(remainder < 0){
            this.remainder1 = `未分配任务${Math.abs(remainder)}%`
          }else{
            this.remainder1 = ''
          }
        }
        if(this.taskMarkArr.length === 0){
          this.remainder1 = ''
        }

      }else{
        let numSum = this.$_.reduce(this.exMarkArr,(sum,n)=>(sum+=n.num),0)
        let remainder = (numSum - 100)
        if(this.everyDataMarkCount > 1){
          this.remainder2 = ''
        }else{
          if( remainder > 0){
            this.remainder2 = `任务分配超出${Math.abs(remainder)}%`
          }else if(remainder < 0){
            this.remainder2 = `未分配任务${Math.abs(remainder)}%`
          }else{
            this.remainder2 = ''
          }
        }
        if(this.exMarkArr.length === 0){
          this.remainder2 = ''
        }
      }
    },
    async getUserByCompany(){
      if(!this.$store.state.userList){
        await this.$store.dispatch('GET_USERLIST')
      }
      this.userList = this.$store.state.userList
      if(this.$route.path === '/multask'){
        this.$parent.setDataMaxNum()
      }
      this.markListArr1 = JSON.parse(JSON.stringify(this.$_.differenceBy(this.$store.state.userList,this.taskMarkArr,'userId')))
      this.markListArr = this.markListArr1
      this.markListArr2 = JSON.parse(JSON.stringify(this.$_.differenceBy(this.$store.state.userList,this.exMarkArr,'userId')))
    },
    allDel(isMark){
      this.radioSure(isMark)
      this.$confirm('此操作将全部删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        let newUserList = JSON.parse(JSON.stringify(this.userList))
        isMark? this.taskMarkArr = [] : this.exMarkArr = [];
        isMark? this.remainder1 = '' : this.remainder2 = '';
        isMark? this.markListArr = this.markListArr1 = newUserList : this.markListArr = this.markListArr2 = newUserList;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    clearExMarkArr(){
      this.exMarkArr = []
      this.radioMark = '1'
    },
  },
  watch: {
    radioMark(newVal,oldVal){
      newVal === '1'? this.markListArr = this.markListArr1 : this.markListArr = this.markListArr2;
    },

  }
}
</script>

<style lang="scss">
@import "~assets/styles/scss/mixins";

.select-people{
  .el-dialog__header{
    line-height: 20px;
    padding-top: 10px;
    background: #f6f6f6;
    .el-dialog__headerbtn{
      top: 12px;
    }
  }
  .el-dialog__title{
    font-size: 16px;
  }
  .el-dialog__body{
    height: 506px;
  }
  .dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .task-button--modal{
      margin-right: 35px;
    }
  }
  .content{
    @include classflex(flex-start);
    flex-direction: row;
    width: 100%;
    height: 100%;;
    .left{
      width: 325px;
      margin-right: 30px;
      height: 100%;
      .mark-list{
        margin-top: 10px;
        height: 400px;
        overflow: auto;
        border: 1px solid #dce2ea;
        .mark-list__item{
          line-height: 40px;
          height: 40px;
          @include classflex(flex-start);
          flex-direction: row;
          border-bottom: 1px solid #dce2ea;
          &:nth-child(2n+1){
            background: #F6F6F8;
          }
          .span{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            height: 40px;
            border-right: 1px solid #dce2ea;
            &:nth-child(1){
              flex: 1;
              width: 60px;
            }
            &:nth-child(2){
              flex: 2;
            }
            &:nth-child(3){
              width: 60px;
              @include classflex(center);
              img{
                display: block;
                cursor: pointer;
              }

            }
          }
        }

      }
    }
    .right{
      flex: 1;
      height: 100%;
      width: 100%;
      @include classflex();
      flex-direction: column;
      .top{
        width: 100%;
        flex: 1;
      }
      .bottom{
        margin-top: 34px;
        width: 100%;
        flex: 1;
      }
      .top-title{
        @include classflex();
        line-height: 40px;
        .top-title-right{
          span{
            color: $red;
            font-size: 12px;
            margin-right: 10px;
          }
          img{
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
      .taskMark.h400{
        height: 400px;
      }
      .taskMark,.exMarkArr{
          height: 160px;
          overflow: auto;
          border: 1px solid #dce2ea;
          width: 100%;
          margin-top: 6px;
          color: rgba($color: #000000, $alpha: 0.8);
          .taskMark-item,.exMarkArr-item{
            line-height: 40px;
            height: 40px;
            @include classflex(flex-start);
            flex-direction: row;
            border-bottom: 1px solid #dce2ea;
            &:nth-child(2n+1){
              background: #F6F6F8;
            }

            .item-span{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
              height: 40px;
              border-right: 1px solid #dce2ea;
              &:nth-child(1){
                width: 60px;
                flex: 1;
              }
              &:nth-child(2){
                flex: 2;
                max-width: 220px;
              }
              &:nth-child(3):not(.last){
                @include classflex(center);
                flex: 2;
              }
              &.last{
                width: 60px;
                @include classflex(center);
                img{
                  display: block;
                  cursor: pointer;
                }
              }
              &:nth-child(4){
                width: 60px;
                @include classflex(center);
                img{
                  display: block;
                  cursor: pointer;
                }
              }
            }
          }
        }
      .sele-mark-num{
        width: 70px;
        height: 26px;
        position: relative;
        line-height: 26px;
        margin-right: 10px;
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
        .el-input-number__decrease,.el-input-number__increase{
          display: none;
        }
        .right-num{
          position: absolute;
          z-index: 2;
          left: 45px;
          top: 0;
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
            line-height: 13px;
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
  }
}
/deep/.el-input-number .el-input__inner{
  text-align: left;
}
/deep/.el-input-number__decrease{
  display: none;
}
/deep/.el-input-number__increase{
  display: none;
}
</style>
<style lang="scss">
.mark-list,.taskMark,.exMarkArr{
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
.select-people{
  .el-radio__input.is-checked+.el-radio__label{
    color: rgba($color: #000000, $alpha: 0.8);
    font-weight: normal;
  }
  .el-radio__label{
    color: rgba($color: #000000, $alpha: 0.8);
    font-weight: normal;
  }
}
</style>
