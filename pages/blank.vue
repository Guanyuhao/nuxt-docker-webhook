<template>
    <div class="blank"> 
        <diction-model></diction-model>
        
    </div>
</template>
<script>
import dictionModel from '../components/standModal'
export default {
    components:{
        dictionModel
    },
    data (){
        return {
            input:""
        }
    }
}
</script>
<style lang="stylus" scoped>
.blank >>>.el-input{
    height 100px;
    
}
.blank >>>.el-input__inner {
     height 200px;
}

</style>
