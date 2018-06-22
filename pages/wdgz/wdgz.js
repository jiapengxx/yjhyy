const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**      * 页面配置      */
    winWidth: 0, winHeight: 0,
    // tab切换   
    height: 0,
    currentTab: 0,
    flag: true,
    host: app.d.hostImg,
    shoucang_good: [],
    gz_store: [],
    qxgz: false,
    xk: false,
    check: false,
    bj_id: 0,
    array_gz: [],
    pro_Id: [],
    step: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    this.loadCollect()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**     * 滑动切换tab     */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /**    * 点击tab切换    */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) { return false; }
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  changePoint: function (e) {
    var item_id = e.target.id
    //不用flag更快捷
    // this.setData({
    //   itemId: item_id,
    //   flag: false
    // })
    if (this.data.flag) {
      this.setData({
        itemId: item_id,
        flag: false
      })
      setTimeout(function () {
        this.setData({
          itemId: 9999,
          flag: true
        })
      }.bind(this),1300)
    }
    else {
      this.setData({
        itemId: 9999,
        flag: true
      })
    }
  },
  bj: function (e) {

    var bj_id = e.target.id
    console.log(bj_id)
    if (bj_id == 0) {
      this.setData({
        qxgz: true,
        xk: true,
        bj_id: 1
      })
      this.creat_array()

    } else {
      this.setData({
        qxgz: false,
        xk: false,
        bj_id: 0,
        array_gz:[],
        step:0
      })

    }
  },
  //创建数组
  creat_array: function () {
    console.log(this.data.shoucang_good.length)
    var that = this
    for (var i = 0; i < this.data.shoucang_good.length; i++) {
      this.setData({
        array_gz: this.data.array_gz.concat({ type: 'circle', pro_id: '' + this.data.shoucang_good[i].pro_id })
      })
    }
    console.log(this.data.array_gz)
  },
  bindCheckbox: function (e) {
    // this.setData({
    //   INdex: e.target.id,
    //   checked:!this.data.check,
    //   check:!this.data.checked
    // })
    var index = parseInt(e.target.dataset.index)
    //对数组数据进行处理
    var type = this.data.array_gz[index].type;
    var array_gz = this.data.array_gz;
    if (type == 'circle') {
      //未选中时
      array_gz[index].type = 'success_circle';
    } else {
      array_gz[index].type = 'circle';
    }
    this.setData({
      array_gz: this.data.array_gz
    });
  },


  cancelGZ: function () {
    var that = this
    this.setData({
      pro_Id:[]
    })
    for (var i = 0; i < this.data.array_gz.length; i++) {
      if (this.data.array_gz[i].type =='success_circle'){
        this.setData({
          pro_Id: this.data.pro_Id.concat(this.data.shoucang_good[i].pro_id)
        })
      }
    }
    //商品ID数组
    console.log(this.data.pro_Id)
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/BCollet/pro_save',
          method: 'post',
          data: {
            uid: app.d.userId,
            //传入商品数组
            pro_id: that.data.pro_Id,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            var data = res.data;
            if (data.status == 1) {
              that.loadCollect();
that.setData({
  step:1,
  bj_id:0,
  qxgz: false,
})

            } else {
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
        });
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
  toBtoC: function (e) {
    var store_Id = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?store_Id=' + store_Id,
    })
    app.d.store_Id = store_Id;
  },
  bindSelectAll: function () {
    var array_gz = this.data.array_gz;
    if (this.data.step==0) {
      //当第一次触发都将 circle转为success_circle
      for (var i = 0; i < this.data.shoucang_good.length; i++) {
        array_gz[i].type = 'success_circle';
      }
      this.setData({
        array_gz: this.data.array_gz,
        step:1
      });
    }else{
    for (var i = 0; i < this.data.shoucang_good.length; i++) {
        array_gz[i].type = 'circle';
    }
    this.setData({
      array_gz: this.data.array_gz,
      step: 0
    });
    }
  },
  cancelSp: function () {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/BCollet/pro_save',
          method: 'post',
          data: {
            uid: app.d.userId,
            pro_id: this.data.pro_Id,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            var data = res.data;
            if (data.status == 1) {
              that.loadCollect();
            } else {
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
        });
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
  cancel: function (e) {
    var that = this
    var store_id = e.target.id
    wx.request({
      url: app.d.ceshiUrl + '/Api/BCollet/store_save',
      method: 'post',
      data: {
        uid: app.d.userId,
        store_id: store_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.loadCollect()
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
    this.setData({
      itemId: 9999,
      flag: true
    })
  },
  loadCollect: function () {
    var that = this
    wx.request({
      url: app.d.hostUrl + '/Api/BCollet/show',
      method: 'post',
      data: {
        user_id: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var cl_product = res.data.cl_product
        var cl_store = res.data.cl_store
        that.setData({
          shoucang_good: cl_product,
          gz_store: cl_store
        });
        console.log(that.data.shoucang_good)
        console.log(that.data.gz_store)
        var count1 = that.data.shoucang_good.length
        var count2 = that.data.gz_store.length
        that.setData({
          height1: 440 * parseInt((count1 + 1) / 2) + 40,
          height2: 165 * count2 + 40,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  }
})