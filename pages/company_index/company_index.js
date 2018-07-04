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
    page1: 2,
    page2: 2,
    page3: 2,
  },
  showInput: function () {

    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
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
    setTimeout(function () {
      wx.request({
        url: app.d.ceshiUrl + '/Api/BIndex/show_getmore',
        method: 'post',
        data: {
          user_id: app.d.userId,
          type: 'all',
          page: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          if (res.data.store_id) {
            wx.redirectTo({
              url: '../index/index?store_Id=' + res.data.store_id,
            })
          } else {
            var ad = res.data.ad;
            var ttype = res.data.type;
            var seller = res.data.place_store;
            var hotgood = res.data.bpro
            that.setData({
              banners: ad,
              tttype: ttype,
              sseller: seller,
              hotGoods: hotgood
            });
            that.setData({
              height: 176 * that.data.sseller.length,
            })
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                var long2 = res.longitude
                var la2 = res.latitude
                that.setData({
                  long2: long2,
                  la2: la2
                })
                app.globalData.latitude = res.latitude
                app.globalData.longitude = res.longitude
                console.log(app.globalData.latitude, app.globalData.longitude)

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
              },
              fail: function (e) {
                wx.showToast({
                  title: '网络异常！',
                  duration: 2000
                });
              },
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
            list: res.data.list
          })
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
    }, 1000);
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

getShopList:function(types,page){
  var that=this
  var page=page;
  var types=types;
//onLoad   this.getShopList(types,page)
//点击 滑动  this.getShopList(types,page)
//对currentTab进行判断
  wx.request({
    url: app.d.ceshiUrl + '/Api/BIndex/show_getmore',
    method: 'post',
    data: {
      page:page,
      type:types
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      //距离最近
      if (that.data.currentTab==0){
        var seller = res.data.place_store;
        var distance1 = []
        that.setData({
          sseller: seller,
          distance1: distance1
        });

        that.setData({
          height: 176 * that.data.sseller.length,
        })
        for (var i = 0; i < that.data.sseller.length; i++) {
          var la1 = parseFloat(that.data.sseller[i].latitude)
          var long1 = parseFloat(that.data.sseller[i].longitude)
          var rad1 = la1 * Math.PI / 180.0;
          var rad2 = that.data.la2 * Math.PI / 180.0;
          var a = rad1 - rad2;
          var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
          var r = 6378.137;
          var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
          that.setData({
            distance1: that.data.distance1.concat({ distance: distance.toFixed(1) })
          })
        }
        that.setData({
          page1: 2
        })
        //销量最高
      } else if (that.data.currentTab == 1) {
        var store1 = res.data.num_store;
        var distance2 = []
        that.setData({
          store1: store1,
          distance2: distance2
        });
        that.setData({
          height1: 176 * that.data.store1.length,
        })
        for (var i = 0; i < that.data.store1.length; i++) {
          var la1 = parseFloat(that.data.store1[i].latitude)
          var long1 = parseFloat(that.data.store1[i].longitude)
          var rad1 = la1 * Math.PI / 180.0;
          var rad2 = that.data.la2 * Math.PI / 180.0;
          var a = rad1 - rad2;
          var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
          var r = 6378.137;
          var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
          that.setData({
            distance2: that.data.distance2.concat({ distance: distance.toFixed(1) })
          })
        }
        that.setData({
          page2: 2
        })
        //评价最高
      } else if (that.data.currentTab == 2) {
        var store2 = res.data.grade_store;
        var distance3 = []
        that.setData({
          store2: store2,
          distance3: distance3
        });
        that.setData({
          height2: 176 * that.data.store2.length,
        })
        for (var i = 0; i < that.data.store2.length; i++) {
          var la1 = parseFloat(that.data.store2[i].latitude)
          var long1 = parseFloat(that.data.store2[i].longitude)
          var rad1 = la1 * Math.PI / 180.0;
          var rad2 = that.data.la2 * Math.PI / 180.0;
          var a = rad1 - rad2;
          var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
          var r = 6378.137;
          var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
          that.setData({
            distance3: that.data.distance3.concat({ distance: distance.toFixed(1) })
          })
        }
        that.setData({
          page3: 2
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

onShow:function(){
  app.globalData.froms = 'company_user'
  console.log(app.globalData.froms)
},
  /**     * 滑动切换tab     */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (that.data.currentTab==0){
      this.getShopList('all', 1)
    } else if (that.data.currentTab == 1) {
      this.getShopList('num', 1)
    } else if (that.data.currentTab == 2) {
      this.getShopList('grade', 1)
    }

  },
  /**    * 点击tab切换    */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) { return false; }
    else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.currentTab == 0) {
      this.getShopList('all', 1)
    } else if (this.data.currentTab == 1) {
      this.getShopList('num', 1)
    } else if (this.data.currentTab == 2) {
      this.getShopList('grade', 1)
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
        types:'place',
        page1:this.data.page1
      })

    }else if(this.data.currentTab==1){
      this.setData({
        types: 'num',
        page2: this.data.page2
      })

    }else{
      this.setData({
        types: 'grade',
        page3: this.data.page3
      })
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/show_getmore',
      method: 'post',
      data: {
        page: (that.data.currentTab == 0 ? that.data.page1 : (that.data.currentTab == 1 ? that.data.page2 : that.data.page3)),
        type:that.data.types
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var place_store = res.data.place_store;
        var num_store = res.data.num_store;
        var grade_store = res.data.grade_store;
        if (place_store == '' || num_store == '' || grade_store=='') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        } else if (that.data.currentTab==0){
          that.setData({
            page1: that.data.page1 + 1,
            sseller: that.data.sseller.concat(place_store)
          });
          for (var i = 0; i < place_store.length; i++) {
            var la1 = parseFloat(place_store[i].latitude)
            var long1 = parseFloat(place_store[i].longitude)
            var rad1 = la1 * Math.PI / 180.0;
            var rad2 = that.data.la2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
            var r = 6378.137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
            console.log(distance)
            that.setData({
              distance1: that.data.distance1.concat({ distance: distance.toFixed(1) })
            })
          }
          that.setData({
            height: 176 * that.data.sseller.length,
          })
        } else if (that.data.currentTab == 1) {
          that.setData({
            page2: that.data.page2 + 1,
            store1: that.data.store1.concat(num_store)
          });
          that.setData({
            height1: 176 * that.data.store1.length,
          })
          for (var i = 0; i < num_store.length; i++) {
            var la1 = parseFloat(num_store[i].latitude)
            var long1 = parseFloat(num_store[i].longitude)
            var rad1 = la1 * Math.PI / 180.0;
            var rad2 = that.data.la2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
            var r = 6378.137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
            that.setData({
              distance2: that.data.distance2.concat({ distance: distance.toFixed(1) })
            })
          }
        } else if (that.data.currentTab == 2) {
          that.setData({
            page3: that.data.page3 + 1,
            store2: that.data.store2.concat(grade_store)
          });
          that.setData({
            height2: 176 * that.data.store2.length,
          })
          for (var i = 0; i < grade_store.length; i++) {
            var la1 = parseFloat(grade_store[i].latitude)
            var long1 = parseFloat(grade_store[i].longitude)
            var rad1 = la1 * Math.PI / 180.0;
            var rad2 = that.data.la2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
            var r = 6378.137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
            that.setData({
              distance3: that.data.distance3.concat({ distance: distance.toFixed(1) })
            })
          }
        }

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
      phoneNumber: '13146666946',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
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
