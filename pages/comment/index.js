// pages/pjsd/pjsd.js
var app = getApp();
const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    content: '',
    Content: '',
    flag:0,
    // num1:0,
    // num2:0,
    // num3:0,
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
    stars: [1, 1, 1, 1, 1],
    stars1: [1, 1, 1, 1, 1],
    stars2: [1, 1, 1, 1, 1],
    stars3: [1, 1, 1, 1, 1],
    hostUrl: app.d.hostUrl
  },
  getContent: function (e) {
    var content = e.detail.value
    this.setData({
      content: content
    })
    console.log(this.data.content)
  },
  radioChange: function (e) {
    if (this.data.flag == false) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  onLoad: function (options) {
    new ImageUploader(this, 'img1');
    var order_id = options.orderId
    var pid = options.pid
    console.log(order_id, pid)
    this.setData({
      order_id: order_id,
      pid: pid
    })
    // 商品详情数据获取
      var that = this;
      wx.request({
        url: app.d.ceshiUrl + '/Api/Comment/goods_show',
        method: 'post',
        data: {
          pid:pid,
          
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res.data);
          that.setData({
            photo_x: res.data.product.photo_x
          })
          // console.log(res)
        },
        error: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
          });
        },
      });
  },
  upload: function () {
    var that = this
    // console.log(this.data.img1.uploadedImagesPaths)
    var uploadedImagesPaths =       this.data.img1.uploadedImagesPaths;
    var Content = this.data.content
    this.setData({
      Content: Content
    })
    app.uploadimg({
      url: app.d.hostUrl + '/Api/Comment/add',
      //这里是你图片上传的接口
      path: uploadedImagesPaths,
      //这里是选取的图片的地址数组
      data: {
        code: Math.random(10000, 99999),
        uid: app.d.userId,
        pid: that.data.pid,
        num:that.data.num1,
        logistic_grade: that.data.num2,
        store_grade: that.data.num3,
        content:that.data.Content,
        is_name:that.data.flag, 
        order_id: that.data.order_id,
        
        //需要将商品信息，及评价填充信息一同提交
      },
    });
    console.log(that.data.num2, that.data.flag, that.data.num1, that.data.pid, that.data.order_id, that.data.Content, that.data.num3)
  },
  stars: function (e) {
    var num = e.target.id
    if (num == 1) {
      this.setData({
        stars: [3, 1, 1, 1, 1]
      })
    }
    else if (num == 2) {
      this.setData({
        stars: [3, 3, 1, 1, 1]
      })
    }
    else if (num == 3) {
      this.setData({
        stars: [3, 3, 3, 1, 1]
      })
    }
    else if (num == 4) {
      this.setData({
        stars: [3, 3, 3, 3, 1]
      })
    }
    else if (num == 5) {
      this.setData({
        stars: [3, 3, 3, 3, 3]
      })
    }
  },


  stars1: function (e) {
    var num1 = e.target.id
    if (num1 == 1) {
      this.setData({
        stars1: [3, 1, 1, 1, 1]
      })
    }
    else if (num1 == 2) {
      this.setData({
        stars1: [3, 3, 1, 1, 1]
      })
    }
    else if (num1 == 3) {
      this.setData({
        stars1: [3, 3, 3, 1, 1]
      })
    }
    else if (num1 == 4) {
      this.setData({
        stars1: [3, 3, 3, 3, 1]
      })
    }
    else if (num1 == 5) {
      this.setData({
        stars1: [3, 3, 3, 3, 3]
      })
    }
    this.setData(
      {
        num1:num1
      }
    )
  },


  stars2: function (e) {
    var num2 = e.target.id
    if (num2 == 1) {
      this.setData({
        stars2: [3, 1, 1, 1, 1]
      })
    }
    else if (num2 == 2) {
      this.setData({
        stars2: [3, 3, 1, 1, 1]
      })
    }
    else if (num2 == 3) {
      this.setData({
        stars2: [3, 3, 3, 1, 1]
      })
    }
    else if (num2 == 4) {
      this.setData({
        stars2: [3, 3, 3, 3, 1]
      })
    }
    else if (num2 == 5) {
      this.setData({
        stars2: [3, 3, 3, 3, 3]
      })
    }
    this.setData(
      {
        num2:num2
      }
    )
  },



  stars3: function (e) {
    var num3 = e.target.id
    if (num3 == 1) {
      this.setData({
        stars3: [3, 1, 1, 1, 1]
      })
    }
    else if (num3 == 2) {
      this.setData({
        stars3: [3, 3, 1, 1, 1]
      })
    }
    else if (num3 == 3) {
      this.setData({
        stars3: [3, 3, 3, 1, 1]
      })
    }
    else if (num3 == 4) {
      this.setData({
        stars3: [3, 3, 3, 3, 1]
      })
    }
    else if (num3 == 5) {
      this.setData({
        stars3: [3, 3, 3, 3, 3]
      })
    }
    this.setData(
      {
        num3:num3
      }
    )
  }

});
