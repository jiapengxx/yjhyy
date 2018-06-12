var app = getApp();
const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    orderId: 0,
    reason: '',
    remark: '',
    imgUrl: '',
    host: app.d.hostImg,
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
          product: res.data.order_product
        })
      },
    });
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
    } else {
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
            back: (that.data.yw == '退货' ? 3 : 5)
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
            back: (that.data.yw == '退货' ? 3 : 5)
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