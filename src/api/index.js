import {request} from './config';

/** 
 * banner
 * 
 */ 
export async function getBanner(){
  return  request('/banner');
    
}

/** 
 * 歌单
*/
export async function getSong(){
  return  request('/personalized');
}

/*
歌单详情
*/ 
export async function getSongDetail(id){
    return request(`/playlist/detail?id=${id}`);
}

/*
歌曲url
*/
export async function getSongUrl(id){
  return request(`/song/url?id=${id}`);
}

/*
歌曲详情
*/
export async function getSongUrlDetail(id){
  return request(`/song/detail?ids=${id}`)
}

/*获取用户歌单 */

// export async function getUserPlaylist(id){
//   return request(`/user/playlist?uid=${id}`)
// }

/** 用户电话号码登录**/

export async function login(user,password){
  return request(`/login/cellphone?phone=${user}&password=${password}`)
}

/*获取每日推荐歌单*/

export async function getRecommend(){
  return request(`/recommend/resource`)
}

/* 刷新登入状态*/
export async function getRefresh(){
  return request(`/user/detail?uid=380514234`)
}

/*热门搜索*/
export async function getHotSearch(){
  return request(`/search/hot/detail`)
}