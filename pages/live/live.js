const app = getApp()
Page({
  data: {
    /**      * 页面配置      */
    winWidth: 0, winHeight: 0,
    // tab切换   
    height: 0,
    Flag: true,
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
        id: 1, srcs: "https://gslb.miaopai.com/stream/F2KJhPLmKj2mNXoDvL~SdmO5XPIa6mDqwb4xnQ__.mp4", title: "脑梗的最佳治疗方法是什么", content: "脑梗分两种治疗方法，急性期和缓解期。急性期建议用西医治疗，对症支持治疗药。到恢复期时，用一些中医治疗，根据中医辨证或补气活血或温阳等方法治疗，治疗因人而异，具体治疗方法需要到医院请专业医生制定方案，不可病人自行解决。", count: "1.3万次",
      },
      { id: 2, srcs: "https://gslb.miaopai.com/stream/DzqeJ1AoVeXGrgSmAH2GZOkb~bcY1ncE~I8C3w__.mp4", title: "年轻人为什么也会脑梗", content: "年轻人脑梗分两种情况，一种是脑血管先天崎形。先天崎形后，在过度劳累或血压高情况下会导致小的血管堵塞。另一种是后天因素。长期劳累或有高血压、糖尿病、高脂血症在劳累、熬夜、过度饮酒的情况下，都会诱发脑梗塞发生。注意饮食合理，避免情绪过于激动。", count: "1.3万次", },
      { id: 3, srcs: "https://gslb.miaopai.com/stream/VYTcBGuwBELGxM7gw5iGavhg0F2V8ZLGa7tylw__.mp4", title: "脑梗塞是什么病？", content: "脑梗塞是临床上最常见的一种脑血管疾病，是由于粥样硬化斑块脱落导致脑血管闭塞，包括脑血栓形成和脑栓塞。导致脑梗塞的原因包括： 1、在动脉粥样硬化基础上形成血栓； 2、动脉粥样硬化斑块脱落，堵塞脑血管导致脑梗塞； 3、心脏内脱落的栓子堵塞脑血管，造成脑梗塞。", },
      { id: 4, srcs: "https://vde.jiankang.com/mingyi/chenlukui/60.mp4", title: "脑梗和脑血栓有什么区别", content: "一般而言，脑梗塞和脑血栓都是由于脑血管堵塞造成的脑组织缺血缺氧性坏死。脑梗塞是由于动脉粥样硬化斑块脱落，堵塞脑血管所致，其范围更广，包括脑血栓和脑栓塞；脑血栓是脑梗塞的一种类型，是由于动脉粥样硬化导致脑血管局部形成血栓。", count: "1.3万次", },
    ]
  },
  onLoad: function () {
    var that = this
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
    /**     * 获取系统信息     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
    this.setData({
      H1: (this.data.switch1.length/2).toFixed(0),
      H2:this.data.switch2.length,
    })
  },
  onReady: function () {

  },

  /**     * 滑动切换tab     */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  bindPlay: function (e) {
    this.videoContext = wx.createVideoContext(''+e.currentTarget.id)
    if (this.data.Flag) {
      this.videoContext.play()
      this.setData({
        Flag: false
      })
    } else {
      this.videoContext.pause()
      this.setData({
        Flag: true
      })
    }
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
  },
  
  onShareAppMessage: function () {
    return {
      title: '',
      path: '',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

})
