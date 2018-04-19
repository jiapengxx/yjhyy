var app = getApp();
var count = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    switch1: false,
    switch2: true,
    imageList: '',
    srcs: ['', '', '', ''],
    flag0: false,
    flag1: false,
    flag2: false,
    flag3: false,
    selectPerson: true,
    content: '',
    selectArea: false,
    types: [],
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
          types: ad
        });

      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/recruitment_index',
      method: 'post',
      data: {
        user_id: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.status);
        if (res.data.status == 2) {
          that.setData({
            switch2: false,
            switch1: true
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
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

  },
  code: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '服务商代码不能为空！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })

    }
    console.log(count)
  },
  name: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '姓名不能为空！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },
  account: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '登录账号不能为空！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },
  pwd: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '登录密码不能为空！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },
  address: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '详细地址不能为空！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },

  tel: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'loading'
      })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: '手机号格式不正确！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },
  ID: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '身份证不能为空！',
        icon: 'loading'
      })
    } else if (!/^\d{17}(\d|X|x)$/.test(e.detail.value)) {
      wx.showToast({
        title: '身份证长度或格式错误！',
        icon: 'loading'
      })
    }
    else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
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
      content: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
    if (this.data.content.length != 0) {
      count: ++count
    }
    console.log(count)
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
        var src = that.data.srcs;
        src[id] = imgeList;
        // app.d.src=src;
        that.src = src;
        if (id == 0) {
          that.setData({
            flag0: true,
            srcs: src,
          })
          console.log('id=0:' + that.data.srcs)
          console.log('id=0:' + that.data.srcs.length)
        } else if (id == 1) {
          that.setData({
            flag1: true,
            srcs: src,
          })
          console.log('id=1:' + that.data.srcs)
          console.log('id=1:' + that.data.srcs.length)
        } else if (id == 2) {
          that.setData({
            flag2: true,
            srcs: src,
          })
          console.log('id=2:' + that.data.srcs)
          console.log('id=2:' + that.data.srcs.length)
        } else if (id == 3) {
          that.setData({
            flag3: true,
            srcs: src,
          })
          console.log('id=3:' + that.data.srcs)
          console.log('id=3:' + that.data.srcs.length)
        }
        if (that.data.srcs.length == 4) {
          that.setData({
            count: ++count
          })
        }
        console.log(count)
      }
    })
  },
  previewImage: function (e) {
    var dataid = e.target.id;
    wx.previewImage({
      urls: [this.data.srcs[dataid]]
    });
  },
  introduce: function (e) {
    if (e.detail.value.length === 0) {
      wx.showToast({
        title: '介绍不能为空！',
        icon: 'loading'
      })
    } else {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },
  formSubmit: function (e) {
    if (count == 14) {
      var that = this;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      // var uploadedImagesPaths = this.data.img1.uploadedImagesPaths;

      app.uploadimg({
        url: app.d.hostUrl + '/Api/BIndex/seller_add',//这里是你图片上传的接口
        path: that.data.srcs,//这里是选取的图片的地址数组
        data: {
          code_one: Math.random(10000, 99999),
          code: e.detail.value.code,
          self_name: e.detail.value.self_name,
          card_id: e.detail.value.card_id,
          tel_id: e.detail.value.tel_id,
          user: e.detail.value.user,
          pwd: e.detail.value.pwd,
          sheng: that.data.region[0],
          city: that.data.region[1],
          quyu: that.data.region[2],
          code: e.detail.value.code,
          code: e.detail.value.code,
          place_desc: e.detail.value.place_desc,
          introduce: e.detail.value.introduce,
          type_id: e.detail.value.type_id,
          uid: app.d.userId,
        }
      });
      wx.showToast({
        title: '提交成功',
        success: function () {
          wx.reLaunch({
            url: '../company_index/company_index',
          })
        }
      })
    } else {
      wx.showToast({
        title: '请将信息填充完整！',
        icon: 'loading'
      })
    }
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
    if (this.data.region.length != 0) {
      this.setData({
        count: ++count
      })
    }
    console.log(count)
  },
})