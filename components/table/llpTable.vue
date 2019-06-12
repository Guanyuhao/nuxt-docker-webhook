<template>
  <div class="llp-table" ref="content">
    <header v-if="isHeader" ref="header" >
			<slot name="header"></slot>
    </header>
    <main v-if="isMain" :style="mainHeight" >
			<slot name="main"></slot>
    </main>
    <footer v-if="isFooter" ref="footer">
			<slot name="footer"></slot>
		</footer>
  </div>
</template>
<script>

export default {
  props: {
    // 传入对象 计算修改table的高度
    tableHeight: {
			type: Object,
			default: ()=>({
				height: 0
			})
		},
    isHeader: {
      type: Boolean,
			default: true
    },
    isMain: {
      type: Boolean,
			default: true
    },
    isFooter: {
			type: Boolean,
			default: true
		}
  },
  data(){
    return {
      mainHeight: 0,
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.calMainHeight();
    })
    let setTimer = null
    // 节流
    window.onresize = () => {

			this.$nextTick(() => {
				if (setTimer) {
					clearTimeout(setTimer)
				}
				setTimer = setTimeout(()=>{
					this.calMainHeight();
				}, 500)
			})
		}
  },
  methods: {
    calMainHeight(){
      let headerHeight = this.$refs.header?this.$refs.header.offsetHeight:0,
          footerHeight = this.$refs.footer?this.$refs.footer.offsetHeight:0,
          llpTableHeight = this.$refs.content? this.$refs.content.offsetHeight: 0;
			this.mainHeight = {minHeight: llpTableHeight - headerHeight - footerHeight - 24 + 'px'};
      this.tableHeight.height = llpTableHeight- headerHeight - footerHeight - 24 + 'px';
      // console.log('table height---'+llpTableHeight,headerHeight,footerHeight)

      // console.log('table height---'+this.tableHeight.height)
    },

  },
  components: {

  }
}
</script>
<style lang="scss">
@import '~assets/styles/scss/vars';
@import '~assets/styles/scss/mixins';
.llp-table{
  height: 100%;
  padding: 0 25px;
  position: relative;
  .pd5{
    padding: 0 5px;
  }
  .pd10{
    padding: 0 10px;
  }
  .f14{
    font-size: 14px;
  }
  .f12{
    font-size: 12px;
  }
  .mr16{
    margin-right: 16px;
  }
  header{
    width: 100%;
    padding-top: 28px;
    @include classflex();
    flex-direction: row;
    .right{
      @include classflex();
      flex-direction: row;
      .search{
        width: 260px;
        margin-right: 32px;
      }
      .el-select{
        width: 124px;
        margin-right: 28px;
        .el-input__inner{
          background: #f6f6f8;
          color: rgba($color: #000000, $alpha: 0.8);
          font-size: 14px;
        }
        &:last-child{
          margin-right: 0;
        }
      }

    }
  }
  main{
    width: 100%;
    padding-top: 24px;
    .el-table .el-button:not(.is-disabled){
      color: $blue;
    }
    .el-table .el-button{
      font-weight: normal;
    }
    .el-table__header thead th{
      padding: 0 0;
      background: $table-background;
      border-color: $table-border-color;
      border-right: none;
      height: 35px;
      color: rgba($color: #000000, $alpha: 0.6);
      font-weight: normal;
      .cell{
        padding-left: 16px;
      }
    }
    .el-table__body tbody td{
      padding: 4px 0;
      border-color: $table-border-color;
      border-bottom: none;
      color: rgba($color: #000000, $alpha: 0.8);
      .cell{
        padding-left: 16px;
        padding-right: 20px;
      }
    }
    .td_bottom--border tbody td{
      border-bottom: 1px solid $table-border-color;
    }

    .el-table__body tbody tr:nth-last-child(1) td{
      border-bottom: 1px solid #DCE2EA;
    }
    .el-table__body tbody tr.spanIndex>td:nth-child(-n+9){
      border-bottom: 1px solid #DCE2EA;
    }
    .el-table__body tbody .mangerLast td{
      border-bottom: 1px solid #DCE2EA;
    }

    .el-table--border, .el-table--group{
      border-color: $table-border-color;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
      background-color:  $table-border-color;
    }
    .el-table--enable-row-hover .el-table__body tr:not(.taskstriped):hover>td{
      background-color: transparent !important;
    }
    .el-table--enable-row-hover .el-table__body .taskstriped:hover>td{
      background-color: $table-background-striped !important;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td{
      background: $table-background-striped !important;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped:hover>td{
      background: $table-background-striped !important;
    }
    .el-table__empty-block{
      position: relative;
      background: url('~assets/img/nodata.png') no-repeat center 25%;
      background-size: 267px auto;
      background-position-x: calc(50vw - 200px)
    }
    .modalTable .el-table__empty-block{
      background: none;
    }
    .modalTable .el-table__empty-text{
      position: static;
    }
    .el-table__empty-text{
      position: absolute;
      bottom: 25%;
      display: none;
    }
    .sampleLoader-radio-wrapper{
      .el-radio__label{
        display: none;
      }
    }
    .modalTable{
      .el-table__body-wrapper{
        .el-table__row{
          td {
            padding: 8px 0;
            border-bottom: none;
          }
          &:nth-child(2n){
            background: $table-background-striped;
          }
        }
      }
      margin-bottom: 20px;
      .typeName{
        display: inline;
        color: #fff;
        margin-left: 0px;
        padding-left: 6px;
        padding-right: 0px;
        overflow: hidden;
        padding-right: 5px;
        border-radius: 2px;
        position: relative;
        img{
            width: 16px;
            height: 16px;
            position: relative;
            cursor: pointer;
            right: 0px;
            top: 3px;
        }
        .span{
            float:left;
        }
      }
    }
    .el-table__body-wrapper{
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

  }
  footer{
    height: 80px;
    @include classflex(center);
  }

}
</style>
