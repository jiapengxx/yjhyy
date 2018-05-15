const app = getApp()
Page({
  data: {
    /**      * 页面配置      */
    winWidth: 0, winHeight: 0,
    // tab切换   
    height: 0,
    currentTab: 0,
    banners: [
      { id: 1, businessId: 1001, picUrl: "https://tanghuzhao.com.cn/Public/images/sp-banner.png" },
      { id: 2, businessId: 1002, picUrl: "https://tanghuzhao.com.cn/Public/images/sp-banner.png" },
      { id: 3, businessId: 1003, picUrl: "https://tanghuzhao.com.cn/Public/images/sp-banner.png" },
    ],
    switch1: [
      { id: 1, pic1: "https://tanghuzhao.com.cn/Public/images/live-pic1.png", content1: "安强院长", pic2: "https://tanghuzhao.com.cn/Public/images/live-pic2.png", content2:"北京明德医院院长兼泌尿外科主任" },
      { id: 2, pic1: "https://tanghuzhao.com.cn/Public/images/live-pic1.png", content1: "安强院长", pic2: "https://tanghuzhao.com.cn/Public/images/live-pic2.png", content2: "北京明德医院院长兼泌尿外科主任" }
    ],
    switch2: [
      {
        id: 1, pic1: "https://tanghuzhao.com.cn/Public/images/course-pic1.png", title: "感冒吃什么食物课程1-1.1", content: "生姜，红糖，清热去火茶，热水。专家说过，适当的感冒发热对身体有好处。人体的免疫系统是逐步建立起来的。对婴幼儿而言，身体的免疫系统确实没有成人的那么强大，更容易感冒，在医学上，会把6岁以前的小孩子称为“生理性免疫功能低下状态”，就是这个意思。", count: "1.3万次",
      },
      { id: 2, pic1: "https://tanghuzhao.com.cn/Public/images/course-pic1.png", title: "感冒吃什么食物课程1-1.1", content: "生姜，红糖，清热去火茶，热水。专家说过，适当的感冒发热对身体有好处。人体的免疫系统是逐步建立起来的。对婴幼儿而言，身体的免疫系统确实没有成人的那么强大，更容易感冒，在医学上，会把6岁以前的小孩子称为“生理性免疫功能低下状态”，就是这个意思。", count: "1.3万次", },
    ]
  },
  onLoad: function () {
    var that = this
    this.setData({
  
      
    })
    /**     * 获取系统信息     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
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
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  tapBanner: function (e) {
    // if (e.currentTarget.dataset.id != 0) {
    //   wx.navigateTo({
    //     url: "../" + (e.currentTarget.dataset.id == 1001 ? '' : '')
    //   })
    // }
  },
  live_do: function () {
    wx.navigateTo({
      url: "/pages/live/live_do"
    })
  }

})
