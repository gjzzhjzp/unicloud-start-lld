(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-settings-deactivate-deactivate"],{"06a5":function(t,n,e){"use strict";e.r(n);var a=e("9c4b"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a},1978:function(t,n,e){"use strict";e.r(n);var a=e("ea16"),o=e("06a5");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("aa7b");var c,u=e("f0c5"),r=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"3fdb1f1b",null,!1,a["a"],c);n["default"]=r.exports},5855:function(t,n,e){var a=e("c00d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("4f06").default;o("1966b0a4",a,!0,{sourceMap:!1,shadowMode:!1})},"9c4b":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{}},onLoad:function(){uni.setNavigationBarTitle({title:this.$t("deactivate.navigationBarTitle")}),uni.showModal({content:"该功能暂未完全开发完成，敬请期待！",showCancel:!1})},methods:{cancel:function(){uni.navigateBack()},nextStep:function(){uni.showModal({content:"已经仔细阅读注销提示，知晓可能带来的后果，并确认要注销",complete:function(t){t.confirm?uni.showToast({title:"该功能暂未开发完成",icon:"none"}):uni.navigateBack()}})}}};n.default=a},aa7b:function(t,n,e){"use strict";var a=e("5855"),o=e.n(a);o.a},c00d:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,".content[data-v-3fdb1f1b]{display:flex;flex-direction:column;font-size:%?28?%}.words[data-v-3fdb1f1b]{padding:0 %?26?%;line-height:%?46?%;margin-top:%?20?%;margin-bottom:80px}.button-group[data-v-3fdb1f1b]{display:flex;flex-direction:row;position:fixed;height:50px;bottom:10px;width:%?750?%;justify-content:center;align-items:center;border-top:solid 1px #e4e6ec;padding-top:10px;background-color:#fff}.button-group uni-button[data-v-3fdb1f1b]{border-radius:100px;border:none;width:%?300?%;height:42px;line-height:42px;font-size:%?32?%}.button-group uni-button[data-v-3fdb1f1b]:after{border:none}.button-group uni-button.next[data-v-3fdb1f1b]{color:#e64340;border:solid 1px #e64340\n}",""]),t.exports=n},ea16:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"content"},[e("v-uni-text",{staticClass:"words",attrs:{space:"emsp"}},[t._v("一、注销是不可逆操作，注销后:\\n \n\t\t\t1.帐号将无法登录、无法找回。\\n\n\t\t\t2.帐号所有信息都会清除(个人身份信息、粉丝数等;发布的作品、评论、点赞等;交易信息等)，你\n\t\t的朋友将无法通过本应用帐号联系你，请自行备份相关\n\t\t信息和数据。\\n\n\t\t\n\t\t二、重要提示\\n\n\t\t\t1.封禁帐号(永久封禁、社交封禁、直播权限封禁)不能申请注销。\\n\n\t\t\t2.注销后，你的身份证、三方帐号(微信、QQ、微博、支付宝)、手机号等绑定关系将解除，解除后可以绑定到其他帐号。\\n\n\t\t\t3.注销后，手机号可以注册新的帐号，新帐号不会存在之前帐号的任何信息(作品、粉丝、评论、个人信息等)。\\n\n\t\t\t4.注销本应用帐号前，需尽快处理帐号下的资金问题。\\n\n\t\t\t5.视具体帐号情况而定，注销最多需要7天。\\n")]),e("v-uni-view",{staticClass:"button-group"},[e("v-uni-button",{staticClass:"next",attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.nextStep.apply(void 0,arguments)}}},[t._v(t._s(t.$t("deactivate.nextStep")))]),e("v-uni-button",{attrs:{type:"warn"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}},[t._v(t._s(t.$t("deactivate.cancelText")))])],1)],1)},i=[]}}]);