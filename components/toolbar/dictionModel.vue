<template>
    <div class="wrap_fix" v-show="state">
        <div class="modal">
            <div class="m-header clearfix">
                <div class="name">字典</div>
                <div class="close" @click="hide">
                    <img src="~/assets/img/cha.png" alt="">
                </div>
            </div>
            <div class="select">
                <div class="name">实体类别</div>
                <div class="list">
                      <el-select v-model="value" placeholder="请选择" @change='changEntity'>
                            <el-option
                                v-for="item in list"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                </div>
                <div class="upload" @click="upload">上传字典
                     <el-tooltip class="main-top__help--small smallhelp" placement="top">
                        <div slot="content">支持excel格式，每个单元格为一个词语。</div>
                        <div></div>
                      </el-tooltip>
                </div>
                <input type="file" @change="fileChange" ref="file"  style="opacity:0"/>
            </div>
            <div class="search">
                <search-input v-model="searchValue" @change="search" @keyup.enter="search" placeholder="请输入关键词，回车确认"></search-input>
            </div>
            <div class="personlist">
                <div class="item clearfix" v-for="(item,index) in  preList" :key="index">
                    <div class="name">{{item.wordName}}</div>
                    <div class="delete" @click="deleteName(item.id)">删除</div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import searchInput from '../UI/searchInput.vue'
export default {
    components:{
        searchInput
    },
    props:["list",'preList'],
    data(){
        return {
            value:"",
            state:false,
            searchValue:""
        }
    },
    methods:{
        show(){
            this.state = true;
            this.value = this.list[0].id;
        },
        hide(){
            this.state = false;
        },
        changEntity(){
            this.$emit("change",this.value)
        },
        search(){
            this.$emit("search",this.searchValue)
           
        },
        deleteName(id){
            this.$emit("deleteName",id);
        },
        upload(){
            this.$emit("upload")
            this.$refs.file.value = ""
            this.$refs.file.click()
        },
        fileChange(event){
            let name = ""
            for(let i in this.list){
                if(this.list[i].id==this.value){
                    name = this.list[i].name;
                }
            }
           let file = event.target.files[0];
           let obj = {
               file:file,
               userId:this.$getCookie("userId"),
               proId:this.$route.query.proId,
               typeId:this.value,
               typeName:name
           } 
           this.$emit("filechange",obj)
        }
    }
}
</script>
<style lang="stylus" scoped>
.wrap_fix{
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background: rgba(9,18,28,0.60);
    .modal{
        position absolute
        left 50%
        top 50%
        width 650px
        height 337px
        margin-left -325px
        margin-top -168px
        background: #FFFFFF;
        border-radius: 2px;
        .m-header{
            height 42px
            line-height 42px
            background: #F6F6F6;
            .name{
                margin-left 24px
                float left
            }
            .close{
                float right 
                margin-right 26px
                cursor pointer
                img{
                   width 16px
                   height 16px  
                }
            }
        }
        .select{
            height 32px
            line-height 32px
            margin-top 32px
            .name{
                font-size: 16px;
                float left
                height 32px
                line-height 32px
                margin-left 34px
                color: rgba(0,0,0,0.70);
            }
            .list{
                float left
                margin-left 20px
                >>>.el-input__inner{
                    height 32px
                    line-height 32px
                }
                >>>.el-input__icon{
                    height 32px
                    line-height 32px
                }
            }
            .upload{
                float right 
                position relative
                margin-right 34px
                font-size: 14px;
                color: #3888FF;
                cursor pointer
                .smallhelp {
                    position: absolute;
                    right: -10px;
                    top: 8px;
                }
                .main-top__help--small {
                    width: 10px;
                    height: 10px;
                    background: url('~assets/img/task/smallhelp.png') no-repeat;
                    background-size contain
                    cursor: pointer;
                }
            }
        }
        .search{
            margin-top 14px
            margin-left 34px
            >>>.llp-serach-input{
                width 582px
            }
        }
        .personlist{
            border: 1px solid #BDC7D4;
            border-radius: 2px;
            border-radius: 2px;
            width 582px
            height 132px
            overflow auto
            margin 0 auto
            margin-top 6px
            .item{
                height 26px
                padding 3px
                box-sizing border-box
                .name{
                    float left
                    height 20px
                    line-height 20px
                    margin-left 7px
                    font-weight:400;
                    font-size 12px
                    color:rgba(0,0,0,0.8);
                }
                .delete{
                    float right 
                    display none
                    height 20px
                    line-height 20px
                    cursor pointer
                    margin-right 16px
                    font-size 12px
                    color:rgba(0,0,0,0.8);
                }
            }
            .item:hover{
                background:rgba(245,245,245,1);
            }
            .item:hover .delete{
                display block
            }
        }
    }
}
</style>
