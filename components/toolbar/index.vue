<template>
    <div class="toolbar clearfix">
        <div class="ety-btn" v-for="(item,index) in list"  :key="index" :style="{color:item.color,background:item.background}" :class="item.class" @click="typeClick(index,item.type)">
            <div class="name">{{item.type}}</div>
            <div class="key" v-show="index<9">【 {{index+1}} 】</div>
        </div>
        <div class="right-btn clearfix">
            <div class="item clearfix" v-show="$route.path!='/entitycheck'">
                <div class="txt">自动预测</div>
                <div class="btn">
                     <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        content="开启自动预测按钮，系统将根据模型为您推送预测标签。">
                    <el-switch
                    v-model="autoForecast"
                    @change="autoChange"
                     slot="reference"
                    >
                    </el-switch>
                    </el-popover>
                </div>
            </div>
            <div class="item">
                <div class="txt">全文匹配</div>
                <div class="btn">
                     <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        content="开启全文匹配按钮，系统将自动标注所有与框选内容相同的文本。">
                         <el-switch
                            v-model="replaceAll"
                            @change="changReplace"
                             slot="reference"
                            >
                        </el-switch>
                    </el-popover>
                   
                </div>
            </div>
            <div class="item">
                <div class="txt">特殊字符</div>
                <div class="btn">
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        content="开启特殊字符，系统将能够标记标点符号">
                    <el-switch
                    v-model="speacilWord"
                    @change="changSpecial"
                    slot="reference"
                    >
                    </el-switch></el-popover>
                </div>
            </div>
            <div class="item">
              
                <div class="clear-btn" @click="clearAll"  >
                    <div class="txt">清除标签</div>
                    <img src="~assets/img/clear.png" alt="">
                </div>
            </div>
            <div class="item">
                <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        content="将多次出现的关键词加入字典，系统将自动标注">
                <div class="diction-btn" @click="diction" slot="reference">
                    <div class="txt">添加字典</div>
                    <img src="~assets/img/dirction.png" >
                </div></el-popover>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'toolbar',
    props:["list"],
    mounted(){
        
            this.autoForecast = window.localStorage.getItem("autoForecast")=='false'?false:true
            this.replaceAll = window.localStorage.getItem("replaceAll")=='false'?false:true
            this.speacilWord = window.localStorage.getItem("changSpecial")=='false'?false:true
            console.log(window.localStorage.getItem("autoForecast"))
    },
    computed:{
        atuo(){
            console.log(this.$route.path)
        }
    },
    data() {
        return {
            autoForecast:true,
            replaceAll:true,
            speacilWord:true
        }
    },
    methods:{
        typeClick(index,type){
            this.$emit('typechoose',index,type)
        },
        autoChange(){
            this.$emit("autoChange",this.autoForecast)
            window.localStorage.setItem("autoForecast",this.autoForecast)
        },
        changReplace(){
            this.$emit("changReplace",this.replaceAll)
             window.localStorage.setItem("replaceAll",this.replaceAll)
        },
        changSpecial(){
            this.$emit("changSpecial",this.speacilWord)
             window.localStorage.setItem("changSpecial",this.speacilWord)
        },
        clearAll(){
            this.$emit("clearAll")
        },
        diction(){
            this.$emit("clickDic")
        }
    }
}
</script>
<style lang="stylus" scoped>
.toolbar{
    min-height 58px
    padding-left 18px
    box-sizing border-box
    border-bottom : 1px solid #E0E6ED;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .ety-btn{
        float left
        width 138px
        cursor pointer
        height 32px
        line-height 30px;
        text-align center
        margin-left 12px
        margin-top 14px
        border-radius: 2px;
        border-radius: 2px;
        .name{
            width 76px
            float left
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
        }
        .key{
            width 56px
            float left
        }
      
       
    }
     .active{
            border: 1px solid #2873EE;
        }
    .right-btn{
        float right 
        .item{
            float left
            margin-top 26px
            .txt{
                float left
                font-size: 14px;
                color: rgba(0,0,0,0.80);
                margin-left 16px
                margin-right 8px
                cursor pointer
            }
            .btn{
                float left
                margin-top -3px
                >>>.el-switch.is-checked .el-switch__core{
                    background #3888FF
                }
            }
            .clear-btn img{
                margin-left 0px
               
                width 20px;
                height 20px
                cursor pointer
            }
            .diction-btn img{
                width 20px
                margin-right 30px
                height 20px
                cursor pointer
            }
        }
    }
}
</style>
