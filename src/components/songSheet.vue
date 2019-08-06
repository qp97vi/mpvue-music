<template>
   <div>
       <div class="title">
           <span class="hot">{{hot}}:</span>
           <span class="more" @click="more(result.length)" >换一换</span>
       </div>
       <div class="songSheet">
            <div v-for="(item, index) in songlist" :key="index" class="songSheet-list" v-if="index<count"  >
               <div @click="goSongs(item.id)">
                    <div class="img-box" >
                        <img :src="item.picUrl" class="slide-image" mode="aspectFill"/>
                    </div>
                    <em>{{item.name}}</em>
               </div>
            </div>
                
        </div>  
   </div>
</template>
<script>
export default {

    props:{
        result:{
            type:Array,
            default() {
          return {}
        }
        }
    },
    data() {
        return {
            hot:'热门歌单',
            count:6,
            res:[],
            songlist:this.result
        }
    },
    methods: {
        more(num){/**换一换 **/
        let maxNum=num
        // 定义存放生成随机数的数组
        var array=new Array(); 
        // 循环N次生成随机数
        for(var i = 0 ; ; i++){ 
            // 只生成10个随机数
            if(array.length<6){ 
                generateRandom(10); 
            }else{ 
            break; 
            } 
        } 
        // 循环遍历随机数数组
        this.res=[]
        for(var i = 0 ; i < array.length; i++){ 
           this.res.push(this.result[array[i]])
        } 
        this.songlist=this.res
        // 生成随机数的方法
        function generateRandom(count){ 
            var rand = parseInt((Math.random() * (maxNum - 0) + 0)); 
            for(var i = 0 ; i < array.length; i++){ 
                if(array[i] == rand){ 
                    return false; 
                }      
            } 
            array.push(rand); 
        }     
        },
        goSongs(id){
            wx.navigateTo({
                url: '../songlist/main?id='+id,
            })
            // console.log(id)
        }
    },
}
</script>
<style scoped>
.songSheet{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.title{
    display: flex;
    padding: 0 20rpx;
    align-items: center;
    justify-content: space-between;
}
.img-box{
    width: 240rpx;
    height: 240rpx;
    border-radius: 10rpx;
    overflow: hidden;
}
.more{
    color: #cccccc;
    font-size: 24rpx;
}
em{
    color: #333;
    font-size: 24rpx;
    width: 240rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10rpx 0;
}
img{
    width: 100%;
    height: 100%;
}
.hot{
    display: flex;
    padding: 14rpx 0;
}
</style>
