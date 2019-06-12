<template>
    <div class="reset-wrap" v-show="state">
        <div class="reset">
            <div class="reset-head clearfix">
                <div class="txt">标注规范</div>
                <div class="close" @click="hide">
                    <img src="~/assets/img/cha.png" alt="">
                </div>
            </div>
            <div class="messageTip" v-html='txt'>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["txt"],
    data(){
        return {
            state:false,
            id:0
        }
    },
    methods:{
        show(){
            
            this.state = true;
        },
        sure(){
            this.$emit("sure");
            
        },
        hide(){
            this.state = false
        },
        cancle(){
            
            this.hide()
        }
    }
}
</script>
<style lang="stylus">
  .ql-size-small{
                font-size 12px
            } 
            .ql-size-large{
                font-size 16px
            }
            .ql-align-center{
                text-align center
            }  
            .ql-align-right{
                text-align right 
            }  
            .ql-align-justify{
                text-align justify
            }
</style>

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
        margin-top -208px
        margin-left -300px
        width 600px
       
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
            padding 20px
            min-height 170px
            max-height 400px
            padding-left: 28px;
            overflow auto
            font-size 14px
            color: rgba(0,0,0,0.90);
            
            .ql-size-small{
                font-size 12px
            } 
            .ql-size-large{
                font-size 16px
            }
            .ql-align-center{
                text-align center
            }  
            .ql-align-right{
                text-align right 
            }  
            .ql-align-justify{
                text-align justify
            }
        }
        .btn-group{
            width 300px
            margin 0 auto
            
            .btn{
                float left
                width 130px
                height 40px
                text-align center
                line-height 40px
                background: #3888FF;
                border-radius: 2px;
                border-radius: 2px;
                color white
                cursor pointer
            }
             .cancle{
                float left
                width 130px
                margin-left 36px
                height 40px
                text-align center
                line-height 40px
                background: #3888FF;
                border-radius: 2px;
                border-radius: 2px;
                color white
                cursor pointer
            }
        }
    }
}
</style>
