// pages/wdtz/wdtz.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    time: [],
    flags: false,
    a:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
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
      url: app.d.hostUrl + '/Api/User/inform',
      method: 'post',
      data: {
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var inform = res.data.inform
        var time = []
        that.setData({
          inform: inform
        })
        function checkTime(num) {
          if (num < 10)
          { num = "0" +num}
          return num
        }
        for (var i = 0; i < inform.length; i++) {
          console.log(inform[i].addtime)
          var now = new Date(inform[i].addtime*1000);
          that.setData({
            time: that.data.time.concat({ i: i, date: (now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate()),
            time: checkTime(now.getHours()) + ':' + checkTime(now.getMinutes()) })
          })
        }
        console.log(inform.length)
        console.log(that.data.time)
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

  },
  bindRead: function (e) {
    var item_id = e.currentTarget.id
    console.log(e.target.id)
    //阅读后的文字颜色变为＃999
    
  }
})