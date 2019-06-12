<template>
  <div class="page-wrapper">
    <navHeader></navHeader>
    <div class="help">
        <div class="left-menu">
            <div class="title">
                帮助文档
            </div>
            <div class="jianjie">
                <div class="chanpin">
                    
                     <el-menu >
                      <nuxt-link to="/help"><el-submenu index="1">
                      <template slot="title"> 产品概述</template>
                     
                      </el-submenu></nuxt-link>
                     </el-menu>
                     
                     <div class="titl">
                        <div class="txt">操作指南</div>
                         <div class="icon"></div>
                    </div>
                     <div class="list">

                        <div class="item clearfix">
                            <div class="clearfix head">
                                <div class="txt" @click="show">2.1创建多人任务</div>
                                <div class="icon" :class="{tri:active,downtri:!active}" @click="show"></div>
                            </div>
                            <div class="list-item" v-show="active" >
                                <nuxt-link to="/help/2?height=0"> <div class="it">2.1.1  任务名称</div> </nuxt-link>
                                <nuxt-link to="/help/2?height=0"> <div class="it">2.1.2  任务类型</div></nuxt-link>
                                <nuxt-link to="/help/2?height=980"> <div class="it">2.1.3  内置模型（实体识别）</div></nuxt-link>
                                <nuxt-link to="/help/2?height=1304"><div class="it">2.1.4  上传数据</div></nuxt-link>
                                <nuxt-link to="/help/2?height=1780"> <div class="it">2.1.5  载入示例数据</div></nuxt-link>
                                <nuxt-link to="/help/2?height=2160"> <div class="it">2.1.6  每条数据的标注次数</div></nuxt-link>
                                <nuxt-link to="/help/2?height=2605"> <div class="it">2.1.7  标注人员</div></nuxt-link>
                                <nuxt-link to="/help/2?height=3260"><div class="it"> 2.1.8  截止日期</div></nuxt-link>
                                <nuxt-link to="/help/2?height=3330"><div class="it">2.1.9  算法选择</div></nuxt-link>
                                <nuxt-link to="/help/2?height=3509"><div class="it">2.1.10  标注规范</div></nuxt-link>
                                <nuxt-link to="/help/2?height=3720"><div class="it">2.1.11  规则配置</div></nuxt-link>
                            </div>
                        </div>


                        <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show2">2.2   任务设置</div>
                                <div class="icon" :class="{tri:active2,downtri:!active2}" @click="show2"></div>
                            </div>
                            <div class="list-item" v-show="active2">

                                <nuxt-link  to="/help/1"><div class="it">2.2.1  任务名称</div></nuxt-link>
                                <nuxt-link  to="/help/1"><div class="it">2.2.2  标注人员</div></nuxt-link>
                                <nuxt-link  to="/help/1?height=360"><div class="it"> 2.2.3  分类名标签</div></nuxt-link>
                               <nuxt-link  to="/help/1?height=360"> <div class="it">2.2.4  追加数据</div></nuxt-link>
                                <nuxt-link  to="/help/1?height=360"><div class="it"> 2.2.5  截止日期</div></nuxt-link>
                               <nuxt-link  to="/help/1?height=360"> <div class="it"> 2.2.6  标注规范</div></nuxt-link>

                            </div>
                        </div>


                         <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show3"> 2.3   任务详情</div>
                                <div class="icon" :class="{tri:active3,downtri:!active3}" @click="show3"></div>
                            </div>
                            <div class="list-item" v-show="active3">
                                  <nuxt-link to="/help/3">
                                <div class="it">2.3.1  任务信息</div>
                                <div class="it">2.3.2  任务分配</div>
                                 </nuxt-link>
                            </div>
                        </div>


                        <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show4">2.4  创建单人任务</div>
                                <div class="icon" :class="{tri:active4,downtri:!active4}" @click="show4"></div>
                            </div>
                            <div class="list-item" v-show="active4">
                                 <nuxt-link to="/help/4">
                                  <div class="it">2.4.1  任务名称</div>
                                  <div class="it">2.4.2  任务类型</div>
                                  <div class="it"> 2.4.3  内置模型（实体识别）</div>
                                 </nuxt-link>
                               <nuxt-link  to="/help/4?height=360">
                                 <div class="it">2.4.4  上传数据</div>
                               </nuxt-link>
                               <nuxt-link  to="/help/4?height=360">
                                  <div class="it"> 2.4.5  规则配置</div>
                               </nuxt-link>
                            </div>
                        </div>

                        <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show5">2.5  任务设置（单人)</div>
                                <div class="icon" :class="{tri:active5,downtri:!active5}" @click="show5"></div>
                            </div>
                            <div class="list-item" v-show="active5">
                                 <nuxt-link to="/help/5">
                                <div class="it">2.5.1  任务名称</div>
                                <div class="it">2.5.2  分类名标签</div>
                                <div class="it"> 2.5.3  追加数据</div>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="item">
                                <nuxt-link to="/help/19">
                                  <div class="clearfix head">
                                      <div class="txt">2.6  任务详情（单人)</div>
                                      <div class="icon" ></div>
                                  </div>
                                 </nuxt-link>
                        </div>
                        <div class="item">
                                <nuxt-link to="/help/6">
                                <div class="clearfix head">
                                    <div class="txt">2.7  消息</div>
                                    <div class="icon" ></div>
                                </div>
                                </nuxt-link>
                        </div>
                        <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show6">2.8  分类任务</div>
                                <div class="icon" :class="{tri:active6,downtri:!active6}" @click="show6"></div>
                            </div>
                            <div class="list-item" v-show="active6">
                                <nuxt-link to="/help/7"> <div class="it">2.8.1  示例标注</div></nuxt-link>
                                <nuxt-link to="/help/8"><div class="it">2.8.2  查看示例</div></nuxt-link>
                                <nuxt-link to="/help/9"><div class="it"> 2.8.3  查看结果</div></nuxt-link>
                                <nuxt-link to="/help/10"><div class="it">2.8.4  考核标注</div></nuxt-link>
                                <nuxt-link to="/help/11"><div class="it">2.8.5  任务标注</div></nuxt-link>
                            </div>
                        </div>
                        <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show7">2.9  实体识别任务</div>
                                <div class="icon" :class="{tri:active7,downtri:!active7}" @click="show7"></div>
                            </div>
                            <div class="list-item" v-show="active7">
                                <nuxt-link to="/help/12"><div class="it">2.9.1  示例标注</div></nuxt-link>
                                <nuxt-link to="/help/13"><div class="it">2.9.2  查看示例</div></nuxt-link>
                                <nuxt-link to="/help/14"><div class="it"> 2.9.3  查看结果</div></nuxt-link>
                                <nuxt-link to="/help/15"><div class="it">2.9.4  考核标注</div></nuxt-link>
                                <nuxt-link to="/help/16"><div class="it">2.9.5  任务标注</div></nuxt-link>
                            </div>
                        </div>
                        <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show8">2.10  任务管理</div>
                                <div class="icon" :class="{tri:active8,downtri:!active8}" @click="show8"></div>
                            </div>
                            <div class="list-item" v-show="active8">

                                  <nuxt-link to="/help/17?height=527"><div class="it">2.10.1  操作</div> </nuxt-link>
                                <nuxt-link to="/help/17?height=690"><div class="it">2.10.2  查看</div> </nuxt-link>
                                <nuxt-link to="/help/17?height=1470"><div class="it"> 2.10.3  待评测</div> </nuxt-link>
                                <nuxt-link to="/help/17?height=1826"><div class="it">2.10.4  待审核</div> </nuxt-link>

                            </div>
                        </div>
                         <div class="item">
                                <div class="clearfix head">
                                <div class="txt" @click="show9">2.11  人员管理</div>
                                <div class="icon" :class="{tri:active9,downtri:!active9}" @click="show9"></div>
                            </div>
                            <div class="list-item" v-show="active9">
                                <nuxt-link to="/help/18">
                                <div class="it">2.11.1  当前任务</div>
                                <div class="it">2.11.2  历史任务</div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <nuxt/>

    </div>
  </div>
</template>
<script>
import navHeader from '~/components/header'
export default {
  components: {
    navHeader
  },
  data (){
        return {
           active:true,
           active2:true,
           active3:true,
           active4:true,
           active5:true,
           active6:true,
           active7:true,
           active8:true,
           active9:true,
        }
    },
    methods:{
        show(){
            if(this.active){
                this.active = false
            }else{
                this.active = true
            }
        },
          show2(){
            if(this.active2){
                this.active2 = false
            }else{
                this.active2 = true
            }
        },
          show3(){
            if(this.active3){
                this.active3 = false
            }else{
                this.active3 = true
            }
        },
          show4(){
            if(this.active4){
                this.active4 = false
            }else{
                this.active4 = true
            }
        },
          show5(){
            if(this.active5){
                this.active5 = false
            }else{
                this.active5 = true
            }
        },
          show6(){
            if(this.active6){
                this.active6 = false
            }else{
                this.active6 = true
            }
        },
          show7(){
            if(this.active7){
                this.active7 = false
            }else{
                this.active7 = true
            }
        },
          show8(){
            if(this.active8){
                this.active8 = false
            }else{
                this.active8 = true
            }
        },  show9(){
            if(this.active9){
                this.active9 = false
            }else{
                this.active9 = true
            }
        }

    }
}
</script>

<style lang='scss'>


#__nuxt,#__layout{
  width: 100%;
  height: 100%;
  position: relative;
}
.page-wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 1366px;

}
.help .right-content .item{
    font-size: 14px!important;
    color: rgba(0, 0, 0, 0.8)!important;
    line-height: 26px;
}
.help .right-content{
        padding: 10px 36px!important;
}
.right-content .title{

    margin-top: 30px
}
.mar{
    margin-top: 11px!important;
    margin-left: 20px!important;
}
.margin{
    margin-left: 0!important;
}
.help .right-content .item-img{
    margin-left: 8px!important;
}
</style>
<style lang="stylus">

    .el-menu{
        background-color: #313440;
        border-right: solid 1px #313440;
    }
   .el-submenu__title{
        color: rgba(255,255,255,0.7);
    }
    .el-submenu__title:hover{
       color : #3888ff;
       background-color: #313440;
    }

</style>

<style lang="stylus" scoped>
.tri{
    width:0;
    height:0;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    border-top:8px solid #d5d6d8;
    margin-top 6px
    border-radius 2px
}
.downtri{
    width:0;
    height:0;
    border-top:6px solid transparent;
    border-bottom:6px solid transparent;
    border-right:8px solid #d5d6d8;
    margin-top 6px
    border-radius 2px
}
.help{
    flex 1
    display flex
    flex-direction row
    background: #313440;
    .left-menu{
        width 273px
        height 100%
        padding 22px 19px
        overflow auto
        .title{
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: 0;
            margin-bottom 20px
            .txt{
                font-size: 15px;
                color: #FFFFFF;
            }
        }
        .jianjie{
             .titl{
                margin-top 18px
                font-size: 16px;
                color: #FFFFFF
                letter-spacing: 0;
                margin-bottom 10px
                .txt{
                    font-size: 15px;
                    color: #FFFFFF;
                }
                
               
            }
            .list{
                margin-left 24px
                .item{
                    font-size: 14px;
                    cursor pointer
                    color: rgba(255,255,255,0.80);
                    margin-bottom 10px
                    .head{

                        .txt{
                            float left
                            font-size: 15px;
                            color: rgba(255,255,255,0.80);
                        }
                        .icon{
                            float right
                        }
                    }
                    .list-item{
                        margin-left 20px
                        .it{
                            margin-top 12px
                            color: rgba(255,255,255,0.7);
                        }
                    }
                }
            }
        }
    }
    .right-content{
        flex 1
        background white;
        height 100%
        overflow auto
        padding 24px 26px
        .title{
            .line{
                float left
                width 2px
                height 20px
                background: #4693FF;
            }
            .txt{
                margin-left 12px
                float left
                font-size: 16px;
                color: rgba(0,0,0,0.80);
            }
        }
        .little-title{
            margin-top 27px
            .radio{
                float left
                width 7px
                height 7px
                background: #67C23A;
                border-radius 50%
                margin-top 8px
            }
            .txt{
                font-size: 16px;
                color: #000000;
                float left
                margin-left 16px
            }

        }
        .item-img{
            margin-left 88px
        }
        .item{
            font-size: 16px;
            color: #000000;
        }
    }
    >>>.el-tree-node>.el-tree-node__children{
        font-size: 14px;
        color: rgba(255,255,255,0.80);
        background-color: #313440;
    }
    >>>.el-tree-node__content:hover {
        background-color: #313440;
    }
    >>>.el-tree-node__content{
        font-size: 15px;
        color: #FFFFFF;
        background: #313440;
    }
}
.margin {
    margin-left 88px
}
.mar{
    margin-left 108px
    margin-top 14px
}
</style>
