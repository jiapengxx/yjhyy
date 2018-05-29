var app = getApp();
// pages/order/downline.js
Page({
  data: {
    itemData: {},
    userId: 0,
    remark: '',
    cartId: 0,
    addrId: 0,//收货地址//测试--
    btnDisabled: false,
    productData: [],
    address: {}, 
    total: 0,
    vprice: 0,
    vid: 0,
    addemt: 1,
    vou: [],
    flag: 0,
    flag1: 0
  },
  onLoad: function (options) {
    console.log(options)
    console.log((typeof options.DATAs) != "undefined")
    var uid = app.d.userId;
    if ((typeof options.DATAs) != "undefined") {
    var DAta = options.DATAs.split(",")
    console.log((typeof options.DATA) != "undefined")

    this.setData({
      cartId: DAta[DAta.length-1],
      userId: uid,
    })
var buff=DAta.splice(DAta.length-1,1)
console.log(buff)
    this.setData({
      buff:buff,
      HAVE:true
    })
    }else{
      this.setData({
        cartId: options.cartId,
        userId: uid,
        HAVE:false
      })

    }
    this.loadProductDetail();
    this.loadCoin();
  },
  loadProductDetail: function () {
    var that = this;
    if(this.data.HAVE){
      wx.request({
        url: app.d.ceshiUrl + '/Api/Payment/buy_cart',
        method: 'post',
        data: {
          cart_id: that.data.cartId,
          uid: that.data.userId,
          buff: that.data.buff
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var adds = res.data.adds;
          if (adds) {
            var addrId = adds.id;
            that.setData({
              address: adds,
              addrId: addrId
            });
          }
          that.setData({
            addemt: res.data.addemt,
            productData: res.data.pro,
            total: res.data.price,
            vprice: res.data.price,
            vou: res.data.vou,
          })
        }
      })
    }else{
      wx.request({
        url: app.d.ceshiUrl + '/Api/Payment/buy_cart',
        method: 'post',
        data: {
          cart_id: that.data.cartId,
          uid: that.data.userId,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          var adds = res.data.adds;
          if (adds) {
            var addrId = adds.id;
            that.setData({
              address: adds,
              addrId: addrId
            });
          }
          that.setData({
            addemt: res.data.addemt,
            productData: res.data.pro,
            total: res.data.price,
            vprice: res.data.price,
            vou: res.data.vou,
          })
        }
      })
    }
  },
  loadCoin: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/num ',
      method: 'post',
      data: {
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          num: res.data.num
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value,
    })
  },

  //选择优惠券
  getvou: function (e) {
    var vid = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    var zprice = this.data.vprice;
    var cprice = parseFloat(zprice) - parseFloat(price);
    this.setData({
      total: cprice,
      vid: vid
    })
  },
  //使用健康币
  useCoin: function (e) {
    var that = this
    var code = e.currentTarget.id
    this.setData({
      code:code
    })
    console.log(code)
    if (code == 'gold') {
      if (this.data.flag == 0) {
        this.setData({
          cgold: e.currentTarget.dataset.price,
          cygold: 0,
          flag: 1
        })
      } else {
        this.setData({
          cgold: 0,
          cygold: 0,
          flag: 0
        })
      }
      this.setData({
        discount: this.data.cgold
      })
    } else {
      if (this.data.flag1 == 0) {
        this.setData({
          cgold: 0,
          cygold: e.currentTarget.dataset.price,
          flag1: 1
        })
      } else {
        this.setData({
          cgold: 0,
          cygold: 0,
          flag1: 0
        })
      }
      this.setData({
        discount: this.data.cygold
      })
    }
    var zprice = this.data.vprice;
    console.log(zprice)
    console.log(this.data.discount)
    console.log(zprice > this.data.discount)
    if (zprice > this.data.discount) {
      var cprice = parseFloat(zprice) - parseFloat(this.data.discount);
      console.log(cprice)
      this.setData({
        FLAg: false,
        total: cprice,
      })
      console.log(this.data.total)
    } else {
      this.setData({
        FLAg: true
      })
    }

  },
  //微信支付
  createProductOrderByWX: function (e) {
    this.setData({
      paytype: 'weixin',
    });
    this.createProductOrder();
  },

  //线下支付
  createProductOrderByXX: function (e) {
    this.setData({
      paytype: 'cash',
    });
    wx.showToast({
      title: "线下支付开通中，敬请期待!",
      duration: 3000
    });
    // return false;

    //未开通 关闭
    // this.createProductOrder();
  },
  //健康币支付
  createProductOrderByJJ: function (e) {
    if (this.data.flag == 0 && this.data.flag1 == 0) {
      wx.showToast({
        title: '请先选择健康币',
      })
    } else {
      if (this.data.flag == 1) {
        this.setData({
          paytype: 'gold',
        });
      }
      if (this.data.flag1 == 1) {
        this.setData({
          paytype: 'ygold',
        });
      }

      this.createProductOrder();
    }
  },

  //确认订单
  createProductOrder: function () {
    this.setData({
      btnDisabled: false,
    })
    console.log("ctype:"+this.data.code)
    console.log(this.data.paytype)
    //创建订单
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Payment/payment',
      method: 'post',
      data: {
        uid: that.data.userId,
        cart_id: that.data.cartId,
        buff: that.data.buff,
        type: that.data.paytype,
        aid: that.data.addrId,//地址的id
        remark: that.data.remark,//用户备注
        price: that.data.total,//总价
        vid: that.data.vid,//优惠券ID
        ctype: that.data.code,
        cygold: that.data.cygold,
        cgold: that.data.cgold
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        //--init data        
        var data = res.data;
        if (data.status == 1) {
          //创建订单成功
          if (data.arr.pay_type == 'cash') {
            wx.showToast({
              title: "请自行联系商家进行发货!",
              duration: 3000
            });
            return false;
          }
          if (data.arr.pay_type == 'weixin') {
            //微信支付
            that.wxpay(data.arr);
          }
          if (data.arr.pay_type == 'gold' || data.arr.pay_type == 'ygold') {
            //健康币支付
            wx.showToast({
              title: "支付成功!",
              duration: 2000,
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../user/dingdan?currentTab=1&otype=deliver',
              });
            }, 2500);
          }
        } else {
          wx.showToast({
            title: "下单失败!",
            duration: 2500
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:createProductOrder',
          duration: 2000
        });
      }
    });
  },

  //调起微信支付
  wxpay: function (order) {
    var that=this
    console.log(order)
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order.order_id,
        order_sn: order.order_sn,
        uid: this.data.userId,
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
              console.log(res)
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 2500);
            },
            fail: function (res) {
              console.log(res)
              wx.showModal({
                title:'支付失败',
                content: '是否前往支付?',
                success: function (res) {
                  if (res.confirm) {
                  wx.navigateTo({
                    url: '../company_user/dingdan',
                  })
                  }else{
                    wx.redirectTo({
                      url: '../product/detail?pro_id='+that.data.productData[0].pid,
                    })
                  }
                }
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
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        });
      }
    })
  },


});