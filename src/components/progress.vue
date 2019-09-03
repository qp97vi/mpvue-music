<template>
    <div class="progressContainer">
        <div class="progress" :style="{width:progress+'%'}"> </div>
    </div>
</template>
<script>
export default {
    name:'progress',
    props:{
        progress: {
            type: Number,
            default() {
                return {
                  progress:0  
                }
            }
        }
    },
    data() {
        return {
            
        }
    },
}
</script>
<style scoped>
.progressContainer{
    height: 18rpx;
    flex: 6;
    border-radius: 10px;
    background-color: #ddd;
    margin-left: 2%;
    margin-right: 2%;
    overflow: hidden;
}
.progress{
    background-color: #B22222;
    border-radius: 10px;
    height:18rpx;
    line-height: 18rpx;
    width: 0;
    border-radius: 10px;
}
b{
    color:#fff;
    font-weight: 100;
    font-size: 12px;
    position:absolute;
    left:40%; 
 }
</style>
