<template>
  <button
    class="task-button"
    :class="[
      type ? 'task-button--' + type : '',
      size ? 'task-button--' + size : '',
    ]"
    type="button"
    @click="handleClick"
    >
    <slot></slot>
  </button>
</template>
<script>
/*
  1. 接受2个类型 default primary
  2. size 2种类 medium small
*/
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
  },
  methods: {
    handleClick($event){
      this.$emit('click', $event)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/scss/vars";
.task-button{
  border: 1px solid $blue;
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
  background: $white;
  text-align: center;
  box-sizing: border-box;
  border-radius: 2px;
  position: relative;
  font-size: 14px;
}
.task-button--medium{
  height: 40px;
  width: 120px;
  line-height: 40px;

}
.task-button--modal{
  height: 36px;
  width: 120px;
  line-height: 36px;
}
.task-button--default{
  background: $white;
  color: $blue;
  font-weight: normal;

}
.task-button--primary{
  background: $blue;
  color: $white;
  // &:hover{
  //   background: #66b1ff;
  //   border-color: #66b1ff;
  //   color: #FFF;
  // }
}
.task-button--upload{
  background: $white;
  color: rgba($color: #000000, $alpha: 0.6);
  border-color: #C3D0E3;
}
.task-button--small{
  height: 32px;
  width: 72px;
  line-height: 32px;
}
</style>
