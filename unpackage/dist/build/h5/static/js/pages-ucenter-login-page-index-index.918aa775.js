(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-login-page-index-index"],{"0237":function(e,n,t){var i=t("940e");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=t("4f06").default;o("95d5f112",i,!0,{sourceMap:!1,shadowMode:!1})},"08d7":function(e,n,t){"use strict";t.r(n);var i=t("eef8"),o=t.n(i);for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);n["default"]=o.a},1336:function(e,n,t){"use strict";var i;t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return i}));var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticClass:"root"},[t("v-uni-checkbox-group",{staticClass:"checkbox-group",on:{change:function(n){arguments[0]=n=e.$handleEvent(n),e.setAgree.apply(void 0,arguments)}}},[t("v-uni-checkbox",{staticStyle:{transform:"scale(0.7)"}}),t("v-uni-text",[e._v(e._s(e.$t("common.agree")))])],1),e._l(e.agreements,(function(n,i){return t("v-uni-view",{key:i,staticClass:"item"},[t("v-uni-text",{staticClass:"agreement",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navigateTo(n)}}},[e._v(e._s(n.title))]),e.hasAnd(e.agreements,i)?t("v-uni-text",{staticClass:"hint"},[e._v("&")]):e._e()],1)}))],2)},r=[]},"7c21":function(e,n,t){var i=t("24fb");n=i(!1),n.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/uni-view[data-v-7077391e]{display:flex;box-sizing:border-box;flex-direction:column}.quick-login-box[data-v-7077391e]{flex-direction:row;width:%?750?%;justify-content:space-around;position:fixed;bottom:%?10?%;left:0}.item[data-v-7077391e]{flex-direction:column;justify-content:center;align-items:center;height:%?200?%}.logo[data-v-7077391e]{width:%?60?%;height:%?60?%}.login-title[data-v-7077391e]{margin-top:4px;font-size:%?26?%}',""]),e.exports=n},"80f4":function(e,n,t){"use strict";t.r(n);var i=t("1336"),o=t("08d7");for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t("fb90");var a,u=t("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"8cdc39e2",null,!1,i["a"],a);n["default"]=c.exports},"89de":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{type:"",phone:"",agree:!1}},computed:{loginConfig:function(){return getApp().globalData.config.router.login},isPhone:function(){return/^1\d{10}$/.test(this.phone)},imgSrc:function(){return"/static/login-index/"+this.type+".png"}},onLoad:function(e){this.type=e.type},onReady:function(){},methods:{quickLogin:function(){this.$refs.uniQuickLogin.login_before(this.type)},sendShortMsg:function(){if(!this.agree)return uni.showToast({title:this.$t("common").noAgree,icon:"none"});uni.showLoading(),uni.navigateTo({url:"/pages/ucenter/login-page/phone-code/phone-code?phoneNumber="+this.phone,complete:function(){uni.hideLoading()}})},toPwdLogin:function(){uni.navigateTo({url:"../pwd-login/pwd-login"})}}};n.default=i},"940e":function(e,n,t){var i=t("24fb");n=i(!1),n.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/\nuni-view[data-v-696c24e3]{display:flex;box-sizing:border-box;flex-direction:column}\n.content[data-v-696c24e3]{padding:0 %?50?%;width:%?750?%;flex:1}.input-box[data-v-696c24e3]{padding:0 15px;margin-bottom:10px;background-color:#f8f8f8;border-radius:6px;font-size:%?28?%}.get-code[data-v-696c24e3]{margin:0;margin-top:15px;background-color:#7275d3;color:#fff}.input-box[data-v-696c24e3],\r\n.get-code[data-v-696c24e3]{height:45px;line-height:45px}.title[data-v-696c24e3]{text-align:center;padding-bottom:5px}.tip[data-v-696c24e3]{color:#666;font-size:%?26?%;margin:6px 0}.easyinput[data-v-696c24e3]{background-color:#f8f8f8;border-radius:%?6?%}.send-btn[data-v-696c24e3]{width:100%;margin-top:15px;border-radius:%?6?%}.link[data-v-696c24e3]{color:#04498c}uni-view[data-v-696c24e3]{display:flex;box-sizing:border-box;flex-direction:column}.quickLogin[data-v-696c24e3]{width:%?650?%;height:350px;align-items:center;justify-content:center}.quickLoginBtn[data-v-696c24e3]{margin:20px 0;width:%?450?%}',""]),e.exports=n},ab6c:function(e,n,t){"use strict";var i=t("b335"),o=t.n(i);o.a},afdc:function(e,n,t){"use strict";var i;t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return i}));var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",[t("v-uni-view",{staticClass:"quick-login-box"},e._l(e.servicesList,(function(n,i){return t("v-uni-view",{key:i,staticClass:"item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),n.path?e.to(n.path):e.login_before(n.id,!1)}}},[t("v-uni-image",{staticClass:"logo",attrs:{src:n.logo,mode:"widthFix"}}),t("v-uni-text",{staticClass:"login-title"},[e._v(e._s(n.text))])],1)})),1)],1)},r=[]},b335:function(e,n,t){var i=t("7c21");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=t("4f06").default;o("86e06ef6",i,!0,{sourceMap:!1,shadowMode:!1})},b4bd:function(e,n,t){"use strict";t.r(n);var i=t("c36c"),o=t.n(i);for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);n["default"]=o.a},b4d8:function(e,n,t){var i=t("24fb");n=i(!1),n.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/uni-view[data-v-8cdc39e2]{display:flex;box-sizing:border-box;flex-direction:column}.root[data-v-8cdc39e2]{flex-direction:row;align-items:center;font-size:%?28?%;color:#8a8f8b}.checkbox-group[data-v-8cdc39e2]{align-items:center;display:flex;flex-direction:row}.item[data-v-8cdc39e2]{flex-direction:row}.agreement[data-v-8cdc39e2]{color:#04498c}',""]),e.exports=n},c36c:function(e,n,t){"use strict";(function(e){var i=t("4ea4");t("4de4"),t("7db0"),t("4160"),t("caad"),t("d3b7"),t("ac1f"),t("2532"),t("5319"),t("1276"),t("498a"),t("159b"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(t("5530"));t("96cf");var r=i(t("1da1")),a=t("2f62"),u=i(t("f848")),c=e.database(),s=(c.collection("uni-id-users"),{computed:{loginConfig:function(){return getApp().globalData.config.router.login},agreements:function(){return getApp().globalData.config.about.agreements||[]}},data:function(){return{servicesList:[{id:"username",text:this.$t("uniQuickLogin").accountLogin,logo:"/static/uni-quick-login/user.png",path:"/pages/ucenter/login-page/pwd-login/pwd-login"},{id:"smsCode",text:this.$t("uniQuickLogin").SMSLogin,logo:"/static/uni-quick-login/sms.png",path:"/pages/ucenter/login-page/index/index?type=smsCode"},{id:"weixin",text:this.$t("uniQuickLogin").wechatLogin,logo:"/static/uni-quick-login/wechat.png"},{id:"apple",text:this.$t("uniQuickLogin").appleLogin,logo:"/static/uni-quick-login/apple.png"},{id:"univerify",text:this.$t("uniQuickLogin").oneClickLogin,logo:"/static/uni-quick-login/univerify.png"},{id:"qq",text:this.$t("uniQuickLogin").QQLogin,logo:"/static/uni-quick-login/univerify.png"},{id:"xiaomi",text:this.$t("uniQuickLogin").xiaomiLogin,logo:"/static/uni-quick-login/univerify.png"},{id:"sinaweibo",text:this.$t("common").weibo,logo:"/static/uni-quick-login/univerify.png"}],config:{},univerifyStyle:{fullScreen:!0,backgroundColor:"#ffffff",buttons:{iconWidth:"45px",list:[]},privacyTerms:{defaultCheckBoxState:!1,textColor:"#BBBBBB",termsColor:"#5496E3",prefix:"我已阅读并同意",suffix:"并使用本机号码登录",privacyItems:[]}}}},watch:{agree:function(e){this.univerifyStyle.privacyTerms.defaultCheckBoxState=e}},props:{agree:{type:Boolean,default:function(){return!1}}},created:function(){var e=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t=e.servicesList,t=t.filter((function(n){return e.loginConfig.includes(n.id)})),e.loginConfig.includes("univerify")&&(e.univerifyStyle.privacyTerms.privacyItems=e.agreements,t.forEach((function(n){var t=n.id,i=n.logo;"univerify"!=t&&e.univerifyStyle.buttons.list.push({iconPath:i,provider:t})}))),console.log(t),"/pages/ucenter/login-page/index/index"==e.getRoute(1)&&["weixin","apple"].includes(e.loginConfig[0])&&(t=t.filter((function(n){return n.id!=e.loginConfig[0]}))),e.servicesList=t.filter((function(n){var t=n.path?n.path.split("?")[0]:"";return t!=e.getRoute(1)})),console.log("servicesList",t,e.servicesList);case 7:case"end":return n.stop()}}),n)})))()},mounted:function(){},methods:(0,o.default)((0,o.default)({},(0,a.mapMutations)({setUserInfo:"user/login"})),{},{getRoute:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=getCurrentPages();return e>n.length?"":"/"+n[n.length-e].route},to:function(e){this.getRoute(2)==e?uni.navigateBack():uni.navigateTo({url:e,animationType:"slide-in-left"})},login_before:function(e){var n=this,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.agree&&"univerify"!=e)return uni.showToast({title:this.$t("common").noAgree,icon:"none"});uni.showLoading({mask:!0}),uni.login({provider:e,onlyAuthorize:!0,univerifyStyle:this.univerifyStyle,complete:function(e){uni.hideLoading(),console.log(e)},success:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(i){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(i),"apple"!=e){t.next=6;break}return t.next=4,n.getUserInfo({provider:"apple"});case 4:o=t.sent,Object.assign(i.authResult,o.userInfo);case 6:n.login("weixin"==e?i.code:i.authResult,e);case 7:case"end":return t.stop()}}),t)})));function i(e){return t.apply(this,arguments)}return i}(),fail:function(){var i=(0,r.default)(regeneratorRuntime.mark((function i(o){var r,a,u;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(console.log(o),"univerify"!=e){i.next=27;break}o.metadata&&o.metadata.error_data&&uni.showToast({title:n.$t("uniQuickLogin").oneClickLogin+":"+o.metadata.error_data,icon:"none"}),o.errMsg&&uni.showToast({title:n.$t("uniQuickLogin").oneClickLogin+":"+o.errMsg,icon:"none"}),i.t0=o.errCode,i.next=30002===i.t0?7:30003===i.t0?9:30006===i.t0?12:"30008"===i.t0?14:25;break;case 7:return console.log("在一键登录界面，点击其他登录方式"),i.abrupt("break",27);case 9:return console.log("关闭了登录"),t&&uni.navigateBack(),i.abrupt("break",27);case 12:return uni.showModal({title:n.$t("uniQuickLogin").loginErr,content:o.metadata.error_data,showCancel:!1,confirmText:n.$t("common").gotIt}),i.abrupt("break",27);case 14:return uni.showToast({title:n.$t("uniQuickLogin").chooseOtherLogin,icon:"none"}),console.log("点击了第三方登陆，provider：",o.provider),i.next=18,uni.getCheckBoxState();case 18:return r=i.sent[1].state,console.log("agree",r),uni.$emit("setAgreementsAgree",r),a=n.servicesList.find((function(e){return e.id==o.provider}))||{},u=a.path,console.log("path",u),u&&u!=n.getRoute(1)?n.to(u):setTimeout((function(){console.log("agree",n.agree),n.login_before(o.provider)}),500),i.abrupt("break",27);case 25:return console.log(o),i.abrupt("break",27);case 27:case"end":return i.stop()}}),i)})));function o(e){return i.apply(this,arguments)}return o}()})},login:function(n,t){var i=this;console.log({params:n,type:t});var o="loginBy"+t.trim().toLowerCase().replace(t[0],t[0].toUpperCase());e.callFunction({name:"uni-id-cf",data:{action:o,params:n},success:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(n){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:o=n.result,console.log("login-result",o),0===o.code?("univerify"==t&&uni.closeAuthView(),uni.hideLoading(),delete o.userInfo.token,i.setUserInfo(o.userInfo),(0,u.default)(o)):uni.showModal({content:o.msg,showCancel:!1});case 3:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}(),complete:function(){uni.hideLoading()}})},doUserProfileNext:function(){(0,u.default)()},getUserInfo:function(e){return(0,r.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.abrupt("return",new Promise((function(n,t){uni.getUserInfo((0,o.default)((0,o.default)({},e),{},{success:function(e){n(e)},fail:function(e){uni.showModal({content:JSON.stringify(e),showCancel:!1}),t(e)}}))})));case 1:case"end":return n.stop()}}),n)})))()}})});n.default=s}).call(this,t("a9ff")["default"])},c3c1:function(e,n,t){"use strict";var i=t("0237"),o=t.n(i);o.a},c88b:function(e,n,t){"use strict";t.r(n);var i=t("afdc"),o=t("b4bd");for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t("ab6c");var a,u=t("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"7077391e",null,!1,i["a"],a);n["default"]=c.exports},dbb6:function(e,n,t){var i=t("b4d8");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=t("4f06").default;o("7d079891",i,!0,{sourceMap:!1,shadowMode:!1})},e5ce:function(e,n,t){"use strict";t.r(n);var i=t("89de"),o=t.n(i);for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);n["default"]=o.a},eef8:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"uni-agreements",computed:{agreements:function(){return getApp().globalData.config.about.agreements||[]}},methods:{navigateTo:function(e){var n=e.url,t=e.title;uni.navigateTo({url:"/pages/common/webview/webview?url="+n+"&title="+t,success:function(e){},fail:function(){},complete:function(){}})},hasAnd:function(e,n){return e.length-1>n},setAgree:function(e){this.isAgree=!this.isAgree,this.$emit("setAgree",this.isAgree)}},created:function(){var e=this;uni.$on("setAgreementsAgree",(function(n){e.$emit("setAgree",n)}))},data:function(){return{isAgree:!1}}};n.default=i},f251:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return i}));var i={uniAgreements:t("80f4").default,uniQuickLogin:t("c88b").default},o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticClass:"content"},[t("v-uni-text",{staticClass:"title"},[e._v(e._s(e.$t("login.phoneLogin")))]),["apple","weixin"].includes(e.type)?t("v-uni-view",{staticClass:"quickLogin"},[t("v-uni-image",{staticClass:"quickLoginBtn",attrs:{src:e.imgSrc,mode:"widthFix"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.quickLogin.apply(void 0,arguments)}}}),t("uni-agreements",{on:{setAgree:function(n){arguments[0]=n=e.$handleEvent(n),e.agree=n}}})],1):[t("v-uni-input",{staticClass:"input-box",attrs:{type:"number",inputBorder:!1,maxlength:"11",placeholder:e.$t("common.phonePlaceholder")},model:{value:e.phone,callback:function(n){e.phone=n},expression:"phone"}}),t("uni-agreements",{on:{setAgree:function(n){arguments[0]=n=e.$handleEvent(n),e.agree=n}}}),t("v-uni-button",{staticClass:"get-code",attrs:{disabled:!e.isPhone,type:e.isPhone?"primary":"default"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.sendShortMsg.apply(void 0,arguments)}}},[e._v(e._s(e.$t("login.getVerifyCode")))]),t("v-uni-text",{staticClass:"tip"},[e._v(e._s(e.$t("login.phoneLoginTip")))])],t("uni-quick-login",{ref:"uniQuickLogin",attrs:{agree:e.agree}})],2)},r=[]},f848:function(e,n,t){"use strict";function i(e){uni.showToast({title:"登录成功",icon:"none"}),console.log("登录成功",e);var n=0,t=getCurrentPages();t.forEach((function(e,i){t[t.length-i-1].route.split("/"),"login-page"==t[t.length-i-1].route.split("/")[2]&&n++})),uni.navigateBack({delta:n})}t("4160"),t("ac1f"),t("1276"),t("159b"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=i},f94d:function(e,n,t){"use strict";t.r(n);var i=t("f251"),o=t("e5ce");for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t("c3c1");var a,u=t("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"696c24e3",null,!1,i["a"],a);n["default"]=c.exports},fb90:function(e,n,t){"use strict";var i=t("dbb6"),o=t.n(i);o.a}}]);