//index.js
//获取应用实例
var app=getApp();
const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    Content:'',
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
  getContent:function(e){
    var content=e.detail.value
this.setData({
  content:content
})
    console.log(this.data.content)
  },
  onLoad: function () {
    new ImageUploader(this, 'img1');
  },
  upload: function () {
    var that=this
    // console.log(this.data.img1.uploadedImagesPaths);
    var uploadedImagesPaths = this.data.img1.uploadedImagesPaths;
    var Content=this.data.content
    
this.setData({
  Content: Content
})
    app.uploadimg({
      url: app.d.hostUrl + '/Api/BIndex/upload_do',
      //这里是你图片上传的接口
      path: uploadedImagesPaths,
      //这里是选取的图片的地址数组
      data:{
         code: Math.random(10000, 99999),
         uid:app.d.userId,
         p_desc:that.data.Content
      },
    });
  },
 
});
