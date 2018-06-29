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
    start1: 0,
    end1: 0,
    times1: [], 
    start2: 0,
    end2: 0,
    times2: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log(sale)
        // types 1未使用 2已使用  time>now 未过期  time<now 已过期
        for (var i = 0; i < sale.length; i++) {
          if (sale[i].status == 2) {
            that.setData({
              ysy: that.data.ysy.concat(sale[i])
            })
          }
          if (sale[i].status == 1 && sale[i].end_time < now) {
            that.setData({
              ysx: that.data.ysx.concat(sale[i])
            })
          }
          if (sale[i].status == 1 && sale[i].end_time >=now) {
            that.setData({
              wsy: that.data.wsy.concat(sale[i])
            })
          }
        }
        console.log(that.data.wsy)
        console.log(that.data.ysy)
        console.log(that.data.ysx)
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

        var time1 = ''
        var a11 = ''
        var b11 = ''
        var time2 = ''
        var a12 = ''
        var b12 = ''
        console.log(that.data.times)
        for (var i = 0; i < count1; i++) {
          //未使用时间处理
          var start_date = new Date(that.data.wsy[i].start_time*1000)
          var end_date = new Date(that.data.wsy[i].end_time*1000)
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
        }
        for (var i = 0; i < count2; i++) {
          //已使用时间处理
          var start_date1 = new Date(that.data.ysy[i].start_time) * 1000
          var end_date1 = new Date(that.data.ysy[i].end_time * 1000)
          that.setData({
            start1: start_date1.getFullYear() + '.' + (start_date1.getMonth() + 1) + '.' + start_date1.getDate(),
            end1: end_date1.getFullYear() + '.' + (end_date1.getMonth() + 1) + '.' + end_date1.getDate(),
          })
          that.setData({
            a11: that.data.start1,
            b11: that.data.end1,
          })
          that.setData({
            time1: that.data.a11 + '-' + that.data.b11,
          })
          that.setData({
            times1: that.data.times1.concat({
              time1: that.data.time1
            }),
          })
        }
        for (var i = 0; i < count3; i++) {
          //已失效时间处理
          var start_date2 = new Date(that.data.ysx[i].start_time * 1000)
          var end_date2 = new Date(that.data.ysx[i].end_time* 1000)
          that.setData({
            start2: start_date2.getFullYear() + '.' + (start_date2.getMonth() + 1) + '.' + start_date2.getDate(),
            end2: end_date2.getFullYear() + '.' + (end_date2.getMonth() + 1) + '.' + end_date2.getDate(),
          })
          that.setData({
            a12: that.data.start2,
            b12: that.data.end2,
          })
          that.setData({
            time2: that.data.a12 + '-' + that.data.b12,
          })
          that.setData({
            times2: that.data.times2.concat({
              time2: that.data.time2
            })
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    this.initSystemInfo()
  },
  initSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
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
  /**     * 滑动切换tab     */
  bindChange: function (e) {
    console.log(e)
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