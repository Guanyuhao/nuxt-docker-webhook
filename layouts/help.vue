<template>
  <div class="page-wrapper">
    <navHeader></navHeader>
    <div class="help">
        <div class="left-menu">
            
            <div class="jianjie">
                <div class="chanpin">
                    
                     <el-menu >
                      <nuxt-link to="/help"><el-menu-item index="1">
                      <template slot="title" > 产品概述</template>
                      </el-menu-item></nuxt-link>
                     </el-menu>
                    <el-menu :default-openeds="openeds">
                      <el-submenu index="1" >
                      <template slot="title"> 操作指南</template>
                        <nuxt-link to="/help/2?height=0"><el-menu-item index="1-1">创建多人任务</el-menu-item></nuxt-link>
                         <nuxt-link  to="/help/1"><el-menu-item index="1-2">任务设置</el-menu-item></nuxt-link>
                         <nuxt-link to="/help/3"><el-menu-item index="1-3">任务详情</el-menu-item></nuxt-link>
                          <nuxt-link to="/help/4"><el-menu-item index="1-4">创建单人任务</el-menu-item></nuxt-link>
                         <nuxt-link to="/help/19"><el-menu-item index="1-5">任务设置（单人)</el-menu-item></nuxt-link>
                        <nuxt-link to="/help/6"><el-menu-item index="1-6">消息</el-menu-item></nuxt-link>
                        <nuxt-link to="/help/7"><el-menu-item index="1-7">分类任务</el-menu-item></nuxt-link>
                        <nuxt-link to="/help/12"><el-menu-item index="1-8">实体识别任务</el-menu-item></nuxt-link>
                        <nuxt-link to="/help/17"><el-menu-item index="1-9">任务管理</el-menu-item></nuxt-link>
                        <nuxt-link to="/help/18"><el-menu-item index="1-10">人员管理</el-menu-item></nuxt-link>
                      </el-submenu>
                     </el-menu>
                    
                    
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
           openeds:["1"]
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
        width: 752px;
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
    overflow: auto;
}
</style>
<style lang="stylus">
.el-menu-item.is-active{
     color: rgba(255,255,255,0.7);
}
.el-menu-item, .el-submenu__title{
    height 48px
}
    .el-submenu .el-menu-item{
        height 40px
    }
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
    .el-menu-item:focus, .el-menu-item:hover{
        color : #3888ff;
        background-color: #313440;
    }
    .el-menu-item{
        color: rgba(255,255,255,0.7);
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
