const app = getApp()
var base64 = require("../../images/base64");
var WxSearch = require('../../wxSearch/wxSearch.js')
Page({
  data: {
    /**      * 页面配置      */
    winWidth: 0, winHeight: 0,
    // tab切换   
    height: 0,
    currentTab: 0,
    flag: false,
    inputShowed: false,
    inputVal: "",
    banners: [],
    tttype: [],
    sseller: [],
    store:[],
    store2:[],
    host:app.d.hostImg
    
  },
  showInput: function () {

    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
    // this.setData({
    //   inputShowed: true
    // });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {
    var that = this;
    console.log(app.d.latitude+"1111");
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/show',
      method: 'post',
      data: {
        latitude: app.d.latitude,
        longitude: app.d.longitude
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ad = res.data.ad;
        var ttype  = res.data.type;
        var seller = res.data.store;
        var store1 = res.data.store1;
        var store2 =  res.data.store2
        
        //that.initProductData(data);
        that.setData({  
          banners: ad,
          tttype: ttype,
          sseller: seller,
          store:store1,
          store2:store2,
          
        });
      console.log(app.d.latitude);
        that.setData({
          height: 176 * that.data.sseller.length,
        })
        
        // console.log(that.data.sseller);
        // console.log(that.data.store);
      //   console.log(ttype);
       // console.log(that.data.sseller);
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    this.setData({
      icon: base64.icon20,
    })

    /**     * 获取系统信息     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })

  },

  toLive: function () {
    wx.navigateTo({
      url: '../live/live',
    })
  },
  toYhq: function () {
    wx.navigateTo({
      url: '../yhq/yhq',
    })
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
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // tapBanner: function (e) {
  //   if (e.currentTarget.dataset.id != 0) {
  //     wx.navigateTo({
  //       url: "../" + (e.currentTarget.dataset.id == 1001 ? '' : '')
  //        预留商品详情
  //        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id   
  //     })
  //   }
  // },
  fiveBlocks: function (e) {
    var type_id = e.target.id
    wx.navigateTo({
      url: '../company_category/company_category?type_id=' + type_id,
    })
    
    console.log(type_id)
  },
  toBtoC: function (e) {
    var store_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?store_Id=' + store_Id,
    })
    app.d.store_Id = store_Id;
    // console.log(store_Id)
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '010-123456',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
})
