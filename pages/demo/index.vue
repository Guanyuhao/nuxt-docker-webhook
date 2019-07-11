<template>
  <div class="demo">
    <el-row>
      <borderBase ref="borderBase"></borderBase>
    </el-row>
    <el-row>
      <el-button type="default" @click="switchGrap(true)">矩形</el-button>
      <el-button type="default" @click="switchGrap(false)">不规则</el-button>
      <el-button type="primary" >旋转</el-button>
      <el-button type="success" >裁剪</el-button>
      <el-button type="info" >抠图</el-button>
      <el-button type="warning" >放大</el-button>
      <el-button type="danger" >缩小</el-button>
    </el-row>
  </div>
</template>
<script>
import borderBase from '~/components/imglabel/borderBase';

export default {
  layout: 'default',
  components: {
    borderBase
  },
  data() {
    return {

    }
  },
  mounted(){
    this.initBorderBase()
  },
  methods: {
    initBorderBase(){
      this.$refs.borderBase.demoInit()
    },
    switchGrap(drag){
      drag?this.$refs.borderBase.rectangularLabel():this.$refs.borderBase.irregularLabeling();
    }
  }
}
</script>
<style lang="scss" scoped>
.demo{
  height: 100%;
}
</style>
