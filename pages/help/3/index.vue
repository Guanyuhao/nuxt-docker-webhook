<template>


        <div class="right-content">
           <div class="title clearfix">
                <div class="line"></div>
                <div class="txt">2.3 任务详情</div>
            </div>
            <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">任务信息</div>
            </div>
            <div class="item mar">
                其中任务信息包含任务名称、创建人、创建截止时间、标注规范、数据集等相应的基础信息；
            </div>
            <div class="item-img">
                <img src="~/assets/img/3_1.png" alt="">
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">任务分配</div>
            </div>
            <div class="item mar">
                人员分配包含任务的统计信息：任务量、示例数量、考核数量、任务进度。
            </div>
             <div class="item mar">
               人员的具体任务分配，个人进度。
            </div>
            <div class="item-img">
                <img src="~/assets/img/3_2.png" alt="">
            </div>
             <div class="fix clearfix">
                <div class="line">

                </div>
                <div class="ul">
                   
                </div>
            </div>
    </div>
</template>
<script>
export default {
    layout:"help",
    mounted(){
        window.$nuxt.setLayout('help')
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
    margin-left 100px
    margin-top 14px
}
</style>
