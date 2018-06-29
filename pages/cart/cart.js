var app = getApp();
Page({
  data: {
    page: 1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: [],
    flag: true,
    jiesuan: false
  },
  bjsp: function () {
    if (this.data.flag) {
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      })
    }
  },
  toDetail: function (e) {
    var pro_id = e.currentTarget.id
    //去商品详情页,传入
    wx.navigateTo({
      url: '../product/detail?pro_id=' + pro_id,
    })
  },
  bindMinus: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
    }
    console.log(num);
    var cart_id = e.currentTarget.dataset.cartid;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
      method: 'post',
      data: {
        user_id: app.d.userId,
        num: num,
        cart_id: cart_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        } else {
          wx.showToast({
            title: '操作失败！',
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
  },
  bindManual: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = e.detail.value;
    if (num >= 1) {
      wx.request({
        url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
        method: 'post',
        data: {
          user_id: app.d.userId,
          num: num,
          cart_id: that.data.carts[index].id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var status = res.data.status;
          if (status == 1) {
            // 只有大于一件的时候，才能normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal';
            // 购物车数据
            var carts = that.data.carts;
            carts[index].num = num;
            // 按钮可用状态
            var minusStatuses = that.data.minusStatuses;
            minusStatuses[index] = minusStatus;
            // 将数值与状态写回
            that.setData({
              minusStatuses: minusStatuses
            });
            that.sum();
          } else {
            wx.showToast({
              title: '操作失败！',
              duration: 2000
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      });
    } else {
      wx.showToast({
        title: '请输入合理的数量',
        icon: 'none'
      });
    }
  },
  bindPlus: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 自增
    num++;
    console.log(num);
    var cart_id = e.currentTarget.dataset.cartid;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
      method: 'post',
      data: {
        user_id: app.d.userId,
        num: num,
        cart_id: cart_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        } else {
          wx.showToast({
            title: '操作失败！',
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
  },

  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    });
    this.sum()
  },

  bindSelectAll: function () {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },

  bindCheckout: function () {
    var that = this
    // 初始化toastStr字符串
    var toastStr = '';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].id;
        toastStr += ',';
      }
    }
    if (toastStr == '') {
      wx.showToast({
        title: '请选择要结算的商品！',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    //存回data
    wx.navigateTo({
      url: '../order/pay?cartId=' + toastStr,
    })
    // this.setData({
    //   jiesuan: true
    // })
    // setTimeout(function () {

    //   that.removeShopCard()
    // }, 2000)
  },

  bindToastChange: function () {
    this.setData({
      toastHidden: true
    });
  },

  sum: function () {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].num * carts[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total.toFixed(2)
    });
  },

  onLoad: function (options) {
    app.editTabBar2();
    this.loadProductData();
    this.sum();
  },

  onShow: function () {
    app.globalData.froms = 'user'
    console.log(app.globalData.froms)
    this.loadProductData();
  },

  removeShopCard: function (e) {
    var that = this;
    this.setData({
      deleteList: []
    })
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        this.setData({
          deleteList: this.data.deleteList.concat(this.data.carts[i].id)
        })
      }
    }

    if (this.data.jiesuan) {
      for (var i = 0; i < that.data.deleteList.length; i++) {
        wx.request({
          url: app.d.ceshiUrl + '/Api/Shopping/delete',
          method: 'post',
          data: {
            cart_id: that.data.deleteList[i],
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var data = res.data;
            if (data.status == 1) {
              that.loadProductData();
            } else {
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
          fail: function () {
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
      that.setData({
        flag: true,
        jiesuan: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你确认移除吗',
        success: function (res) {
          if (res.confirm) {
            for (var i = 0; i < that.data.deleteList.length; i++) {
              wx.request({
                url: app.d.ceshiUrl + '/Api/Shopping/delete',
                method: 'post',
                data: {
                  cart_id: that.data.deleteList[i],
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  var data = res.data;
                  if (data.status == 1) {
                    that.loadProductData();
                  } else {
                    wx.showToast({
                      title: '操作失败！',
                      duration: 2000
                    });
                  }
                },
                fail: function () {
                  wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                  });
                }
              });
            }
            that.setData({
              flag: true
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      });
    }
  },

  // 数据案例
  loadProductData: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shopping/index',
      method: 'post',
      data: {
        user_id: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        //--init data
        var cart = res.data.cart;
        that.setData({
          carts: (res.data.status == 0 ? '' : cart),
          selectedAllStatus: false,
          total: 0
          //交互－ －
        });
      },
    });
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