<template>
  <div class="v-imglabelfull">
    <ul>
      <li @click="full">
        <img v-show="!isCanFull" class="img18" src="~assets/img/imglabel/full.png" alt="">
        <img v-show="isCanFull" class="img18" src="~assets/img/imglabel/cancalfull.png" alt="">
      </li>
      <li @click="zoom">
        <img class="img18" src="~assets/img/imglabel/zoom.png" alt="">
      </li>
      <li class="scale">
        <el-input
          class="scale-input"
          v-model="imgScale"
          :disabled="true">
        </el-input>
        <el-button class="scale-btn" type="text" @click="restZoom">
          <i class="el-icon-refresh"></i>
        </el-button>
      </li>
      <li @click="zoomOut">
        <img class="img18" src="~assets/img/imglabel/zoomout.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isBorderLable: {
      default: false,
      type: Boolean
    },
    imgScale: {
      default: '0',
      type: String
    }
  },
  name: 'imglabeFull',
  data() {
    return {
      isCanFull : false
    }
  },
  methods: {
    zoomOut(){
      this.$emit('zoomOut')
    },
    full(){
      this.$emit('full')
      this.isCanFull = !this.isCanFull
    },
    zoom(){
      this.$emit('zoom')
    },
    restZoom(){
      this.$emit('restZoom')
    }
  }
}
</script>
<style lang="scss">
@import '~assets/styles/scss/mixins';

.v-imglabelfull{
  width: 200px;
  ul{
    width: 100%;
    @include classflex(flex-start);
    flex-direction: row;
    height: 30px;
  }
  li{
    width: 30px;
    height: 100%;
    background: #FAFCFE;
    border: 1px solid #E0E6ED;
    border-radius: 1px;
    @include classflex(center);
    cursor: pointer;
    &:nth-child(1){
      margin-right: 10px;
    }
    img{
      display: block;
    }
  }
  .scale{
    width: 80px;
    @include classflex(flex-start);
    flex-direction: row;
    margin: 0 5px;
    .scale-input{
      height: 100%;
      font-size: 12px;
      padding: 0;
      flex: 1;
      .el-input__inner{
        padding: 0;
        border: none;
        height: 100%;
        text-align: center;
      }
    }
    .scale-btn{
      width: 30px;
      font-size: 12px;
      line-height: 30px;
      padding: 0;
      width: 30px;
      height: 30px;
      border: none;
    }
  }


}
</style>
