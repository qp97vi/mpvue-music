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
      <div @click="toogle()"></div>
        <!-- <div class="controls"> -->
          <slot></slot>
        <!-- <span class="iconfont iconcrm17" @click="play()"></span> -->
         
         
      <!-- </div> -->
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

       childMethod() {
        this.$parent.nextSong();
      },
       toogle(){
           
           console.log(33333)
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
        //    this.$emit('picurl',this.picUrl) 
        //      this.$emit("audiosrc",this.audioSrc)
           console.log(this.index)
          }
       }); 
       
        //  this.song(this.songurl)
        // for(var i=0;i<this.songUrl.length;i++){
        //   if(this.$root.$mp.query.id==this.songUrl[i].id){
        //        this._getSongUrl(this.songUrl[i].id)
        //         this._getSongUrlDetail(this.songUrl[i].id)
        //        return 
        //   }
         
        // }
     
       
        // // 创建一个audio
    
        
         
    },
    
    // mounted() {
    //     this.$refs.audio.play()
    //     this.audioCtx = wx.createAudioContext('myAudio')
       
    //     //  this.audioCtx.play()
        
    // console.log(this.songUrl)
    // // 创建一个audio
    // const myAudio = wx.createInnerAudioContext();
    
    // // 设置audio的资源地址
    // //  'http://m10.music.126.net/20190729171915/376bcc1ab531ed1ec778a60911b00b21/ymusic/78a4/bd4a/4931/dfdee6748dd9e52904d21423c3b0584b.mp3';  
    // myAudio.src =
    // // 监听音频进入可以播放状态的事件
    // myAudio.onCanplay(()=> {
    //     myAudio.play()
    //   // 必须。可以当做是初始化时长
    //   myAudio.duration;
    //   // 必须。不然也获取不到时长
    //   setTimeout(() => {
    //     console.log(myAudio.duration); // 401.475918
    //   }, 1000)
    // })  

    // },
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
