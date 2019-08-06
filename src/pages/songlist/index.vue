<template>
    <div>
        <div class="header">
            
        </div>
        <div class="playlist" >
            <img :src="playlist.backgroundCoverUrl?playlist.backgroundCoverUrl:playlist.coverImgUrl" class=filter/>
            <div class="playlistTop">
                <div class="imgBox">
                    <img :src="playlist.coverImgUrl" alt="">
                    <i>{{playCount}}万</i>
                </div>
                <div class="imgLeft">
                    <p>{{playlist.name}}</p>
                    <div class="title">
                        <img :src="creator.avatarUrl" alt="">
                        <div class="name">{{creator.nickname}}</div>
                    </div>
                </div>
            </div>
        </div>
        <ul>
            <div class="list-header">
               <div class="list-header-left">
                    <img :src="bofang" alt="" srcset="" class="bofang">
                    <span @click="goPlay(playlist.tracks[0] && playlist.tracks[0].id)">播放全部共{{playlist.trackCount}}首</span>
               </div>
               <div class="list-header-right">
                   <span>{{playlist.subscribedCount}}人收藏</span>
               </div>
            </div>
            <li v-for="(item,index) in playlist.tracks" :key="index" @click="goPlay(item.id)">
                <div class="songLeft">
                    {{index+1}}
                </div>
                <div class="songRight">
                    <div class="songTitle">
                        <em>{{item.name}}</em>
                        <em v-for="(item,ind) in item.alia":key="ind">{{item}}</em>
                    </div>
                    <div class="songName">
                        <em v-for="(item,inde) in item.ar" :key="inde">{{item.name}}</em>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {getSongDetail} from '@/api/index';
import store from '../../store/index';
export default {
    data() {
        return {
            playlist:{
                tracks:[],
               creator:{},
            },
            creator:'',
            playCount:0,
            privileges:[],
            bofang:require('../../../static/images/bofang.png'),
            
        }
    },
    mounted() {
    //this.$root.$mp.query.id  获取参数
        this._getSongDetail(this.$root.$mp.query.id)
        console.log(store.state.title)
    },
    methods: {
        _getSongDetail(id){
            getSongDetail(id).then(res=>{
                if(res.code===200){
                    this.playlist=res.playlist;
                    this.creator=res.playlist.creator;
                    this.playCount=Math.round(((res.playlist.playCount /10000) * 100) /100
                    )
                    this.privileges=res.privileges;
                }
            })
        },
        // play(itemid){
        //     // console.log(id)
        //      store.commit("updatedSongUrl",itemid)
        //      store.commit('change','针')
        //     wx.navigateTo({
        //         url: '../play/main?id='+itemid,
        //     })
            
        // },
        goPlay(id){
            // this.filters();
            console.log(id)
            store.commit("getsongid",id)
          if (store.state.playlist.id !== this.playlist.id) {
                // this.$store.commit('updatePlaylist', this.playlist);
                store.commit("updatedSongUrl",this.playlist)
            }
             store.commit("updatedSongUrl",this.playlist)
            // store.commit("updatedSongUrl",id)
            // store.commit('change','针')
             wx.navigateTo({
                url: '../play/main?id='+id,
            })
        },
        // 获取多个音乐id
        // filters(){
        //     for(var i=0;i<this.privileges.length;i++){
        //         this.ids.push(this.privileges[i].id)              
        //     }
        // }
        
    },
}
</script>
<style scoped>
.filter{
    position: absolute;
    z-index: -1;
    width: 100%;
    filter: blur(100rpx);

}
.imgBox{
    width: 300rpx;
    height: 300rpx;
    position: relative;
    padding-left: 40rpx;
    margin-right: 20rpx;
}
.imgBox i{
    position: absolute;
    top: 0;
    right: 0;
    color: #ffffff;
    font-size: 24rpx;
}
.imgBox img{
    width: 100%;
    height: 100%;
}
.playlistTop{
    display: flex;
    align-items: center;
}
.playlist{
    margin: 60rpx 0;
}
.title{
    display: flex;
    align-items: center;
    margin-top: 10rpx;
    font-size: 24rpx;
    color: #ffffff;
}
.title img{
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-right: 10rpx;
}
.imgLeft p{
    font-size: 28rpx;
    color: #ffffff;
}
.bofang{
    width: 60rpx;
    height: 60rpx;
    margin-right: 10rpx;
}
.list-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22rpx 20rpx;
}
ul{
    border-radius: 40rpx 40rpx 0 0;
    background: #ffffff;
}
li{
    display: flex;
    align-items: center;
}
.songTitle,.songName{
    display: flex;
}
.list-header-left{
    display: flex;
    align-items: center;
}
.songLeft{
    padding: 0 20rpx;
}
.songRight{
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #dddddd;
    margin-right: 32rpx;
    flex: 1;
}
</style>
