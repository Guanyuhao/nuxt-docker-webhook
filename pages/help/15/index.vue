<template>
    <div class="right-content">
        <div class="title clearfix">
                <div class="line"></div>
                <div class="txt">2.9.4 考核标注</div>
            </div>
         <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">标注操作</div>
        </div>
         <div class="item mar">
             点击上一页、下一页，跳过该条数据；
        </div>
         <div class="item mar">
            点击提交，视为该条数据标注完毕，自动跳转至下一条数据；
        </div>
         <div class="item mar">
            输入实体标签上的快捷键，视为标注该类实体标签；
        </div>
         <div class="item mar">
           点击字号图标，可以调整分类文本内容的字号大小。
        </div>
        <div class="item-img" style="margin-top:20px;">
                <img src="~/assets/img/9_4.png" alt="" style="width:1000px;">
        </div>
         <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">全文匹配</div>
        </div>
        <div class="item mar">
           开启时，表示针对该条数据内的全部相同文本进行自动标注，例如，用户在文中选中了“肺结核”三个字进行标注，系统则会自动标记该条数据内的所有“肺结核”。关闭时，只标注划选的词。取消标注的操作同样受该开关控制。
        </div>
         <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">特殊字符</div>
        </div>
         <div class="item mar">
           特殊字符在开启时，自动过滤掉例如“空格”、“顿号”、“逗号”、"冒号"、“括号”、“单引号、双引号”、“分号”、“问号”等特殊字符的标记。关闭时将该符号一同标记。
        </div>
        <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">清空标签</div>
        </div>
        <div class="item mar">
                点击按钮，清空该篇数据内的所有标签。
        </div>
        <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt"> 历史记录</div>
        </div>
        <div class="item mar">
               点击向后翻页的按钮，可以继续请求未标注数据；
        </div>
         <div class="item mar">
              点击历史记录的标签，可以任意跳转到不同的数据；
        </div>
         <div class="item mar">
              点击返回到已标注的数据，可以进行任意修改；
        </div>
         <div class="item mar">
            勾选显示未标注数据，只显示用户已经请求到的未标注数据。
        </div>
          <div class="fix clearfix">
                <div class="line">

                </div>
                <div class="ul">
                    <nuxt-link to="/help/12"><div class="it"> 示例标注</div></nuxt-link>
                                <nuxt-link to="/help/13"><div class="it">查看示例</div></nuxt-link>
                                <nuxt-link to="/help/14"><div class="it"> 查看结果</div></nuxt-link>
                                <nuxt-link to="/help/15"><div class="it"> 考核标注</div></nuxt-link>
                                <nuxt-link to="/help/16"><div class="it">  任务标注</div></nuxt-link>
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
    margin-left 108px
    margin-top 14px
}
</style>
