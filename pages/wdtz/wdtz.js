// pages/wdtz/wdtz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [{
      id:0,
      date:'2018.4.8',
      time:'15:53',
      count:999,
      message:'欢迎回来'},
      {
        id:1,
        date: '2018.4.7',
        time: '8:40',
        count: 999,
        message: '欢迎回来'
      },],
      flags:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.setData({
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
  bindRead:function(e){
    var item_id = e.target.id
    console.log(e.target.id)
    //对请求到的数组中flag值进行修改并提交数据
  }
})