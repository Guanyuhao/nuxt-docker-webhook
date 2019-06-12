<template>
  <section class="llp-editor">
    <no-ssr placeholder="editor Loading...">
       <div id="toolbar">
        <!-- Add font size dropdown -->
        <select class="ql-size">
          <option value="small">10</option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected>14</option>
          <option value="large">16</option>
          <!-- <option value="huge">32</option> -->
        </select>
        <!-- Add a bold button -->
        <button class="ql-bold"></button>
        <!-- Add subscript and superscript buttons -->
        <select class="ql-color"></select>
        <select class="ql-background"></select>
        <button class="ql-image"></button>
        <select class="ql-align"></select>
      </div>

      <div class="quill-editor"
          :content="content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption"
      >
      </div>
    </no-ssr>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        content: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              // ['bold',], // 'italic', 'underline', 'strike' 斜体,下划线，分割线
              // [{ 'size': ['small', false, 'large', 'huge'] }],
              // ['link', 'image',], //video
              // [{ 'align': [] }],
              // ['blockquote', 'code-block'], //代码
              //[{ 'color': [] }, { 'background': [] }],
            ],
            toolbar: '#toolbar'
          },
          placeholder: '请输入标注规范'
        },
        oldcontent: '',
      }
    },
    created(){
      this.init()
    },
    computed: {

    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      // setTimeout(() => {
        this.content = ''
      // }, 3000)

    },
    methods: {
      init(){
        this.editorChangeDebounce = this.$helper.debounce(this.handeEditorChange)
      },
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
        this.myQuillEditor = editor
      },
      onEditorChange({ quill, html, text }) {
        this.editorChangeDebounce({ quill, html, text })
      },
      handeEditorChange({ quill, html, text }){
        let limt = 5001
        if(text.length > limt){
          this.$message({
            type: 'error',
            message: '字符长度不能超过5000个'
          })
          quill.deleteText(limt-1,(text.length - limt));
          // console.log(text.length)
        }else{
          this.content = html
          this.$emit('onEditorChange', quill, html, text)
        }

      },
      setContent(html){
        this.content = html
      },
      editorEnable(drag){
        this.myQuillEditor.enable(drag)
      },

    }
  }
</script>

<style lang="scss">
@import "~assets/styles/scss/mixins";
.llp-editor {
  border: 1px solid #DCE2EA;
  #toolbar{
    padding: 0;
    height: 24px;
    background: #f6f6f8;
    line-height: 24px;
    border: none;
    @include classflex(flex-start);
    font-size: 14px;
    padding-left: 5px;
    button{
      text-align: center;
      width: 18px;
      height: 18px;
      background: #E3E3E3;
      color: #000;
      margin-right: 6px;
      padding: 1px;

    }
    .ql-size{
      width: 38px;
      height: 18px;
      background: #E3E3E3;
      line-height: 18px;
      margin-right: 6px;
      outline: none;
      color: rgba($color: #000000, $alpha: 0.7);
      font-size: 13px;
      font-weight: normal;
      .ql-picker-label{
        border: none;
        padding-left: 4px;
        padding-top: 1px;
        &::before{
          line-height: 18px;
        }
        &:focus{
          outline: none;
        }
        &:active{
          outline: none;
        }


      }
      .ql-picker-options{
          outline: none;
        .ql-picker-item{
          outline: none;
        }
      }
      .ql-picker-item[data-value=small]::before{
        font-size: 14px;
      }
      .ql-picker-item[data-value=large]::before{
        font-size: 14px;
      }
    }

  }
  .quill-editor {
    width: 100%;
    min-height: 120px;
    max-height: 120px;
    color: rgba($color: #000000, $alpha: 0.8);
    border: none;
    overflow-y: auto;
    &::-webkit-scrollbar-track {
      box-shadow: none;
      border-radius: 1px;
      background-color: #F5F5F5;
      }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(144,147,153,.3);
    }
  }
  .ql-editor{
    .ql-size-small{
      font-size: 10px;
    }
    .ql-size-large{
      font-size: 16px;
    }
    .ql-size-huge{
      font-size: 20px;
    }
  }
  .ql-container {
    font-size: 14px;
  }
  .ql-snow{
    .ql-picker{
      color: #717171;
    }
    .ql-stroke{
      stroke: #717171;
    }
  }
  .ql-editor.ql-blank::before {
    font-style:normal;
  }
}
</style>
