<template>
    <div class="create-user-wrap" v-show="state">
        <div class="create-user">
            <div class="user-header clearfix">
                <div class="title">
                    创建用户
                </div>
                <div class="close" @click="cancle">
                    <img src="~/assets/img/cha.png" alt="">
                </div>
            </div>
            <div class="username clearfix">
                <div class="txt isRequire">用户名</div>
                <div class="input">
                    <el-input v-model="username" placeholder=""></el-input>
                </div>
               
            </div>
            <div class="msg" v-show="userShow">请填写用户名</div>
            <div class="name clearfix">
                <div class="txt isRequire ">姓名</div>
               
                <div class="input"> <el-input v-model="name" placeholder=""></el-input></div>
               
            </div>
             <div class="msg" v-show="nameShow">{{nameTip}}</div>
            <div class="depart clearfix">
                <div class="txt  ">部门</div>
                <div class="input"><el-input v-model="input" placeholder=""></el-input></div>
               
            </div>
            <div class="role clearfix">
                <div class="txt isRequire">角色</div>
                <div class="input">
                      <el-select v-model="role" placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
               
            </div>
           <div class="msg" v-show="roleShow">请选择角色</div>
            <div class="btn-group clearfix">
                <div class="sure" @click="sure">确定</div>
                <div class="cancle" @click="cancle">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["roleList"],
    data(){
        return {
            role:"",
            username:"",
            name:"",
            input:"",
            radio:"1",
            state:false,
            userShow:false,
            nameTip:"",
            nameShow:false,
            roleShow:false,
        }
    },
    methods:{
        show(){
            this.state = true;
            this.role = "";
            this.username = "";
            this.name = "";
            this.input = "";

            
        },
        sure(){
            if(this.username==""){
                 this.userShow = true
                return
            }
             this.userShow = false
              var regex = new RegExp("^([a-zA-Z0-9_]){5,14}$");
             if(!regex.test(this.username)){
               this.nameShow = true;
               this.nameTip = '用户名称支持英文、数字、5-14个字符'
                return
             }
            if(this.name==""){
                this.nameShow = true;
                this.nameTip = '请填姓名'
                
            }
            this.nameShow = false
            if(this.role==""){
                this.roleShow = true
                
                return
            }
            this.roleShow = false
            this.$emit("sure",{
                userName:this.username,
                name:this.name,
                userCompany:this.input,
                roleName:this.role,
                status:this.radio

            })
        },
        cancle(){
            this.state = false
        }
    }
}
</script>
<style lang="stylus" scoped>
.msg{
    margin-top 6px
    font-size 13px
    margin-left 146px
    color #D44242
    margin-bottom -10px
}
.isRequire:before {
 content: "*";
 color: #D44242;
 margin-right: 4px;
}
.create-user-wrap{
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background: rgba(9,18,28,0.60);
    .create-user{
        position absolute
        left 50%
        top 50%
        background white
        margin-left -325px
        margin-top -202px
        width 650px
        height 356px
        .user-header{
            padding 10px 24px
            background: #F6F6F6;
            border-radius: 2px 2px 0 0;
            .title{
                float left
                font-size: 14px;
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
        .username{
            margin-top 28px
            .txt{
                float left
                width 106px
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
        .name{
            margin-top 20px
            .txt{
                float left
                width 106px
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
           
        }
        .role{
            margin-top 20px
            .txt{
                float left
                width 106px
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
            width 106px
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
                width 106px
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
    margin-top 30px
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
