// pages/address/user-address/user-address.js
var app = getApp()
Page({
  data: {
    address: [],
    radioindex: '',
    pro_id:0,
    num:0,
    cartId:0
  },
  onLoad: function (options) {
    var that = this;
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
    // 页面初始化 options为页面跳转所带来的参数
    if (options.cartId){
      var cartId = options.cartId;
      this.setData({
        cartId: cartId
      })
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id:app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }   
        that.setData({
          address: address,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
    
  },

  onReady: function () {
    // 页面渲染完成
  },

  //对来源进行判断
  setDefault: function(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/set_default',
      data: {
        uid:app.d.userId,
        addr_id:addrId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type':  'application/x-www-form-urlencoded'
      }, 
      success: function (res) {

        var status = res.data.status;
        var cartId = that.data.cartId;
        if(status==1&&cartId!=0){
          if (cartId) {
            wx.redirectTo({
              url: '../../order/pay?cartId=' + cartId,
            });
            return false;
          }

          wx.showToast({
            title: '操作成功！',
            duration: 2000
          });
          
          that.DataonLoad();
        } else if (status == 1){
          wx.showToast({
            title: '操作成功！',
            duration: 2000
          });

          that.DataonLoad();
        }
        else{
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  updateAddress:function(e){
    //进入地址页   填充数据   修改数据   保存
    // wx.showToast({
    //   title: '暂未开放',
    //   icon:'loading'
    // })
    var addrId = e.currentTarget.dataset.id
    console.log(addrId)
    wx.navigateTo({
      url: '../address?addrId=' + addrId,
    })
  },
  delAddress: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Address/del_adds',
          data: {
            user_id:app.d.userId,
            id_arr:addrId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {// 设置请求的 header
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          
          success: function (res) {
            // success
            var status = res.data.status;
            if(status==1){
              that.DataonLoad();
            }else{
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    });

  },
  DataonLoad: function () {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id:app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      
      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }
        that.setData({
          address: address,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
    
  },
})