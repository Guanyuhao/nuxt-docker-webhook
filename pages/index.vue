<template>
  <div class="home-wrapper">
    <div class="main" ref="main">
      <div class="main-container">
          <NuxtChild />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'home',
  async asyncData(context) {
    // 渲染组件之前获取数据 1

  },
}
</script>
<style lang="scss">
@import "~assets/styles/scss/vars";
.home-wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  .main{
    height: calc(100vh - 50px);
    background: $mainColor;
    padding: 20px;
    .main-container{
      background: $white;
      height: calc(100vh - 90px);
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
