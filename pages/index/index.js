//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isLogin:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    customer: {}
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.reqUrl);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    this.cusQue();
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  cusReg :function(){

  },
  cusQue :function( _phone ){
    var that = this;
    wx.request({
      url: app.globalData.reqUrl + '/customer/byPhone.action',
      data: { phone: _phone },
      method: 'POST',
      success: function (res) {
        // success
        console.log("statusCode:" + res);

        var dataBean = res.cus

        that.setData({
          'customer': JSON.parse(res.cus),
          isLogin: true
        })
      },
      fail: function (res) {
        console.log("faile")
      },
      complete: function (res) {
        console.log("complete")
      }
    })
  }
})
