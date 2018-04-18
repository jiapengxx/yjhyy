// pages/company_shop/company_shop.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**      * 页面配置      */
    winWidth: 0, winHeight: 0,
    // tab切换   
    height: 0,
    currentTab: 0,
    host: app.d.hostImg,
    wsy: [],
    ysy: [],
    ysx: [],
    start: 0,
    end: 0,
    times: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var times = []
    var wsy = []
    var ysy = []
    var ysx = []
    var that = this
    wx.request({
      url: app.d.hostUrl + '/Api/BSale/index',
      method: 'post',
      data: {
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //获取时间戳,确定失效优惠券
        var now = Date.now();
        console.log(now)
        var sale = res.data.sale;
        for (var i = 0; i < sale.length; i++) {
          if (sale[i].status == 1) {
            //未使用
            that.setData({
              wsy: that.data.wsy.concat(sale[i])
            })
          }
          if (sale[i].status == 2) {
            //已使用
            that.setData({
              ysy: that.data.ysy.concat(sale[i])
            })
          }
          if (sale[i].end_time > now) {
            //获取当前时间戳
            that.setData({
              ysx: that.data.ysx.concat(sale[i])
            })
          }
        }
        var count1 = that.data.wsy.length
        var count2 = that.data.ysy.length
        var count3 = that.data.ysx.length
        that.setData({
          wsy: that.data.wsy,
          ysy: that.data.ysy,
          ysx: that.data.ysx,
          height1: 210 * count1,
          height2: 210 * count2,
          height3: 210 * count3,
        })
        console.log(that.data.wsy)
        var time = ''
        var a1 = ''
        var b1 = ''
        console.log(that.data.times)
        for (var i = 0; i < count1; i++) {
          var start_date = new Date(parseInt(that.data.wsy[i].start_time))
          var end_date = new Date(parseInt(that.data.wsy[i].end_time))
          that.setData({
            start: start_date.getFullYear() + '.' + (start_date.getMonth() + 1) + '.' + start_date.getDate(),
            end: end_date.getFullYear() + '.' + (end_date.getMonth() + 1) + '.' + end_date.getDate(),
          })
          that.setData({
            a1: that.data.start,
            b1: that.data.end,

          })
          that.setData({
            time: that.data.a1 + '-' + that.data.b1,
          })
          that.setData({
            times: that.data.times.concat({
              time: that.data.time
            })
          })

          //赋值与输出先后问题
          console.log(i + ':' + that.data.a1)
          console.log(i + ':' + that.data.b1)
          console.log(that.data.times)
        }
        console.log(that.data.times)
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
  /**     * 滑动切换tab     */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /**    * 点击tab切换    */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) { return false; }
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  goShopping: function () {
    wx.switchTab({
      url: '../company_shop/company_shop',
    })
  },
  toYhq: function () {
    wx.navigateTo({
      url: '../yhq/yhq',
    })
  },
})