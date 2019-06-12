<template>
  <div class="llp-dropDown">
      <div class="llp-dropDown-group">
        <button class="dropDown-btn" @click="defaultClick">
          {{dropMenu.length > 0 ? dropMenu[0]['name'] : ''}}
        </button>
        <button class="dropDown-arrow-btn" @click="showDropMenu">
          <div class="line"></div>
          <i class="el-icon-caret-bottom"></i>
        </button>
      </div>
      <ul class="llp-dropDown-menu" ref="llpMenu">
        <li v-for="(item, index) in dropMenu.slice(1)" :key="index" @click="handelMenuClick(item)">
          {{item.name}}
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  props: {
    // [{name}] 数组内第一项为菜单默认显示 可扩展属性
    dropMenu: {
      type: Array,
      default: ()=>([])
    },
    //菜单操作回调
    handelSelect: {
      type: Function,
      default: ()=>({})
    }
  },
  methods: {
    defaultClick() {
      // this.showDropMenu()
      this.handelSelect && this.handelSelect(this.dropMenu[0])
    },
    // prop click
    handelMenuClick(item) {
      this.showDropMenu()
      this.handelSelect && this.handelSelect(item)
    },
    // show menu
    showDropMenu() {
      let llpMenu = this.$refs.llpMenu
      llpMenu && llpMenu.classList.toggle('show')
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/scss/vars";
@import "~assets/styles/scss/mixins";

.llp-dropDown{
  display: inline-block;
  position: relative;
  color: $white;
  font-size: 14px;
  width: 136px;
  border: 1px solid $blue;
  .llp-dropDown-group{
    height: 30px;
    @include classflex();
    flex-direction: row;
  }
  .dropDown-btn{
    background: #FFF;
    -webkit-appearance: none;
    border: none;
    cursor: pointer;
    display: block;
    height: 100%;
    font-size: 14px;
    flex: 5;
    color: $white;
    background: $blue;
  }
  .dropDown-arrow-btn{
    display: block;
    flex: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: none;
    -webkit-appearance: none;
    text-align: left;
    height: 100%;
    color: $white;
    background: $blue;
    position: relative;
    .el-icon-caret-bottom{
      font-size: 16px;
    }
    .line{
      background: rgba($color: #ffffff, $alpha: 0.6);
      width: 1px;
      top: 4px;
      height: 22px;
      position: absolute;
      left: -5px;
    }
  }
  .llp-dropDown-menu{
    transform-origin: center top;
    position: absolute;
    left: 0;
    top: 0;
    width: 134px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: none;
    z-index: 9999;
    background: #FFF;
    &.show{
      display: block;
      transform:translateY(40px);
    }
    li{
      line-height: 32px;
      padding-left: 10px;
      font-size: 14px;
      color: $f_Base;
      cursor: pointer;
      outline: 0;
      margin: 5px 0;
      &:hover{
        background-color: #f5f7fa;
        color: #3888FF;
      }
    }
  }
}
</style>
