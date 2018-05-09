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
    flag: true,
    host: app.d.hostImg,
    shoucang_good: [],
    gz_store: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCollect()
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
  changePoint: function (e) {
    var item_id = e.target.id
    //不用flag更快捷
    // this.setData({
    //   itemId: item_id,
    //   flag: false
    // })
    if (this.data.flag) {
      this.setData({
        itemId: item_id,
        flag: false
      })
    } 
    else {
      this.setData({
        itemId: 9999,
        flag: true
      })
    }
  }, 
  cancelSp:function(e){
    var that = this;
    var pro_id = e.target.id;
    console.log(pro_id)
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/BCollet/pro_save',
          method: 'post',
          data: {
            uid: app.d.userId,
            pro_id: pro_id,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            var data = res.data;
            if (data.status == 1) {
              that.loadCollect();
            } else {
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  cancel:function(e){
    var that=this
    var store_id=e.target.id
    wx.request({
      url: app.d.ceshiUrl + '/Api/BCollet/store_save',
      method: 'post',
      data: {
        uid: app.d.userId,
        store_id: store_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
      that.loadCollect()
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  loadCollect:function(){
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
        var cl_product = res.data.cl_product
        var cl_store = res.data.cl_store
        that.setData({
          shoucang_good: cl_product,
          gz_store: cl_store
        });
        console.log(that.data.shoucang_good)
        console.log(that.data.gz_store)
        var count1 = that.data.shoucang_good.length
        var count2 = that.data.gz_store.length
        that.setData({
          height1: 440 * parseInt((count1 + 1) / 2),
          height2: 165 * count2,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  }
})