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
    hot_good: [],
    place_store1: [],
    num_store1: [],
    comment_store1: [],
    host: app.d.hostImg,
    distance1: [],
    distance2: [],
    distance3: [],
    distance4: [],
    page1: 2,
    page2: 2,
    page3: 2,
    page4: 2,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
        this.setData({
          long2: app.globalData.longitude,
          la2: app.globalData.latitude
        })
    this.getShopList('all', 1)
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
  /**     * 滑动切换tab     */
  bindChange: function (e) {
    var that = this;
    this.setData({
      currentTab: e.detail.current
    });
    if (this.data.currentTab == 0) {
      this.getShopList('all', 1)
    } else if (this.data.currentTab == 1) {
      this.getShopList('place', 1)
    } else if (this.data.currentTab == 2) {
      this.getShopList('num', 1)
    } else if (this.data.currentTab == 3) {
      this.getShopList('comment', 1)
    }

  },
  /**    * 点击tab切换    */
  //点击切换触发两次
  swichNav: function (e) {
    var that = this;
    this.setData({
      currentTab: e.target.dataset.current
    })
    if (this.data.currentTab == 0) {
      this.getShopList('all', 1)
    } else if (this.data.currentTab == 1) {
      this.getShopList('place', 1)
    } else if (this.data.currentTab == 2) {
      this.getShopList('num', 1)
    } else if (this.data.currentTab == 3) {
      this.getShopList('comment', 1)
    }
  },
  getShopList: function (types, page) {
    var that = this
    var page = page;
    var types = types;
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/seller_show1',
      method: 'post',
      data: {
        page: page,
        type: types
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //综合
        if (that.data.currentTab == 0) {
          var hot_good = res.data.seller;
          var distance1 = []
          that.setData({
            hot_good: hot_good,
            distance1: distance1
          });
          that.setData({
            height1: 582 * that.data.hot_good.length + 140,

          })
          for (var i = 0; i < that.data.hot_good.length; i++) {
            var la1 = parseFloat(that.data.hot_good[i].latitude)
            var long1 = parseFloat(that.data.hot_good[i].longitude)
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
        }
        //距离最近
        if (that.data.currentTab == 1) {
          var place_store1 = res.data.place_store;
          var distance2 = []
          that.setData({
            place_store1: place_store1,
            distance2: distance2
          });
          that.setData({
            height2: 582 * that.data.place_store1.length + 140,

          })
          for (var i = 0; i < that.data.place_store1.length; i++) {
            var la1 = parseFloat(that.data.place_store1[i].latitude)
            var long1 = parseFloat(that.data.place_store1[i].longitude)
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
          //销量最高
        } else if (that.data.currentTab == 2) {
          var num_store1 = res.data.num_store;
          var distance3 = []
          that.setData({
            num_store1: num_store1,
            distance3: distance3
          });
          that.setData({
            height3: 582 * that.data.num_store1.length + 140,

          })
          for (var i = 0; i < that.data.num_store1.length; i++) {
            var la1 = parseFloat(that.data.num_store1[i].latitude)
            var long1 = parseFloat(that.data.num_store1[i].longitude)
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
          //评价最高
        } else if (that.data.currentTab == 3) {
          var comment_store1 = res.data.comment_store;
          var distance4 = []
          that.setData({
            comment_store1: comment_store1,
            distance4: distance4
          });
          that.setData({
            height4: 582 * that.data.comment_store1.length + 140,
          })
          for (var i = 0; i < that.data.comment_store1.length; i++) {
            var la1 = parseFloat(that.data.comment_store1[i].latitude)
            var long1 = parseFloat(that.data.comment_store1[i].longitude)
            var rad1 = la1 * Math.PI / 180.0;
            var rad2 = that.data.la2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
            var r = 6378.137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
            that.setData({
              distance4: that.data.distance4.concat({ distance: distance.toFixed(1) })
            })
          }
          that.setData({
            page4: 2
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
  countDistance: function () {
    //传入 目标经纬度  数组长度  目标数组
    //
  },
  toBtoC: function (e) {
    var store_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?store_Id=' + store_Id,
    })
    app.d.store_Id = store_Id;
  },
  callPhone: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.tel){
      wx.makePhoneCall({
        phoneNumber: '' + e.currentTarget.dataset.tel,
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    }else{
      wx.showToast({
        title: '商家未设置联系方式',
        icon: 'none',
      })
    }

  },
  getPosition: function (e) {
    var that = this
    var storeId = e.target.id
    //对综合商家进行处理
    if (that.data.currentTab == 0) {
      for (var i = 0; i < that.data.hot_good.length; i++) {
        if (that.data.hot_good[i].store_id == storeId) {
          var la1 = parseFloat(that.data.hot_good[i].latitude)
          var long1 = parseFloat(that.data.hot_good[i].longitude)
          break
        }
      }
    }
    //对附近商家进行处理
    if (that.data.currentTab == 1) {
      for (var i = 0; i < that.data.place_store1.length; i++) {
        if (that.data.place_store1[i].store_id == storeId) {
          var la1 = parseFloat(that.data.place_store1[i].latitude)
          var long1 = parseFloat(that.data.place_store1[i].longitude)
          break
        }
      }
    }
    //对销量商家进行处理
    if (that.data.currentTab == 2) {
      for (var i = 0; i < that.data.num_store1.length; i++) {
        if (that.data.num_store1[i].store_id == storeId) {
          var la1 = parseFloat(that.data.num_store1[i].latitude)
          var long1 = parseFloat(that.data.num_store1[i].longitude)
          break
        }
      }
    }
    //对评价商家进行处理
    if (that.data.currentTab == 3) {
      for (var i = 0; i < that.data.comment_store1.length; i++) {
        if (that.data.comment_store1[i].store_id == storeId) {
          var la1 = parseFloat(that.data.comment_store1[i].latitude)
          var long1 = parseFloat(that.data.comment_store1[i].longitude)
          break
        }
      }
    }
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: la1,
          longitude: long1,
        })
      }
    })
  },
  toGoodsDetail: function (e) {
    var pro_id = e.currentTarget.id;
    wx.navigateTo({
      url: '../product/detail?pro_id=' + pro_id,
    })
    console.log(pro_id)
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    if (this.data.currentTab == 0) {
      this.setData({
        types: 'all',
        page1: this.data.page1
      })

    }
    else if (this.data.currentTab == 1) {
      this.setData({
        types: 'place',
        page2: this.data.page2
      })

    } else if (this.data.currentTab == 2) {
      this.setData({
        types: 'num',
        page3: this.data.page3
      })
    } else {
      this.setData({
        types: 'comment',
        page4: this.data.page4
      })
    }

    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/seller_show1',
      method: 'post',
      data: {
        page: (that.data.currentTab == 0 ? that.data.page1 : (that.data.currentTab == 1 ? that.data.page2 : (that.data.currentTab == 2 ? that.data.page3 : that.data.page4))),
        type: that.data.types
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var seller = res.data.seller;
        var place_store = res.data.place_store;
        var num_store = res.data.num_store;
        var comment_store = res.data.comment_store;
        if (seller == '' || place_store == '' || num_store == '' || comment_store == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        } else if (that.data.currentTab == 0) {
          that.setData({
            page1: that.data.page1 + 1,
            hot_good: that.data.hot_good.concat(seller)
          });
          for (var i = 0; i < seller.length; i++) {
            var la1 = parseFloat(seller[i].latitude)
            var long1 = parseFloat(seller[i].longitude)
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
            height1: 582 * that.data.hot_good.length + 140
          })
        } else if (that.data.currentTab == 1) {
          that.setData({
            page2: that.data.page2 + 1,
            place_store1: that.data.place_store1.concat(place_store)
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
              distance2: that.data.distance2.concat({ distance: distance.toFixed(1) })
            })
          }
          that.setData({
            height2: 582 * that.data.place_store1.length + 140
          })
        } else if (that.data.currentTab == 2) {
          that.setData({
            page3: that.data.page3 + 1,
            num_store1: that.data.num_store1.concat(num_store)
          });
          that.setData({

            height3: 582 * that.data.num_store1.length + 140,

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
              distance3: that.data.distance3.concat({ distance: distance.toFixed(1) })
            })
          }
        } else if (that.data.currentTab == 3) {
          that.setData({
            page4: that.data.page4 + 1,
            comment_store1: that.data.comment_store1.concat(comment_store)
          });
          that.setData({
            height4: 582 * that.data.comment_store1.length + 140,
          })
          for (var i = 0; i < comment_store.length; i++) {
            var la1 = parseFloat(comment_store[i].latitude)
            var long1 = parseFloat(comment_store[i].longitude)
            var rad1 = la1 * Math.PI / 180.0;
            var rad2 = that.data.la2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = long1 * Math.PI / 180.0 - that.data.long2 * Math.PI / 180.0;
            var r = 6378.137;
            var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
            that.setData({
              distance4: that.data.distance4.concat({ distance: distance.toFixed(1) })
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
})