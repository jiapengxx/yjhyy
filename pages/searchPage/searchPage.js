var app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: "0",
    loadingMoreHidden: true,
    hasNoCoupons: true,
    coupons: [],
    searchInput: '',
    distance1:[],
    host: app.d.hostImg
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    console.log(categoryId)
    var that = this;
    wx.request({
      url: app.d.hostUrl + '/Api/Search/search_do',
      // url: 'https://tanghuzhao.com.cn/' + app.globalData.subDomain + '/shop/goods/list',
      //服务器路径 
      data: {
        // categoryId: categoryId,
        keyword: that.data.searchInput,
        uid: app.d.userId
      },
      success: function (res) {    
        var Goods = res.data.search_store;
        that.setData({
          goods:Goods,
          loadingMoreHidden: true
        });
        console.log(that.data.goods)
        //long1为商家经度 la1为商家纬度
        wx.getLocation({
          success: function (res) {
            var long2 = res.longitude
            var la2 = res.latitude
            console.log(long2, la2)
            for (var i = 0; i < that.data.goods.length; i++) {
              var la1 = parseFloat(that.data.goods[i].latitude)
              var long1 = parseFloat(that.data.goods[i].longitude)
              var rad1 = la1 * Math.PI / 180.0;
              var rad2 = la2 * Math.PI / 180.0;
              var a = rad1 - rad2;
              var b = long1 * Math.PI / 180.0 - long2 * Math.PI / 180.0;
              var r = 6378.137;
              var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b/ 2),2)))
              console.log(typeof(distance))
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

        var goods = [];
        if (res.data.code != 0 || res.data.data.length == 0) {
          that.setData({
            loadingMoreHidden: false,
          });
          return;
        }
        for (var i = 0; i < res.data.data.length; i++) {
          goods.push(res.data.data[i]);
        }
        that.setData({
          goods: goods,
        });
      }
    })
      
  },
  toBtoC: function (e) {
    var store_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?store_Id=' + store_Id,
    })
    console.log(store_Id)
  },
  toGoodsDetail: function (e) {
    var goods_Id = e.target.id;
    wx.navigateTo({
      url: '../product/detail?goods_Id=' + goods_Id,
    })
    console.log(goods_Id)
  },
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },
  toSearch: function () {
    this.getGoodsList(this.data.activeCategoryId);
  },
  showInput: function () {
    var Goods = []
    this.setData({
      goods: Goods,
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});