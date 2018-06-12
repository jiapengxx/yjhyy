// pages/user/user.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    page:true,
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
  onLoad: function (option) {
    // if (option.DAta) {
    //   var u_id = option.DAta[0];
    //   this.setData({
    //     u_id: u_id,
    //     pro_id: option.DAta[1]
    //   })
    app.globalData.froms='company_user'
    if (option.DAta){
      var u_id = option.DAta[0];
      this.setData({
        u_id:u_id,
        pro_id: option.DAta[1]
      })
      console.log(option.DAta)
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        page:false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          page: false
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            page: false
          })
        }
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
      wx.login({
        success: function (res) {
          console.log(res)
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              app.globalData.userInfo = res.userInfo
              that.getUserSessionKey(code);
            }
          });
        }
      });
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
        // console.log("asdasd"+that.data.pro_id)
        // if (that.data.pro_id) {
        //   console.log("15615616516")
        //   wx.redirectTo({
        //     url: '../product/detail?pro_id=' + that.data.pro_id,
        //   })
        // }
         if(that.data.pro_id){
            wx.redirectTo({
              url: '../product/detail?pro_id='+that.data.pro_id,
            })
          }
        if (that.data.u_id){
          that.oneLogin(data.openid);
        }else{
          that.oneLogin(data.openid);
        }
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
  oneLogin: function (openid) {
    var openid= openid;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Login/oneLogin',
      method: 'post',
      data: {
       openid:openid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.status);
        console.log(openid + "bbbbbbbbbbb");
        //--init data        
        if(res.data.status==0){
          wx.showToast({
            title: res.data.err,
          });
          return false;
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:authlogin',
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

        that.setData({
          hasUserInfo: true,
          userInfo: app.globalData.userInfo,
          page: false
        })
        console.log(!that.data.hasUserInfo)
        console.log(that.data.canIUse)
        console.log(!that.data.hasUserInfo && that.data.canIUse)
        that.loadOrderStatus()
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:authlogin',
          duration: 2000
        });
      },
    });
  },

  onShow: function () {
    if (app.globalData.userInfo){
      this.loadOrderStatus();
    }

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
        var status = res.data.status;
        if (status == 1) {
          var orderInfo = res.data.orderInfo;
          that.setData({
            orderInfo: orderInfo
          });
        } 
        // else {
        //   wx.showToast({
        //     title: '非法操作.',
        //     duration: 2000
        //   });
        // }
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