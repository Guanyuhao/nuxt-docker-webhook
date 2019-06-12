<template>
  <div class="page-wrapper">
    <navHeader></navHeader>
    <nuxt />
  </div>
</template>
<script>
import navHeader from '~/components/header'
export default {
  components: {
    navHeader
  }
}
</script>

<style lang='scss'>


#__nuxt,#__layout{
  width: 100%;
  height: 100%;
  position: relative;
}
.page-wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 1366px;

}
</style>
