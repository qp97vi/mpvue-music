<template>
    <div>
       <div class="bg">
           <div class="background">
               <img :src="picUrl" alt="">
           </div>
       </div>
       <div class="middle">
           <div class="playBorder" v-if="!this.picUrl">
               
           </div>
           <div class="play">
                <img :src="picUrl" alt="">
            </div>
       </div>
       <play :videoSrc="videoSrc" ref="myplay">
            
          
       </play>
       <div class="controls">
            <span class="iconfont iconshangyishou" @click="prevSong()"></span>
             <span class="iconfont iconcrm17" @click="suspend()"></span>
            <span class="iconfont iconxiayishou" @click="nextSong()"></span>
       </div>
     
    </div>
</template>
<script>
import {getSongUrl,getSongUrlDetail} from '@/api/index';
import store from '../../store/index';
import play from '@/components/play';
export default { 
    data() {
        return {
            songs:[],
            picUrl:'',
            videoSrc:'',
            name:'',
            author:'',
            index:'',
        }
    },
    components:{
        play
    },
    computed: {
        songUrl(){
            return store.state.playlist.tracks;
        }
    },
    created() {
        
    },
    mounted() {
        
       this.songUrl.forEach((element,index) => {
            if(this.$root.$mp.query.id==element.id){ 
            this._getSongUrl(this.songUrl[index].id)
            this._getSongUrlDetail(this.songUrl[index].id)
           this.index=index;
           console.log(this.index)
          }
       }); 
       if(this.$root.$mp.query.id){
           this._getSongUrl(this.$root.$mp.query.id)
            this._getSongUrlDetail(this.$root.$mp.query.id)
       }
    },
    methods: {
         nextSong(){
            // console.log(this.videoSrc)
            if(this.songUrl.length<=1){

            }else{
                if(this.songUrl.length-1==this.index){
                    return
                }else{
                    const nextSong = this.songUrl.slice(this.index +1, this.index + 2)[0];
                    this._getSongUrl(nextSong.id)
                    this._getSongUrlDetail(nextSong.id)
                    this.index=this.index+1;
                
                    // const val=this.videoSrc
                    // console.log(val)
                    // this.videoSrc(val)
                }  
            }
            
        },
         prevSong(){
            if(this.index==0){
                return
            }else{
              const nextSong = this.songUrl.slice(this.index - 1, this.index )[0];
             this._getSongUrl(nextSong.id)
            this._getSongUrlDetail(nextSong.id)
            this.index=this.index-1; 
            console.log(this.videoSrc)
           
            } 
        },
        suspend(){
            console.log(1)
            // console.log(this.$refs.myplay.toogle)
            this.$refs.myplay.toogle()
           
        },
        _getSongUrl(songUrl){
            getSongUrl(songUrl).then(res=>{
               if(res.code===200){
                  this.videoSrc=res.data[0].url
                  
               }
            })
        },
        _getSongUrlDetail(songUrl){
            getSongUrlDetail(songUrl).then(res=>{
                if(res.code===200){
                    this.songs=res.songs[0]
                    this.picUrl=res.songs[0].al.picUrl
                    this.name=res.songs[0].name
                    this.author=res.songs[0].ar[0].name
                }
            })
        },
       
    },
    
}
</script>
<style scoped>
.bg{
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(30rpx);
    opacity: .6;
}
.background{
    background: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(30rpx);
    opacity: .6;
}
.background img{
    width: 100%;
    height: 100%;
    display: block;
}
.middle{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
 
}
.play{
      border: 14rpx solid hsla(0, 0%, 100%, 0.5);
      animation: rotate 15s linear infinite;
       width: 480rpx;
    height: 480rpx;
    border-radius: 50%;
    
  
}
.play img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.playBorder{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;

    animation: moveCircle 6s linear infinite;
}
.controls{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    width: 100%;
    position: absolute;
    bottom: 100rpx;
    z-index: 9;
}
.iconfont{
    font-size: 66rpx;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
@keyframes moveCircle{
    0%{
        width: 0rpx;
        height: 0rpx;
        border: 0px solid rgba(255, 255, 255, 0)
    }
    30%{
        width: 510rpx;
        height: 510rpx;
        border: 1px solid rgba(255, 255, 255, 0.8)
    }
    50%{
    width: 610rpx;
    height: 610rpx;
    border: 1px solid rgba(255, 255, 255, 0.6)
    }
    80%{
        width: 700rpx;
        height: 700rpx;
        border: 1px solid rgba(255, 255, 255, 0.4)
    }
    99%{
        width: 375px;
        height: 375px;
        border: 1px solid rgba(255, 255, 255, 0.1)
    }
    100%{
        width: 0px;
        height: 0px;
        border: 1px solid rgba(255, 255, 255, 0)
    }
}

</style>
