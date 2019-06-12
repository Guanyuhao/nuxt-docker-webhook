<template>
    <div class="mynews">
        <div class="white-space">
            <div class="new-header">我的消息</div>
            <div class="table">
                <div class="table-head clearfix">
                    <div class="number">序号</div>
                    <div class="msg">消息内容</div>
                    <div class="href">快捷入口</div>
                    <div class="time">时间</div>
                </div>
                <div class="table-item clearfix" v-for="(item,index) in  list" :key="index">
                    <div class="number" >{{index+1}}</div>
                    <div class="msg" :class="{isread:item.isRead}" @click="read(item.id)" :title="item.content">{{item.content}}</div>
                    <div class="href" @click="goDetail(item.pageName,item.proId)">{{item.reservel}}</div>
                    <div class="time">{{item.createTimeStr}}</div>
                </div>
                <div class="nodata" v-show="list.length==0">
                    <div class="center">
                        <img src="~/assets/img/nodata.png" alt="">
                        <h4>暂无消息</h4>
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
        
    </div>
</template>
<script>
export default {
    layout:"home",
    mounted(){
        this.initList();
    },
    data(){
        return {
            list:[{}],
            currentPage:1,
            total:10,
        }
    },
    methods:{
        handleCurrentChange(page){
            this.currentPage = page;
            this.initList()
        },
        goDetail(str,id){
            this.$router.push({
                path:str,
                query:{
                    proId:id
                }
            })
        },
        async initList(){
            let {data} =await this.$axios.$post("/message/getMessageList",{
                curPagerNo:this.currentPage,
                pageSize:10
            })
           this.list = data.list;
           this.list.forEach(element => {
               if(element.pageName=="classexamp"||element.pageName=="entityexample"){
                   element.reservel = "示例标注"
               }else if(element.pageName=="classcheck"||element.pageName=="entitycheck"){
                   element.reservel = "考核标注"
               }else if(element.pageName=="classformal"||element.pageName=="entityformal"){
                   element.reservel = "任务标注"
               }else if(element.pageName=="taskmanger"){
                   element.reservel = "待审核"
               }else if(element.pageName=="classcommit"){
                    element.reservel = "确认标注"
               }else if(element.pageName=="multaskdetail"){
                    element.reservel = "任务详情"
               }else{
                    element.reservel = "-"
               }
           });
           this.total = data.rowsCount;
        },
        async read(id){
             let {code} =await this.$axios.$post("/message/readMessage",{
                 id:id
             })
             this.$bus.$emit("header")
             this.initList()
        },
    }
}
</script>
<style lang="stylus" scoped>
.page{
    margin-top 20px
    text-align center
}
.new-header{
    color rgba(0,0,0,0.8)
    font-weight bold
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
            width 220px
            height 220px
        }
        h4{
            font-size 22px
            text-align center
        }
    }
    
}
.mynews{
    padding 20px;
    background: #262832;
    height 100%
    .white-space{
        background white
        width 100%
        height 100%
        padding 24px 27px 27px 27px
        .new-header{
            font-size: 16px;
            color: rgba(0,0,0,0.80);
            margin-bottom 20px
        }
        .table{
            .table-head{
                background: #EDEEF1;
                border: 1px solid #DCE2EA;
                display flex
                flex-direction row
                font-size: 14px;
                height 36px
                line-height 36px
                text-align center
                color: rgba(0,0,0,0.6);
                .number{
                    width 51px
                }
                .msg{
                    flex 1
                    text-align left 
                    padding-left 20px
                }
                .href{
                    width 128px
                    cursor pointer
                    text-align left 
                    padding-left 20px
                    
                }
                .time{
                    text-align left 
                    padding-left 20px
                    width 182px
                }
            }
             .table-item{
                cursor pointer
                border: 1px solid #DCE2EA;
                border-top:0;
                border-bottom 0;
                display flex
                flex-direction row
                font-size: 14px;
                height 40px
                line-height 40px
                text-align center
                color: rgba(0,0,0,0.8);
                .number{
                    width 51px
                    border-right:1px solid #DCE2EA;
                    text-align left 
                    padding-left 20px
                }
                .msg{
                    flex 1
                    font-size: 14px;
                    color: rgba(0,0,0,0.80);
                    text-align left 
                    padding-left 20px
                    text-overflow ellipsis
                    white-space nowrap
                    overflow hidden
                    border-right:1px solid #DCE2EA;
                }
                .isread{
                    font-size: 14px;
                    border-right:1px solid #DCE2EA;
                    color: rgba(0,0,0,0.50);
                }
                .href{
                    width 128px
                    text-align left 
                    padding-left 20px
                    font-size: 14px;
                    border-right:1px solid #DCE2EA;
                    color: #3888FF;
                }
                .time{
                    width 182px
                    text-align left 
                    padding-left 20px
                }
            }
        }
    }
}
.table{
     border-bottom : 1px solid #DCE2EA;
}
.table-item:nth-child(odd){
    background #f6f6f8
}
</style>
