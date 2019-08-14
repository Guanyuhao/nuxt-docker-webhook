<template>
<div class="bottomlist">
  <div class="bottom" v-show="state">
    <div class="history clearfix">
      <div class="left-title">
        历史记录
      </div>
      <div class="right-btn" @click="hide">
        <img src="~/assets/img/shouqi.png" alt="">
      </div>
    </div>
    <div class="show">
      <div class="left-btn" @click="prePage" v-if="!checked">
        <img src="~/assets/img/prepage.png" alt="">
      </div>
      <div class="show-list" ref="list">
        <div class="list">
          <div class="border" v-for="(item,index) in list" :key="index" @click="setActive(index)" :class="{active:index==activeIndex}">
            <div class="message">
              <div class="head clearfix">
                <div class="title">
                  {{item.showId}}
                </div>
                <div class="state" :style="{background:item.color}">

                </div>
              </div>
              <div v-if="item.content" class="txt">{{item.content}}</div>
              <div v-if="item.path" class="img">
                <img :src="item.path" alt="" width="140" height="60">
              </div>
            </div>
          </div>
        </div>
        <div class="nodata" v-show="list.length==0">
          暂无数据
        </div>
      </div>
      <div class="right-btn" @click="nextPage" v-if="!checked">
        <img src="~/assets/img/nextpage.png" alt="">
      </div>
    </div>
    <div class="page clearfix">
      <div class="no-tag" v-show="type">
        <el-checkbox v-model="checked" @change="change">仅显示未标注数据
          <el-tooltip class="main-top__help--small smallhelp" placement="top">
            <div slot="content">数据为动态分配，此处仅显示已分配给您的未标记数据。</div>
            <div></div>
          </el-tooltip>
        </el-checkbox>
      </div>
      <el-pagination v-if="!checked" ref="page" @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
  <div class="bottom2" v-show="!state">
    <div class="history clearfix">
      <div class="left-title">
        历史记录
      </div>
      <div class="left-btn" @click="prePage" v-if="!checked">
        <img src="~/assets/img/prepage.png" alt="">
      </div>
      <div class="list clearfix">
        <div class="item" v-for="(item,index) in list" :key="index" @click="setActive(index)" :class="{active:index==activeIndex}" :style="{background:item.color}">{{item.showId}}</div>
      </div>
      <div class="right-btn" @click="show">
        <img src="~/assets/img/zhankai.png" alt="">
      </div>
      <div class="next-btn" @click="nextPage" v-if="!checked">
        <img src="~/assets/img/nextpage.png" alt="">
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ["type", "list", "total", "activeIndex"],
  watch: {
    $route() {
      this.$refs.list.scrollLeft = 0;
      this.currentPage = Number(this.$route.query.page);
      setTimeout(() => {

        this.$refs.page.internalCurrentPage = Number(this.$route.query.page);
        this.$refs.page.$forceUpdate();
      }, 1600)

    },
    total() {

    }
  },
  data() {
    return {
      checked: false,
      currentPage: 1,
      state: true,
      checked: false,
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("changePage", val)
      this.$refs.list.scrollLeft = 0;
    },
    nextPage() {
      this.$emit("next");
      this.$refs.list.scrollLeft = 0;
    },
    prePage() {
      this.$emit("pre");
      this.$refs.list.scrollLeft = 0;
    },
    setActive(index) {
      this.$emit('setIndex', index)
    },
    hide() {
      this.state = false;
    },
    show() {
      this.state = true;
    },
    change() {
      this.$emit("change", this.checked)
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar-track {
  box-shadow: none;
  border-radius: 1px;
  background-color: #1d1e1f;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border: 1px solid #262832;
  background-color: #464957;
}
</style><style lang="stylus" scoped>
.bottomlist {
  width 100%
}

.smallhelp {
  position: absolute;
  right: -10px;
  top: 4px;
}

.main-top__help--small {
  width: 10px;
  height: 10px;
  background: url('~assets/img/task/smallhelp.png') 100% 100% no-repeat;
  cursor: pointer;
  background-size contain;
}

.bottom2 {
  .history {
    padding-left 11px;
    padding-right 30px;
    box-sizing border-box;
    position relative;
    background #313440;
    padding-bottom 24px;
    line-height 20px;

    .left-title {
      height 25px;

      line-height 25px;
      font-size: 12px;
      color: #B8B9BD;
    }

    .left-btn {
      float left;
      width 28px;
      text-align center;

      img {
        margin-top 2px;
        width 20px;
        height 20px;
        cursor pointer;
      }
    }

    .list {
      display flex;

      flex-wrap nowrap;
      margin-top 2px;
      overflow auto;

      .item {
        cursor pointer;

        min-width 60px;
        height 24px;
        text-align center;
        line-height 24px;
        margin-left 4px;
        font-size: 14px;
        color: #FFFFFF;
        background: #464957;
      }

      .active {
        background: #AAADBA;
        font-size: 12px;
        color: white;
      }
    }

    .next-btn {
      width 28px;
      float right;
      text-align center;
      position: absolute;
      right: 24px;
      top: 28px;

      img {
        margin-top 2px;
        cursor pointer;
        width 20px;
        height 20px;
      }
    }

    .right-btn {
      position absolute;
      right 30px;
      top 0;
      margin-top 3px;
      cursor pointer;

      img {
        width 18px;
        height 18px;
      }
    }
  }
}

.bottom {
  height 172px;
  padding 3px;
  background: #262832;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .left-title {

    font-size: 12px;
    color: #B8B9BD;
  }
}

.bottom .history {
  padding-left 11px;
  padding-right 30px;
  box-sizing border-box;
  background #313440;
  line-height 20px;

  .left-title {
    height 25px;
    float left;
    line-height 25px;
    font-size: 12px;
    color: #B8B9BD;
  }

  .right-btn {
    float right;
    margin-top 3px;
    cursor pointer;

    img {
      width 18px;
      height 18px;
    }
  }
}

.show {
  height 116px;
  display flex;
  flex-direction row;

  .left-btn {
    width 28px;
    text-align center;

    img {
      margin-top 46px;
      width 20px;
      height 20px;
      cursor pointer;
    }
  }

  .show-list {
    flex 1;
    overflow-x auto;
    overflow-y hidden;
    white-space nowrap;
    position relative;

    .list {
      position relative;
      display inline-block;

      .active {
        background: #464957;
      }
    }

    .nodata {
      color rgba(255, 255, 255, 0.8);
      position absolute;
      left 50%;
      margin-top 20px;
    }

    .border {
      width 170px;
      display inline-block;
      cursor pointer;
      height 106px;
      margin-right 4px;
      position relative;
      padding 11px;
      box-sizing border-box;
      margin-top 5px;
      background: #313440;

      .message {
        width: 100%;
        border: 1px solid #262832;
        height: 100%;
        background: #313440;
        box-sizing: border-box;

        .title {
          font-size: 12px;
          color: #FFFFFF;
          margin-left 5px;
          margin-top 4px;
          float left;
        }

        .state {
          width 9px;
          height 9px;
          margin-right 6px;
          margin-top 6px;
          border-radius 50%;

          float right;
        }

        .txt {
          overflow: hidden;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          height 60px;
          padding 6px;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          white-space: normal;
          background #464957;
          text-overflow: ellipsis;
          -webkit-box-orient vertical;
        }

      }
    }

  }

  .right-btn {
    width 28px;
    text-align center;

    img {
      margin-top 46px;
      cursor pointer;
      width 20px;
      height 20px;
    }
  }

}

.page {
  height 28px;
  text-align center;
  background: #313440;
  border: 1px solid #262832;

  .no-tag {
    float left;

    >>>.el-checkbox {
      font-size: 12px;
      color: #C6C7C7;
    }

    >>>.el-checkbox__inner {
      background-color: #383b49;
      font-size 12px;
      margin-left 14px;
    }

    >>>.el-checkbox__label {
      font-size 12px;
    }
  }

  >>>.el-pagination__total {
    font-size: 12px;
    color: #C6C7C7;
  }

  >>>.el-pagination .btn-prev,
  >>>.el-pagination .btn-next {
    background #383b49;
    color: #b2b6bd;
  }

  >>>.el-pager li {
    background: #383b49;
    color: #C6C7C7;
    height 24px;
    line-height 24px;
  }

  >>>.el-pager li.active {
    color: #409EFF;
  }

  >>>.el-pagination__editor.el-input .el-input__inner {
    height 21px;
    margin-top -4px;
    background #383b49;
    color: #b2b6bd;
  }

  >>>.el-pagination__editor.el-input {
    width 36px;

  }

  >>>.el-pagination__jump {
    color: #C6C7C7;
  }
}
</style>
