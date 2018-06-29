// pages/tjyhk/tjyhk.js
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
  name: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '姓名不能为空！',
        icon: 'loading'
      })
      this.setData({
        num1: 0
      })
    } else {
      this.setData({
        num1: 1
      })
    }
  },
  tel: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'loading'
      })
      this.setData({
        num4: 0
      })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: '手机号格式不正确！',
        icon: 'loading'
      })
      this.setData({
        num4: 0
      })
    } else {
      this.setData({
        num4: 1
      })
    }
  },
  bankId:function(e){
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '银行卡号不能为空！',
        icon: 'loading'
      })
      this.setData({
        num3: 0
      })
    } else if (!/^\d{19}$/.test(e.detail.value)) {
      wx.showToast({
        title: '银行卡号长度或格式错误！',
        icon: 'loading'
      })
      this.setData({
        num3: 0
      })
    }
    else {
      this.setData({
        num3: 1
      })
    }
  },
  Id: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '身份证不能为空！',
        icon: 'loading'
      })
      this.setData({
        num2: 0
      })
    } else if (!/^\d{17}(\d|X|x)$/.test(e.detail.value)) {
      wx.showToast({
        title: '身份证长度或格式错误！',
        icon: 'loading'
      })
      this.setData({
        num2: 0
      })
    }
    else {
      this.setData({
        num2: 1
      })
    }
  },
  formSubmit:function(e){
    var that = this;
    var counts = this.data.num1 + this.data.num2 + this.data.num3 + this.data.num4 
    if (counts == 4) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      wx.request({
        url: app.d.ceshiUrl + '/Api/User/bank_code',
        method: 'post',
        data: {
          idcard: e.detail.value.Id,
          realname: e.detail.value.name,
          cardnum: e.detail.value.bankId,
          tel: e.detail.value.tel
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function () {
          wx.navigateTo({
            url: '../sjhyz/sjhyz',
          })
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
    } else {
      wx.showToast({
        title: '请将信息填充完整！',
        icon: 'loading'
      })
    }
  },
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