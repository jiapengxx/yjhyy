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
   place_store1:[], 
   num_store1:[],
   comment_store1:[],
   host:app.d.hostImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/seller_show',
      method: 'post',
      data: {
        current: 1,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var seller = res.data.seller;
        var place_store = res.data.place_store;
        var num_store = res.data.num_store;
        var comment_store=res.data.comment_store
        // console.log(seller);
        //that.initProductData(data);
        that.setData({
          hot_good: seller,
          place_store1: place_store,
          num_store1: num_store,
          comment_store1: comment_store
          
        });
        that.setData({
          height: 582 * that.data.hot_good.length,
        });

        console.log(that.data.hot_good)
        console.log(that.data.place_store1)
        console.log(that.data.num_store1)
        console.log(that.data.comment_store1)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    // this.setData({
    //   height: 582 * this.data.hot_good.length
    // })

    //long1为商家经度 la1为商家纬度
    var long1 = 116.44354;
    var la1 = 39.9218;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var long2 = res.longitude;
        var la2 = res.latitude;
        console.log(long1, la1)
        console.log(long2, la2)
        that.setData({
          long1: long1,
          long2: long2,
          la1: la1,
          la2: la2
        })
        var rad1 = la1 * Math.PI / 180.0;
        var rad2 = la2 * Math.PI / 180.0;
        var a = la1 * Math.PI / 180.0 - la2 * Math.PI / 180.0;
        var b = long1 * Math.PI / 180.0 - long2 * Math.PI / 180.0;
        var r = 6378137;
        var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
        that.setData({
          distance: distance
        })
      },
    })


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
  toBtoC:function(e){
    var store_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?store_Id='+store_Id,
    })
    app.d.store_Id = store_Id;
    console.log(store_Id)
  },
  callPhone: function () {
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
  getPosition: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: 40.0164199815,
          longitude: 116.4756077528,
          address: '北京市朝阳区时代凌宇大厦容创路17号(容创路与创达二路交叉口)',
        })
      }
    })
  },
  toGoodsDetail:function(e){
    var pro_id=e.target.id;
    wx.navigateTo({
      url: '../product/detail?pro_id=' + pro_id,
    }) 
    console.log(pro_id)
  }
})