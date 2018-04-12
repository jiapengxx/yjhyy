var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    switch1: false,
    switch2: true,
    imageList: '',
    srcs: ['','','',''],
    flag0:false,
    flag1:false,
    flag2:false,
    flag3:false,
    selectPerson: true,
    firstPerson: '',
    selectArea: false,
    types: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/BType/index',  
      method: 'post',
      data: {
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ad = res.data.ad;
        that.setData({
          types:ad
        });

      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    wx.getStorage({
      key: 'switch',
      success: function (res) {
        that.setData({
          switch1: true,
          switch2: false
        })
      },
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
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
  },
  chooseImage: function (event) {
    var id = event.target.id;
    console.log(id);
    var that = this;
    wx.chooseImage({
      count: 1, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgeList = that.data.imageList.concat
          (res.tempFilePaths);
        var src=that.data.srcs;
        src[id] = imgeList;
        // app.d.src=src;
        that.src = src;
if(id==0){
  that.setData({
    flag0:true,
    srcs:src,
  })
}else if(id==1){
  that.setData({
    flag1: true,
    srcs: src,
  })
} else if (id == 2) {
  that.setData({
    flag2: true,
    srcs: src,
  })
}else if(id==3){
  that.setData({
    flag3: true,
    srcs: src,
  })
}

      }
    })
  },
  previewImage: function (e) {
    var dataid = e.target.id;
    wx.previewImage({
      urls: [this.data.srcs[dataid]]
    });
    
    // cosole.log(urls+"asd");
  },
  formSubmit: function (e) {
    var that=this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    
  // var uploadedImagesPaths = this.data.img1.uploadedImagesPaths;
    console.log(that.src);
  app.uploadimg({
    url: app.d.hostUrl + '/Api/BIndex/seller_add',//这里是你图片上传的接口
    path: that.src,//这里是选取的图片的地址数组
    data: {
      code_one: Math.random(10000, 99999),
      code: e.detail.value.code,
      self_name: e.detail.value.self_name,
      card_id: e.detail.value.card_id,
      tel_id: e.detail.value.tel_id,
      user: e.detail.value.user,
      pwd: e.detail.value.pwd,
      place: e.detail.value.place,
      code: e.detail.value.code,
      code: e.detail.value.code,
      place_desc: e.detail.value.place_desc,
      introduce: e.detail.value.introduce,
    }
  });
    // wx.request({
    //   url: app.d.hostUrl + '/Api/BIndex/seller_add',
    //   method: 'post',
    //   data: {
    //     code: e.detail.value.code,
    //     self_name: e.detail.value.self_name,
    //     card_id: e.detail.value.card_id,
    //     tel_id: e.detail.value.tel_id,
    //     user: e.detail.value.user,
    //     pwd: e.detail.value.pwd,
    //     place: e.detail.value.place,
    //     code: e.detail.value.code,
    //     code: e.detail.value.code,
    //     place_desc: e.detail.value.place_desc,
    //     introduce: e.detail.value.introduce,
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     //--init data 
    //     var status = res.data.status;
    //     if (status == 1) {
    //       that.setData({     
    //       });
    //     } else {
    //       wx.showToast({
    //         title: res.data.err,
    //         duration: 2000,
    //       });
    //     }
    //   },
    //   error: function (e) {
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000,
    //     });
    //   },
    // });
    // wx.showToast({
    //   title: '提交成功',
    //   success: function () {
    //     wx.reLaunch({
    //       url: '../company_index/company_index',
    //     })
    //   }
    // })
    // wx.setStorage({
    //   key: 'switch',
    //   data: 'true',
    // })
    // this.setData({
    //   switch1: true,
    //   switch2: false
    // })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
})