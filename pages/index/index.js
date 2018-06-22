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
    store_Id:'',
    gz:false
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

  showInput: function () {
    wx.navigateTo({
      url: '../searchPageShop/searchPageShop',
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
    if (options.store_Id){
      console.log(options.store_Id)
    }
    
    app.editTabBar2();
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/index',
      method: 'post',
      data: {
        store_Id: (app.d.store_Id ? app.d.store_Id : options.store_Id),
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
        that.setData({
          imgUrls: ggtop,
          proCat: procat,
          productData: prolist,
          brand: brand,
          course: course,
          store:store
        });
        if (store!='null'){
          wx.setNavigationBarTitle({ title: store.name, })
        }

      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    this.loadCollect()
  },
  loadCollect: function () {
    var that = this
    wx.request({
      url: app.d.hostUrl + '/Api/BCollet/show',
      method: 'post',
      data: {
        user_id: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.cl_store)
        for (var i = 0; i < res.data.cl_store.length;i++){
          if (app.d.store_Id == res.data.cl_store[i].store_id) {
            that.setData({
              gz: true
            })
            break
          }
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
  gzsj:function(){
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '请先登录',
        content: '登录获取更多信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../user/user',
            })
          }
        }
      })
    } else {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shangchang/shop_collect',
      method: 'post',
      data: {
        store_id: app.d.store_Id,
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.succ,
          duration: 2000
        });
        that.loadCollect() 
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
  onShow:function(){
    app.globalData.froms = 'user'
    console.log(app.globalData.froms)
  },
  onShareAppMessage: function () {
    return {
      title: '' + this.data.store.name,
      path: '/pages/index/index?store_Id=' + app.d.store_Id,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  toPosition:function(){
    //获取当前坐标   结合店铺坐标
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: la1,//
          longitude: long1,//
        })
      }
    })
  }
});