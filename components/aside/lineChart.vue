<template>
  <div id="line_chart" v-html="noData"   ></div>
</template>
<script>
  import eCharts from 'echarts'
  export default {
    name: 'lineChart',
    data(){
      return{
        noData:''
      }
    },
    mounted(){
      this.getChartData()
    },
    methods:{ 
      // 请求接口
      getChartData(){
        this.$axios.$post('census/getHistoryAccurate',{proId:Number(this.$route.query.proId)})
          .then((res)=>{
            if (res && res.data.length != 0) {
              this.renderChar(res)
            }else {
              this.noData = '<div class="nodata" ><div class="center"><img src="/label/nodata.png" alt=""></div> </div>'
            }
          })
      },
      // 渲染 折线图
      renderChar(res){
        let xData = [' ']
        let yData = [0]
        let data = res.data
        data.forEach(function(v) {
          xData.push(v.trainSize)
          yData.push(Math.ceil(v.accurate * 100))
        }, this);
        var dom = document.getElementById("line_chart");
        var myChart = eCharts.init(dom);
        var option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData,
            name: '数量',
            nameLocation: 'center',
            nameGap: '25',
            axisTick: {
              show: false
            },
            axisLine:{
              show:false
            }
          },
          yAxis: {
            type: 'value',
            name: '精准度/%',
            max: '100',
            min: '0',
            axisTick: {
              show: false
            },
            axisLine:{
              show:false
            }
          },
          title: {
            left: 'center',
            text: '历史准确度',
          },
          series: [{
            data: yData,
            type: 'line',
            smooth: true
          }]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      }
    }
  }
</script>
<style>
  #line_chart {
    width: 460px;
    height: 400px;
   
    
    z-index: 100;
    background: #fff;
   
    text-align: center;
    color: #000;
  }
  
</style>
<style lang="stylus" >
.nodata{
    height 400px
   
    position relative
    .center{
        width 240px
        height 240px
        position absolute
        left 50%
        top 50%
        margin-left -120px
        margin-top -120px
        text-align center
        img{
            width 190px 
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
</style>
