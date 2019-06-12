<template>
    <div class="create-user-wrap" v-show="state">
        <div class="create-user">
            <div class="user-header clearfix">
                <div class="title">
                    编辑信息
                </div>
                <div class="close" @click="cancle">
                    <img src="~/assets/img/cha.png" alt="">
                </div>
            </div>
            <div class="username clearfix">
                <div class="txt isRequire">角色名称</div>
                <div class="input">
                    <el-input v-model="input" placeholder=""></el-input>
                </div>
               
            </div>
            <div class="msg" v-show="userShow">{{tip}}</div>
            <div class="descript clearfix">
                <div class="txt">
                    描述
                </div>
                <div class="input">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    :maxlength='200'
                    placeholder="请输入内容"
                    v-model="textarea">
                    </el-input>
                </div>
            </div>
          
            <div class="state clearfix">
                <div class="txt">功能权限</div>
                <div class="input">
                       <el-checkbox v-model="moren" disabled>默认权限</el-checkbox>
                    <el-checkbox v-model="taskmange">任务管理</el-checkbox>
                    <el-checkbox v-model="usermange">用户管理</el-checkbox>
                    <el-checkbox v-model="rolemange">角色管理</el-checkbox>
                </div>
            </div>
            <div class="tip">
                <div class="txt"></div>
                <div class="tip-name">默认权限包含创建、管理单人任务、标注数据等，不能取消</div>
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
            role:"",
            roleList:[{
                label:"godnan",
                value:1
            }],
            input:"",
            radio:"1",
            textarea:"",
            taskmange:false,
            usermange:false,
            rolemange:false,
            state:false,
            moren:true,
            userShow:true,
            tip:""
        }
    },
    methods:{
        cancle(){
            this.state = false;
        },
        show(obj){
            this.state = true;
            this.input = obj.roleName;
            this.textarea = obj.description;
            for(let i in obj.roleAuth){
                if(obj.roleAuth[i].name=="任务管理"){
                    if(obj.roleAuth[i].dr==1){

                        this.taskmange = true
                    }else{
                         this.taskmange = false
                    }
                }
                if(obj.roleAuth[i].name=="用户管理"){
                    if(obj.roleAuth[i].dr==1){
                        this.usermange = true
                    }else{
                         this.usermange = false
                    }
                }
                if(obj.roleAuth[i].name=="角色管理"){
                    if(obj.roleAuth[i].dr==1){
                        this.rolemange = true
                    }else{
                         this.rolemange = false
                    }
                }
            }
        },
        sure(){
            if(this.input==""){
                this.userShow = true;
                this.tip = "请填写角色名称";
                
                return
            }
              var regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){0,20}$");
             if(!regex.test(this.input)){
                this.userShow = true;
                this.tip = "角色名称支持中文、英文、数字、不超过20个字符";
               
                return
             }
             this.userShow = false;
            let str = "默认权限,";
            if(this.taskmange){
                str+="任务管理,"
            }
            if(this.usermange){
                str+="用户管理,"
            }
            if(this.rolemange){
                str+="角色管理"
            }
            this.$emit("sure",{
                roleName:this.input,
                description:this.textarea,
                authName:str
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.isRequire:before {
 content: "*";
 color: #D44242;
 margin-right: 4px;
}
.msg{
    margin-top 6px
    font-size 13px
    margin-left 127px
    color #D44242
    margin-bottom -10px
}
.create-user-wrap{
    position fixed
    left 0
    top 0
    width 100%
    z-index 100
    height 100%
    background: rgba(9,18,28,0.60);
    .create-user{
        position absolute
        left 50%
        top 50%
        background white
        z-index 100000
        margin-left -325px
        margin-top -202px
        width 650px
        height 432px
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
        .descript{
            margin-top 20px
            .txt{
                float left
                width 106px
                height 30px
                line-height 30px
                text-align right 
                font-size: 14px;
                color: rgba(0,0,0,0.70);
                >>>.el-textarea__inner{
                      border: 1px solid #bdc6d4;
                }
            }
            .input{
                float left
                width 472px
                margin-left 20px
                max-height 120px
                >>>.el-textarea__inner{
                    height 30px
                    line-height 30px
                    border: 1px solid #bdc6d4;
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
        .tip{
            margin-top 0px
            margin-bottom 0px
            overflow hidden
            .txt{
                float left
                width 120px
                height 30px
                line-height 30px
                text-align right 
                font-size: 14px;
                color: rgba(0,0,0,0.70);
            }
            .tip-name{
                float left
                width 472px
                margin-left 7px
                height 30px
                font-size: 12px;
                color: #b7b7b7;
            }
        }
    }
}
.btn-group{
    width 280px
    margin 0 auto
    margin-top: 42px;
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
