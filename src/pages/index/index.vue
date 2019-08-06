<template>
  <div >
    <view>
      <banner :banner="banner"></banner>
      <song-sheet :result='result'></song-sheet>
    </view>
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
    }
    
  },
}
</script>

<style scoped>

</style>
