<template>
    <div class="little-model">
        <div class="title">模型</div>
        <div class="two-title">准确度</div>
        <div class="number">{{num}}%</div>
    </div>
</template>
<script>
export default {
    props:["num"]
}
</script>
<style lang="stylus" scoped>
.little-model{
    height 108px
    overflow hidden
    border-bottom: 1px solid #1D1E1F;
    .title{
        font-size: 14px;
        color: #8794AA;
        text-align center
        margin-top 17px
        
    }
    .two-title{
        font-size: 14px;
        color: #8794AA;
        text-align center
        margin-bottom 16px 
    }
    .number{
        font-size: 14px;
        color: #D6DCE0;
        text-align center
    }
}
</style>
