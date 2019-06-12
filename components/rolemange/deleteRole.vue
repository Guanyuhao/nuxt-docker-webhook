<template>
    <div class="create-user-wrap" v-show="state">
        <div class="create-user">
            <div class="user-header clearfix">
                <div class="title">
                    删除角色
                </div>
                <div class="close" @click="cancle">
                    <img src="~/assets/img/cha.png" alt="">
                </div>
            </div>
            <div class="content">
                <div style="height:45px"></div>
                <div class="message">如果需要删除该角色，请将属于该角色的{{num}}名用户转移至其他角色</div>
                <div class="select">
                     <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>    
                </div>
            </div>
            <div class="btn-group clearfix">
                <div class="sure" @click="sure">确定</div>
                <div class="cancle" @click="cancle">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            num:10,
            options: [],
            value: '',
            state:false
        }
    },
    methods:{
        show(obj,num){
           console.log(obj)
            this.options = []
            this.num = num;
            for(let i in obj){
                this.options.push({value:obj[i].roleId,label:obj[i].roleName})
            }
        
             this.state = true;
        },
        cancle(){
            this.state = false;
        },
        sure(){
            if(!this.value){
                this.$message({
                    message: '请选择角色',
                    type: 'warning'
                });
                return
            }
            this.$emit("delete",this.value)
        }
    }
}
</script>
<style lang="stylus" scoped>
.create-user-wrap{
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 100
    background: rgba(9,18,28,0.60);
    .create-user{
        position absolute
        left 50%
        top 50%
        background white
        margin-left -325px
        margin-top -202px
        width 650px
        height 361px
        .user-header{
            padding 10px 24px
            background: #F6F6F6;
            border-radius: 2px 2px 0 0;
            .title{
                float left
                font-size: 16px;
                color: rgba(0,0,0,0.90);
            }
            .close{
                float right 
                cursor pointer
                img {
                    width 16px
                    height 16px
                }
            }
        }
        .content{
            height 270px
            .message{
                text-align center
                width 350px
                margin 0 auto
                color: rgba(0,0,0,0.7);
                line-height: 30px;
            }
            .select{
                width 350px 
                margin 0 auto
                text-align center
                margin-top 29px
                >>>.el-input__inner{
                    height 30px
                    line-height 30px
                }
                >>>.el-select{
                    width 350px
                }
                >>>.el-input__icon{
                    line-height 30px
                }
            }
        }
        .username{
            margin-top 28px
            .txt{
                float left
                width 120px
                height 30px
                line-height 30px
                text-align right 
                font-size: 14px;
                color: rgba(0,0,0,0.70);
            }
            .input{
                float left
                width 472px
                margin-left 20px
                height 30px
                >>>.el-input__inner{
                    height 30px
                    line-height 30px
                }
            }
            .icon{
                float left
                img{
                    width 12px
                    margin-top 7px
                    margin-left 6px
                    height 14px
                }
            }
        }
        .descript{
            margin-top 20px
            .txt{
                float left
                width 120px
                height 30px
                line-height 30px
                text-align right 
                font-size: 14px;
                color: rgba(0,0,0,0.70);
            }
            .input{
                float left
                width 472px
                margin-left 20px
                
                >>>.el-input__inner{
                    height 30px
                    line-height 30px
                }
            }
            .icon{
                float left
                img{
                    width 12px
                    margin-top 7px
                    margin-left 6px
                    height 14px
                }
            }
        }
        .role{
            margin-top 20px
            .txt{
                float left
                width 120px
                height 30px
                line-height 30px
                text-align right 
                font-size: 14px;
                color: rgba(0,0,0,0.70);
            }
            .input{
                float left
                width 472px
                margin-left 20px
                height 30px
                >>>.el-select{
                    width 100%
                }
                >>>.el-input__inner{
                    height 30px
                    line-height 30px
                }
                >>>.el-input__icon{
                    line-height 30px
                }
            }
            .icon{
                float left
                img{
                    width 12px
                    margin-top 7px
                    margin-left 6px
                    height 14px
                }
            }
        }
        .depart{
        margin-top 20px
        .txt{
            float left
            width 120px
            height 30px
            line-height 30px
            text-align right 
            font-size: 14px;
            color: rgba(0,0,0,0.70);
        }
        .input{
            float left
            width 472px
            margin-left 20px
            height 30px
            >>>.el-select{
                width 100%
            }
            >>>.el-input__inner{
                height 30px
                line-height 30px
            }
            >>>.el-input__icon{
                line-height 30px
            }
        }
        .icon{
            float left
            img{
                width 12px
                margin-top 7px
                margin-left 6px
                height 14px
            }
        }
    }
    .state{
            margin-top 20px
            .txt{
                float left
                width 120px
                height 30px
                line-height 30px
                text-align right 
                font-size: 14px;
                color: rgba(0,0,0,0.70);
            }
            .input{
                float left
                width 472px
                margin-left 20px
                height 30px
                margin-top 3px
            }
            .icon{
                float left
                img{
                    width 12px
                    margin-top 7px
                    margin-left 6px
                    height 14px
                }
            }
        }
        
    }
}
.btn-group{
    width 280px
    margin 0 auto
    margin-top: -40px;
    cursor pointer
    .sure{
        float left
        width 120px
        height 36px
        line-height 36px
        text-align center
        background: #3888FF;
        color white
        font-size 15px
        border-radius: 2px;
        border-radius: 2px;
    }
    .cancle{
        float left
        text-align center
        margin-left 20px
        border: 1px solid #3888FF;
        background white;
        width 120px
        height 36px
        font-size: 15px;
        color: #3888FF;
        line-height 36px
        border-radius: 2px; 
    }
}
</style>
