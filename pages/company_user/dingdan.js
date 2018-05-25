// pages/user/dingdan.js
//index.js  
//获取应用实例  
var app = getApp();
var common = require("../../utils/common.js");
Page({
  data: {
    winWidth: 0, 
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    isStatus: 'pay',//10待付款，20待发货，30待收货 40、50已完成
    page: 0,
    refundpage: 0,
    orderList0: [],
    orderList1: [],
    orderList2: [],
    orderList3: [],
    orderList4: [],
    page0: 2,
    page1: 2,
    page2: 2,
    page3: 2,
    page4: 2,
    host: app.d.hostImg,
    count1:0,
    count2:0,
    count3:0,
    count4:0,
    count5:0,
  },
  onLoad: function (options) {
    this.initSystemInfo();
    this.setData({
      currentTab: parseInt(options.currentTab),
      isStatus: options.otype
    });

    if (this.data.currentTab == 4) {
      this.loadReturnOrderList();
    } else {
      this.loadOrderList();
    }
  },
  getOrderStatus: function () {
    return this.data.currentTab == 0 ? 1 : this.data.currentTab == 2 ? 2 : this.data.currentTab == 3 ? 3 : 0;
  },

  //取消订单
  removeOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.orderId;
    wx.showModal({
      title: '提示',
      content: '你确定要取消订单吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Order/orders_edit',
          method: 'post',
          data: {
            id: orderId,
            type: 'cancel',
            uid: app.d.userId
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadOrderList();
            } else {
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

  //确认收货
  recOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.orderId;
    wx.showModal({
      title: '提示',
      content: '你确定已收到宝贝吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Order/orders_edit',
          method: 'post',
          data: {
            id: orderId,
            type: 'receive',
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadOrderList();
            } else {
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
  loadOrderList: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/index',
      method: 'post',
      data: {
        uid: app.d.userId,
        order_type: that.data.isStatus,
        page: that.data.page,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var status = res.data.status;
        var list = res.data.ord;
        switch (that.data.currentTab) {
          case 0:
            that.setData({
              count1:0,
              orderList0: list,
            });
            for (var i = 0; i < that.data.orderList0.length;i++){
              that.setData({
                count1: that.data.count1 + that.data.orderList0[i].prolist.length
              })
            }
            that.setData({
              num1: that.data.count1-that.data.orderList0.length
              })
            console.log(that.data.count1)
            console.log(that.data.num1)
            break;
          case 1:
            that.setData({
              count2: 0,
              orderList1: list,
            });
            for (var i = 0; i < that.data.orderList1.length; i++) {
              that.setData({
                count2: that.data.count2 + that.data.orderList1[i].prolist.length
              })
            }
            that.setData({
              num2: that.data.count2 - that.data.orderList1.length
            })
            console.log(that.data.count2)
            console.log(that.data.num2)
            break;
          case 2:
            that.setData({
              count3: 0,
              orderList2: list,
            });
            for (var i = 0; i < that.data.orderList2.length; i++) {
              that.setData({
                count3: that.data.count3+ that.data.orderList2[i].prolist.length
              })
            }
            that.setData({
              num3: that.data.count3 - that.data.orderList2.length
            })
            console.log(that.data.count3)
            console.log(that.data.num3)
            break;
          case 3:
            that.setData({
              count4: 0,
              orderList3: list,
            });
            for (var i = 0; i < that.data.orderList3.length; i++) {
              that.setData({
                count4: that.data.count4 + that.data.orderList3[i].prolist.length
              })
            }
            that.setData({
              num4: that.data.count4 - that.data.orderList3.length
            })
            console.log(that.data.count4)
            console.log(that.data.num4)
            break;
          case 4:
            that.setData({
              count5: 0,
              orderList4: list,
            });
            for (var i = 0; i < that.data.orderList4.length; i++) {
              that.setData({
                count5: that.data.count5 
              })
            }
            that.setData({
              num5: that.data.count5 
            })
            console.log(that.data.count5)
            console.log(that.data.num5)
            break;
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

  loadReturnOrderList: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/order_refund',
      method: 'post',
      data: {
        uid: app.d.userId,
        page: that.data.refundpage,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data.ord;
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            orderList4: that.data.orderList4.concat(data),
            count5: 0,
          });
          // for (var i = 0; i < that.data.orderList4.length; i++) {
          //   that.setData({
          //     count5: that.data.count5 
          //   })
          // }
          // that.setData({
          //   num5: that.data.count5 - that.data.orderList4.length
          // })
          console.log(that.data.orderList4.length)
        } else {
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
  },


  initSystemInfo: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current;
      console.log(typeof (e.target.dataset.otype) == 'undefined')
      if (typeof (e.target.dataset.otype) == 'undefined'){
        that.setData({
          currentTab: parseInt(current),
          isStatus:'',
        });
      }else{
        that.setData({
          currentTab: parseInt(current),
          isStatus:e.target.dataset.otype,
        });
      }
      //没有数据就进行加载
      switch (that.data.currentTab) {
        case 0:
          !that.data.orderList0.length && that.loadOrderList();
          break;
        case 1:
          !that.data.orderList1.length && that.loadOrderList();
          break;
        case 2:
          !that.data.orderList2.length && that.loadOrderList();
          break;
        case 3:
          !that.data.orderList3.length && that.loadOrderList();
          break;
        case 4:
          that.data.orderList4.length = 0;
          that.loadReturnOrderList();
          break;
      }
    };
  },
  /**
   * 微信支付订单
   */
  // payOrderByWechat: function(event){
  //   var orderId = event.currentTarget.dataset.orderId;
  //   this.prePayWechatOrder(orderId);
  //   var successCallback = function(response){
  //     console.log(response);
  //   }
  //   common.doWechatPay("prepayId", successCallback);
  // },

  payOrderByWechat: function (e) {
    var order_id = e.currentTarget.dataset.orderId;
    var order_sn = e.currentTarget.dataset.ordersn;
    if (!order_sn) {
      wx.showToast({
        title: "订单异常!",
        duration: 2000,
      });
      return false;
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order_id,
        order_sn: order_sn,
        uid: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 3000);
            },
            fail: function (res) {
              wx.showToast({
                title: res,
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function (e) {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  toComment:function(e){
    var that=this
    //去评价传出 订单ID 产品ID集合
    var orderId = e.currentTarget.dataset.orderId
    var ID = e.currentTarget.dataset.ID
    this.setData({
  IDs:[]
})
    for (var i = 0; i < this.data.orderList4[ID].prolist.length;i++){
      this.setData({
        IDs: this.data.IDs.concat(this.data.orderList4[ID].prolist[i].pid)
      })
    }
    wx.navigateTo({
      url: '../comment/index?orderId={{item.id}}&pid={{item.prolist[idx].pid}}',
    })
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    if (this.data.currentTab == 0) {
      this.setData({
        status: '10',
        page0: this.data.page0
      })

    }
    else if (this.data.currentTab == 0) {
      this.setData({
        status: '20',
        page1: this.data.page1
      })

    }
    else if (this.data.currentTab == 1) {
      this.setData({
        status: '30',
        page2: this.data.page2
      })

    } else if (this.data.currentTab == 2) {
      this.setData({
        status: '50',
        page3: this.data.page3
      })
    } else {
      this.setData({
        status: '60',
        page4: this.data.page4
      })
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/get_more',
      method: 'post',
      data: {
        page:
        (that.data.currentTab == 0 ? that.data.page0 : (that.data.currentTab == 1 ? that.data.page1 : (that.data.currentTab == 2 ? that.data.page2 : (that.data.currentTab == 3 ? that.data.page3 : that.data.page4)))),
        status:
        (that.data.currentTab == 0 ? 10 : (that.data.currentTab == 1 ? 20 : (that.data.currentTab == 2 ? 30 : (that.data.currentTab == 3 ? 50 : 60)))),
        uid: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var ord0 = res.data.ord;
        var ord1 = res.data.ord;
        var ord2 = res.data.ord;
        var ord3 = res.data.ord;
        var ord4 = res.data.ord;
        if (ord0 == '' || ord1 == '' || ord2 == '' || ord3 == '' || ord4=='') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        } else if (that.data.currentTab == 0) {
          that.setData({
            page0: that.data.page0 + 1,
            orderList0: that.data.orderList0.concat(ord0), 
            count1: 0,
          });
          for (var i = 0; i < that.data.orderList0.length; i++) {
            that.setData({
              count1: that.data.count1 + that.data.orderList0[i].prolist.length
            })
          }
          that.setData({
            num1: that.data.count1 - that.data.orderList0.length
          })
        }else if (that.data.currentTab == 1) {
          that.setData({
            page1: that.data.page1 + 1,
            orderList1: that.data.orderList1.concat(ord1),
            count2:0
          });
          for (var i = 0; i < that.data.orderList1.length; i++) {
            that.setData({
              count2: that.data.count2 + that.data.orderList1[i].prolist.length
            })
          }
          that.setData({
            num2: that.data.count2 - that.data.orderList1.length
          })
        } else if (that.data.currentTab == 2) {
          that.setData({
            page2: that.data.page2 + 1,
            orderList2: that.data.orderList2.concat(ord2),
            count3:0
          });
          for (var i = 0; i < that.data.orderList2.length; i++) {
            that.setData({
              count3: that.data.count3 + that.data.orderList2[i].prolist.length
            })
          }
          that.setData({
            num3: that.data.count3 - that.data.orderList2.length
          })
        } else if (that.data.currentTab == 3) {
          that.setData({
            page3: that.data.page3 + 1,
            orderList3: that.data.orderList3.concat(ord3),
            count4:0
          });
          for (var i = 0; i < that.data.orderList3.length; i++) {
            that.setData({
              count4: that.data.count4 + that.data.orderList3[i].prolist.length
            })
          }
          that.setData({
            num4: that.data.count4 - that.data.orderList3.length
          })
        } else if (that.data.currentTab == 4) {
          that.setData({
            page4: that.data.page4 + 1,
            orderList4: that.data.orderList4.concat(ord4),
            count5:0
          });
          for (var i = 0; i < that.data.orderList4.length; i++) {
            that.setData({
              count5: that.data.count5
            })
          }
          that.setData({
            num5: that.data.count5
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  /**
   * 调用服务器微信统一下单接口创建一笔微信预订单
   */
  //   prePayWechatOrder: function(orderId){
  //     var uri = "/ztb/userZBT/GetWxOrder";
  //     var method = "post";
  //     var dataMap = {
  //       SessionId: app.globalData.userInfo.sessionId,
  //       OrderNo: orderId
  //     }
  //     console.log(dataMap);
  //     var successCallback = function (response) {
  //       console.log(response);
  //     };
  //     common.sentHttpRequestToServer(uri, dataMap, method, successCallback);
  //   }
})