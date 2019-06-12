<template>
  <div class="aside-result">
    <!-- 标注结果 -->
    <!--单人分类-->
    <div class="title">
      标注结果
    </div>
    <div class="max-hegiht">
           <div class="line-item clearfix" v-for="(item,index) in list" :key="index">
              <div class="left">
                {{item.name}}
              </div>
              <div class="right">
                {{item.count}}
              </div>
          </div>
    </div>
 
  </div>
</template>
<script>
export default {
  props:["list"]
}
</script>
<style lang="stylus" scoped>
.aside-result{
 
  box-sizing border-box
  padding 17px 4px 16px 26px
  border-bottom : 1px solid #1D1E1F;
}
.title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.max-hegiht{
  max-height 100px
  overflow auto
  padding-right 14px
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
        font-size: 14px;
        color: #D6DCE0;
      }
      .color{
        color: #3888FF;
      }
}
</style>

