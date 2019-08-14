<template>
  <div class="imglabe-bar">
      <div
        class="ety-btn"
        v-for="(item,index) in barBtnList"
        :key="index"
        :style="{color:colorArr[index].color,background:colorArr[index].background}"
        :class="active===index?'active':''"
        @click="typeClick(index,item.type)"
      >
        <span class="name">{{item.type}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    barBtnList: {
      type: Array,
      default: []
    }
  },
  name: 'imgLabelBar',
  data(){
    return {
      active: 0,
      colorArr: [
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#22894B", background: "#DFEEE7" },
        { color: "#086B91", background: "#DBEFF7" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#22894B", background: "#DFEEE7" },
        { color: "#086B91", background: "#DBEFF7" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" },
        { color: "#22894B", background: "#DFEEE7" },
        { color: "#086B91", background: "#DBEFF7" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#2873EE", background: "#E6F0FF" },
        { color: "#525DD7", background: "#EAEBFF" },
        { color: "#97183E", background: "#FAE7E7" },
        { color: "#A95508", background: "#FFEDC3" }
      ],
    }
  },
  methods: {
    typeClick(index,type){
      this.active = index
      this.$emit('btnClick',index,type)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/scss/mixins';
.imglabe-bar{
  width: 100%;
  min-height: 58px;
  padding-left: 18px;
  border-bottom : 1px solid #E0E6ED;
  @include classflex(flex-start);
  .ety-btn{
    width: 138px;
    cursor: pointer;
    line-height: 30px;
    height: 32px;
    text-align: center;
    margin-left: 12px;
    border-radius: 2px;
    border-radius: 2px;
    &.active{
      border: 1px solid #2873ee;
    }
    .name{
      width:76px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .key{
      width: 56px;
    }
  }

}
</style>
