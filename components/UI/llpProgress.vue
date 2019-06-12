<template>
  <div class="llp-progress"
  :class="[
      type ? 'llp-progress--' + type : '',
      size ? 'llp-progress--' + size : '',
    ]"
  >
    <div class="llp-progress-bar" ref='bar'></div>
  </div>
</template>
<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 40
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
  },
  mounted() {
    this.$nextTick(()=>{
      this.setBarWidth()
    })
  },
  methods: {
    setBarWidth() {
      let bar = this.$refs.bar
      let sumPx = 110
      if(this.type === 'detail'){
        sumPx = 260
      }
      bar.style.width = Math.floor((sumPx*this.percentage)/100)+'px'
    }
  },
  watch: {
    percentage(){

      this.$nextTick(()=>{
        this.setBarWidth()
      })
    }
  }
}
</script>
<style lang="scss">
.llp-progress{
  height: 10px;
  width: 110px;
  position: relative;
  background: #EBF1FA;
  .llp-progress-bar{
    position: absolute;
    left: 0;
    top: 0;
    height: 10px;
    width: 0;
    background: #80B5FD;
  }
  &.llp-progress--detail{
    width: 260px;
    background: #D9D9D9;
    border-radius: 10px;
    .llp-progress-bar{
      background: #3B414F;
      border-radius: 10px;
    }
  }
}
</style>
