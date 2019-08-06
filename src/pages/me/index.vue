<template>
  <div >

    <div class="login">
      <input type="tel" name="" id="" v-model="tel">
      <input type="password" name="" id="" v-model="pad">
      <div class="login" @click="logins">登入</div>
      <div @click="getRecommends">点击</div>
      <div @click="ss">刷新</div>
    </div>
  </div>
</template>

<script>
import {login,getRecommend,getRefresh} from "../../api/index"
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      tel:18720778264,
      pad:"sq174616"
    }
  },

  components: {
  },

  created () {
    // let app = getApp()
    // this.logins()
    
  },
  methods: {
    logins(){
      login(this.tel,this.pad).then(res=>{
        if(res.code===200){
          console.log(res)
         
        }
      })
    },
    getRecommends(){
      getRecommend().then(res=>{
        if(res.code===200){
          console.log(res)
        }
      })
    },
    ss(){
      getRefresh().then(res=>{
        if(res.code===200){
          console.log(res)
        }
      })
    }
  },
}
</script>

<style scoped>

</style>
