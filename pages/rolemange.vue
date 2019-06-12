<template>
    <div class="usermange">
       <div class="content">
            <div class="user-header clearfix">
                <div class="title">角色管理</div>
                <div class="back-btn" @click='back'>
                    <img class="back" src="~/assets/img/task/back.png" alt="">
                    <div class="txt">返回</div>
                </div>
            </div>
            <div class="toolbar clearfix">
                <div class="search">
                    <search-input v-model="searchValue" @change="search"></search-input>
                </div>
                <div class="create" @click="create">
                  
                    创建
                </div>
            </div>
            <div class="table">
                <div class="tableheader clearfix">
                    <div class="number">序号</div>
                    <div class="username">角色</div>
                    <div class="name">描述</div>
                    <div class="depart">功能权限</div>
                    <div class="createTime">
                        创建时间
                    </div>
                    <div class="caozuo">操作</div>
                </div>
                <div class="table-item clearfix" v-for="(item,index) in list" :key="index">
                    <div class="number">{{index+1}}</div>
                    <div class="username" :title="item.roleName" >{{item.roleName}}</div>
                    <div class="name" :title="item.description">{{item.description}}</div>
                    <div class="depart">
                        <div class="clearfix" style="margin:0 auto;width:400px;">
                            <div class="item" v-for="(it,index) in item.roleAuth" :key="index">
                                <el-checkbox v-model="it.dr==1" disabled="true" >{{it.name}}</el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="createTime">{{item.createTimeStr}}</div>
                    <div class="caozuo">
                        <div class="btn-group clearfix">
                            <div class="edit" @click="edit(item.roleId)">编辑</div>
                            <div class="reset" @click="deleteShow(item.roleId)">删除</div>
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
        <create-role ref="create" @sure='addRole'></create-role>
        <edit-role ref="edit" @sure='upData'></edit-role>
        <delete-role ref="delete" @delete='deleteRole'></delete-role>
    </div>
</template>
<script>
import searchInput from '../components/UI/searchInput'
import createRole from '../components/rolemange/createRole'
import editRole from '../components/rolemange/editRole'
import deleteRole from '../components/rolemange/deleteRole'
export default {
    layout:"home",
    components:{
       searchInput,
       createRole,
       editRole,
       deleteRole
    },
    mounted(){
        this.initList();
    },
    data(){
        return {
            roleValue:"",
            roleList:[
                {
                    label:"角色",
                    value:"1"
                }
            ],
            userValue:"",
            userList:[
                {
                    label:"角色",
                    value:"1"
                }
            ],
            sortTime:true,
            list:[
               {}
            ],
            currentPage:1,
            searchValue:"",
            total:10,
            editId:0,
            deleteId:0,
        }
    },
    methods:{
        handleCurrentChange(page){
            this.currentPage = page;
            this.initList()
        },
        async addRole(obj){
            let {code,msg} = await this.$axios.$post("/elensrole/getRoleAdd",obj)
            this.$refs.create.cancle()
             if(code==0){
                this.$refs.create.cancle();
                this.$message({
                message: '添加角色成功',
                type: 'success'
                });
            }else{
                this.$refs.create.cancle();
                this.$message({
                message: msg,
                type: 'warning'
                });
            }
            this.initList()
        },
        back(){
            this.$router.go(-1)
        },
        async initList(){
            let {data} = await this.$axios.$post("/elensrole/getRoleInfo",{
                pageSize:10,
                currentPage:this.currentPage,
                roleName:this.searchValue
            })
            console.log(data)
            this.list = data.list;
            this.total = data.rowsCount;
        },
        search(){
            this.currentPage = 1;
            this.initList();
        },
        create(){
            this.$refs.create.show()
        },
        async edit(id){
             let {data} =await this.$axios.$post("/elensrole/getRoleEdit",{
                roleId:id
            })
            this.editId = id;
            console.log(data)
            this.$refs.edit.show(data)
        },
        async upData(obj){
            obj.roleId = this.editId;
             let {code,msg} =await this.$axios.$post("/elensrole/getRoleUpdate",obj)
             console.log(code)
             this.$refs.edit.cancle()
            if(code==0){
                this.$refs.create.cancle();
                this.$message({
                message: '更新成功',
                type: 'success'
                });
            }else{
                this.$refs.create.cancle();
                this.$message({
                message: msg,
                type: 'warning'
                });
            }
            this.initList()
        },
        async deleteShow(id){
             let {data} =await this.$axios.$post("/elensrole/getOtherRoleByRoleId",{
                roleId:id
            })
             let data2 =await this.$axios.$post("/elensrole/getUserNumByRoleId",{
                roleId:id
            })
            
            this.deleteId = id;
            if(data2.data==0){
                let {code,msg} =await this.$axios.$post("/elensrole/getRoleDelete",{
                    roleId:this.deleteId,
                    newRoleId:""
                })
                 this.initList()
                if(code==0){
                    this.$refs.create.cancle();
                    this.$message({
                    message: '删除角色成功',
                    type: 'success'
                    });
                }else{
                    this.$refs.create.cancle();
                    this.$message({
                    message: msg,
                    type: 'warning'
                    });
                }
            }else{
                 this.$refs.delete.show(data,data2.data);
            }
        },
        async deleteRole(id){
               let {code,msg} =await this.$axios.$post("/elensrole/getRoleDelete",{
                roleId:this.deleteId,
                newRoleId:id
            })
            this.$refs.delete.cancle()
            if(code==0){
                this.$refs.create.cancle();
                this.$message({
                message: '删除角色成功',
                type: 'success'
                });
            }else{
                this.$refs.create.cancle();
                this.$message({
                message: msg,
                type: 'warning'
                });
            }
            this.initList()
        }

    }
}
</script>
<style lang="stylus">
.page-wrapper{
    display flex
    flex-direction column
}
.el-checkbox{
    font-weight normal
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
       
    }
    
}
.toolbar{
    margin-top 12px
    .search{
        float left
    }
    .role{
        float left
        margin-left 48px
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
                height 30px
                line-height 30px
            }
            >>>.el-input__icon{
                line-height 30px
            }
            >>>.el-select-dropdown__item{
                height 26px
                line-height 26px
            }
        }
    }
    .state{
        float left
        margin-left 48px
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
                height 30px
                line-height 30px
            }
            >>>.el-input__icon{
                line-height 30px
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
        text-align center
        line-height 32px
        font-size 14px
        background : #3888FF;
        color white
        width 78px
        height 32px
        
        border-radius: 2px;
        border-radius: 2px;
        img{
            width 20px
            height 20px
            margin-top 6px
        }
        .icon{
            float left
            margin-left 14px
            img{
                width 18px
                height 18px
            }
        }
        .txt{
            float left
            font-size: 14px;
            color: #3888FF;
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
        padding-left 20px
        text-align left
    }
    .username{
        width 240px
        
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
    }
    .name{
        flex 1
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
    }
    .depart{
        width 400px
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
    }
    .role{
        flex 1
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
    }
    .state{
        width 120px
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
    }
    .createTime{
        width 240px
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
        .txt{
          
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
        height 36px
        line-height 36px
        padding-left 20px
        text-align left
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
        padding-left: 20px;
        text-align: left;
        border-right 1px solid #DCE2EA
    }
    .username{
        width 240px
        height 40px
        line-height 40px
        padding-left: 20px;
        text-align: left;
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        border-right 1px solid #DCE2EA
    }
    .name{
        flex 1
        height 40px
        line-height 40px
        padding-left: 20px;
        text-align: left;
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        border-right 1px solid #DCE2EA
    }
    .depart{
        width 400px
        height 40px
        line-height 40px
        text-align center
        cursor default
        border-right 1px solid #DCE2EA
        .item{
            float left
            margin-left 15px
        }
        >>>.el-checkbox, .el-checkbox__input{
             cursor default
        }
        >>>.el-checkbox__input{
            cursor default
        }
        >>>.el-checkbox__input.is-checked + .el-checkbox__label{
            font-weight normal
            color: #3888FF;
        }
    }
    .role{
        flex 1
        height 40px
        line-height 40px
        border-right 1px solid #DCE2EA
        text-align center
    }
    .state{
        width 120px
        height 40px
        line-height 40px
        text-align center
        border-right 1px solid #DCE2EA
    }
    .createTime{
        width 240px
        height 40px
        line-height 40px
        border-right 1px solid #DCE2EA
        padding-left: 20px;
        text-align: left;
        .txt{
            
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
        padding-left: 20px;
        text-align: left;
        .btn-group{
            
            .edit{
                float left
                width 30px
                font-size: 14px;
                color: #3888FF;
                cursor pointer
            }
            .reset{
                cursor pointer
                margin-left 20px
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
