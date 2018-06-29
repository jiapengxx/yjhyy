// pages/register/register.js
var app = getApp()
// var step = 1 // 当前操作的step  
var maxTime = 60
var currentTime = maxTime //倒计时的事件（单位：s） 
var interval = null
var hintMsg = null // 提示  
var check = require("../../utils/check.js")
var webUtils = require("../../utils/registerWebUtil.js")
var step_g = 1
var phoneNum = null, identifyCode = null, password = null, rePassword = null;

Page({
  data: {
    telphone: '',
    check: '',
    time: currentTime,
    switch_one: false,
    switch_two: true,
    switch_three: true,
    flag: false

  },
  onLoad: function () {
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
  },
  onUnload: function () {
    currentTime = maxTime
    if (interval != null) {
      clearInterval(interval)
    }
  },
  //对手机号填充值进行检查
  tel: function (e) {
    var telphone = e.detail.value
    this.setData({
      telphone: telphone
    })
    if (e.detail.value.length === 0) {
      this.setData({
        tel: '',
        flag: false
      })
      // wx.showToast({
      //   title: '手机号不许为空',
      //   icon: 'loading'
      // })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value))) {
      this.setData({
        tel: '',
        flag: false
      })
      // wx.showToast({
      //   title: '手机号格式不正确',
      //   icon:'loading'
      // })
    } else {
      this.setData({
        flag: true
      })
    }

  },
  //对获取验证码的条件进行判断,
  //当手机号信息无误时才可操作
  getCode: function () {
    var that = this
    if (this.data.flag) {
      //空值发送验证码的状态
      this.setData({
        switch_one: true,
        switch_two: false,
      })
      interval = setInterval(function () {
        currentTime--;
        that.setData({
          time: currentTime
        })

        if (currentTime <= 0) {
          clearInterval(interval)
          currentTime = -1
        }
      }, 1000)
      if (hintMsg != null) {
        wx.showToast({
          title: hintMsg,
          icon: 'loading',
          duration: 700
        })
      }
      this.setData({
        step: step_g
      })
    } else {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',

      })
    }
    if (this.data.flag) {
      wx.request({
        url: app.d.ceshiUrl + '/Api/User/check_do',
        method: 'post',
        data: {
          tel: that.data.telphone,
          uid: app.d.userId
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var check = res.data.check;
          var time = res.data.time;
          that.setData({
            checks: check,
            times: time
          });
          if (res.data.status == 0) {
            wx.showToast({
              title: res.data.err,
              duration: 2000
            });
          }
          if (res.data.status == 1) {
            wx.showToast({
              title: '验证码已发送',
            })
          }
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


  reGetCode: function () {

    if (currentTime < 0) {
      var that = this
      currentTime = maxTime
      interval = setInterval(function () {
        currentTime--
        that.setData({
          time: currentTime,
          switch_three: true,
        })

        if (currentTime <= 0) {
          currentTime = -1
          clearInterval(interval)
          that.setData({
            switch_three: false,
          })
        }
      }, 1000)
      wx.request({
        url: app.d.ceshiUrl + '/Api/User/check_do',
        method: 'post',
        data: {
          uid: app.d.userId,
          tel: that.data.telphone,
          check: that.data.check
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var check = res.data.check;
          var time = res.data.time;
          console.log(that.check);
          //that.initProductData(data);
          // that.setData({
          //   checks: check,
          //   times:time
          // });
          if (res.data.status == 0) {
            wx.showToast({
              title: res.data.err,
              duration: 2000
            });
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
    } else {
      wx.showToast({
        title: '短信已发到您的手机，请稍后重试!',
        icon: 'loading',
        duration: 700
      })
    }
  },
  checkInput: function (e) {
    var check = e.detail.value
    this.setData({
      check: check,
    })
    console.log(this.data.check)
  },
  register: function () {
    var that = this
    console.log('phone:' + that.data.telphone, 'check:' + that.data.check)
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/register',
      method: 'post',
      data: {
        uid: app.d.userId,
        tel: that.data.telphone,
        check: that.data.check
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var check = res.data.check;
        var time = res.data.time;
        console.log(that.check);
        //that.initProductData(data);
        // that.setData({
        //   checks: check,
        //   times:time
        // });
        if (res.data.status == 0 || that.data.flag == false) {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
        //status=1时验证码输入正确
        if (res.data.status == 1 && that.data.flag) {
          wx.showToast({
            title: '注册成功',
          })
          setTimeout(function () {
            if (app.globalData.froms == 'company_user') {
              wx.switchTab({
                url: '../company_index/company_index',
              })
            } else {
              wx.redirectTo({
                url: '../index/index',
              })
            }
          }, 3000)
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


  nextStep: function () {
    var that = this
    if (step_g == 1) {
      if (firstStep()) {
        step_g = 2
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            time: currentTime
          })

          if (currentTime <= 0) {
            clearInterval(interval)
            currentTime = -1
          }
        }, 1000)
      }
    } else if (step_g == 2) {
      if (secondStep()) {
        step_g = 3
        clearInterval(interval)
      }
    } else {
      if (thirdStep()) {
        // 完成注册  
        wx.navigateTo({
          url: '../login/login'
        })
      }
    }
    if (hintMsg != null) {
      wx.showToast({
        title: hintMsg,
        icon: 'loading',
        duration: 700
      })
    }

    this.setData({
      step: step_g
    })
  },
  input_phoneNum: function (e) {
    phoneNum = e.detail.value
  },
  input_identifyCode: function (e) {
    identifyCode = e.detail.value
  },
  input_password: function (e) {
    password = e.detail.value
  },
  input_rePassword: function (e) {
    rePassword = e.detail.value
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
  reSendPhoneNum: function () {
    if (currentTime < 0) {
      var that = this
      currentTime = maxTime
      interval = setInterval(function () {
        currentTime--
        that.setData({
          time: currentTime
        })

        if (currentTime <= 0) {
          currentTime = -1
          clearInterval(interval)
        }
      }, 1000)
    } else {
      wx.showToast({
        title: '短信已发到您的手机，请稍后重试!',
        icon: 'loading',
        duration: 700
      })
    }
  }
})

function firstStep() { // 提交电话号码，获取［验证码］  
  if (!check.checkPhoneNum(phoneNum)) {
    hintMsg = "请输入正确的电话号码!"
    return false
  }

  if (webUtils.submitPhoneNum(phoneNum)) {
    hintMsg = null
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false

  if (!check.checkIsNotNull(identifyCode)) {
    hintMsg = "请输入验证码!"
    return false
  }

  if (webUtils.submitIdentifyCode(identifyCode)) {
    hintMsg = null
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false
}

// 提交［验证码］  
function secondStep() {
  if (!check.checkIsNotNull(identifyCode)) {
    hintMsg = "请输入验证码!"
    return false
  }

  if (webUtils.submitIdentifyCode(identifyCode)) {
    hintMsg = null
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false
}

function thirdStep() { // 提交［密码］和［重新密码］  

  console.log(password + "===" + rePassword)

  if (!check.isContentEqual(password, rePassword)) {
    hintMsg = "两次密码不一致！"
    return false
  }

  if (webUtils.submitPassword(password)) {
    hintMsg = "注册成功"
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false
}