(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-login-page-pwd-login-pwd-login"],{"04bd":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,"uni-view[data-v-031707ce]{display:flex;box-sizing:border-box;flex-direction:column}\n.content[data-v-031707ce]{padding:0 %?50?%;width:%?750?%;flex:1}.input-box[data-v-031707ce]{padding:0 15px;margin-bottom:10px;background-color:#f8f8f8;border-radius:6px;font-size:%?28?%}.get-code[data-v-031707ce]{margin:0;margin-top:15px;background-color:#7275d3;color:#fff}.input-box[data-v-031707ce],\r\n.get-code[data-v-031707ce]{height:45px;line-height:45px}.title[data-v-031707ce]{text-align:center;padding-bottom:5px}.tip[data-v-031707ce]{color:#666;font-size:%?26?%;margin:6px 0}.easyinput[data-v-031707ce]{background-color:#f8f8f8;border-radius:%?6?%}.send-btn[data-v-031707ce]{width:100%;margin-top:15px;border-radius:%?6?%}.link[data-v-031707ce]{color:#04498c}.slot-content[data-v-031707ce]{padding:10px}.usercenter-top[data-v-031707ce]{color:#fff;font-size:16px;height:44px;line-height:44px}.usercenter-top-left[data-v-031707ce]{position:absolute;left:4px;top:12px}.usercenter-top-mine[data-v-031707ce]{text-align:center}.login-back[data-v-031707ce]{height:100vh;background:linear-gradient(#777ece,rgb(255 255 255));background-size:cover;background-repeat:no-repeat;background-position:50%}\r\n/* .pwd-login{\r\n\tpadding-top: 10em;\r\n}\r\n.pwd-login .title{\r\n\tfont-size: 24px;\r\n\tmargin-bottom: 20px;\r\n} */.auth-box[data-v-031707ce]{flex-direction:row;justify-content:space-between;margin-top:20px;text-align:right}.auth-box .link[data-v-031707ce]{font-size:%?26?%}.login-text-sub[data-v-031707ce]{color:#8a8f8b}.toRegister[data-v-031707ce]{margin-top:80px;width:%?600?%}.captcha-box[data-v-031707ce]{flex-direction:row;align-items:center;justify-content:flex-end}.captcha-img[data-v-031707ce]{margin:15px 15px 0 0;width:%?250?%}.captcha[data-v-031707ce]{width:%?350?%}.login-back-con[data-v-031707ce]{width:80%;margin:0 auto;margin-top:40px\r\n\t/* margin: 290px auto 0px auto; */}.login-back-con .u-btn[data-v-031707ce]{border-radius:50px}.login-back-con .input-box[data-v-031707ce]{height:40px;line-height:40px}",""]),e.exports=t},1096:function(e,t,n){"use strict";var a=n("9771"),i=n.n(a);i.a},79668:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var a={uNavbar:n("e660").default,uImage:n("7a28").default,uButton:n("c7c3").default,uModal:n("d57c").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:" pwd-login"},[n("v-uni-view",{staticClass:"login-back"},[n("v-uni-view",{staticClass:"usercenter-top"},[n("u-navbar",{attrs:{"is-back":!0,title:"用户登录","border-bottom":!1,"title-color":"#fff","back-icon-color":"#fff",background:{background:"none"}}})],1),n("v-uni-view",{staticClass:"login_back_logo"},[n("u-image",{attrs:{width:"100%",src:"/static/login-index/login_back.png",mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"login-back-con"},[n("v-uni-input",{staticClass:"input-box",attrs:{inputBorder:!1,placeholder:"请输入登录名"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),n("v-uni-input",{staticClass:"input-box",attrs:{type:"password",inputBorder:!1,placeholder:e.$t("pwdLogin.passwordPlaceholder")},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e.captchaBase64?n("v-uni-view",{staticClass:"captcha-box"},[n("v-uni-image",{staticClass:"captcha-img",attrs:{src:e.captchaBase64,mode:"widthFix"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.createCaptcha.apply(void 0,arguments)}}}),n("v-uni-input",{staticClass:"input-box captcha",attrs:{type:"text",inputBorder:!1,placeholder:e.$t("pwdLogin.verifyCodePlaceholder")},model:{value:e.captcha,callback:function(t){e.captcha=t},expression:"captcha"}})],1):e._e(),n("v-uni-view",{staticClass:"auth-box"},[n("v-uni-text",{staticClass:"link",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toRetrievePwd.apply(void 0,arguments)}}},[e._v(e._s(e.$t("pwdLogin.forgetPassword")))]),n("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.showRegister,expression:"showRegister"}],staticClass:"link",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toRegister.apply(void 0,arguments)}}},[e._v(e._s(e.registerText))])],1),n("u-button",{staticClass:"send-btn",attrs:{disabled:!e.canLogin,type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pwdLogin.apply(void 0,arguments)}}},[e._v(e._s(e.$t("pwdLogin.login")))])],1)],1),n("sevicecontent",{ref:"sevicecontent",on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.confirmcontent.apply(void 0,arguments)}}}),n("u-modal",{model:{value:e.showfindpass,callback:function(t){e.showfindpass=t},expression:"showfindpass"}},[n("v-uni-view",{staticClass:"slot-content",staticStyle:{padding:"10px"}},[e._v(e._s(e.passcontent))])],1),n("u-modal",{attrs:{"confirm-text":"重新提交","cancel-text":"退出","show-cancel-button":!0},on:{cancel:function(t){arguments[0]=t=e.$handleEvent(t),e.confimsh.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.reconfirmsh.apply(void 0,arguments)}},model:{value:e.showshinfo,callback:function(t){e.showshinfo=t},expression:"showshinfo"}},[n("v-uni-view",{staticStyle:{padding:"10px"},domProps:{innerHTML:e._s(e.shcontent)}})],1)],1)},o=[]},"905d":function(e,t,n){"use strict";n.r(t);var a=n("b9f4"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},9771:function(e,t,n){var a=n("04bd");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("0cb87a42",a,!0,{sourceMap:!1,shadowMode:!1})},b9f4:function(e,t,n){"use strict";(function(e){var a=n("4ea4");n("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var i=a(n("1da1")),o=a(n("698c")),c=a(n("1f70")),s={mixins:[o.default],components:{sevicecontent:c.default},data:function(){return{showshinfo:!1,showfindpass:!1,password:"",username:"",agree:!0,captchaBase64:"",captcha:"",showRegister:!0,registerText:"注册账号",isnewinfo:"",shcontent:""}},created:function(){getApp().globalData.systemconfig},computed:{passcontent:function(){var e="",t=getApp().globalData.systemconfig;return t["800021"]&&(e=t["800021"]),e},canLogin:function(){return this.username.length&&this.isPwd},isPwd:function(){return/^.{6,20}$/.test(this.password)},isPhone:function(){return/^1\d{10}$/.test(this.phone)}},methods:{goback:function(){uni.navigateBack()},toRetrievePwd:function(){this.showfindpass=!0},confirmnc:function(){uni.navigateTo({url:"/pages/ucenter/login-page/pwd-login/pwd-weibo"})},confirmcontent:function(){var t=this;uni.showLoading({title:"正在处理..."}),e.callFunction({name:"uni-id-cf",data:{action:"login",params:{username:this.username,password:this.password,isbdwb:!0,captcha:this.captcha}},success:function(e){var n=e.result;0===n.code?(uni.setStorageSync("userInfo",n.userInfo),t.checkisbdwb(n.userInfo.username).then((function(e){uni.hideLoading(),e?(uni.setStorageSync("istgzcsh_success",!0),t.loginSuccess(n)):t.confirmnc()}))):(uni.hideLoading(),n.needCaptcha?(uni.showToast({title:n.msg,icon:"none"}),t.createCaptcha()):uni.showModal({title:t.$t("common").error,content:n.msg,showCancel:!1,confirmText:t.$t("common").gotIt}))}})},pwdLogin:function(){var e=uni.getStorageSync("agree_service");e?this.confirmcontent():this.$refs.sevicecontent.show()},checkisbdwb:function(t){var n=this;return new Promise(function(){var a=(0,i.default)(regeneratorRuntime.mark((function a(i){var o,c,s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return o=e.database(),c=o.collection("uni-id-users"),a.next=4,c.where({username:t}).field("username,isbdwb,weiboname,weibocontent,nickname").get();case 4:if(s=a.sent,!(s.result.data&&s.result.data.length>0)){a.next=20;break}if(uni.hideLoading(),r=s.result.data[0],!r.isbdwb){a.next=12;break}i(!0),a.next=18;break;case 12:if(!r.weiboname||!r.weibocontent){a.next=17;break}return a.next=15,n.checknewinfo(r);case 15:a.next=18;break;case 17:i(!1);case 18:a.next=21;break;case 20:i(!1);case 21:console.log("result",s);case 22:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())},confimsh:function(){if("undefined"!=typeof plus){var e=plus.webview.currentWebview().opener();mui.fire(e,"quit",{data:"quit"}),console.log("在这里退出App")}},reconfirmsh:function(){uni.navigateTo({url:"/pages/ucenter/login-page/pwd-login/pwd-weibo"})},checknewinfo:function(t){var n=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var i,o,c,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n.shcontent="您已提交微博验证【"+t.weibocontent+"】申请，如已发微博，请等待管理员审核",i=uni.getStorageSync("userInfo"),o=e.database(),a.next=5,o.collection("jz-custom-systeminfo").where({user_id:i._id,type:0}).field("comment").get();case 5:c=a.sent,c.result.data&&c.result.data.length>0&&(s=c.result.data,s&&s.length>0&&(n.isnewinfo=s[s.length-1].comment,n.isnewinfo&&(n.shcontent+="<br>审核意见：【"+n.isnewinfo+"】"))),n.showshinfo=!0;case 8:case"end":return a.stop()}}),a)})))()},createCaptcha:function(){var t=this;e.callFunction({name:"uni-id-cf",data:{action:"createCaptcha",params:{scene:"login"}},success:function(e){var n=e.result;0===n.code?t.captchaBase64=n.captchaBase64:uni.showModal({content:n.msg,showCancel:!1})}})},toRegister:function(e){console.log(e),uni.navigateTo({url:"/pages/ucenter/login-page/register/register"})}}};t.default=s}).call(this,n("a9ff")["default"])},bfd2:function(e,t,n){"use strict";n.r(t);var a=n("79668"),i=n("905d");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("1096");var c,s=n("f0c5"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"031707ce",null,!1,a["a"],c);t["default"]=r.exports}}]);