<template>
  <div class="go-back" @click="goback">
    <img class="back" src="~/assets/img/task/back.png" alt="">
    <span>
      返回
    </span>
  </div>
</template>
<script>
export default {
  props: {
    backpath: {
      type: String,
      default: ''
    }
  },
  methods: {
    goback(){
      if(this.backpath){
        this.$router.push({
          path: this.backpath
        });
      }else{
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

@import '~assets/styles/scss/mixins';
.go-back{
  width: 65px;
  @include classflex(flex-start);
  line-height: 22px;
  cursor: pointer;
  color: $blue;
  .back{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  span{
    padding-left: 6px;
  }
}
</style>
