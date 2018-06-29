//index.js
//获取应用实例
var app = getApp();
const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
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
        //以上三个配置项详情请看小程序文档
      },

    }),
  },
  getContent: function (e) {
    var content = e.detail.value
    this.setData({
      Content: content
    })
    console.log(this.data.Content)
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
    if (options.froms) {
      this.setData({
        froms: options.froms
      })
    }
    new ImageUploader(this, 'img1');
  },
  upload: function () {
    var that = this
    if (this.data.img1.uploadedImagesPaths == '' && typeof (this.data.Content) == 'undefined') {
      wx.showToast({
        title: '内容不能为空！',
      })
    }
    else if (this.data.img1.uploadedImagesPaths == '') {

      wx.request({
        url: app.d.ceshiUrl + '/Api/BIndex/upload_content',
        method: 'post',
        data: {
          p_desc:that.data.Content,
          uid: app.d.userId,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功',
            duration: 2000
          });
          setTimeout(function () {
            if (that.data.froms == 'user') {
              wx.redirectTo({
                url: '../user/user',
              }) 
            } else {
              wx.switchTab({
                url: '../company_user/company_user',
              })
            }
          }
            , 3000)
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      }) 
    } else {
      var uploadedImagesPaths = this.data.img1.uploadedImagesPaths;
      app.uploadimg({
        url: app.d.hostUrl + '/Api/BIndex/upload_do',
        //这里是你图片上传的接口
        path: uploadedImagesPaths,
        //这里是选取的图片的地址数组
        data: {
          code: Math.random(10000, 99999),
          uid: app.d.userId,
          p_desc: that.data.Content
        },
      });
    }
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
});
