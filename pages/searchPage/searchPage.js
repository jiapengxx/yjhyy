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
        console.log(that.data.goods)
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