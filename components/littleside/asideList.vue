<template>
    <div class="list">
        <div class="title">
            标注结果
        </div>
        <div class="list-item" v-for="(item,index) in list" :key="index">
            <div class="title" :title="item.name">
                {{item.name}}
            </div>
            <div class="number">
                {{item.count}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["list"]
}
</script>
<style lang="stylus" scoped>
 .title{
        font-size: 14px;
        color: #8794aa;
        text-align: center;
        margin-top: 33px;
      
}
.list-item{
    height 61px
    overflow hidden
    .title{
        font-size: 12px;
        width 56px
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        color: rgba(255,255,255,0.6);
        margin-bottom 7px
        margin-top 16px
    }
   
    .number{
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        text-align center
    }
}
.list{
    padding-bottom 16px
    border-bottom: 1px solid #1d1e1f;
}
</style>
