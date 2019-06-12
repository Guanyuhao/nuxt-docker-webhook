<template>
  <div class="aside-operating">
    <!-- 任务进度 -->
    <!--分类考核-->
    <div class="title">
      任务进度
    </div>
    <div class="line-item clearfix">
        <div class="radio blue"></div>
        <div class="left">
            已标注：
        </div>
        <div class="right">
            {{message.finish.count}}
        </div>
    </div>
    <div class="line-item clearfix">
        <div class="radio black"></div>
        <div class="left">
            未标注：
        </div>
        <div class="right">
            {{message.notfinish.count}}
        </div>
    </div>
   
    <div class="line-item clearfix">
            <div class="box clearfix">
              <div class="already" :style="{width:width}"></div>
            </div>
            <div class="num">{{message.finish.rate}}</div>
    </div>

  </div>
</template>
<script>
export default {
    props:["message","drop"],
    computed:{
      width() {
        return this.message.finish.count/this.message.total.count*180+"px"
      }
    }
}
</script>
<style lang="stylus" scoped>
.aside-operating{
    height 185px
    box-sizing border-box
    padding 17px 16px 16px 26px
    border-bottom : 1px solid #1D1E1F;
    .title{
        font-size: 16px;
        color: #8794AA;
        margin-bottom 3px
        letter-spacing: 1px;
    }
    .line-item{
      margin-top 12px
      .radio{
        float left
        width 8px
        height 8px
        border-radius 50%
        margin-top: 6px;
        margin-right: 8px;
      }
      .left{
        float left
        font-size: 14px;
        color: #D6DCE0;
      }
      .right{
        float right 
        font-size: 14px;
        color: #D6DCE0;
      }
      .blue{
        background: #3888FF;
      }
      .black{
        background: #262832;
      }
      .red{
        background: #D12B2B;
      }
      .box{
        float left
        width 180px
        margin-top: 6px;
        height 10px
        border-radius 4.5px
        background #262832 
        overflow hidden
        .already{
          float left
          width 42%
          height 10px
          background: #3888FF;
          border-radius: 4.5px 0 0 4.5px;
        }
        .drop{
          float left
          width 33%
          height 10px
          background: #D12B2B;
          border-radius: 0 4.5px  4.5px  0;
        }

      }
      .num{
        float right 
        font-size: 14px;
        color: #D6DCE0;
      }
    }
}

</style>
