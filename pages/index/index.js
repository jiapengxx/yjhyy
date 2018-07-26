var app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    productData: [], 
    tttype: [],
    proCat: [],
    page: 2,
    index: 2,
    brand: [],
    // 滑动
    imgUrl: [],
    kbs: [],
    lastcat: [],
    course: [],
    store_Id:'',
    gz:false,
    store:[],
    itemData: {},
    attrValueList: [],
    buynum: 1,
    
  },
  //跳转商品列表页   
  listdetail: function (e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../listdetail/listdetail?title=' + e.currentTarget.dataset.title,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //跳转商品搜索页  
  suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //后四个分类跳转
  other: function (e) {
    var ptype = e.currentTarget.dataset.ptype;
    var title = e.currentTarget.dataset.text;
    if (ptype == 'news') {
      wx.navigateTo({
        url: '../inf/inf'
      });
    } else if (ptype == 'jxys') {
      wx.navigateTo({
        url: '../synopsis/synopsis?title=教学优势&wedId=2'
      });
    } else if (ptype == 'xyfc') {
      wx.navigateTo({
        url: '../student_style/student_style'
      });
    } else if (ptype == 'gywm') {
      wx.navigateTo({
        url: '../synopsis/synopsis?title=关于我们&wedId=1'
      });
    }
  },


  //品牌街跳转商家详情页
  jj: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../listdetail/listdetail?brandId=' + id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  showInput: function () {
    wx.navigateTo({
      url: '../searchPageShop/searchPageShop',
    })
  },
  tian: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../works/works',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //点击加载更多
  getMore: function (e) {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getlist',
      method: 'post',
      data: { 
        page: page,
        store_id:app.d.store_Id,
         },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var prolist = res.data.prolist;
        if (prolist == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        }
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          productData: that.data.productData.concat(prolist)
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
// 快速购买
  loadProductDetail: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/index',
      method: 'post',
      data: {
        store_id: undefined,
        pro_id: that.data.pro_id,
        r_uid: app.d.userId,
        u_id: that.data.bindUid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var status = res.data.status;
        if (status == 1) {
          var pro = res.data.pro;
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
  setModalStatu: function (e) {
    console.log(e.currentTarget.dataset.flag)
    if (e.currentTarget.dataset.flag=='true'){ 
      this.setData({
        pro_id: e.currentTarget.dataset.proid
      })
      this.loadProductDetail()
      // 如果没有多个规格，则直接添加
   }
    if (this.data.commodityAttr){
          console.log("有规格")
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
        this.setData({
          showModalStatu: true,
          buynum: 1
        });
      }
      if (this.data.HAVE) {
        setTimeout(function () {
          animation.translateY(0).step()
          this.setData({
            animationData: animation
          })
          if (e.currentTarget.dataset.status == 0) {
            this.setData({
              showModalStatu: false,
              attrValueList: [],
              buynum: 1
            });
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
            this.setData({
              showModalStatu: false,
              buynum: 1
            });
          }
        }.bind(this), 200)
        this.setData({
          totalPrice: this.data.itemData.price_yh * this.data.buynum
        });
      }
   }else{
      this.addShopCart()
   }

  },
  selectAttrValue: function (e) {
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index; //属性索引 
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
  changeNum: function (e) {
    var that = this;
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.buynum <= 1) {
        buynum: 1
      }
      else {
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
  addShopCart: function (e) { //添加到购物车
    var that = this;
    //当存在规格数据时
    if (this.data.HAVE) {
      this.setData({
        buff: ''
      })
      for (var i = 0; i < this.data.includeGroup[0].attrValueList.length; i++) {
        if (i != this.data.includeGroup[0].attrValueList.length - 1) {
          this.setData({
            buff: this.data.buff + this.data.includeGroup[0].attrValueList[i].id + ','
          })
        } else {
          console.log(this.data.includeGroup[0].attrValueList[i].id)
          this.setData({
            buff: this.data.buff + this.data.includeGroup[0].attrValueList[i].id
          })
        }
      }
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
        that.setData({
          tids: []
        })
        for (var i = 0; i < that.data.includeGroup[0].attrValueList.length; i++) {
          console.log("www" + i)
          if (that.data.includeGroup[0].attrValueList[i].tid) {
            that.setData({
              tids: that.data.tids.concat(that.data.includeGroup[0].attrValueList[i].tid)
            })
            console.log("qqq" + that.data.tids)
          }
        }
        wx.request({
          url: app.d.ceshiUrl + '/Api/Shopping/add',
          method: 'post',
          data: {
            uid: app.d.userId,
            pid: that.data.pro_id,
            num: that.data.buynum,
            buff: that.data.buff,
            tid: that.data.tids,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var data = res.data;
            if (data.status == 1) {
              
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
    if (count < 2) { // 第一次选中，同属性的值都可选 
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
  },
// 快速购买
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (options) {

    console.log(options)
    if (options.store_Id){
      console.log(options.store_Id+"eqwe")
      app.d.store_Id = options.store_Id;
    } 
    app.editTabBar2();
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/index',
      method: 'post',
      data: {
        store_Id: (app.d.store_Id ? app.d.store_Id : options.store_Id),
        user_id: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.store_id) {
          if (res.data.store_id != app.d.store_Id){
            wx.redirectTo({
              url: '../index/index?store_Id=' + res.data.store_id,
            })
          }else{
            var ggtop = res.data.ggtop;
            var procat = res.data.procat;
            var prolist = res.data.prolist;
            var brand = res.data.brand;
            var course = res.data.course;
            var store = res.data.store;
            that.setData({
              imgUrls: ggtop,
              proCat: procat,
              productData: prolist,
              brand: brand,
              course: course,
              store: store
            });
            if (store != 'null') {
              wx.setNavigationBarTitle({ title: store.name, })
            }
          }
        }else{
          var ggtop = res.data.ggtop;
          var procat = res.data.procat;
          var prolist = res.data.prolist;
          var brand = res.data.brand;
          var course = res.data.course;
          var store = res.data.store;
          that.setData({
            imgUrls: ggtop,
            proCat: procat,
            productData: prolist,
            brand: brand,
            course: course,
            store: store
          });
          if (store != 'null') {
            wx.setNavigationBarTitle({ title: store.name, })
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    this.loadCollect()
    wx.request({
      url: app.d.ceshiUrl + '/Api/BIndex/show_getmore',
      method: 'post',
      data: {
        type: 'all',
        page: 1
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ttype = res.data.type;
        that.setData({
          tttype: ttype,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
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
        console.log(res.data.cl_store)
        for (var i = 0; i < res.data.cl_store.length;i++){
          if (app.d.store_Id == res.data.cl_store[i].store_id) {
            that.setData({
              gz: true
            })
            break
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },

  fiveBlocks: function (e) {

    var id = e.target.id
    console.log(id)
    if (id == 0) {
      this.setData({
        url: '../live/live'
      })
    } else if (id == 1) {
      this.setData({
        url: '../jkbk/jkbk'
      })
    } else if (id == 2) {
      this.setData({
        url: '../jkbg/jkbg'
      })
    } else if (id == 3) {
      this.setData({
        url: '../jkzx/jkzx'
      })
    } else {
      this.setData({
        url: '../fxgl/fxgl'
      })
    }
    wx.navigateTo({
      url: this.data.url,
    })
  },
  gzsj:function(){
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '请先登录',
        content: '登录获取更多信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../user/user',
            })
          }
        }
      })
    } else {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shangchang/shop_collect',
      method: 'post',
      data: {
        store_id: app.d.store_Id,
        uid: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.succ,
          duration: 2000
        });
        that.loadCollect() 
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
    }
  },
  onShow:function(){
    app.globalData.froms = 'user'
    console.log(app.globalData.froms)
  }, 
  onShareAppMessage: function () {
    return {
      title: '' + this.data.store.name,
      path: '/pages/index/index?store_Id=' + app.d.store_Id,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  toPosition:function(){
    var that=this
    console.log(that.data.store.longitude, that.data.store.latitude)
    //获取当前坐标   结合店铺坐标
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: parseFloat(that.data.store.latitude),
          longitude: parseFloat(that.data.store.longitude),
        })
      }
    })
  }
});