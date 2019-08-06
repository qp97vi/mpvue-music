import Vue from 'vue'
import Vuex from 'vuex'
import {getBanner,getSong} from '../api/index'
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        banner:[],
        playlist:{
            id:0,
            tracks:[]
        },
        song:{
            url:'',
            id:''
        },
        src:'',
        songid:''//当前播放音乐ID
    },
    
    actions:{
        getComingSoon(state,payload) {
            getBanner(payload).then(res=>{
                console.log(res)
                store.commit("comingsoon",res.data)
            })
            
        },
    },
    mutations:{
        comingsoon(state,payload) {
            state.banner=payload;
            console.log(payload)
        },
        updatedSongUrl:(state,data)=>{
          state.playlist.id=data.id;
          state.playlist.tracks=data.tracks;
        },
        song:(state,data)=>{
            state.song.id=data.id;
            state.song.url=data.url;
        },
        setSrc:(state,data)=>{
            state.src=data;
        },
        getsongid:(state,data)=>{
            state.songid=data;
        }
       
    },
})

export default store;