var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Express/list',
      method: 'post',
      data: {
        order_id: options.order_id,
        wuliu_id: options.wuliu_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          OrderCode: res.data.logisticResult.OrderCode,
          ShipperCode: res.data.logisticResult.ShipperCode,
          EBusinessID: res.data.logisticResult.EBusinessID,
        })
        for (var i = res.data.logisticResult.Traces.length-1;i>-1;i--){
          that.setData({
            list:that.data.list.concat(res.data.logisticResult.Traces[i])
          })
        }
console.log(that.data.list)
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

  }
})