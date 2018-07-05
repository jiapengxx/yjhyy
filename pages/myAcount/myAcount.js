// pages/myAcount/myAcount.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    wx.request({
      url: app.d.ceshiUrl + '/Api/Company/num_list',
      method: 'post',
      data: {
        uid: app.d.userId,
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
  jbtx:function(){
    console.log(this.data.num.gold)
    wx.navigateTo({
      url: '../jbtx/jbtx?gold='+this.data.num.gold,
    })
  },
  zqjb:function(){
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/do_money',
      method: 'post',
      data: {
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.amount>=199) {
          wx.showModal({
            title: '提示',
            content: '分享即可得金币！是否前往分享？',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../fxgl/fxgl',
                })
              }
            }

          })
        } else {
          wx.showModal({
            title: '提示',
            content: '继续消费'+(199-res.data.amount)+'元，分享即可得金币！是否前往购物？',
            success: function (res) {
              if (res.confirm) {
                if (app.globalData.froms=='company_user'){
                  wx.switchTab({
                    url: '../company_index/company_index',
                  })
                }else{
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }

              } 
            }
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
  toFxgl:function(){
    wx.navigateTo({
      url: '../fxgl/fxgl?height='+550,
      //点击跳转到页面指定的位置
    })
  },
  toMakeCoin:function(){
    wx.showModal({
      title: '提示',
      content: '您是否进入商城,购买商品即可获得银币',
      success: function (res) {
        if (res.confirm) {
          if (app.globalData.froms=='company_user') {
            wx.switchTab({
              url: '../company_index/company_index',
            })
          } else {
            wx.redirectTo({
              url: '../index/index',
            })
          }
        } else if (res.cancel) {
        }
      }
    })
  },
  toUseCoin: function () {
    console.log(app.globalData.froms =='company_user')
    wx.showModal({
      title: '提示',
      content: '您是否进入商城,购买商品时可用银币支付',
      success: function (res) {
        if (res.confirm) {
          if (app.globalData.froms=='company_user') {
            wx.switchTab({
              url: '../company_index/company_index',
            })
          } else {
            wx.redirectTo({
              url: '../index/index',
            })
          }
        } else if (res.cancel) {
        }
      }
    })
  },

  wdyhk:function(){
    wx.navigateTo({
      url: '../wdyhk/wdyhk',
    })
  }
})