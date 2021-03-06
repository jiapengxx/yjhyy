// pages/fxgl/fxgl.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.d.hostImg
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
    if (options.height){
      this.setData({
        scrollTop: options.height
      })
    }
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
  onShareAppMessage: function (res) {
    //进入分享的入口   分享之后的效果

    // var DATA = '' + app.d.userId 
    // if (res.from === 'button') {
    //   return {
    //     title: '云康医护' ,
    //     path: '/pages/company_index/company_index?DATA=' + DATA,
    //     imageUrl: '',
    //     success: function (res) {
    //     },
    //     fail: function (res) {
    //     }
    //   }
    // }

    if (res.from === 'button') {
      return {
        title: '',
        path: '',
        imageUrl: '',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败 
        }
      }
    }

  }
})