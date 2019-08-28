<template>
  <div >
    <view>
      <banner :banner="banner"></banner>
      <song-sheet :result='result'></song-sheet>
    </view>
  
     <div class="search" @click="search">
        <span class="iconfont iconsousuo"></span>
     </div>
   
  </div>
</template>

<script>
// import {request} from '../../api/config'
import {getBanner,getSong} from '../../api/index'
import banner from '@/components/banner.vue';
import songSheet from '@/components/songSheet';
// import store from '../../store/index'
//  import {mapActions, mapState} from 'vuex';
export default {
  data () {
    return {
      banner:[],
      result:[],//歌单列表
    }
  },
  components: {
    banner,
    songSheet,
  },

  computed: {
    
  },
  mounted() {
   
  },
  created () {
   this._getBanner()
    this._getSong()
  },
  methods: {
    /*获取banner */
   _getBanner:function(){
     getBanner().then(res=>{
       if(res.code===200){
         this.banner=res.banners;
       }
        
      })
    },
    _getSong(){
        getSong().then(res=>{
            if(res.code===200){
              this.result=res.result
              console.log(res.result)  
            }
        })
    },
    search(){
       wx.navigateTo({
                url: '../search/main?',
            })
    }
    
  },
}
</script>

<style scoped>
.search{
  background: #B22222;
  border-radius: 50%;
  padding: 20rpx 20rpx;
  box-shadow: -2rpx 0 20rpx #e8e8e8;
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  right:28rpx;
bottom:268rpx
}
.iconsousuo{
  font-size: 60rpx;
  line-height: 60rpx;
  color: #ffffff;
}
</style>
