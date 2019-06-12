<template>
    <div class="aside-progress">
        <div class="title">
            个人进度
        </div>
        <div class="number">
            {{message.finish.rate}}
        </div>
    </div>
</template>
<script>
export default {
    props:["message"]
}
</script>
<style lang="stylus" scoped>
.aside-progress{
    height 108px
    overflow hidden
    border-bottom: 1px solid #1D1E1F;
    .title{
        font-size: 14px;
        color: #8794AA;
        text-align center
        margin-top 33px
        margin-bottom 16px
    }
    .number{
        font-size: 14px;
        color: #D6DCE0;
        text-align center
    }
}
</style>
