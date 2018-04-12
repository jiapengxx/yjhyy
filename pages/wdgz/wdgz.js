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
    flag: true,
    shoucang_good: [

      { id: 0, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 1, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 2, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 3, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 4, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 5, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 6, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' }, 
      { id: 7, logo_good: 'https://tanghuzhao.com.cn/Public/images/logo_good.png', good_pic: 'https://tanghuzhao.com.cn/Public/images/good_sc.png', good_name: '人参健脾丸（8粒/盒）', good_price: '￥12.00' },
    ],
    wdgz: [{ id: 0, logo_sj: 'https://tanghuzhao.com.cn/Public/images/logo_sj.png', name: '同仁堂大药房', }, { id: 1, logo_sj: 'https://tanghuzhao.com.cn/Public/images/logo_sj.png', name: '同仁堂大药房', }, { id: 2, logo_sj: 'https://tanghuzhao.com.cn/Public/images/logo_sj.png', name: '同仁堂大药房', }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count1 = this.data.shoucang_good.length
    var count2 = this.data.wdgz.length
    this.setData({
      height1: 410 * parseInt((count1 + 1) / 2),
      height2: 165 * count2,
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
  changePoint: function (e) {
    var item_id = e.target.id
    if (this.data.flag) {
      this.setData({
        itemId: item_id,
        flag: false
      })
    } else {
      this.setData({
        itemId: 9999,
        flag: true
      })
    }
  }
})