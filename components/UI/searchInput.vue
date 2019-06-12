<template>
  <div
  class="llp-serach-input"
  :class="[
    size ? 'llp-serach-input--' + size : '',
  ]"
  ref="input_wrapper">
    <input
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
      class="llp-input__inner"
      @focus="onfocus"
      @blur="onblur"
      @change="handleChange"
      @input='handelInput'
      :disabled='disabled'
      :readonly='readonly'
      :value="value"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      ref="input"/>
    <div class="search__append" @click="handleChange">
      <span></span>
      <i class="el-icon-search"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    size: String,
    placeholder:{
      type:String,
      default:"请输入内容"
    }

  },
  data(){
    return {
      isOnComposition: false,
    }
  },
  mounted(){

  },
  methods: {
    getInput() {
        return this.$refs.input
    },
    handleComposition(event) {
      if (event.type === 'compositionstart') {
        this.isOnComposition = true;
      }
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.handelInput(event);
      }
    },
    onfocus() {
      let me = this
      let wrapper = me.$refs.input_wrapper
      wrapper && wrapper.classList.add('active')
    },
    onblur(){
      let me = this
      let wrapper = me.$refs.input_wrapper
      wrapper && wrapper.classList.remove('active')
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    handelInput(event){
      if (this.isOnComposition) return;
      this.$emit('input', event.target.value);
      this.$nextTick(() => {
        let input = this.getInput();
        input.value = this.value;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/mixins";

.llp-serach-input{
  @include classflex();
  width: 260px;
  border-radius: 2px;
  border: 1px solid #BDC7D4;
  background: $white;
  height: 32px;
  line-height: 32px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  margin-right: 32px;
  &.llp-serach-input--modal{
    width: 325px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    .search__append{
      span{
        top: 6px;
      }
    }
  }
  &.active {
    border-color: $blue;
  }
  .llp-input__inner{
    flex: 1;
    height: 100%;
    font-size: 14px;
    -webkit-appearance: none;
    background-color: #FFF;
    color: rgba($color: #000000, $alpha: 0.8);
    outline: 0;
    padding: 0 15px;
    width: 100%;
    border: none;
    &::-webkit-input-placeholder {
      color: rgba($color: #000000, $alpha: 0.4);
    }
    &:-moz-placeholder {
      color: rgba($color: #000000, $alpha: 0.4);
    }
    &:-ms-input-placeholder {
      color: rgba($color: #000000, $alpha: 0.4);
    }
  }

  .search__append{
    width: 43px;
    text-align: center;
    position: relative;
    cursor: pointer;
    span{
      position: absolute;
      width: 1px;
      height: 24px;
      top: 4px;
      padding: 0;
      left: 0;
      background: #BDC7D4
    }
    i{
      color: #828C99;
    }
  }
}
</style>

