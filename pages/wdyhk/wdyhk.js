// pages/wdyhk/wdyhk.js
var formatBankNumber = '123'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: [{ name: '建设银行', types: '储蓄卡', num: "1234567890123456", pic1: 'jsyh1', pic2: 'jsyh2' },
      { name: '民生银行', types: '储蓄卡', num: "1234567890123456", pic1: 'msyh1', pic2: 'msyh2' }, { name: '农业银行', types: '储蓄卡', num: "1234567890123456", pic1: 'nyyh1', pic2: 'nyyh2' }],
    NUM:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.froms == 'user') {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#008842',
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4BA3FE',
      })
    }
    for(var i=0;i<this.data.card.length;i++){
this.setData({
  NUM: this.data.NUM.concat("****" + '   ' + '   ' + "****" + '   ' + '   ' + "****" + '   '+this.data.card[i].num.substr(-4))
})
    }

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
  smrz:function(){
    wx.navigateTo({
      // url: '../smrz/smrz',
      url: '../tjyhk/tjyhk',
    })
  }
})