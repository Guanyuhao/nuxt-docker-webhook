<template>
  <div class="aside-task">
    <!-- 任务阶段 -->
     <div class="title">
      任务操作
    </div>
    <div class="clearfix list">
        <div class="detail" @click="goDetail">
            查看结果
        </div>
        <div class="task" @click="task" v-show="!isSingle">
            提交任务
        </div>
        <div class="task" @click="end" v-show="isSingle">
            结束
        </div>
    </div>
    
  </div>
</template>
<script>
export default {
    props:["isSingle",'submitTask'],
    methods:{
      task(){
        this.$emit("task")
      },
      goDetail(){
        this.$emit("goDetail")
      },
      end(){
        this.$emit("end")
      }

    }
}
</script>
<style lang="stylus" scoped>
.aside-task{
  height 149px
  box-sizing border-box
  padding 17px 16px 16px 26px
}
.title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.list{
    margin-top 15px
}
.detail,.task{
    float left
    cursor pointer
    border: 1px solid #3888FF;
    border-radius: 2px;
    border-radius: 2px;
    width 100px
    height 28px
    text-align center
    line-height 28px
    font-size: 14px;
    color: #3888FF;
}
.task{
    margin-left 19px;
}
</style>

