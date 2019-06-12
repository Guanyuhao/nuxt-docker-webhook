<template>
    <div class="moreChoose" v-show="state">
        <div class="head clearfix">
            <div class="close" @click="hide">
                <img src="~/assets/img/cha.png" alt="">
            </div>
        </div>
        <div class="search">
            <search-input v-model="value" @change='change'></search-input>
        </div>
        <div class="list">
            <div class="item" v-for="(item,index) in newList" :key="index" :style="{background:colorArr[index].background,color:colorArr[index].color}" @click="tag(item.id,item)" :title="item.name">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
import searchInput from '../UI/searchInput.vue'
export default {
    props:["list"],
    components:{
        searchInput
    },
    computed:{

    },
    data(){
        return {
            colorArr:[{color:'#ED7510',background:'#FEF6EE'},{color:'#D12B2B',background:'#FFF3F3'},{color:'#079F16',background:'#ECF6F3'},{color:'#C64100;',background:'#FFF3ED'},{color:'#1D227E',background:'#F0F1FF'},{color:'#399EFF',background:'#EFF5FF'},{color:'#525DD7',background:' #FFEEEE'},{color:'#399EFF',background:'#EFF5FF'},{color:'#525DD7',background:' #FFEEEE'},{color:'#399EFF',background:'#EFF5FF'},{color:'#525DD7',background:' #FFEEEE'},{color:'#399EFF',background:'#EFF5FF'},{color:'#525DD7',background:' #FFEEEE'},{color:'#399EFF',background:'#EFF5FF'},{color:'#525DD7',background:' #FFEEEE'}],
            state:false,
            value:"",
            newList:[]
        }
    },
    methods:{
        show(){
            this.newList = JSON.parse(JSON.stringify(this.list))
            this.state = true;
        },
        hide(){
            this.state = false
        },
        tag(id,obj){
            this.$emit("tag",id,obj)
            this.hide();
        },
        change(){
            
            if(this.value==""){
               this.newList =  JSON.parse(JSON.stringify(this.list))
            }else{
                this.newList = []
                for(let i in this.list){
                    let re =  new RegExp(`${this.value}`,'ig');
                    if(re.test(this.list[i].name)){
                        this.newList.push(this.list[i])
                    }
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.moreChoose{
    position absolute
    width 456px
    height 264px
    top: -300px;
    left: -450px;
    background: #FFFFFF;
    box-shadow: 0 0 3px 1px rgba(23,47,81,0.13);
    .head{
        margin-top: 10px;
        margin-right: 10px;
        margin-bottom: 11px;
        .close{
            float right 
            cursor pointer
            img{
                width 16px
                height 16px
            }
        }
    }
    .search{
        width 406px
        margin 0 auto
        >>>.llp-serach-input{
            width 406px
        }
    }
    .list{
        width 406px
        margin 0 auto
        .item{
            float left
            margin-left 10px
            margin-right 10px
            width 80px
            cursor pointer
            text-align center
            height 30px
            line-height 30px
            margin-top 14px
            overflow hidden
            text-overflow  ellipsis
            white-space nowrap
        }
    }
}
</style>
