<template>
    <div class="right-content" @scroll='scroll' ref='content'>
         <div class="title clearfix">
                <div class="line"></div>
                <div class="txt">2.10  任务管理</div>
            </div>
         <div class="item-img" style="margin-top:20px;">
                <img src="~/assets/img/10_1.png" alt="">
        </div>
         <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">操作</div>
        </div>
         <div class="item mar">
             点击设置可以进入任务设置；
        </div>
         <div class="item mar">
            点击导出，可以导出该任务中已审核通过的有效数据。未标注或者丢弃数据不在其内。
        </div>
         <div class="item mar">
             点击删除，可以删除该任务；
        </div>
         <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">查看</div>
        </div>
         <div class="item mar">
           任务管理用户可以点击进入查看，检查他人当前任务阶段的标注情况，如果当前标注人员在标注考核数据，则查看的是考核数据的结果。创建人查看到的结果，是标注人所有请求到的数据的结果。
        </div>
         <div class="item-img" style="margin-top:20px;">
                <img src="~/assets/img/10_2.png" alt="" style="width:1000px;">
        </div>
         <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">待评测</div>
        </div>
         <div class="item mar">
           任务管理用户点击待评测，可以查看标注人员的考核结果，在该弹窗内显示该人的考核量、正确率、以及每条数据的标注结果。点击通过，该人则通过考核可以继续标注，点击未通过，则返回修改状态，继续修改标注数据。
        </div>
         <div class="item-img" style="margin-top:20px;">
                <img src="~/assets/img/10_3.png" alt="">
        </div>
         <div class="item-img" style="margin-top:20px;">
                <img src="~/assets/img/10_4.png" alt="">
        </div>
        <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt"> 待审核</div>
        </div>
        <div class="item mar">
           弹窗内显示该人标注的基础信息，用户可以点击检查的链接查看该人标注的具体情况，从而选择点击通过，未通过。
        </div>
        <div class="item-img" style="margin-top:20px;">
                <img src="~/assets/img/10_5.png" alt="">
        </div>
          <div class="fix clearfix">
                <div class="line">

                </div>
                <div class="ul">
                      <nuxt-link to="/help/17?height=527"><div class="it"> 操作</div> </nuxt-link>
                                <nuxt-link to="/help/17?height=690"><div class="it">查看</div> </nuxt-link>
                                <nuxt-link to="/help/17?height=1470"><div class="it">  待评测</div> </nuxt-link>
                                <nuxt-link to="/help/17?height=1826"><div class="it"> 待审核</div> </nuxt-link>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    layout:"help",
    mounted(){
        if(this.$route.query.height){
             this.$refs.content.scrollTop =  this.$route.query.height;
        }
        window.$nuxt.setLayout('help')
       
       
    },
    watch:{
         $route(){
            this.$refs.content.scrollTop =  this.$route.query.height;
        }
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
        },
         scroll(){
            console.log(this.$refs.content.scrollTop)
        }

    }
}
</script>
<style lang="stylus">
.page-wrapper{
    display flex
    flex-direction column
}
</style>

<style lang="stylus" scoped>
.fix{
    position fixed
    top 100px
    right 24px
    
    .ul{
        float left
        border-left 3px solid #dcdee3
        padding-left 14px
        a{
             color #343434
             font-size 12px
            
             .it{
                margin-top 8px
             }
        }
       
    }
}
.tri{
    width:0; 
    height:0; 
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    border-top:10px solid #FFFFFF;
    margin-top 6px
    border-radius 2px
}
.downtri{
    width:0;
    height:0;
    border-top:6px solid transparent;
    border-bottom:6px solid transparent;
    border-right:10px solid #FFFFFF;
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
                font-size: 16px;
                color: #FFFFFF;
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
                            margin-top 8px
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
