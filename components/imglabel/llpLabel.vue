
<template>
  <div class="llpLabel">
    <div class="left-wrapper">
        <div class="left" v-show="show && hideleft">
        <div class="retract" @click="hideClick" v-if="!result">
          <img src="~assets/img/close.png">
        </div>
        <slot name="left"></slot>
      </div>
      <div class="smallLeft"  v-show="!show && hideleft">
        <div class="recovery" @click="showClick">
          <img src="~assets/img/open.png">
        </div>
        <slot name="smallLeft"></slot>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    result: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      show: true,
      hideleft: true
    }
  },
  methods: {
    hideClick(){
      if(this.show){
        setTimeout(()=>{
            this.show = false;
        },900)
      }
    },
    showClick() {
      if(!this.show){
        this.show = true
      }
    },
    hideLeft(){
      this.hideleft = !this.hideleft
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/scss/mixins';
.llpLabel{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  user-select: none;
  .left-wrapper{
    height: 100%;
  }
  .left{
    width: 273px;
    height: 100%;
    background: #313440;
    position: relative;
    overflow-y: auto;
    -webkit-touch-callout: none;
    user-select: none;
    .retract{
      position: absolute;
      right: 0;
      cursor: pointer;
      top: 236px;
    }
    .retract img{
      width: 14px;
      height: 41px;
    }
    .line-item{
      overflow: hidden;
    }
  }
  .smallLeft{
    width: 76px;
    height: 100%;
    box-sizing: border-box;
    padding-left: 6px;
    padding-right: 6px;
    background: #313440;
    position: relative;
    .title{
      height: 54px;
      line-height: 54px;
      text-align: center;
      border-bottom: 1px solid #1D1E1F;
      font-size: 14px;
      color: #8794aa;
    }
    .recovery{
      position: absolute;
      right: 0;
      cursor: pointer;
      top: 236px;
    }
    .recovery img{
      width: 14px;
      height: 41px;
    }
    .line-item{
      overflow: hidden;
    }
  }
  .right{
    flex: 1;
    @include classflex(flex-start);
    flex-direction: column;
    width: 0;
    .right-wrapper{
      background: #262832;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 12px;
      padding-bottom: 16px;
      @include classflex(flex-start);
      flex-direction: column;
      width: 100%;
      flex: 1;
      .right-content{
        background: #ffffff;
        width: 100%;
        flex: 1;
        @include classflex(flex-start);
        flex-direction: column;
        .flexCenter{
          @include classflex(center);
          align-items: flex-start;
        }
        .autHeight{
          align-items: center;
        }
      }
      .v-imglabelfull{
        top: 130px;
      }
    }
    .v-boderbase{
      flex: 1;
      width: 100%;
      position: relative;
      overflow: hidden;
      height: 0;
    }

    .right-content--center{
      width: 100%;
      flex: 1;
      flex-direction: column;
      @include classflex();
      position: relative;
      .img-wrapper{
        @include classflex(center);
        flex: 1;
        padding: 0 10px;
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        @include scrollClass();
      }
      .textarea-wrapper{
        width: 100%;
        height: 114px;
        padding-bottom: 18px;
        padding-left: 28px;
        padding-right: 28px;
      }
      .v-imglabelfull{
        top: 20px;
      }
    }
    .v-imglabelfull{
      position: absolute;
      right: 30px;
      z-index: 10;
    }
    .bottomlist{
      width: 100%;
      overflow: hidden;
    }

  }

}
</style>
