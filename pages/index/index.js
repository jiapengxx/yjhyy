var app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    productData: [],
    proCat: [],
    page: 2,
    index: 2,
    brand: [],
    // 滑动
    imgUrl: [],
    kbs: [],
    lastcat: [],
    course: [],
    store_Id:''
  },
  //跳转商品列表页   
  listdetail: function (e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../listdetail/listdetail?title=' + e.currentTarget.dataset.title,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //跳转商品搜索页  
  suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //后四个分类跳转
  other: function (e) {
    var ptype = e.currentTarget.dataset.ptype;
    var title = e.currentTarget.dataset.text;
    if (ptype == 'news') {
      wx.navigateTo({
        url: '../inf/inf'
      });
    } else if (ptype == 'jxys') {
      wx.navigateTo({
        url: '../synopsis/synopsis?title=教学优势&wedId=2'
      });
    } else if (ptype == 'xyfc') {
      wx.navigateTo({
        url: '../student_style/student_style'
      });
    } else if (ptype == 'gywm') {
      wx.navigateTo({
        url: '../synopsis/synopsis?title=关于我们&wedId=1'
      });
    }
  },

  //品牌街跳转商家详情页
  jj: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../listdetail/listdetail?brandId=' + id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  tian: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../works/works',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getlist',
      method: 'post',
      data: { 
        page: page,
        store_id:app.d.store_Id,
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
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          productData: that.data.productData.concat(prolist)
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (options) {
    app.editTabBar2();
    var that = this;
    console.log(that.data.tabBar.list)
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/index',
      method: 'post',
      data: {
        store_Id: app.d.store_Id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ggtop = res.data.ggtop;
        var procat = res.data.procat;
        var prolist = res.data.prolist;
        var brand = res.data.brand;
        var course = res.data.course;
        var store = res.data.store;
        console.log(store);
        //that.initProductData(data);
        that.setData({
          imgUrls: ggtop,
          proCat: procat,
          productData: prolist,
          brand: brand,
          course: course,
        });
        wx.setNavigationBarTitle({ title:store.name,})
        console.log(store);
        console.log(that.data.productData);
        console.log(that.data.imgUrls)
        console.log(app.d.store_Id)
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
   
  },
  fiveBlocks:function(e){
    var Id=e.target.id
    if(Id==1){
      wx.navigateTo({
        url: '../live/live',
      })
    } else if (Id == 2){
      wx.navigateTo({
        url: '',
      })
    } else if (Id == 3) {
      wx.navigateTo({
        url: '',
      })
    } else if (Id == 4) {
      wx.navigateTo({
        url: '',
      })
    } else if (Id == 5) {
      wx.navigateTo({
        url: '',
      })
    }
   

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



});