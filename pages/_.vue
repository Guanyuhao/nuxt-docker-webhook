<template>
  <div class="view-wrapper">
    <div class="view">
      <div class="content">
        <img src="~/assets/img/404.png" alt="404" class="img404">
        <p>页面不存子</p>
        <p>请尝试 <router-link to='/'>刷新</router-link> 或 <router-link to='/'>返回首页</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'home',
    name: 'page404'
  }
</script>

<style scoped>

  .view-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    background: #262832;
    padding: 20px;
  }
  .view{
    height: calc(100% - 30px);
    background: #fff;
    overflow: auto;
  }
  .content {
    width: 470px;
    margin: 200px auto;
    text-align: center;
    font-size: 18px;
    color: rgba(0,0,0,0.6);
    letter-spacing: 1.22px;
  }
  .content p {
    height: 40px;
  }
  .content p a{
    color: #409EFF;
  }
</style>
