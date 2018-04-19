// pages/jrkb/jrkb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [{ title: '习近平三次检阅部队，都强调了什么？', eye_icon: '../../images/eye_icon.png', type: 1, count: 666, types: '央视新闻', pic: '../../images/big_pic.png', },
    { title: '习近平三次检阅部队，都强调了什么？', eye_icon: '../../images/eye_icon.png', type: 2, count: 666, types: '央视新闻', pic: '../../images/big_pic.png', },
    { title: '习近平三次检阅部队，都强调了什么？', eye_icon: '../../images/eye_icon.png', type: 1, count: 666, types: '央视新闻', pic: '../../images/big_pic.png', }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  newsDetail: function () {
    wx.navigateTo({
      url: '../newsDetail/newsDetail',
      //可传参
    })
    this.setData({
      // 设置已读，未读参数,对请求过来的参数进行修改
    })
  }
})