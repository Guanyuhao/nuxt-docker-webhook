<template>
  <div class="aside-infor">
    <!-- 任务信息 -->
    <!--单人分类标注-->
    <div class="title">
      任务信息
    </div>
    <div class="line-item clearfix">
        <div class="left">
            标注类型
        </div>
        <div class="right">
            分类
        </div>
    </div>
    <div class="line-item clearfix">
        <div class="left">
          任务详情
        </div>
        <div class="right color">
          详情
        </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
.aside-infor{
  height 124px
  box-sizing border-box
  padding 17px 16px 16px 26px
  border-bottom : 1px solid #1D1E1F;
}
.title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.line-item{
      margin-top 12px
      .left{
        float left
        font-size: 14px;
        color: #D6DCE0;
      }
      .right{
        float right 
        cursor pointer
        font-size: 14px;
        color: #D6DCE0;
      }
      .color{
        color: #3888FF;
      }
}
</style>
