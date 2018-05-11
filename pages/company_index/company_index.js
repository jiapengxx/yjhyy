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
    host:app.d.hostImg,
    hotGoods:[],
    distance1: [],
    distance2: [],
    distance3: [],
    page: 2,
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
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/show',
      method: 'post',
      data: {
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ad = res.data.ad;
        var ttype  = res.data.type;
        var seller = res.data.store;
        var store1 = res.data.store1;
        var store2 =  res.data.store2;
        var hotgood=  res.data.bpro
        that.setData({  
          banners: ad,
          tttype: ttype,
          sseller:seller,
          store1:store1,
          store2:store2, 
          hotGoods:hotgood       
        });
        that.setData({
          height: 176 * that.data.sseller.length,
          height1: 176 * that.data.store1.length,
          height2: 176 * that.data.store2.length,
        })
        //long1为商家经度 la1为商家纬度
        wx.getLocation({
          success: function (res) {
            var long2 = res.longitude
            var la2 = res.latitude
            console.log(long2,la2)
            //对附近商家进行处理
            for (var i = 0; i < that.data.sseller.length; i++) {
              var la1 = parseFloat(that.data.sseller[i].latitude)
              var long1 = parseFloat(that.data.sseller[i].longitude)
              var rad1 = la1 * Math.PI / 180.0;
              var rad2 = la2 * Math.PI / 180.0;
              var a = rad1 - rad2;
              var b = long1 * Math.PI / 180.0 - long2 * Math.PI / 180.0;
              var r = 6378.137;
              var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
              that.setData({
                distance1: that.data.distance1.concat({ distance: distance.toFixed(1) })
              })
            }
            //对销量商家进行处理
            for (var i = 0; i < that.data.store1.length; i++) {
              var la1 = parseFloat(that.data.store1[i].latitude)
              var long1 = parseFloat(that.data.store1[i].longitude)
              var rad1 = la1 * Math.PI / 180.0;
              var rad2 = la2 * Math.PI / 180.0;
              var a = rad1 - rad2;
              var b = long1 * Math.PI / 180.0 - long2 * Math.PI / 180.0;
              var r = 6378.137;
              var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
              that.setData({
                distance2: that.data.distance2.concat({ distance: distance.toFixed(1) })
              })
            }
            //对评价商家进行处理
            for (var i = 0; i < that.data.store2.length; i++) {
              var la1 = parseFloat(that.data.store2[i].latitude)
              var long1 = parseFloat(that.data.store2[i].longitude)
              var rad1 = la1 * Math.PI / 180.0;
              var rad2 = la2 * Math.PI / 180.0;
              var a = rad1 - rad2;
              var b = long1 * Math.PI / 180.0 - long2 * Math.PI / 180.0;
              var r = 6378.137;
              var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
              that.setData({
                distance3: that.data.distance3.concat({ distance: distance.toFixed(1) })
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
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })

    wx.request({
      url: app.d.ceshiUrl + '/Api/News/list',
      method: 'post',
      data: {
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          list:res.data.list
        })
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
  toJrkb:function(){
    wx.navigateTo({
      url: '../jrkb/jrkb',
    })
  },
  toNewsDetail:function(e){
    var news_id=e.target.id
    wx.navigateTo({
      url: '../newsDetail/newsDetail?news_id=' + news_id,
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
    var id = e.target.id
    if (id == 0) {
      this.setData({
        url: '../live/live'
      })
    } else if (id == 1) {
      this.setData({
        url: '../jkbk/jkbk'
      })
    } else if (id == 2) {
      this.setData({
        url: '../jkbg/jkbg'
      })
    } else if (id == 3) {
      this.setData({
        url: '../jkzx/jkzx'
      })
    } else {
      this.setData({
        url: '../fxgl/fxgl'
      })
    }
    wx.navigateTo({
      url: this.data.url,
    })
  },
  toBtoC: function (e) {
    var store_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?store_Id=' + store_Id,
    })
    app.d.store_Id = store_Id;
    // console.log(store_Id)
  },
  toGoodsDetail:function(e){
    var pro_id=e.target.id
wx.navigateTo({
  url: '../product/detail?pro_id=' + pro_id,
})
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    if(this.data.currentTab==0){
      this.setData({
        types:'距离最近'
      })
    }else if(this.data.currentTab==1){
      this.setData({
        types: '销量最高'
      })
    }else{
      this.setData({
        types: '评价最高'
      })
    }
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getlist',
      method: 'post',
      data: {
        page: page,
        type:that.data.types
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var prolist = res.data.prolist;
        if (prolist == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        }
        that.setData({
          page: page + 1,
          //page具有持续性  每个类型需有自己的page
          productData: that.data.productData.concat(prolist)
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
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
