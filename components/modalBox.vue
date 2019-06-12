<template>
  <el-dialog
    :visible.sync='modalBoxShow'
    @open='handelOpen'
    @opened='handelOpened'
    @close='handelClose'
    @closed='handelClosed'
    :width='width'
    :top="top"
    custom-class='modlabox'
    :append-to-body='innerModal'
    :close-on-click-modal='isClickClose'
    :close-on-press-escape='isClickClose'
  >
    <div slot="title" class="dialog-title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div slot="footer" class="dialog-footer" v-if="isFooterBtn">
      <taskBtn size='modal' type="primary"  v-if="footerBtn.sure" @click="makeSure">{{footerBtn.sure}}</taskBtn>
      <taskBtn size='modal' @click="closePop" v-if="footerBtn.cancal">{{footerBtn.cancal}}</taskBtn>
      <p class="footer-infor--error" v-if="isFooterBtn && footerInfor">
          请填写正确的联系方式，24小时内将有客服人员联系您。
      </p>
    </div>
    <div v-else slot="footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>
<script>
import taskBtn from '~/components/UI/taskButton';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    top: {
      type: String,
      default: '15vh'
    },
    footerBtn: {
      type: Object,
      default: ()=>({
        sure: '确定',
        cancal: '取消'
      })
    },
    isFooterBtn: {
      type: Boolean,
      default: true
    },
    footerInfor:{
      type: Boolean,
      default: false
    },
    innerModal: {
      type: Boolean,
      default: false
    },
    isClickClose: {
      type: Boolean,
      default: true
    },
    notAutoClose: {
      type: Boolean,
      default: false
    }
  },
  components: {
    taskBtn
  },
  data(){
    return {
      modalBoxShow: false
    }
  },
  methods: {
    showModal(){
      this.modalBoxShow = true
    },
    makeSure(drag)  {
      this.$emit('sure')
      if(!this.notAutoClose){
        this.modalBoxShow = false
      }
    },
    closePop() {
      this.$emit('faild')
      this.modalBoxShow = false
    },
    handelOpen(){
      this.$emit('open')
    },
    handelOpened(){
      this.$emit('opened')
    },
    handelClose(){
      this.$emit('close')
    },
    handelClosed(){
      this.$emit('closed')
    }
  },
  watch: {
    // footerBtn(newVal,oldVal){
    //   console.log(newVal,oldVal)
    // }
  }
}
</script>

<style lang="scss">
.modlabox{
  .el-dialog__header{
    line-height: 20px;
    padding-top: 10px;
    background: #f6f6f6;
    .el-dialog__headerbtn{
      top: 12px;
    }
  }
  .dialog-title{
    font-size: 16px;
    color: rgba($color: #000000, $alpha: 0.8);
    font-weight: normal;
  }
  .el-dialog__body{
    min-height: 80px;
    max-height: 600px;
    overflow-y: auto;
    p{
      text-align: center;
    }
    .llp-table{
      padding: 0 10px;
    }
    .llp-table main{
      padding-top: 0;
    }
  }
  .dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-flow: wrap;
    width: 100%;
    padding-bottom: 20px;
    .task-button--modal{
      margin-right: 35px;
    }
    .task-button--modal:nth-child(2){
      margin-right: 0;
    }
    .footer-infor--error{
      width: 100%;
      margin-top: 20px;
      text-align: center;
      // color: #d44242;
      font-size: 12px;
      color: #3888FF;
    }
  }
}
.whitePaper_modale{
  .modlabox .el-dialog__body{
    padding-bottom: 0;
  }
}
</style>
