// pages/glyh/glyh.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  times:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/Myuser',
      method: 'post',
      data: {
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          user: res.data.user
        })
        for (var i = 0; i < that.data.user.length; i++) {
          var dateTime = new Date(parseInt(that.data.user[i].addtime) * 1000)
          that.setData({ 
        time: dateTime.getFullYear() + '.' + (dateTime.getMonth() + 1) + '.' + dateTime.getDate() + '  ' + dateTime.getHours() + ':' + dateTime.getMinutes(),
          })
      that.setData({
        times: that.data.times.concat({
          time: that.data.time
        })
      })
      }
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