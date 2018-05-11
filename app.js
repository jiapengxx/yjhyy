// app.js
App({
  d: {
    hostUrl: 'https://tanghuzhao.com.cn/index.php',
    // hostUrl: 'http://www.xshoph.com/index.php',
    hostImg: 'https://tanghuzhao.com.cn',
    hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    userId: 0,
    appId: "",
    appKey: "",
    // ceshiUrl: 'http://www.xshoph.com/index.php',
    ceshiUrl: 'https://tanghuzhao.com.cn/index.php',
  },
  position: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.d.latitude = latitude;
        that.d.longitude = longitude;
      }
    })
  },
  uploadimg: function (data) {
      var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: {
        code_one: data.data.code_one,
        code: data.data.code,
        self_name: data.data.self_name,
        card_id: data.data.card_id,
        tel_id: data.data.tel_id,
        user: data.data.user,
        pwd: data.data.pwd,
        city: data.data.city,
        quyu:data.data.quyu,
        sheng:data.data.sheng,
        code: data.data.code,
        place_desc: data.data.place_desc,
        introduce: data.data.introduce,
        urli:i,
        p_desc:data.data.p_desc,
        uid:data.data.uid,
        pid: data.data.pid,
        num: data.data.num,
        logistic_grade: data.data.logistic_grade,
        store_grade: data.data.store_grade,
        content: data.data.content,
        is_name: data.data.is_name,
        order_id: data.data.order_id,
        type_id:data.data.type_id
      },
      //这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)

        setTimeout(function () {
          wx.showModal({
            title: '提交成功',
            content: '即将跳转到用户中心',
            showCancel: false,
            success: function () {
              wx.switchTab({
                url: '../company_user/company_user',
              })
            }
          })

        }
          , 2000)



        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  onLaunch: function () {
    this.position();
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    //login
    this.getUserInfo();
     
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          //get wx user simple info
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo);
              //get user sessionKey
              //get sessionKey
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
      url: that.d.ceshiUrl + '/Api/Login/getsessionkey',
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
        that.globalData.userInfo['sessionId'] = data.session_key;
        that.globalData.userInfo['openid'] = data.openid;
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
    var user = that.globalData.userInfo;
    wx.request({
      url: that.d.ceshiUrl + '/Api/Login/authlogin',
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
        that.globalData.userInfo['id'] = data.ID;
        that.globalData.userInfo['NickName'] = data.NickName;
        that.globalData.userInfo['HeadUrl'] = data.HeadUrl;
        var userId = data.ID;
        if (!userId) {
          wx.showToast({
            title: '登录失败！',
            duration: 3000
          });
          return false;
        }
        that.d.userId = userId;
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:authlogin',
          duration: 2000
        });
      },
    });
  },
  getOrBindTelPhone: function (returnUrl) {
    var user = this.globalData.userInfo;
    if (!user.tel) {
      wx.navigateTo({
        url: 'pages/binding/binding'
      });
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  //第一种状态的底部  
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种状态的底部  
  editTabBar2:function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    userInfo: null,
    tabBar: {
      "color": "#858585",
      "selectedColor": "#008842",
      "borderStyle": "whitesmoke",
      "backgroundColor": "#ffffff",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_01.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_07.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/category/index",
          "text": "分类",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_03.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_08.png",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/cart/cart",
          "text": "购物车",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_05.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_09.png",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "pages/user/user",
          "text": "我的",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_06.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_10.png",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBar2: {
      "color": "#858585",
      "selectedColor": "#008842",
      "borderStyle": "whitesmoke",
      "backgroundColor": "#ffffff",

      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_01.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_07.png",
          "clas": "menu-item2",
          active: true
        },
        {
          "pagePath": "/pages/category/index",
          "text": "分类",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_03.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_08.png",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/cart/cart",
          "text": "购物车",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_05.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_09.png",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/user/user",
          "text": "我的",
          "iconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_06.png",
          "selectedIconPath": "https://tanghuzhao.com.cn/Public/images/icons/btn-tabs_10.png",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    },
    subDomain: "tz", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "1.8.1",
    shareProfile: '百款精品商品，总有一款适合您'
  }
   //可以修改服务器路径获取到页面信息
  
});





