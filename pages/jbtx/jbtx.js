// pages/jbtx/jbtx.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if (app.globalData.froms == 'user') {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#008842',
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4BA3FE',
      })
    }
    this.setData({
      gold:options.gold
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loadingHidden: true
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '',
      path: '',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  inputNum:function(e){
    var that=this
    var min=100
    var max=Number(this.data.gold)
   var inputNum=e.detail.value
   if (inputNum >= min && inputNum<max){
     console.log(max)
     this.setData({
       outNum:  parseInt(inputNum * 0.3)
     })
   }else{
     this.setData({
       outNum: 0
     })
   }

  },
  totixian:function(){
 var that = this
 if (this.data.outNum>0){
   wx.request({
     url: app.d.ceshiUrl + '/Api/wxmoney/pay_with ',
     method: 'post',
     data: {
       price: that.data.outNum
     },
     header: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     success: function (res) {

     },
   })
 }else{
               wx.showToast({
              title: '转出失败',
              duration: 2000
            });
 }

    

//     if(0){
//       wx.request({
//         url: app.d.ceshiUrl + '/Api/Wxmon/wxpay',
//         method: 'post',
//         data: {
//           enc_bank_no: 213123,  银行卡账号
//           enc_true_name: 213123,银行卡名字
//           amount: 123123        金额
//         },
//         header: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         success: function (res) {
//           var status = res.data.status;
//           if (status == 1) {
//             wx.showToast({
//               title: res.data.err,
//               duration: 2000
//             });
//           } else {
//             wx.showToast({
//               title: res.data.err,
//               duration: 2000
//             });
//           }
//         },
//         error: function (e) {
//           wx.showToast({
//             title: '网络异常！',
//             duration: 2000
//           });
//         },
//       })
//     }else{
// wx.showToast({
//   title: '暂未开放',
//   icon:'loading'
// })
//     }

  }
})