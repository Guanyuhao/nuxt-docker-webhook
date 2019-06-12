<template>
  <div class="aside-model">
    <!-- 模型准确度 -->
    <div class="title">
      模型准确度
    </div>

    <el-popover
    placement="top-start"
    @after-enter="show"
    :open-delay='3000'
    width="480"
    trigger="click"
   >
    <line-chart ref="chart"></line-chart>
    <el-button slot="reference">
      <div class="number" @click="showChart">{{num}}%</div>
    </el-button>
  </el-popover>




  </div>
</template>
<script>
import lineChart from './lineChart'
export default {
    props:["num"],
    components:{
      lineChart
    },
    data(){
      return {
        showState:true,
      }
    },
    methods:{
      showChart(e){
        this.$emit("showChart",e)
      },
      hideChart(){
         this.$emit("hideChart")
      },
      show(){

            this.$refs.chart.getChartData();


      }
    }
}
</script>
<style lang="stylus" scoped>
.aside-model{
  height 92px
  box-sizing border-box
  padding 17px 16px 16px 26px
  border-bottom : 1px solid #1D1E1F;
  >>>.el-button{
    background none;
    border none;
    padding-top 4px
    padding-left 0
  }
}
.title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.number{
    margin-top 12px
    font-size: 14px;
    cursor pointer
    color: #3888FF;
}

</style>
