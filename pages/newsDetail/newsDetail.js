// pages/newsDetail/newsDetail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.d.hostImg,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var news_id=options.news_id
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/News/detail',
      method: 'post',
      data: {
        news_id: news_id, 
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var info = res.data.info 
        that.setData({
          info: info 
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
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
})