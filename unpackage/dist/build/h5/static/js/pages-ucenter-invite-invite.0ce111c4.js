(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-invite-invite"],{"11d7":function(t,a,n){var i=n("24fb");a=i(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/uni-view[data-v-058b5a1a]{display:flex;box-sizing:border-box;flex-direction:column}.about[data-v-058b5a1a]{width:%?750?%;flex-direction:column}.box[data-v-058b5a1a]{margin-top:100px;flex-direction:column;justify-content:center;align-items:center}.logoImg[data-v-058b5a1a]{margin-bottom:%?10?%;width:%?160?%;height:%?160?%;border-radius:15px}.tip[data-v-058b5a1a]{font-size:%?24?%;margin-top:10px}.appName[data-v-058b5a1a]{margin-top:20px;font-size:%?42?%;font-weight:500}.copyright[data-v-058b5a1a]{width:%?750?%;font-size:%?32?%;flex-direction:column;justify-content:center;align-items:center;bottom:20px;left:0;position:fixed}.hint[data-v-058b5a1a]{color:#999;font-size:%?26?%}.icon[data-v-058b5a1a]{width:%?34?%}#download[data-v-058b5a1a]{background-color:#2a9839;color:#fff;margin:%?55?%;padding:5px;height:30px;width:%?160?%;border-radius:100px;flex-direction:row;align-items:center;justify-content:center}.download-text[data-v-058b5a1a]{font-size:%?32?%}.mask[data-v-058b5a1a]{position:fixed;top:0;left:0;width:%?750?%;height:100vh;flex-direction:row;justify-content:flex-end;background-color:rgba(0,0,0,.6)}.mask uni-image[data-v-058b5a1a]{width:%?600?%}',""]),t.exports=a},"27b4":function(t,a){t.exports="data:image/png;base64,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"},"4a5d":function(t,a,n){"use strict";var i;n.d(a,"b",(function(){return e})),n.d(a,"c",(function(){return o})),n.d(a,"a",(function(){return i}));var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"about"},[i("v-uni-view",{staticClass:"box"},[i("v-uni-image",{staticClass:"logoImg",attrs:{src:t.about.logo}}),i("v-uni-text",{staticClass:"tip appName"},[t._v(t._s(t.about.appName))]),i("v-uni-text",{staticClass:"tip"},[t._v(t._s(t.about.slogan))]),i("v-uni-view",{attrs:{id:"download"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.download.apply(void 0,arguments)}}},[t.isIos?i("v-uni-image",{staticClass:"icon",attrs:{src:n("27b4"),mode:"widthFix"}}):i("v-uni-image",{staticClass:"icon",attrs:{src:n("937c"),mode:"widthFix"}}),i("v-uni-text",{staticClass:"download-text"},[t._v(t._s(t.$t("invite.download")))])],1),i("v-uni-text",{staticClass:"tip"},[t._v("version "+t._s(t.about.version))])],1),i("v-uni-view",{staticClass:"copyright"},[i("v-uni-text",{staticClass:"hint"},[t._v(t._s(t.about.company))])],1),t.showMask?i("v-uni-view",{staticClass:"mask"},[i("v-uni-image",{attrs:{src:n("e55b"),mode:"widthFix"}})],1):t._e()],1)},o=[]},"80b8":function(t,a,n){"use strict";var i=n("a90c"),e=n.n(i);e.a},"937c":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABQCAYAAACK5CKQAAAFmUlEQVR4Xu2cW+hmUxjGn+fCldxIzskFOUw5C+PGUCOUHJoh5JBBIowazSQZN+M0mByKIVwYLkZONSaEaRiHmomEMkbJKYQLxpSiR+/816f9/2Z9e61tv3v/5/taq76bb7/7We/67Xetvfda691EKS4E6KJSRFBAOgVBAVlAOhFwkuklIiWdAmAZydlOfidlJN0LYCvJO5LGDga9gDQ/JT0F4COSDzr4XSsh6UgAa0nu23VdA/3eQAaYvwM4iOTPXTZQ0usAHie5ust6qtp9g7wcwKkkL+2qgZJM+wKSZ3VVR0y3V5AhKl8E8ATJNcMOSdoDwH6VX7Vr/gHg+8rvB5J/RTR+AjCH5OeTDvLAMH4dFsAeCuAyABatezds/LsAXgbwEsktku4DsI3kbQ11Wpv3HpEB3nUALPquAbBP61ZMCWwF8A3JWU56jWR6BylpCYAbAezVyNN84zcAPEzylfxT2lv2BjI8SxrEue3dzlJ4EsA9JL/Ism5p1AtISbcDuBXALi39bXr6LwAWkLRxtNPSOUhJNwOwm8BMlW0Azib5ZpcOdApS0lUAVg414CsAnwD4G8BJAPZ3aOB3AN4POjHNHwGcQ/JDh7qiEp2BlHQRgFWRWmdVn/EkqW3jSE5rh6RfAew+pLsZwHkkP2tbX+z8TkBKOhzAO5HGrCM5p+pIGD+XtmjcFpIHD2k+A+DiiOazJGP/t6h+6tSuQI5qiNU5m+T2bijJuuF7rVsB2Dj8WtA5HcD9NZrzSD7vUOc0CXeQkuyKG8i6YmOaFY/xsSkTGydPJvlP0xPr7F1BSrJxaT2AGXm7aABmMcm7G9gnTb1BXmkTEslaZ95gM8lDPN3wBmkQDeY4lNNIvuXlqDfIT8egWw/Y3UXSXlldihtIxzuwS8MyRDaSPD7DLsvEE+RCexXLqnXnMVpC8gMPd9xAejgzzhpJkJLsAfdEALakatP39nayw6JSmCYbOxYk1w07LWleaK+9odm85nqSm/73c6SkL23VLyLwG4BjSX49OCbp7VD5OMFcWl33lmRzpcusbZFGrCRpM/rRMjIiJd0E4IEaKk+TvGJSQEraDYCtAR1R0+brST4SO14HclQ0VnWOJvmx/THuESnpQgDPJbqTbXA4JhukpKNsV0RGH11IcsWEgFwM4M5Em22FctcmIO3GYmNeqvw3xkxARNpySHI6b3jucwAo2rXDHbiAjIRRARnvW9UeVSIyNf7UHC8gW8CrnlpAFpBOBJxkSkQWkE4EnGRKRBaQTgScZEpEFpBOBJxkSkQWkE4EnGRKRBaQTgScZDqPyDJDHr9SzWbITaNmBbFaRVmzCTTqFr8WWGJkTRd6iOQNg+PjvtQQgie1pDx/VKJo7QYBSS8AODcCcxPJ46r/TwLIAHPjiHXtRSSXjwosz50WqavpdH9wlZm2QaDSu3x3WjRxeVIiskmbq7bJiMwVLiBzSSXsJNkuBdutME7lWpKPejjsGZFZy5keTjtqzCVp2bStixvIcMfbYHk0rb3qR2A5yUVeVXmDtCT2qwHYXW9nTRGxZCnbSTecI9mKqSvIoedK26S555B3OdtgbONn3bd6bAixvUmpMi1VLxhbut0gWSp1fqPjnYGMeZGZwLlDvuLQBcp6Xh21R6cRnQbGBWQDWHWmBWQBWU+gdO2prInYjWI7udw3qAKygEwPNuWunWaUZVFAZmFKGxWQaUZZFpIsgfKEhPEKkpYgGi2SLInKkqnqyrckD8hyysmo7+fInBmiM0murQF5BoBXE+1fTXK+E6MsmV5BhseXuu/8rCJ5ScpzSfaJRPvUbLT0/ehjTvQOMsB8zL50EmaI/gxZt2uafFhY0i0Azg9Jp/ZREvsw0oa6xMvUBWpzfEZAtnF4Zz23gHS6MgVkAelEwEmmRKQTyH8BrR3pb6LI9PYAAAAASUVORK5CYII="},a90c:function(t,a,n){var i=n("11d7");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var e=n("4f06").default;e("b7f542c8",i,!0,{sourceMap:!1,shadowMode:!1})},c2ab:function(t,a,n){"use strict";n.r(a);var i=n("deef"),e=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(a,t,(function(){return i[t]}))}(o);a["default"]=e.a},da96:function(t,a,n){"use strict";n.r(a);var i=n("4a5d"),e=n("c2ab");for(var o in e)"default"!==o&&function(t){n.d(a,t,(function(){return e[t]}))}(o);n("80b8");var r,s=n("f0c5"),A=Object(s["a"])(e["default"],i["b"],i["c"],!1,null,"058b5a1a",null,!1,i["a"],r);a["default"]=A.exports},deef:function(t,a,n){"use strict";n("c975"),n("ac1f"),n("466d"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={computed:{uniStarterConfig:function(){return getApp().globalData.config}},data:function(){return{about:{},code:"",isIos:"",showMask:!1,downloadUrl:{ios:"",android:""}}},created:function(){this.about=this.uniStarterConfig.about,this.downloadUrl=this.uniStarterConfig.download,this.year=(new Date).getFullYear();var t=navigator.userAgent,a=t.toLowerCase();this.isWeixin=-1!=a.indexOf("micromessenger"),this.isIos=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},onLoad:function(t){var a=t.code;this.code=a,document.getElementById("openApp").style.display="none",document.getElementsByTagName("body")[0].style=""},methods:{download:function(){this.code&&uni.setClipboardData({data:this.code,complete:function(t){console.log(t),uni.hideToast(),document.getElementById("#clipboard").style.top="-999px",uni.hideKeyboard()}}),this.isIos?window.location.href=this.downloadUrl.ios:this.isWeixin?this.showMask=!0:window.location.href=this.downloadUrl.android}}};a.default=i},e55b:function(t,a,n){t.exports=n.p+"static/img/openImg.5b15117f.png"}}]);