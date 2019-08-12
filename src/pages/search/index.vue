<template>
    <div>
        <div class="searchTop">
            <div class="search">
                <span class="iconfont iconsousuo"></span>
                <input type="text" v-model.trim="singer" @blur="serachPage" placeholder="请输入歌手或歌曲名">
                <span class="iconfont iconguanbi" @click="reset"></span>
            </div>
            <div class="close" @click="close">取消</div>
        </div>
        <div class="hot-serach">
            <span>热门搜索</span>
            <div class="">
                <em v-for="(item,index) in hotSearch" :key="index">{{item.first}}</em>
            </div>
        </div>
        <div class="search-history">
            <div class="history-title"><span>搜索历史</span> <i class="iconfont iconshanchu" @click="del"></i></div>
            <div>
                <em v-for="(item,ind) in history":key="ind" @click="clickSeach(item)">{{item}}</em>
            </div>
        </div>
        <!-- 删除弹框 -->
        <!-- div. -->
        <div class="search-list">
            <ul>
                <li v-for="(item,inx) in songlist" :key="inx" @click="bofang(item.id)">
                    <span>{{item.name}}</span>
                    <em>{{item.artists[0].name}}</em>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getHotSearch,getSearch} from '../../api/index'
export default {
    name:'search',
    data() {
        return {
           singer:undefined,
           hotSearch:'',
           history:'',
           songlist:[]
        }
    },
    watch: {
        singer(val){
            if (val) {
               this._getSearch(val) 
            } else {
                this.songlist = []
            }
           
        }
    },
    created() {
        this._getHotSearch()
    },
    mounted() {
        this.history=wx.getStorageSync('history') || []
        console.log(this.history)
    },
    methods: {
        reset(){
            this.singer=""
        },
        close(){
           wx.navigateBack({
                delta: 1
            })
        },
        clickSeach(item){
            // console.log(item);
            this.singer=item;
            
        },
        bofang(id){
            console.log(id);
            wx.navigateTo({
                url: '../play/main?id='+id,
            })
        },
        _getSearch(val){
            getSearch(val).then(res=>{
                if(res.code===200){
                    this.songlist=res.result.songs
                }
            })
        },
        _getHotSearch(){
            getHotSearch().then(res=>{
                if(res.code===200){
                    this.hotSearch=res.result.hots
                }
            })
        },
        serachPage(){
            console.log(this.his)
           
            let history=wx.getStorageSync('history') || []
            for(var i=0;i<history.length;i++){
                if(this.singer==history[i]||this.singer==""){
                    return false;
                }
            }
            history.unshift(this.singer)
            
            wx.setStorageSync('history', history)
            this.$nextTick(function(){
                  this.history=wx.getStorageSync('history') || []
            })
        },
        del(){
             wx.clearStorage()
             this.$nextTick(function(){
                 this.history=""
             })
            // wx.showModal({
            //     title: '提示',
            //     content: '确定删除全部历史记录',
            //     success (res) {
            //         if (res.confirm) {
            //         console.log('用户点击确定')
            //         wx.clearStorage()
                   
            //         } else if (res.cancel) {
            //         console.log('用户点击取消')
            //         }
                
            //     },
            
            // })
            // var that=this
            //     that.$nextTick(function(){
            //         that.history=""
            //     })
            // setTimeout(function () {
                
                
            //     console.log("清空")
            // }, 2000)
        }
    },
}
</script>
<style scoped>
.searchTop{
    background: #B22222;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search{
    width: 538rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #ffffff;
    border-radius: 37rpx;
    padding: 16rpx 0;
}
.close{
    position: absolute;
    margin-left: 317rpx;
    color: #ffffff;
}
.search .iconsousuo{
    margin-left: 18rpx;
    margin-right: 10rpx;
}
.search .iconguanbi{
    margin-right: 18rpx;
}
.search input{
    flex: 1;
}
.hot-serach em{
    display: inline-block;
    color: red;
    background: #f8f8f8;
    padding: 10rpx 16rpx;
    border-radius: 10rpx;
    font-size: 26rpx;
    margin: 10rpx 18rpx;
}
.search-history em{
    display: inline-block;
    color: red;
    background: #f8f8f8;
    padding: 0rpx 16rpx;
    border-radius: 10rpx;
    font-size: 26rpx;
    margin: 0rpx 18rpx;
}
.iconshanchu{
    color: #cccccc;
}
.search-history div{
  
}
.history-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 18rpx;
}
.hot-serach span{
    margin-left: 18rpx;
    color: red;
}
.history-title span{
    color: red;
}
.search-list{
    background: #F8F8FF;
    position: absolute;
    top: 100rpx;
    width: 100%;
}
.search-list li{
    margin: 0 34rpx;
    
}
.search-list li+li{
    border-top: 1px solid #dddddd;
}
</style>
