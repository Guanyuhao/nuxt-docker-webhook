<template>
  <div class="codemirror-wrapper">
    <no-ssr placeholder="Codemirror Loading...">
      <codemirror
        ref="myCm"
        :value="code"
        :options="cmOption"
        @cursorActivity="onCmCursorActivity"
        @ready="onCmReady"
        @focus="onCmFocus"
        @blur="onCmBlur"
        @input="onCmCodeChange">
      </codemirror>
    </no-ssr>
  </div>
</template>


<script>
  export default {
    props: {
      option: {
        type: Object,
        default: ()=>({})
      },

    },
    data() {
      let code = '';
      return {
        code,
        cmOption: {
          code,
          tabSize: 4, // tab键
          foldGutter: false, //代码收缩
          styleActiveLine: false, //高亮当前行
          lineNumbers: true, //行号
          lineWrapping: true,
          line: true, //行
          keyMap: "sublime",
          maxHighlightLength: Infinity, // 最长行
          // mode: 'text/x-vue',
          // mode: 'text/javascript',
          mode: 'text/x-markdown',
          // theme: 'base16-dark', //黑色调
          // theme: 'base16-light', //白色调
          lineSeparator: '/n/r', // 分隔符
          lineWrapping: true,
          // extraKeys: {
          //   'F11'(cm) {
          //     cm.setOption("fullScreen", !cm.getOption("fullScreen"))
          //   },
          //   'Esc'(cm) {
          //     if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
          //   }
          // }
        }
      }
    },
    created(){
     this.upCmoption()
    },
    computed: {
      codemirror() {
        return this.$refs.myCm.codemirror
      }
    },
    methods: {
      onCmCursorActivity(codemirror) {
        // console.log('onCmCursorActivity', codemirror.getValue())
        this.$emit('onCmCursorActivity',codemirror)
      },
      onCmCodeChange(newCode) {
        this.$emit('onCminput',newCode)
        // console.log('onCminput',newCode)
        this.code = newCode
      },
      onCmReady(codemirror) {
        // console.log('onCmReady', codemirror)
        this.$emit('onCmReady',codemirror)
      },
      onCmFocus(codemirror) {
        // console.log('onCmFocus', codemirror)
        this.$emit('onCmFocus',codemirror)
      },
      onCmBlur(codemirror) {
        // console.log('onCmBlur', codemirror.getValue())
        this.$emit('onCmBlur',codemirror.getValue())
      },
      upCmoption(){
        this.cmOption.code = this.code
         Object.assign(this.cmOption,this.option)
      }
    },
  }
</script>

<style lang="scss">
.vue-codemirror{
  width: 100%;
  height: 100px;
  border: 1px solid #DCE2EA;
  line-height: normal;
  font-size: 12px;
  .CodeMirror{
    height: 100%;
    color: rgba(48,48,48,0.48);
  }
  .CodeMirror-linenumbers{
    width: 18px !important;
    background: #EDEDED;
    height: 100%;
  }
  .CodeMirror-gutter-wrapper{
    left: -20px !important;
  }
  .CodeMirror-gutters{
    border-right: none;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background: #EDEDED;
  }
  .CodeMirror-linenumber{
    text-align: center;
    padding: 0;
    width: 18px !important;
  }
  .CodeMirror-linenumber.CodeMirror-gutter-elt{
    background: #EDEDED;
  }
  .CodeMirror-sizer{
    margin-left: 18px !important;
    min-height: 25px !important;
  }
}
</style>
