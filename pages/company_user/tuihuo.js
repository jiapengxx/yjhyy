var app = getApp();
const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    orderId: 0,
    reason: '',
    remark: '',
    imgUrl: '',
    pulldown: false,
    aaa: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
    // th:false,
    // hh:false,
    yw: '',
    pro_ids: '',
    img1: ImageUploader.mergeData({
      sourceType: ['camera', 'album'], //上传图片的来源，相机/相册
      sizeType: ['compressed'],//上传前是否压缩，默认压缩
      maxCount: 1,//一次选择图片的数量
      //以上三个配置项详情请看小程序文档
      uploadedImagesPaths: [],//保存已上传的图片路径，也可以设置初始时就显示的图片
      uploadParams: {
        url: '',//后台接收上传图片的路径
        name: 'file',//后台依靠这个字段拿到文件对象
        formData: {},//这个字段可以设置传到后台的额外的参数
      },
    }),
  },
  onLoad: function (options) {
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
    console.log(options)
    new ImageUploader(this, 'img1');
    if (options.orderId && options.pro_id) {
      this.setData({
        orderId: options.orderId,
        pro_id: options.pro_id,
        types: 'ywc',
        yw: '退货'
      });
      this.getGoodsContentGoods()
    } else if (options.orderId) {
      this.setData({
        orderId: options.orderId,
        types: 'dfh',
        yw: '退款'
      });
      this.getGoodsContentOrder()
    }
  },
  getGoodsContentGoods: function () {
    var that = this
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/order_refund_do ',
      method: 'post',
      data: {
        order_id: that.data.orderId,
        pro_id: that.data.pro_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          host: app.d.hostImg + '/Data/',
          product: res.data.order_product
        })
      },
    });
  },
  getGoodsContentOrder: function () {
    var that = this
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/order_refund_do ',
      method: 'post',
      data: {
        order_id: that.data.orderId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          host: app.d.hostImg +'/Data/',
          product: res.data.order_product
        })
      },
    });
  },
  getAddress:function(){
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/order_details',
      method: 'post',
      data: {
        order_id: that.data.orderId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          that.setData({
            receiver: res.data.ord.receiver,
            tel: res.data.ord.tel,
            address_xq: res.data.ord.address_xq,
          });
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  //name检查
  nameCheck: function (e) {
    var names = e.detail.value
    if (names.length === 0) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      this.setData({
        name: false
      })
    } else if (names.length > 10) {
      wx.showToast({
        title: '姓名不得超过10个字符',
        icon: 'none'
      })
      this.setData({
        name: false
      })
    }else{
      this.setData({
        name: true,
        names: names
      })
    }
  },
  //phone检查
  phoneCheck: function (e) {
    var telphone = e.detail.value
    if (telphone.length === 0) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      this.setData({
        phone: false
      })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(telphone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
this.setData({
  phone:false
})
    }else{
      this.setData({
        phone: true,
        telphone:telphone
      })
    }
  },
  //地址检查
  addressCheck: function (e) {
    var addresses = e.detail.value
    if (addresses.length === 0) {
      wx.showToast({
        title: '请填写地址',
        icon: 'none'
      })
      this.setData({
        address: false
      })
    }else{
      this.setData({
        address: true,
        addresses: addresses
      })
    }
  },
  //已完成
  submitReturn: function () {
    var that = this;
    if (!this.data.yw) {
      wx.showToast({
        title: '请选择服务类型',
        icon: 'none',
      });
      return;
    } else if (!this.data.reason) {
      wx.showToast({
        title: '请填写退款原因',
        icon: 'none',
      });
      return;
    } else if (!(this.data.name && this.data.address && this.data.phone)){
      //当选择换货时，应判断是否填写收货信息
      wx.showToast({
        title: '请正确填写收货信息',
        icon: 'none',
      });
    }
     else {
      //有图片的提交
      if (this.data.img1.uploadedImagesPaths != '') {
        var uploadedImagesPaths=this.data.img1.uploadedImagesPaths;
        app.uploadimg({
          url: app.d.hostUrl + '/Api/Order/orders_edit',
          path: uploadedImagesPaths,
          data: {
            id: that.data.orderId,
            type: 'refund',
            back_remark: that.data.reason,
            pro_id: that.data.product[0].id,
            back: (that.data.yw == '退货' ? 3 : 5),
            addresses: (that.data.addresses ? that.data.addresses:''),
            telphone: (that.data.telphone ? that.data.telphone:''),
            names: (that.data.names ? that.data.names:'')
          },
        });
      } else {
        //没有图片的提交
        wx.request({
          url: app.d.ceshiUrl + '/Api/Order/orders_edit',
          method: 'post',
          data: {
            id: that.data.orderId,
            type: 'refund',
            back_remark: that.data.reason,
            pro_id: that.data.product[0].id,
            back: (that.data.yw == '退货' ? 3 : 5),
            addresses: (that.data.addresses ? that.data.addresses : ''),
            telphone: (that.data.telphone ? that.data.telphone : ''),
            names: (that.data.names ? that.data.names : '')

          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '您的申请已提交审核！',
                duration: 2000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../company_user/dingdan?currentTab=4',
                });
              }, 2000)
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
        });
      }
    }
  },
  //待发货
  submitReturnData: function () {
    var that = this;
    if (!this.data.reason) {
      wx.showToast({
        title: '请填写退款原因',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    for (var i = 0; i < this.data.product.length; i++) {
      this.setData({
        pro_ids: this.data.pro_ids + this.data.product[i].id + ','
      })
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/orders_edit',
      method: 'post',
      data: {
        pro_id: that.data.pro_ids,
        id: that.data.orderId,
        type: 'refund',
        back_remark: that.data.reason,
        back: 1
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: '您的申请已提交审核！',
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../company_user/dingdan?currentTab=4',
            });
          }, 2000)
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
    });
  },
  reasonInput: function (e) {
    this.setData({
      reason: e.detail.value,
    });
  },
  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value,
    });
  },
  // uploadImgs:function(){
  //   wx.chooseImage({
  //     success: function(res) {
  //       console.log(res);
  //       var tempFilePaths = res.tempFilePaths
  //       wx.uploadFile({
  //         url: 'http://example.weixin.qq.com/upload', 
  //         filePath: tempFilePaths[0],
  //         name: 'file',
  //         formData:{
  //           'user': 'test'
  //         },
  //         success: function(res){
  //           var data = res.data
  //         }
  //       })
  //     }
  //   });
  // },
  xzlx: function (e) {
    if (e.currentTarget.dataset.types == '退货') {
      this.setData({
        // th:true,
        // hh:false,
        yw: '退货'
      })
    } else if (e.currentTarget.dataset.types == '换货') {
      this.setData({
        // th:false,
        // hh:true,
        yw: '换货'
      })
      this.getAddress()
    }
  },
  changePulldown: function () {
    if (this.data.pulldown) {
      this.setData({
        pulldown: false
      })
    } else {
      this.setData({
        pulldown: true
      })
    }
  }
})