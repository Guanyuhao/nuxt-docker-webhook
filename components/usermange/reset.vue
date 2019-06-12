<template>
    <div class="reset-wrap" v-show="state">
        <div class="reset">
            <div class="reset-head clearfix">
                <div class="txt">重置密码</div>
                <div class="close" @click="hide">
                    <img src="~/assets/img/cha.png" alt="">
                </div>
            </div>
            <div class="messageTip">
                确定重置密码？
            </div>
            <div class="btn" @click="sure">
                确定
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            state:false,
            id:0
        }
    },
    methods:{
        show(id){
            this.id = id;
            this.state = true;
        },
        sure(){
            this.$emit("sure",this.id)
        },
        hide(){
            this.state = false
        }
    }
}
</script>
<style lang="stylus" scoped>
.reset-wrap{
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background: rgba(9,18,28,0.60);
    .reset{
        position absolute
        left 50%
        background white
        top 50%
        margin-top -108px
        margin-left -200px
        width 400px
        height 188px
        .reset-head{
            height 40px
            background: #F6F6F6;
            padding 10px 24px;
            .txt{
                float left
                font-size: 16px;
                color: rgba(0,0,0,0.90);
            }
            .close{
                float right 
                cursor pointer
                img{
                    width 16px
                    height 16px
                }
            }
        }
        .messageTip{
            height 80px
            line-height 80px
            text-align center
            font-size: 16px;
            color: rgba(0,0,0,0.90);
        }
        .btn{
            width 120px
            height 36px
            line-height 36px
            text-align center
            background: #3888FF;
            border-radius: 2px;
            border-radius: 2px;
            color white
            cursor pointer
            margin 0 auto
        }
    }
}
</style>
