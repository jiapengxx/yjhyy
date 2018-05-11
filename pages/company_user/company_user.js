// pages/user/user.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/iconfont-card.png',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '../../images/iconfont-icontuan.png',
      text: '我的拼团',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../images/iconfont-shouhuodizhi.png',
      text: '收货地址管理'
    }, {
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    }, {
      icon: '../../images/iconfont-help.png',
      text: '常见问题'
    }],
    loadingText: '加载中...',
    loadingHidden: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } 
  },
  getUserInfo: function (e) {
    console.log(app.globalData.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },

  onShow: function () {
    this.loadOrderStatus();
  },
  loadOrderStatus: function () {
    //获取用户订单数据
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/getorder',
      method: 'post',
      data: {
        userId: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var status = res.data.status;
        if (status == 1) {
          var orderInfo = res.data.orderInfo;
          that.setData({
            orderInfo: orderInfo
          });
        } else {
          wx.showToast({
            title: '非法操作.',
            duration: 2000
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '北京医佳户健康医疗中心',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})