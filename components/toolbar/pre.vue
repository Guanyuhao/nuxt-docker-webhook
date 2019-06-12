<template>
    <div class="toolbar clearfix">
        <div class="ety-btn" v-for="(item,index) in list"  :key="index" :style="{color:item.color,background:item.background}" :class="item.class" @click="typeClick(index,item.type)">
            {{item.type}}
        </div>
        <div class="right-btn clearfix">
            <div class="item clearfix">
                <div class="txt">自动预测</div>
                <div class="btn">
                    <el-switch
                    v-model="autoForecast"
                    @change="autoChange"
                    >
                    </el-switch>
                </div>
            </div>
            <div class="item">
                <div class="txt">全文匹配</div>
                <div class="btn">
                    <el-switch
                    v-model="replaceAll"
                    @change="changReplace"
                    >
                    </el-switch>
                </div>
            </div>
            <div class="item">
                <div class="txt">特殊字符</div>
                <div class="btn">
                    <el-switch
                    v-model="speacilWord"
                    @change="changSpecial"
                    >
                    </el-switch>
                </div>
            </div>
            <div class="item">
                <div class="clear-btn" @click="clearAll">
                    <img src="~assets/img/clear.png" alt="">
                </div>
            </div>
           
        </div>
    </div>
</template>
<script>
export default {
    name:'toolbar',
    props:["list"],
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
        },
        changReplace(){
            this.$emit("changReplace",this.replaceAll)
        },
        changSpecial(){
            this.$emit("changSpecial",this.changSpecial)
        },
        clearAll(){
            this.$emit("clearAll")
        }
    }
}
</script>
<style lang="stylus" scoped>
.toolbar{
    height 58px
    padding-left 18px
    box-sizing border-box
    border-bottom : 1px solid #E0E6ED;
    .ety-btn{
        float left
        width 90px
        cursor pointer
        height 32px
        line-height 30px;
        text-align center
        margin-left 18px
        margin-top 14px
        border-radius: 2px;
        border-radius: 2px;
       
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
            }
            .btn{
                float left
                margin-top -3px
            }
            .clear-btn img{
                margin-left 16px
                margin-right 16px
                width 20px;
                height 20px
                cursor pointer
            }
            .diction-btn img{
                width 20px
                margin-right 16px
                height 20px
                cursor pointer
            }
        }
    }
}
</style>
