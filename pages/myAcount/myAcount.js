// pages/myAcount/myAcount.js
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
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/num ',
      method: 'post',
      data: {
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       that.setData({
           num: res.data.num
       })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
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
  
  },
  jbtx:function(){
    console.log(this.data.num.gold)
    wx.navigateTo({
      url: '../jbtx/jbtx?gold='+this.data.num.gold,
    })
  },
  toFxgl:function(){
    wx.navigateTo({
      url: '../fxgl/fxgl?height='+550,
    })
  },
  toMakecoin:function(){
    wx.showModal({
      title: '提示',
      content: '您是否进入商城,购买商品即可获得银币',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../company_index/company_index',
          })
        } else if (res.cancel) {
        }
      }
      
    })
  }
})