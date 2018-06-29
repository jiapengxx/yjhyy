var app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: true,
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    prolist: [],
    scrollTop: "0",
    loadingMoreHidden: true,
    hasNoCoupons: true,
    coupons: [],
    searchInput: '',
    page:2,
    distance1:[],
    host: app.d.hostImg
  },
  getGoodsList: function () {

    var that = this;
    wx.request({
      url: app.d.hostUrl + '/Api/Search/store_search',
      data: {
        
        store_id: app.d.store_Id,
        keyword: that.data.searchInput,
        uid: app.d.userId
      },
      success: function (res) {    
        if (res.data.prolist.length!=0){
          that.setData({
            prolist: res.data.prolist,
            loadingMoreHidden: true,
            loadingHidden: true,
          });
        }else{
          that.setData({
            loadingMoreHidden: false,
            loadingHidden: false,
          });
        }
        console.log(that.data.prolist)
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
    var goods_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../product/detail?pro_id=' + goods_Id,
    })
    console.log(e)
  },
  listenerSearchInput: function (e) {
    this.setData({

        searchInput: e.detail.value
    })
  },
  toSearch: function () {
    this.getGoodsList();
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/store_search',
      method: 'post',
      data: {
        page: page,
        store_id: app.d.store_Id,
        keyword: that.data.searchInput,
        uid: app.d.userId
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
          prolist: that.data.prolist.concat(prolist)
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
  showInput: function () {
    var prolist = []
    this.setData({
      loadingMoreHidden: false,
      loadingHidden: true,
      prolist: prolist,
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
});