(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-login-page-pwd-login-pwd-login"],{"3c0b":function(t,a,n){var e=n("24fb");a=e(!1),a.push([t.i,"uni-view[data-v-6d368f3a]{display:flex;box-sizing:border-box;flex-direction:column}\n.content[data-v-6d368f3a]{padding:0 %?50?%;width:%?750?%;flex:1}.input-box[data-v-6d368f3a]{padding:0 15px;margin-bottom:10px;background-color:#f8f8f8;border-radius:6px;font-size:%?28?%}.get-code[data-v-6d368f3a]{margin:0;margin-top:15px;background-color:#7275d3;color:#fff}.input-box[data-v-6d368f3a],\r\n.get-code[data-v-6d368f3a]{height:45px;line-height:45px}.title[data-v-6d368f3a]{text-align:center;padding-bottom:5px}.tip[data-v-6d368f3a]{color:#666;font-size:%?26?%;margin:6px 0}.easyinput[data-v-6d368f3a]{background-color:#f8f8f8;border-radius:%?6?%}.send-btn[data-v-6d368f3a]{width:100%;margin-top:15px;border-radius:%?6?%}.link[data-v-6d368f3a]{color:#04498c}.slot-content[data-v-6d368f3a]{padding:10px}.usercenter-top[data-v-6d368f3a]{color:#fff;font-size:16px;height:44px;line-height:44px}.usercenter-top-left[data-v-6d368f3a]{position:absolute;left:4px;top:12px}.usercenter-top-mine[data-v-6d368f3a]{text-align:center}.login-back[data-v-6d368f3a]{height:calc(100vh - 44px);background-image:url(/static/center/login.png);background-size:cover;background-repeat:no-repeat;background-position:50%}\r\n/* .pwd-login{\r\n\t\tpadding-top: 10em;\r\n\t}\r\n\t.pwd-login .title{\r\n\t\tfont-size: 24px;\r\n\t\tmargin-bottom: 20px;\r\n\t} */.auth-box[data-v-6d368f3a]{\r\n\t\t/* flex-direction: row;\r\n\t\tjustify-content: right; */margin-top:20px;text-align:right}.auth-box .link[data-v-6d368f3a]{font-size:%?26?%}.login-text-sub[data-v-6d368f3a]{color:#8a8f8b}.toRegister[data-v-6d368f3a]{margin-top:80px;width:%?600?%}.captcha-box[data-v-6d368f3a]{flex-direction:row;align-items:center;justify-content:flex-end}.captcha-img[data-v-6d368f3a]{margin:15px 15px 0 0;width:%?250?%}.captcha[data-v-6d368f3a]{width:%?350?%}.login-back-con[data-v-6d368f3a]{width:80%;margin:290px auto 0 auto}.login-back-con .u-btn[data-v-6d368f3a]{border-radius:50px}.login-back-con .input-box[data-v-6d368f3a]{height:40px;line-height:40px}",""]),t.exports=a},"67df":function(t,a,n){"use strict";n.d(a,"b",(function(){return i})),n.d(a,"c",(function(){return o})),n.d(a,"a",(function(){return e}));var e={uNavbar:n("e660").default,uButton:n("c7c3").default},i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-uni-view",{staticClass:" pwd-login"},[n("v-uni-view",{staticClass:"login-back"},[n("v-uni-view",{staticClass:"usercenter-top"},[n("u-navbar",{attrs:{"is-back":!0,title:"用户登录","border-bottom":!1,"title-color":"#fff","back-icon-color":"#fff",background:{background:"none"}}})],1),n("v-uni-view",{staticClass:"login-back-con"},[n("v-uni-input",{staticClass:"input-box",attrs:{inputBorder:!1,placeholder:"请输入登录名"},model:{value:t.username,callback:function(a){t.username=a},expression:"username"}}),n("v-uni-input",{staticClass:"input-box",attrs:{type:"password",inputBorder:!1,placeholder:t.$t("pwdLogin.passwordPlaceholder")},model:{value:t.password,callback:function(a){t.password=a},expression:"password"}}),t.captchaBase64?n("v-uni-view",{staticClass:"captcha-box"},[n("v-uni-image",{staticClass:"captcha-img",attrs:{src:t.captchaBase64,mode:"widthFix"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.createCaptcha.apply(void 0,arguments)}}}),n("v-uni-input",{staticClass:"input-box captcha",attrs:{type:"text",inputBorder:!1,placeholder:t.$t("pwdLogin.verifyCodePlaceholder")},model:{value:t.captcha,callback:function(a){t.captcha=a},expression:"captcha"}})],1):t._e(),n("v-uni-view",{staticClass:"auth-box"},[n("v-uni-text",{staticClass:"link",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toRegister.apply(void 0,arguments)}}},[t._v(t._s(t.$t("pwdLogin.register")))])],1),n("u-button",{staticClass:"send-btn",attrs:{disabled:!t.canLogin,type:"primary"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.pwdLogin.apply(void 0,arguments)}}},[t._v(t._s(t.$t("pwdLogin.login")))])],1)],1)],1)},o=[]},7322:function(t,a,n){var e=n("3c0b");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=n("4f06").default;i("0b81a0bd",e,!0,{sourceMap:!1,shadowMode:!1})},"87c3":function(t,a,n){"use strict";var e=n("7322"),i=n.n(e);i.a},"905d":function(t,a,n){"use strict";n.r(a);var e=n("b9f4"),i=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(a,t,(function(){return e[t]}))}(o);a["default"]=i.a},b9f4:function(t,a,n){"use strict";(function(t){var e=n("4ea4");n("d3b7"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,n("96cf");var i=e(n("1da1")),o=e(n("698c")),c={mixins:[o.default],data:function(){return{password:"",username:"",agree:!0,captchaBase64:"",captcha:""}},computed:{canLogin:function(){return this.username.length&&this.isPwd},isPwd:function(){return/^.{6,20}$/.test(this.password)},isPhone:function(){return/^1\d{10}$/.test(this.phone)}},methods:{goback:function(){uni.navigateBack()},toRetrievePwd:function(){uni.navigateTo({url:"../pwd-retrieve/pwd-retrieve?phoneNumber="+(this.isPhone?this.username:"")+"&phoneArea="+this.currenPhoneArea})},confirmnc:function(){uni.navigateTo({url:"/pages/ucenter/login-page/pwd-login/pwd-weibo"})},pwdLogin:function(){var a=this;if(!this.agree)return uni.showToast({title:this.$t("common").noAgree,icon:"none"});t.callFunction({name:"uni-id-cf",data:{action:"login",params:{username:this.username,password:this.password,captcha:this.captcha}},success:function(t){var n=t.result;console.log(n),0===n.code?(uni.setStorageSync("userInfo",n.userInfo),a.checkisbdwb(n.userInfo.username).then((function(t){t?(uni.setStorageSync("istgzcsh_success",!0),a.loginSuccess(n)):a.confirmnc()}))):n.needCaptcha?(uni.showToast({title:n.msg,icon:"none"}),a.createCaptcha()):uni.showModal({title:a.$t("common").error,content:n.msg,showCancel:!1,confirmText:a.$t("common").gotIt})}})},checkisbdwb:function(a){return new Promise(function(){var n=(0,i.default)(regeneratorRuntime.mark((function n(e){var i,o,c,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.database(),o=i.collection("uni-id-users"),n.next=4,o.where({username:a}).field("username,isbdwb,weiboname,weibocontent,nickname").get();case 4:c=n.sent,c.result.data&&c.result.data.length>0?(r=c.result.data[0],r.isbdwb?e(!0):r.weiboname&&r.weibocontent?uni.showModal({title:"提示",showCancel:!1,confirmText:"退出",content:"您已提交微博验证【"+r.weibocontent+"】申请，如已发微博，请等待管理员审核",success:function(t){t.confirm&&console.log("在这里退出App")}}):e(!1)):e(!1),console.log("result",c);case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())},createCaptcha:function(){var a=this;t.callFunction({name:"uni-id-cf",data:{action:"createCaptcha",params:{scene:"login"}},success:function(t){var n=t.result;0===n.code?a.captchaBase64=n.captchaBase64:uni.showModal({content:n.msg,showCancel:!1})}})},toRegister:function(t){console.log(t),uni.navigateTo({url:"/pages/ucenter/login-page/register/register"})}}};a.default=c}).call(this,n("a9ff")["default"])},bfd2:function(t,a,n){"use strict";n.r(a);var e=n("67df"),i=n("905d");for(var o in i)"default"!==o&&function(t){n.d(a,t,(function(){return i[t]}))}(o);n("87c3");var c,r=n("f0c5"),s=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,"6d368f3a",null,!1,e["a"],c);a["default"]=s.exports}}]);