<template>
  <div class="v-img">
    <div class="tppl-btn">
      <el-button>
        矩形
      </el-button>
      <el-button>
        多边形
      </el-button>
    </div>
    <div class="img-wrapper">
        <div class="canvas_model">
          <canvas id ="canvas" style="position:absolute;z-index:0;"></canvas>
          <canvas id ="canvas_rect" style="position:absolute;z-index:2;"></canvas>
          <canvas id ="canvas_line"  style="position:absolute;z-index:1;" ></canvas>
          <canvas id ="canvas_bezier" style="position:absolute;z-index:-1;"></canvas>
          <canvas id ="glasscan" width="150" height="150"></canvas>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'imgUI',
  data() {
    return {

    }
  },
  methods: {
    init(){

    },
  }
}
</script>
<style lang="scss" scoped>

</style>
