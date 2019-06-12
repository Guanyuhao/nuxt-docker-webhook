<template>
    <div class="back-btn" @click="back">
        <img class="back" src="~/assets/img/task/back.png" alt="">
        <div class="txt">返回</div>
    </div>
</template>
<script>
export default {
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
.back-btn{
    width 100%
    height 40px
    cursor pointer
    background: #262832;
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
</style>
