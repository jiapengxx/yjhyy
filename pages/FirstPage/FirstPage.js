// pages/FirstPage/FirstPage.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bt:false
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    setTimeout(function () {
    if (app.d.userId!=0){
      wx.showToast({
        title: '加载中,请稍后',
        icon:'loading',
      })
      setTimeout(function () {
          that.getStore_Id()
      }, 1000)
    }else{
      that.setData({
        bt:true
      })
    }
    },1200)
 
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           that.setData({
    //             userInfo:res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
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
  getStore_Id:function(){
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/init',
      method: 'post',
      data: {
        user_id: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.store_id) {
          wx.redirectTo({
            url: '../index/index?store_Id=' + res.data.store_id,
          })
        } else {
          wx.switchTab({
            url: '../company_index/company_index',
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    }); 
  },
  getUserInfo: function (cb) {
    var that = this
    if (app.globalData.userInfo){
      this.getStore_Id()
    }else{
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              that.getUserSessionKey(code);
            }
          });
        }
      });
    }
  },
  getUserSessionKey: function (code) {
    //用户的订单状态
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Login/getsessionkey',
      method: 'post',
      data: {
        code: code
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;
        if (data.status == 0) {
          wx.showToast({
            title: data.err,
            duration: 2000
          });
          return false;
        }
        app.globalData.userInfo['sessionId'] = data.session_key;
        app.globalData.userInfo['openid'] = data.openid;
        that.onLoginUser();
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:getsessionkeys',
          duration: 2000
        });
      },
    });
  },
  onLoginUser: function () {
    var that = this;
    var user = app.globalData.userInfo;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Login/authlogin',
      method: 'post',
      data: {
        SessionId: user.sessionId,
        gender: user.gender,
        NickName: user.nickName,
        HeadUrl: user.avatarUrl,
        openid: user.openid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data.arr;
        var status = res.data.status;
        if (status != 1) {
          wx.showToast({
            title: res.data.err,
            duration: 3000
          });
          return false;
        }
        app.globalData.userInfo['id'] = data.ID;
        app.globalData.userInfo['NickName'] = data.NickName;
        app.globalData.userInfo['HeadUrl'] = data.HeadUrl;
        var userId = data.ID;
        if (!userId) {
          wx.showToast({
            title: '登录失败！',
            duration: 3000
          });
          return false;
        }
        app.d.userId = userId;
        that.getStore_Id()
        that.setData({
          userInfo: app.globalData.userInfo,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },
})