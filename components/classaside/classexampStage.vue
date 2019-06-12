<template>
  <div class="aside-item aside-tag">
    <!-- 任务名称 -->
   
    <div  class="message">
      <div class="title">任务阶段</div>
      <div class="tag">{{name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'asideName',
  props:["name"],
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus">
.title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.aside-tag{
  height: 112px;
  box-sizing border-box
  padding 17px 16px 16px 26px
  border-bottom : 1px solid #1D1E1F;

}
.message h4{
  font-size: 18px;
  color: #8794AA;
  margin-bottom 15px
  letter-spacing: 1px;
}
.message p{
  font-size: 14px;
  color: #D6DCE0;
}
.tag{
    width 120px
    height 28px
    line-height 28px
    text-align center
    border: 1px solid #3888FF;
    border-radius: 2px;
    font-size: 14px;
    color: #3888FF;
    letter-spacing: 0;
    border-radius: 2px;

}
</style>
