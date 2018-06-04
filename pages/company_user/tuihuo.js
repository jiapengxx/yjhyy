var app = getApp();
// pages/order/downline.js
Page({
  data:{
    orderId:0,
    reason:'',
    remark:'',
    imgUrl:'',
  },
  onLoad:function(options){
    console.log(options)
    if (options.orderId && options.pro_id){
      this.setData({
        orderId: options.orderId,
        pro_id: options.pro_id,
        types:'ywc'
      });
    } else if (options.orderId){
      this.setData({
      orderId: options.orderId,
      types:'dfh'
      });
    }

  },
  //已完成退款   传入orderid proid
  submitReturn: function () {
    var that = this;
    if (!this.data.remark) {
      wx.showToast({
        title: '请填写退款原因',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/orders_edit',
      method: 'post',
      data: {
        id: that.data.orderId,
        type: 'refund',
        back_remark: that.data.remark,
        pro_id:that.data.pro_id
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
  //待发货  退货 传入 orderid
  submitReturnData:function(){
    if(!this.data.remark){
      wx.showToast({
        title: '请填写退款原因',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    // if(!this.data.remark){
    //   wx.showToast({
    //     title: '请填写退货描述',
    //     icon: 'success',
    //     duration: 2000
    //   });
    //   return;
    // }
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/orders_edit',
      method:'post',
      data: {
        id: that.data.orderId,
        type:'refund',
        back_remark:that.data.remark,
        //imgUrl:that.data.imgUrl,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {     
        var status = res.data.status;
        if(status == 1){
          wx.showToast({
            title: '您的申请已提交审核！',
            duration: 2000
          });
          setTimeout(function(){
            wx.redirectTo({
              url: '../company_user/dingdan?currentTab=4',
            });
          },2000)
        }else{
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
    });

  },
  reasonInput:function(e){
    this.setData({
      reason: e.detail.value,
    });
  },
  remarkInput:function(e){
    this.setData({
      remark: e.detail.value,
    });
  },
  uploadImgs:function(){

    wx.chooseImage({
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            //do something
          }
        })
      }
    });
  },
})