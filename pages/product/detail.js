
//获取应用实例  
var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    host: app.d.hostImg,
    flag: 1,
    All: [],
    Medium: [],
    Good: [],
    Bad: [],
    bannerApp: true,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, //tab切换  
    pro_id: 0,
    itemData: {},
    bannerItem: [],
    buynum: 1,
    // 产品图片轮播
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    attrValueList: []
  },

  // 立即购买弹窗
  setModalStatus: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true,
          buynum: 1
        }
      );
    }

    //当规格数据存在时执行  true
    if (this.data.HAVE) {
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation
        })
        if (e.currentTarget.dataset.status == 0) {
          this.setData(
            {
              showModalStatus: false,
              attrValueList: [],
              buynum: 1
            }
          );
        }
      }.bind(this), 200)
      this.setData({
        includeGroup: this.data.commodityAttr,
        totalPrice: this.data.itemData.price_yh * this.data.buynum
      });
      this.distachAttrValue(this.data.commodityAttr);
      if (this.data.commodityAttr.length == 1) {
        for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
          this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
        }
        this.setData({
          attrValueList: this.data.attrValueList
        });
      }
    }
    else {
      //当规格数据不存在时
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation
        })
        if (e.currentTarget.dataset.status == 0) {
          this.setData(
            {
              showModalStatus: false,
              buynum: 1
            }
          );
        }
      }.bind(this), 200)
      this.setData({
        totalPrice: this.data.itemData.price_yh * this.data.buynum
      });
    }
  },

  // 加入购物车弹窗
  setModalStatu: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatu: true,
          buynum: 1
        }
      );
    }
    if (this.data.HAVE) {
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation
        })
        if (e.currentTarget.dataset.status == 0) {
          this.setData(
            {
              showModalStatu: false,
              attrValueList: [],
              buynum: 1
            }
          );
        }
      }.bind(this), 200)
      this.setData({
        includeGroup: this.data.commodityAttr,
        totalPrice: this.data.itemData.price_yh * this.data.buynum
      });
      this.distachAttrValue(this.data.commodityAttr);
      if (this.data.commodityAttr.length == 1) {
        for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
          this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
        }
        this.setData({
          attrValueList: this.data.attrValueList
        });
      }
    } else {
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation
        })
        if (e.currentTarget.dataset.status == 0) {
          this.setData(
            {
              showModalStatu: false,
              buynum:1
            }
          );
        }
      }.bind(this), 200)
      this.setData({
        totalPrice: this.data.itemData.price_yh * this.data.buynum
      });
    }
  },

  // 加减
  changeNum: function (e) {
    var that = this;
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.buynum <= 1) {
        buynum: 1
      } else {
        this.setData({
          buynum: this.data.buynum - 1
        })
      };
    } else {
      this.setData({
        buynum: this.data.buynum + 1
      })
    };
    this.count()
  },
  // 传值
  onLoad: function (option) {
    //需要修改判断   
    console.log(option)
    var that = this;
    //先对登录做判断
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '请先登录',
        content: '登录获取更多信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../company_user/company_user',
            })
          }
        }
      })
    } else {
      if ((typeof option.DATA) != "undefined") {
        var DAta = option.DATA.split(",")
        this.setData({
          bindUid: DAta[0],
          pro_id: DAta[1],
          store_id: DAta[2]
        })

      } else {
        this.setData({
          pro_id: option.pro_id,
          uid: app.d.userId,
          // r_uid: option.r_uid
        });
      }

      that.loadProductDetail();
      that.loadProductEvaluate();
    }
  },
  // 商品详情数据获取
  loadProductDetail: function () {
    console.log("aaa")
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/index',
      method: 'post',
      data: {
        pro_id: that.data.pro_id,
        r_uid: app.d.userId,
        u_id: that.data.bindUid,
        openid: app.globalData.userInfo.openid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          var pro = res.data.pro;
          var content = pro.content;
          WxParse.wxParse('content', 'html', content, that, 3);
          // console.log(res.data.commodityAttr+"111");
          that.setData({
            itemData: pro,
            bannerItem: pro.img_arr,
            collect: res.data.pro.collect,
            store_id: res.data.pro.store_id
          })
          if (res.data.commodityAttr != null) {
            that.setData({
              commodityAttr: res.data.commodityAttr,
              HAVE: true
            })
          } else {
            that.setData({
              HAVE: false
            })
          }
        } else {
          console.log(status)
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },
    });
  },
  //商品评价数据获取
  loadProductEvaluate: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Comment/comment_show',
      method: 'post',
      data: {
        pid: that.data.pro_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.product_dp.length != 0) {
          that.setData({
            All: res.data.product_dp.all,
            Good: res.data.product_dp.good,
            Medium: res.data.product_dp.medium,
            Bad: res.data.product_dp.bad
          })
        } else {
          that.setData({
            All: [],
            Good: [],
            Medium: [],
            Bad: []
          })
        }

      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },
    });
  },
  getFlag: function (e) {
    var ID = e.target.id
    if (ID == 1) {
      this.setData({
        flag: 1
      })
    }
    if (ID == 2) {
      this.setData({
        flag: 2
      })
    }
    if (ID == 3) {
      this.setData({
        flag: 3
      })
    }
    if (ID == 4) {
      this.setData({
        flag: 4
      })
    }

  },
  // 属性选择
  onShow: function () {

    // this.loadProductDetail();
    // this.loadProductEvaluate();
  },
  /* 获取数据 */
  distachAttrValue: function (commodityAttr) {
    /** 
    将后台返回的数据组合成类似 
    { 
    attrKey:'型号', 
    attrValueList:['1','2','3'] 
    } 
    */
    // 把数据对象的数据（视图使用），写到局部内 
    var attrValueList = this.data.attrValueList;
    // 遍历获取的数据 
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
        // console.log('属性索引', attrIndex); 
        // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置 
        if (attrIndex >= 0) {
          // 如果属性值数组中没有该值，push新值；否则不处理 
          if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
            attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
          }
        } else {
          attrValueList.push({
            attrKey: commodityAttr[i].attrValueList[j].attrKey,
            attrValues: [commodityAttr[i].attrValueList[j].attrValue]
          });
        }
      }
    }
    // console.log('result', attrValueList) 
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].attrValueStatus) {
          attrValueList[i].attrValueStatus[j] = true;
        } else {
          attrValueList[i].attrValueStatus = [];
          attrValueList[i].attrValueStatus[j] = true;
        }
      }
    }
    this.setData({
      attrValueList: attrValueList
    });
  },
  getAttrIndex: function (attrName, attrValueList) {
    // 判断数组中的attrKey是否有该属性值 
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrName == attrValueList[i].attrKey) {
        break;
      }
    }
    return i < attrValueList.length ? i : -1;
  },
  isValueExist: function (value, valueArr) {
    // 判断是否已有属性值 
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i] == value) {
        break;
      }
    }
    return i < valueArr.length;
  },
  /* 选择属性值事件 */
  selectAttrValue: function (e) {
    /* 
    点选属性值，联动判断其他属性值是否可选 
    { 
    attrKey:'型号', 
    attrValueList:['1','2','3'], 
    selectedValue:'1', 
    attrValueStatus:[true,true,true] 
    } 
    console.log(e.currentTarget.dataset); 
    */
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index;//属性索引 
    var key = e.currentTarget.dataset.key;
    var price = e.currentTarget.dataset.price;
    var id = e.currentTarget.dataset.id;
    var value = e.currentTarget.dataset.value;
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
      if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
        // 取消选中 
        this.disSelectValue(attrValueList, index, key, value);
      } else {
        // 选中 
        this.selectValue(attrValueList, index, key, value);
      }
    }
  },
  /* 选中 */
  selectValue: function (attrValueList, index, key, value, unselectStatus) {
    // console.log('firstIndex', this.data.firstIndex); 
    var includeGroup = [];
    if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选 
      var commodityAttr = this.data.commodityAttr;
      // 其他选中的属性值全都置空 
      // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus); 
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = '';
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup;
    }

    // console.log('选中', commodityAttr, index, key, value); 
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
          includeGroup.push(commodityAttr[i]);
        }
      }
    }
    attrValueList[index].selectedValue = value;


    // 判断属性是否可选 
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = false;
      }
    }
    for (var k = 0; k < attrValueList.length; k++) {
      for (var i = 0; i < includeGroup.length; i++) {
        for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
          if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
            for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
              if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                attrValueList[k].attrValueStatus[m] = true;
              }
            }
          }
        }
      }
    }
    // console.log('结果', attrValueList); 
    this.setData({
      attrValueList: attrValueList,
      includeGroup: includeGroup
    });

    var count = 0;
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].selectedValue) {
          count++;
          break;
        }
      }
    }
    if (count < 2) {// 第一次选中，同属性的值都可选 
      this.setData({
        firstIndex: index
      });
    } else {
      this.setData({
        firstIndex: -1
      });
    }
    this.count()

  },
  /* 取消选中 */
  disSelectValue: function (attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr;
    attrValueList[index].selectedValue = '';

    // 判断属性是否可选 
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = true;
      }
    }
    this.setData({
      includeGroup: commodityAttr,
      attrValueList: attrValueList
    });

    for (var i = 0; i < attrValueList.length; i++) {
      if (attrValueList[i].selectedValue) {
        this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
      }
    }

    this.count()
  },

  initProductData: function (data) {
    data["LunBoProductImageUrl"] = [];
    var imgs = data.LunBoProductImage.split(';');
    for (let url of imgs) {
      url && data["LunBoProductImageUrl"].push(app.d.hostImg + url);
    }
    data.Price = data.Price / 100;
    data.VedioImagePath = app.d.hostVideo + '/' + data.VedioImagePath;
    data.videoPath = app.d.hostVideo + '/' + data.videoPath;
  },

  //添加到收藏
  addFavorites: function (e) {
    var that = this;
    if (this.data.collect == 0) {
      this.setData({
        collect: 1
      })
    } else {
      this.setData({
        collect: 0
      })
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/col',
      method: 'post',
      data: {
        uid: app.d.userId,
        pid: that.data.pro_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data;
        if (data.status == 1) {
          wx.showToast({
            title: '操作成功！',
            duration: 2000
          });
          that.data.itemData.isCollect = true;
        } else {
          wx.showToast({
            title: data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  addShopCart: function (e) { //添加到购物车
    var that = this;
    //当存在规格数据时
    if (this.data.HAVE) {
      var buff = '' + this.data.includeGroup[0].attrValueList[0].id + ',' + this.data.includeGroup[0].attrValueList[1].id + ',' + this.data.includeGroup[0].attrValueList[2].id
      console.log(buff)
      var value = [];
      for (var i = 0; i < this.data.attrValueList.length; i++) {
        if (!this.data.attrValueList[i].selectedValue) {
          break;
        }
        value.push(this.data.attrValueList[i].selectedValue);
      }
      if (i < this.data.attrValueList.length) {
        wx.showToast({
          title: '请选择完整！',
          icon: 'loading',
          duration: 1000
        })
      } else {
        wx.request({
          url: app.d.ceshiUrl + '/Api/Shopping/add',
          method: 'post',
          data: {
            uid: app.d.userId,
            pid: that.data.pro_id,
            num: that.data.buynum,
            buff: buff
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var data = res.data;
            if (data.status == 1) {
              var DATAs = '' + that.data.includeGroup[0].attrValueList[0].id + ',' + that.data.includeGroup[0].attrValueList[1].id + ',' + that.data.includeGroup[0].attrValueList[2].id + ',' + data.cart_id
              var ptype = e.currentTarget.dataset.type;
              if (ptype == 'buynow') {
                wx.redirectTo({
                  url: '../order/pay?DATAs=' + DATAs
                });
                return;
              } else {
                wx.showToast({
                  title: '加入购物车成功',
                  icon: 'success',
                  duration: 1000
                });
                setTimeout(function () {
                  that.setData({
                    showModalStatu: false,
                    attrValueList: [],
                    buynum: 1
                  })
                }, 1000)
              }
            } else {
              wx.showToast({
                title: data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    } else {
      //当不存在规格数据时
      wx.request({
        url: app.d.ceshiUrl + '/Api/Shopping/add',
        method: 'post',
        data: {
          uid: app.d.userId,
          pid: that.data.pro_id,
          num: that.data.buynum,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.status == 1) { 
            var ptype = e.currentTarget.dataset.type;
            if (ptype == 'buynow') {
              wx.redirectTo({
                url: '../order/pay?cartId='+res.data.cart_id
              });
              return;
            } else {
              wx.showToast({
                title: '加入购物车成功',
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                that.setData({
                  showModalStatu: false,
                  buynum: 1
                })
              }, 1000)
            }
          } else {
            wx.showToast({
              title: data.err,
              duration: 2000
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      });
    }
  },
  bindChange: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  initNavHeight: function () {////获取系统信息
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
  bannerClosed: function () {
    this.setData({
      bannerApp: false,
    })
  },
  swichNav: function (e) {//点击tab切换
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    var DATA = '' + app.d.userId + ',' + this.data.pro_id + ',' + this.data.store_id
    if (res.from === 'button') {
      return {
        title: '' + this.data.itemData.name,
        path: '/pages/product/detail?DATA=' + DATA,
        imageUrl: '' + this.data.itemData.photo_x,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },
  toBtoC: function () {
    wx.navigateTo({
      url: '../index/index?store_Id=' + this.data.store_id,
    })
    app.d.store_Id = this.data.store_id;
  },
  count: function () {
    if (!this.data.HAVE) {
      this.setData({
        totalPrice: this.data.itemData.price_yh * this.data.buynum
      })
    } else {
      this.setData({
        totalPrice: (parseFloat(this.data.itemData.price_yh) + parseFloat(this.data.includeGroup[0].price)) * this.data.buynum
      })
    }
    // if (this.data.includeGroup.length == this.data.commodityAttr.length) {
    //   this.setData({
    //     totalPrice: this.data.itemData.price_yh * this.data.buynum
    //   })
    // } else {
    //   this.setData({
    //     totalPrice: (parseFloat(this.data.itemData.price_yh) + parseFloat(this.data.includeGroup[0].price)) * this.data.buynum
    //   })
    // }
  }
});

