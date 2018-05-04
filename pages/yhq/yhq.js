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
    sjyhq: [

      { id: 0, src: 'https://tanghuzhao.com.cn/Public/images/sjhd1.png' }, { id: 1, src: 'https://tanghuzhao.com.cn/Public/images/sjhd1.png' }, { id: 2, src: 'https://tanghuzhao.com.cn/Public/images/sjhd2.png' }, { id: 3, src: 'https://tanghuzhao.com.cn/Public/images/sjhd1.png' }, { id: 4, src: 'https://tanghuzhao.com.cn/Public/images/sjhd2.png' }, { id: 5, src: 'https://tanghuzhao.com.cn/Public/images/sjhd1.png' }, { id: 6, src: 'https://tanghuzhao.com.cn/Public/images/sjhd1.png' }, { id: 7, src: 'https://tanghuzhao.com.cn/Public/images/sjhd2.png' }
    ],
    gryhq: [{ id: 0, src: 'https://tanghuzhao.com.cn/Public/images/gryhq5.png' }, { id: 1, src: 'https://tanghuzhao.com.cn/Public/images/gryhq7.png' }, { id: 2, src: 'https://tanghuzhao.com.cn/Public/images/gryhq18.png' }, { id: 3, src: 'https://tanghuzhao.com.cn/Public/images/gryhq25.png' }, { id: 4, src: 'https://tanghuzhao.com.cn/Public/images/gryhq25.png' }, { id: 5, src: 'https://tanghuzhao.com.cn/Public/images/gryhq5.png' }, { id: 6, src: 'https://tanghuzhao.com.cn/Public/images/gryhq7.png' }, { id: 7, src: 'https://tanghuzhao.com.cn/Public/images/gryhq5.png' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count1 = this.data.sjyhq.length
    var count2 = this.data.gryhq.length
    this.setData({
      height1: 190*count1,
      height2: 178*parseInt(count2/2),
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
})