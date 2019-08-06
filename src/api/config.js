// var host='http://106.13.43.60:3000';
var host="http://localhost:3001"

export  function request(url,method="GET",data,header={}){
   
    return new Promise((resolve,reject)=>{
        wx.showLoading({
            title:'加载中'
        })
       wx.request({
        url:host + url,
        data,
        method,
        header:{
            'content-type': 'application/json' // 默认值
        },
        success:function(res){
            wx.hideLoading();
            resolve(res.data)
            console.log(res.data)
            
        },
        fail:function(res){
            wx.hideLoading()
            reject(res)
        },
        complete:function(){
            wx.hideLoading()
        }
        })
    })
}

