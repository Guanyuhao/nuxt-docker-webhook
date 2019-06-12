<template>
    <div class="usermange">
       <div class="content">
            <div class="user-header clearfix">
                <div class="title">用户管理</div>
                <div class="back-btn" @click="back">
                    <img class="back" src="~/assets/img/task/back.png" alt="">
                    <div class="txt">返回</div>
                </div>
            </div>
            <div class="toolbar clearfix">
                <div class="search">
                    <search-input v-model="searchValue" @change="search"></search-input>
                </div>
                <div class="role">
                    <div class="txt">角色</div>
                    <div class="select">
                         <el-select v-model="roleValue" placeholder="请选择" @change="selectRole">
                            <el-option
                            v-for="item in roleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="state">
                    <div class="txt">状态</div>
                    <div class="select">
                         <el-select v-model="userValue" placeholder="请选择" @change="selectState">
                            <el-option
                            v-for="item in userList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="create" @click="create">
                    创建
                </div>
            </div>
            <div class="table">
                <div class="tableheader clearfix">
                    <div class="number">序号</div>
                    <div class="username">用户名</div>
                    <div class="name">姓名</div>
                    <div class="depart">部门</div>
                    <div class="role">角色</div>
                    <div class="state">状态</div>
                    <div class="createTime">
                       <div class="txt">创建时间</div>
                        <div class="icon" @click="sort">
                            <img v-show="type" src="~/assets/img/sortdown.png" alt="">
                            <img v-show="!type" src="~/assets/img/sortup.png" alt="">
                        </div>
                    </div>
                    <div class="caozuo">操作</div>
                </div>
                <div class="table-item clearfix" v-for="(item,index) in list" :key="index">
                    <div class="number">{{index+1}}</div>
                    <div class="username" :title="item.userName">{{item.userName}}</div>
                    <div class="name" :title="item.name">{{item.name}}</div>
                    <div class="depart" :title="item.userCompany">{{item.userCompany}}</div>
                    <div class="role" :title="item.roleName">{{item.roleName}}</div>
                    <div class="state">{{item.status==1?"启用":"停用"}}</div>
                    <div class="createTime">{{item.reserve2}}</div>
                    <div class="caozuo">
                        <div class="btn-group clearfix">
                            <div class="edit" @click="edit(item.userId)">编辑</div>
                            <div class="reset" @click="resetpwd(item.userId)">重置密码</div>
                        </div>
                    </div>
                </div>
                <div class="nodata" v-show="list.length==0">
                    <div class="center">
                        <img src="~/assets/img/nodata.png" alt="">
                  
                    </div>
                    
                </div>
            </div>
            <div class="page" v-show="list.length">
                    <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
            </div>
       </div>
       <create-user @sure='addUser' :roleList="roleMlist" ref="create"></create-user>
       <edit-user @sure='editUser' :roleList="roleMlist" ref="edit"></edit-user>
       <reset ref="reset" @sure='reset'></reset>
    </div>
</template>
<script>
import searchInput from '../components/UI/searchInput'
import createUser from '../components/usermange/createUser.vue'
import editUser from '../components/usermange/editUser'
import reset from '../components/usermange/reset'

export default {
    layout:"home",
    components:{
       searchInput,
       createUser,
       editUser,
       reset
    },
    mounted(){
        this.initRole();
        this.initList();
    },
    data(){
        return {
            searchValue:"",
            roleValue:"",
            roleMlist:[],
            roleList:[
              {
                  label:"全部",
                  value:""
              }
            ],
            userValue:"",
            userList:[
                {
                    label:"启用",
                    value:"1"
                },
                {
                    label:"停用",
                    value:"0"
                },
                {
                    label:"全部",
                    value:""
                }
            ],
            sortTime:true,
            list:[
                {
                  
                }
            ],
            currentPage:1,
            type:true,
            total:10,
            resetId:0,
        }
    },
    methods:{
        handleCurrentChange(){
            this.initList()
        },
        back(){
            this.$router.go(-1)
        },
        async reset(){
             let {code} =await this.$axios.$post("/elensuser/getReset",{userId:this.resetId})
             console.log(code)
             this.$refs.reset.hide()
              if(code==0){
                this.$refs.create.cancle();
                this.$message({
                message: '修改成功',
                type: 'success'
                });
            }
        },
        async addUser(obj){
            let {code} =await this.$axios.$post("/elensuser/getAdd",obj)
            if(code==0){
                this.$refs.create.cancle();
                this.$message({
                message: '添加用户成功',
                type: 'success'
                });
            }
            this.initList()
        },
        async editUser(obj){
            let {code} =await this.$axios.$post("/elensuser/getUpdate",obj)

              if(code==0){
                this.$refs.edit.cancle();
                this.$message({
                message: '修改成功',
                type: 'success'
                });
            }
            this.initList()
        },
        search(){
            this.currentPage = 1;
            this.initList()
        },
        async initRole(){
            let {data} = await this.$axios.$post("/elensrole/getRole")
            for(let i in data){
                this.roleList.push({
                    label:data[i].roleName,
                    value:data[i].roleName
                })
                 this.roleMlist.push({
                    label:data[i].roleName,
                    value:data[i].roleName
                })
            }
        },
        async initList(){
            let {data} = await this.$axios.$post("/elensuser/getUserInfo",{
                userName:this.searchValue,
                role:this.roleValue,
                status:this.userValue,
                pageSize:10,
                currentPage:this.currentPage,
                type:this.type?"asc":"desc"
            })
           this.list = data.list;
           this.total = data.rowsCount
        },
        selectState(){
             this.currentPage = 1;
            this.initList()
        },
       
        resetpwd(id){
            this.resetId = id;
            this.$refs.reset.show()
        },
        sort(){
            if(this.type){
                this.type = false
            }else{
                this.type = true
            }
            this.initList()
        },
        selectRole(){
            this.currentPage = 1;
            this.initList()
        },
        create(){
            this.$refs.create.show()
        },
        async edit(id){
            let {data} =  await this.$axios.$post('/elensuser/getEdit',{userId:id})
            console.log(data)
            this.$refs.edit.show(data)
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
.page{
    margin-top 20px
    text-align center
}
.usermange{
    padding 20px
    background:#262832
    width: 100%;
    flex 1
    .content{
        background white
        height 100%
        width 100%
        padding 24px 27px
        box-sizing border-content
    }
}
.title{
    float left
    font-weight:500;
    height 40px
    line-height 40px 
    font-size:16px;
    color:rgba(0,0,0,0.8);
}
.back-btn{
    width 100px
    height 40px
    float right
    cursor pointer
    .back{
        float left
        width 20px
        height 20px
        
        margin-left: 42px;
        margin-top 12px
        img{
            width 100%
            height 100%
        }
    }
    .txt{
        float left
        font-size: 14px;
        color: #3888FF;
        margin-left 8px;
        margin-top 12px
    }
}
.nodata{
    height 400px
    border 1px solid #dbe6f4;
    position relative
    .center{
        width 240px
        height 240px
        position absolute
        left 50%
        top 50%
        margin-left -120px
        margin-top -120px
        text-align center
        img{
            width 267px
            height auto
        }
        h4{
            font-size 22px
            text-align center
        }
    }
    
}
.toolbar{
    margin-top 12px
    .search{
        float left
    }
    .role{
        float left
        margin-left 8px
        .txt{
            font-size: 14px;
            color: rgba(0,0,0,0.70);
            float left
            height 32px
            line-height 32px
        }
        .select{
            float left
            margin-left 18px
            >>>.el-input__inner{
                height 32px
                line-height 32px
                background #f6f6f8
            }
            >>>.el-input__icon{
                line-height 32px
            }
            >>>.el-select-dropdown__item{
                height 26px
                line-height 26px
            }
        }
    }
    .state{
        float left
        margin-left 28px
        .txt{
            font-size: 14px;
            color: rgba(0,0,0,0.70);
            float left
            height 32px
            line-height 32px
        }
        .select{
            float left
            margin-left 18px
            >>>.el-input__inner{
                height 32px
                line-height 32px
                background #f6f6f8
            }
            >>>.el-input__icon{
                line-height 32px
            }
            >>>.el-select-dropdown__item{
                height 26px
                line-height 26px
            }
        }
    }
    .create{
        float right 
        cursor pointer
        width 78px
        height 32px
        text-align center
        line-height 32px
        font-size 14px
        background : #3888FF;
        color white
       
        border-radius: 2px;
        border-radius: 2px;
        img{
            width 20px
            height 20px
            margin-top 4px
        }
        .icon{
            float left
            margin-left 14px
            img{
                width 18px
                height 20px
            }
        }
        .txt{
            float left
            font-size: 14px;
            color: #646B7C;
            height 30px
            line-height 30px
            margin-left 3px
        }
    }
}
.tableheader{
    margin-top 20px
    height 36px
    font-size: 14px;
    color: rgba(0,0,0,0.6);
    display flex 
    flex-direction row
    background: #E7ECF3;
    border: 1px solid #DBE6F4;
    .number{
        float left
        width 65px
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .username{
        flex 1
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .name{
        width 140px
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .depart{
        flex 1
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    }
    .role{
        flex 1
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .state{
        width 120px
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
    }
    .createTime{
        width 240px
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
        .txt{
            float left
           
            text-align left 
        }
        .icon{
            margin-left 6px;
            float left
            cursor pointer
            img{
                margin-top: 9px;
                width: 14px;
                height: 15px;
            }
            
        }
    }
    .caozuo{
        width 240px
        height 36px
        line-height 36px
        text-align left 
        padding-left 20px
    }
}
.table-item{
    height 40px
    font-size: 14px;
    color: rgba(0,0,0,0.8);
    display flex 
    flex-direction row
    border: 1px solid #DBE6F4;
    border-top 0
    border-bottom 0
    .number{
        float left
        width 65px
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        border-right 1px solid #DCE2EA
    }
    .username{
        flex 1
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        border-right 1px solid #DCE2EA
    }
    .name{
        width 140px
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        border-right 1px solid #DCE2EA
    }
    .depart{
        flex 1
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        border-right 1px solid #DCE2EA
    }
    .role{
        flex 1
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        border-right 1px solid #DCE2EA
    }
    .state{
        width 120px
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        border-right 1px solid #DCE2EA
    }
    .createTime{
        width 240px
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        border-right 1px solid #DCE2EA
        .txt{
            float left
            width 140px
            text-align right 
        }
        .icon{
            margin-left 6px;
            float left
            img{
                margin-top 8px
                width 14px
                height 18px
            }
        }
    }
    .caozuo{
        width 240px
        height 40px
        line-height 40px
        text-align left
        padding-left 20px
        .btn-group{
            
            .edit{
                float left
                width 30px
                font-size: 14px;
                color: #3888FF;
                cursor pointer
            }
            .reset{
                margin-left 20px
                cursor pointer
                float left
                width 60px
                font-size: 14px;
                color: #3888FF;
            }
        }
    }
}
.table {
     border-bottom: 1px solid #DBE6F4;
}
.table-item:nth-child(odd){
    background #f6f6f8
}
</style>
