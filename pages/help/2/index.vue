<template>
   
        
        <div class="right-content" ref="content" @scroll="scroll">
            <div class="title clearfix">
                <div class="line"></div>
                <div class="txt">2.1 创建多人任务</div>
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">任务名称</div>
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">任务类型</div>
            </div>
            <div class="item mar">
                当前系统支持分类和实体识别两种类型
            </div>
             <div class="item mar">
                分类及实体识别标签有输入、上传两种方式，第一种是直接在输入框中输入；另一种是通过模板上传类别模板，一般适用于标签多余10个的时候。
            </div>
             <div class="item-img">
                <img src="~/assets/img/2_1.png" alt="">
            </div>
            <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">内置模型（实体识别）</div>
            </div>
             <div class="item mar">
                系统预制了人名、地名、机构名等内置实体识别的模型，用户点击内置模型可以任意选择，系统自动通过模型进行预测。
            </div>
            <div class="item-img">
                <img src="~/assets/img/2_2.png" alt="">
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">上传数据</div>
            </div>
            <div class="item mar">
                在用户点击上传数据后，会弹出任务配置，包含是否需要标注示例数据？是否需要针对标注人员进行考核？用户可以任意进行选择。选择需要，则可以继续选择数量。
            </div>
            <div class="item-img">
                <img src="~/assets/img/2_3.png" alt="">
            </div>
            <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">载入示例数据</div>
            </div>
            <div class="item mar">
               点击载入示例数据，可以在示例数据中任选其一，载入后，系统会自动填入分类名等必要信息，可以让用户快速学习创建任务的方法。
            </div>
            <div class="item-img">
                <img src="~/assets/img/2_4.png" alt="">
            </div>
            <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">选择每条数据的标注次数</div>
            </div>
            <div class="item mar">
               在进行高标准的训练任务时，为了提高数据标注质量，通常会将一条数据标注多次，以少数服从多数的原则选择最优结果。例如：分类任务，针对多人标注同一条数据的情况：用户需要提前对“”结果近似”或者“多人丢弃”的数据选择处理方式，可以选择“丢弃”或者“重新标注”，重新标注需要在此处选择标注人员进行最终确认（可选多人，结果以此人标注结果为最终结果）。
            </div>
            <div class="clearfix" style="margin-top:30px">
                 <div class="item-img" style="float:left;">
                    <img src="~/assets/img/2_5.png" alt="">
                </div>
                <div class="item-img" style="float:left;">
                    <img src="~/assets/img/2_6.png" alt="">
                </div>
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">选择标注人员</div>
            </div>
             <div class="item mar">
               选择标注人员时，考核答案、示例标注与任务标注的人员可以单独进行选择，也可以重复选择；
            </div>
            <div class="item mar">
               系统会根据所选的标注人数自动分配标注比例，用户可以自行调整，任务分配必须100%才能确定；
            </div>
            <div class="item-img" style="margin-top:20px;">
                    <img src="~/assets/img/2_7.png" alt="">
            </div>
            <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">确定任务的截止日期</div>
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">算法选择</div>
            </div>
             <div class="item mar">
                 非专业人员建议使用默认算法，专业人员可以自行调整。
            </div>
            <div class="item-img" style="margin-top:20px;">
                    <img src="~/assets/img/2_8.png" alt="">
            </div>
            <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">标注规范</div>
            </div>
            <div class="item mar">
                 为什么要输入标注规范？
            </div>
            <div class="item mar">
                数据标注是一项繁冗、复杂的工作，不同任务的标注要求，常常大相径庭，这就要求每一个标注任务都要有尽可能详尽的要求和规范。任务管理者发布的标
            </div>
            <div class="item mar">
                 注规范越详尽，标注人员的准确度和工作效率将会越高。建议用户在书写标注规范的同时，附上相应的示例，便于标注人员理解，记忆。
            </div>
            <div class="item mar">
                 为什么要输入标注规范？
            </div>
            <div class="item mar">
                  标注规范可以包含哪些内容？
            </div>
            <div class="item mar">
                1、分类名或实体名称的具体定义、涵盖范围；
            </div>
            <div class="item mar">
                 2、详细、具体的标注要求；
            </div>
            <div class="item mar">
                 3、特殊情况如何处理；
            </div>
            <div class="item mar">
                 4、对于准确率、时效的要求；
            </div>
            <div class="item mar">
                5、易出问题的总结；
            </div>
             <div class="item mar">
                 6、其他。
            </div>
            <div class="item-img" style="margin-top:20px;">
                    <img src="~/assets/img/2_9.png" alt="">
            </div>
             <div class="little-title margin clearfix">
                <div class="radio"></div>
                <div class="txt">规则配置</div>
            </div>
            <div class="item mar">
                    用户可以通过字典或者脚本两种形式，输入或者上传相应的规则进行配置，以便系统更为方便、快捷的推荐预测标签。
            </div>
             <div class="item-img" style="margin-top:20px;">
                    <img src="~/assets/img/2_12.png" alt="">
            </div>
             <div class="item-img" style="margin-top:20px;">
                    <img src="~/assets/img/2_11.png" alt="">
            </div>
            <div class="fix clearfix">
                <div class="line">

                </div>
                <div class="ul">
                     <nuxt-link to="/help/2?height=0"> <div class="it" style="margin:0;">任务名称</div> </nuxt-link>
                    <nuxt-link to="/help/2?height=0"> <div class="it">任务类型</div></nuxt-link>
                    <nuxt-link to="/help/2?height=980"> <div class="it">内置模型（实体识别）</div></nuxt-link>
                    <nuxt-link to="/help/2?height=1304"><div class="it"> 上传数据</div></nuxt-link>
                    <nuxt-link to="/help/2?height=1780"> <div class="it">  载入示例数据</div></nuxt-link>
                    <nuxt-link to="/help/2?height=2160"> <div class="it"> 每条数据的标注次数</div></nuxt-link>
                    <nuxt-link to="/help/2?height=2605"> <div class="it">  标注人员</div></nuxt-link>
                    <nuxt-link to="/help/2?height=3260"><div class="it">  截止日期</div></nuxt-link>
                    <nuxt-link to="/help/2?height=3330"><div class="it"> 算法选择</div></nuxt-link>
                    <nuxt-link to="/help/2?height=3509"><div class="it"> 标注规范</div></nuxt-link>
                    <nuxt-link to="/help/2?height=3720"><div class="it"> 规则配置</div></nuxt-link>
                </div>
            </div>
        </div>
    
</template>
<script>
export default {
    layout:"help",
    mounted(){
        if(this.$route.query.height){
           
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
    margin-left 100px
    margin-top 14px
}
</style>
