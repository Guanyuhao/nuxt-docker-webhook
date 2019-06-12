<template>
  <div class="aside-item aside-name">
    <!-- 任务名称 -->
    
    <div class="message">
      <div class="title" style="margin-bottom:10px;">任务名称</div>
      <p :title="title">{{title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'asideName',
  
  data() {
    return {

    }
  },
  props: {
    title: {
      type:String,
      default:"项目名称"
    }
  }
}
</script>
<style lang="stylus" scoped>
.aside-name{
  height: 87px;
  box-sizing border-box
  padding 17px 16px 16px 26px
  border-bottom : 1px solid #1D1E1F;

}
.message h4{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 15px
  letter-spacing: 1px;
}
.title{
  font-size: 16px;
  color: #8794AA;
  margin-bottom 3px
  letter-spacing: 1px;
}
.message p{
  font-size: 14px;
  color: #D6DCE0;
  text-overflow ellipsis
  white-space nowrap
  width 230px
  overflow hidden
}
</style>
