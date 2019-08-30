<template>
    <div class="progressBox">
     
     
       <em>{{currentTime }}</em>
       <progress :progress="progress"></progress>
       <em>{{duration}}</em>
    </div>
</template>
<script>
import store from '../store/index.js';

import Progress from '@/components/progress'
export default {
    props:{
        videoSrc:{ 
        },
       
    },
    data() {
        return {
          duration:'',
          currentTime:'',
          progress:0//进度条
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

            // 必须。不然也获取不到时长
            setTimeout(() => {
                this.myAudio.duration
 
            })
            }) 
            this.myAudio.onTimeUpdate(()=>{
               this.currentTime=this.format(this.myAudio.currentTime)
               this.duration=this.format(this.myAudio.duration)
               this.progress= (this.myAudio.currentTime / this.myAudio.duration * 100).toFixed(2)
               if(this.videoSrc==null){
                   this.progress=0;
               }
            })
            this.myAudio.onEnded(()=>{
                this.childMethod()
            })
             
        }
    },
   
    methods:{
       
        play(){
            this.myAudio.play()
        },
        pause(){
            this.myAudio.pause()
        },
       childMethod() {
        this.$parent.nextSong();
        },
        format(interval) {
     
            interval = interval | 0
            
            let minute = interval / 60 | 0
            let second = interval % 60
            if (second < 10) {
                second = '0' + second
            }
            return minute + ':' + second
        },
    
    },
    components:{
        Progress
    }

}
</script>
<style scoped>
.progressBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    bottom:180rpx;
    z-index: 9;

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
.controls .iconfont{
    font-size: 66rpx;
}
</style>
