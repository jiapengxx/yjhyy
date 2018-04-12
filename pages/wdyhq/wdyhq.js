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
    wsy: [
      { id: 0, src: '../../images/wsy.png' },
      { id: 1, src: '../../images/wsy.png' },
      { id: 2, src: '../../images/wsy.png' },
    ],
    ysy:
    [{ id: 0, src: '../../images/ysy1.png' },
    { id: 1, src: '../../images/ysy2.png' },
    { id: 2, src: '../../images/ysy1.png' },
    { id: 3, src: '../../images/ysy2.png' },
    { id: 4, src: '../../images/ysy1.png' },
    ],
    ysx:
    [{ id: 0, src: '../../images/ysy1.png' },
    { id: 1, src: '../../images/ysy2.png' },
    { id: 2, src: '../../images/ysy1.png' },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count1 = this.data.wsy.length
    var count2 = this.data.ysy.length
    var count3 = this.data.ysx.length
    this.setData({
      height1: 210 * count1,
      height2: 210 * count2,
      height3: 210 * count3
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
  goShopping: function () {
    wx.switchTab({
      url: '../company_shop/company_shop',
    })
  },
  toYhq: function () {
    wx.navigateTo({
      url: '../yhq/yhq',
    })
  },
})