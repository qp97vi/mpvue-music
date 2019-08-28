<template>
    <div>
      <!-- <audio     :src="videoSrc" id="myAudio"  
      autoplay="autoplay"
      preload="auto"

    
       ref="audio"></audio> -->
      <!-- {{this.songurl}}
      {{this.src}} -->
      <div style="background:red;height:30px">{{videoSrc}}</div>
      {{videoSrc}}
      
    </div>
</template>
<script>
import store from '../store/index.js';
import {getSongUrl,getSongUrlDetail} from '@/api/index';

export default {
    props:{
        videoSrc:{
           
            
        },
        picUrl:{
            type:String,
            default(){
                return{}
            }
        },
        name:{
          type:String,
            default(){
                return{}
            }  
        },
        author:{
          type:String,
            default(){
                return{}
            }  
        }
    },
    data() {
        return {
          song:"",
          duration:'',
          currentTime:'',
          picUrl:'',
          audioSrc:'',
          index:''
        }
    },
    computed: {
        songUrl(){
            return store.state.playlist.tracks;
        },
        song(){
            return  store.state.songid;
        }
    },
    watch: {
        videoSrc:function(val,old){
          
            // const myAudio = wx.createInnerAudioContext();
            // console.log(myAudio,5)
            if(this.myAudio != null) { //第一次不用销毁
                this.myAudio.destroy() //销毁实例
        }

            this.myAudio = wx.createInnerAudioContext();
          
            this.myAudio.src =val
            // 监听音频进入可以播放状态的事件
            this.myAudio.onCanplay(()=> {
                this.myAudio.play()
            // 必须。可以当做是初始化时长
            this.myAudio.duration;
            console.log( this.myAudio.duration)
            // 必须。不然也获取不到时长
            setTimeout(() => {
                this.duration=this.myAudio.duration
                console.log(this.myAudio.duration); // 401.475918
                
            }, 1000)
            }) 
            this.myAudio.onTimeUpdate(()=>{
               this.currentTime=this.myAudio.currentTime
               this.duration=this.myAudio.duration
            //    console.log(this.currentTime,this.duration) 
            })
            this.myAudio.onEnded(()=>{
                this.childMethod()
            })
             
        }
    },
   
    methods:{
        // videoSrc(){
        //      if(this.myAudio != null) { //第一次不用销毁
        //         this.myAudio.destroy() //销毁实例
        // }

        //     this.myAudio = wx.createInnerAudioContext();
          
        //     this.myAudio.src =val
        //     // 监听音频进入可以播放状态的事件
        //     this.myAudio.onCanplay(()=> {
        //         this.myAudio.play()
        //     // 必须。可以当做是初始化时长
        //     this.myAudio.duration;
        //     console.log( this.myAudio.duration)
        //     // 必须。不然也获取不到时长
        //     setTimeout(() => {
        //         this.duration=this.myAudio.duration
        //         console.log(this.myAudio.duration); // 401.475918
                
        //     }, 1000)
        //     }) 
        //     this.myAudio.onTimeUpdate(()=>{
        //        this.currentTime=this.myAudio.currentTime
        //        this.duration=this.myAudio.duration
        //     //    console.log(this.currentTime,this.duration) 
        //     })
             
        // },
        play(){
            this.myAudio.play()
        },
        pause(){
            this.myAudio.pause()
        },
       childMethod() {
        this.$parent.nextSong();
      },
      
        _getSongUrl(songUrl){
            getSongUrl(songUrl).then(res=>{
               if(res.code===200){
                  this.audioSrc=res.data[0].url
                  
                  
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
        }
    },
    mounted() {
        console.log(this.songUrl)
          this.songUrl.forEach((element,index) => {
            if(this.$root.$mp.query.id==element.id){
               
            this._getSongUrl(this.songUrl[index].id)
            this._getSongUrlDetail(this.songUrl[index].id)
            
           this.index=index;
           console.log(this.index)
          }
       });  
         
    },
    

}
</script>
<style scoped>
.controls{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    width: 100%;
    position: absolute;
    bottom: 100rpx;
    z-index: 9;
}
.controls .iconfont{
    font-size: 66rpx;
}
</style>
