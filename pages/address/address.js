//城市选择
var app = getApp();
Page({
  data: {
    shengArr: [],//省级数组
    shengId: [],//省级id数组
    shiArr: [],//城市数组
    shiId: [],//城市id数组
    quArr: [],//区数组
    shengIndex: 0,
    shiIndex: 0,
    quIndex: 0,
    mid: 0,
    sheng: 0,
    city: 0,
    area: 0,
    code: 0,
    cartId: 0
  },
  nameCheck:function(e){
    var names = e.detail.value
    if (names.length === 0) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
    } else if (names.length>10){
      wx.showToast({
        title: '姓名不得超过10个字符',
        icon: 'none'
      })
    }
  },
  phoneCheck:function(e){
    var telphone = e.detail.value
    if (telphone.length === 0) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(telphone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none'
      })
    }
  },
  address:function(){
    var addresses = e.detail.value
    if (addresses.length === 0) {
      wx.showToast({
        title: '请填写地址',
        icon: 'none'
      })
    }
  },
  formSubmit: function (e) {
    var  that=this
    var adds = e.detail.value;
    //对手机号进行审核
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(adds.phone))) {
      this.setData({
        phoneRight: false,
        phone:''
      })
      
    } else {
      this.setData({
        phoneRight: true,
        phone:adds.phone
      })
    }
    var cartId = this.data.cartId;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/add_adds',
      data: {
        user_id: app.d.userId,
        receiver: adds.name,
        tel: that.data.phone,
        sheng: this.data.sheng,
        city: this.data.city,
        quyu: this.data.area,
        adds: adds.address,
        code: this.data.code,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        var status = res.data.status;
        if (status == 1 && that.data.phoneRight) {
          wx.showToast({
            title: '保存成功！',
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: 'user-address/user-address?cartId=' + cartId
            })
          }
            , 1000)
        }  
        else {
          if (status == 1&&!that.data.phoneRight) {
            wx.showToast({
              title: '请填写正确的手机号',
              duration: 2000
            });
          }else{
            wx.showToast({
              title: res.data.err,
              duration: 2000,
              icon:'none'
            });
          }

        }
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    that.setData({
      cartId: options.cartId
    })
    //获取省级城市
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/get_province',
      data: {},
      method: 'POST',
      success: function (res) {
        var status = res.data.status;
        var province = res.data.list;
        var sArr = [];
        var sId = [];
        sArr.push('请选择');
        sId.push('0');
        for (var i = 0; i < province.length; i++) {
          sArr.push(province[i].name);
          sId.push(province[i].id);
        }
        that.setData({
          shengArr: sArr,
          shengId: sId
        })
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })

  },

  bindPickerChangeshengArr: function (e) {
    var that = this;
    if (e.detail.value!=0){
      this.setData({
        shengIndex: e.detail.value,
        shiArr: [],
        shiId: [],
        quArr: [],
        quiId: []
      });
      wx.request({
        url: app.d.ceshiUrl + '/Api/Address/get_city',
        data: { sheng: e.detail.value },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {// 设置请求的 header
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // success
          var status = res.data.status;
          var city = res.data.city_list;
          var hArr = [];
          var hId = [];
          hArr.push('请选择');
          hId.push('0');
          for (var i = 0; i < city.length; i++) {
            hArr.push(city[i].name);
            hId.push(city[i].id);
          }
          that.setData({
            sheng: res.data.sheng,
            shiArr: hArr,
            shiId: hId
          })
        },
        fail: function () {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
    }
  },
  bindPickerChangeshiArr: function (e) {
    var that = this;
    if (e.detail.value != 0) {
    this.setData({
      shiIndex: e.detail.value,
      quArr: [],
      quiId: []
    })
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/get_area',
      data: {
        city: e.detail.value,
        sheng: this.data.sheng
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        var area = res.data.area_list;

        var qArr = [];
        var qId = [];
        qArr.push('请选择');
        qId.push('0');
        for (var i = 0; i < area.length; i++) {
          qArr.push(area[i].name)
          qId.push(area[i].id)
        }
        that.setData({
          city: res.data.city,
          quArr: qArr,
          quiId: qId
        })
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
    }
  },
  bindPickerChangequArr: function (e) {
    var that = this;
    if (e.detail.value != 0) {
    this.setData({
      quIndex: e.detail.value
    });
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/get_code',
      data: {
        quyu: e.detail.value,
        city: this.data.city
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          area: res.data.area,
          code: res.data.code
        })
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  }
  }
})