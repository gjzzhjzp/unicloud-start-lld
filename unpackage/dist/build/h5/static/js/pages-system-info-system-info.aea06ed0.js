(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-info-system-info"],{1117:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-text",[t._v(t._s(t.dateShow))])},r=[]},"12ba":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/.chatitem[data-v-01185871]{background-color:#ededed}.chatitem .leftitem[data-v-01185871]{display:flex}.chatitem .leftitem .icon .iconStyle[data-v-01185871]{display:inline-block;width:%?90?%;height:%?90?%;border-radius:%?12?%}.chatitem .leftitem .time[data-v-01185871]{position:absolute;right:10px}.chatitem .leftitem .info[data-v-01185871]{margin:%?6?% %?20?%;flex:1}.chatitem .leftitem .info .nickname[data-v-01185871]{font-size:%?32?%;color:#9b9b9b;display:block}.chatitem .leftitem .info .message[data-v-01185871]{display:block;position:relative;top:0;left:0;font-size:16px;margin-top:%?6?%;padding:%?20?% %?20?%;background-color:#fff;border-radius:%?10?%}.chatitem .leftitem .info .message .angle[data-v-01185871]{position:absolute;left:%?-23?%;top:%?28?%;width:0;height:0;border:%?10?% solid transparent;border-right:%?15?% solid #fff}.chatitem .rightitem[data-v-01185871]{display:flex;justify-content:flex-end}.chatitem .rightitem .icon .iconStyle[data-v-01185871]{display:inline-block;width:%?90?%;height:%?90?%;border-radius:%?12?%}.chatitem .rightitem .info[data-v-01185871]{margin:%?6?% %?20?%;text-align:right}.chatitem .rightitem .info .nickname[data-v-01185871]{font-size:%?32?%;color:#9b9b9b;display:block}.chatitem .rightitem .info .message[data-v-01185871]{display:block;position:relative;top:0;right:0;font-size:16px;margin-top:%?6?%;padding:%?20?% %?20?%;background-color:#fff;border-radius:%?10?%}.chatitem .rightitem .info .message .angle[data-v-01185871]{position:absolute;right:%?-23?%;top:%?28?%;width:0;height:0;border:%?10?% solid transparent;border-left:%?15?% solid #fff}',""]),t.exports=e},1903:function(t,e,n){"use strict";function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;t+="";while(t.length<e)t="0"+t;return t.slice(-e)}n("c975"),n("fb6a"),n("ac1f"),n("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.formatDate=o,e.friendlyDate=s;var a={yyyy:function(t){return i(t.year,4)},yy:function(t){return i(t.year)},MM:function(t){return i(t.month)},M:function(t){return t.month},dd:function(t){return i(t.day)},d:function(t){return t.day},hh:function(t){return i(t.hour)},h:function(t){return t.hour},mm:function(t){return i(t.minute)},m:function(t){return t.minute},ss:function(t){return i(t.second)},s:function(t){return t.second},SSS:function(t){return i(t.millisecond,3)},S:function(t){return t.millisecond}};function r(t){if(t instanceof Date)return t;switch(typeof t){case"string":return t.indexOf("T")>-1?new Date(t):new Date(t.replace(/-/g,"/"));default:return new Date(t)}}function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy/MM/dd hh:mm:ss";if(!t&&0!==t)return"";t=r(t);var n={year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),hour:t.getHours(),minute:t.getMinutes(),second:t.getSeconds(),millisecond:t.getMilliseconds()},i=/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/,o=!0,s=e;while(o)o=!1,s=s.replace(i,(function(t){return o=!0,a[t](n)}));return s}function s(t,e){var n=e.locale,i=void 0===n?"zh":n,a=e.threshold,s=void 0===a?[6e4,36e5]:a,u=e.format,l=void 0===u?"yyyy/MM/dd hh:mm:ss":u;if("-"===t)return t;if(!t&&0!==t)return"";var c,f,d={zh:{year:"年",month:"月",day:"天",hour:"小时",minute:"分钟",second:"秒",ago:"前",later:"后",justNow:"刚刚",soon:"马上",template:"{num}{unit}{suffix}"},en:{year:"year",month:"month",day:"day",hour:"hour",minute:"minute",second:"second",ago:"ago",later:"later",justNow:"just now",soon:"soon",template:"{num} {unit} {suffix}"}},h=d[i]||d.zh,v=r(t),m=v.getTime()-Date.now(),p=Math.abs(m);if(p<s[0])return m<0?h.justNow:h.soon;if(p>=s[1])return o(v,l);var b=h.later;m<0&&(b=h.ago,m=-m);var g=Math.floor(m/1e3),y=Math.floor(g/60),x=Math.floor(y/60),w=Math.floor(x/24),S=Math.floor(w/30),k=Math.floor(S/12);switch(!0){case k>0:c=k,f=h.year;break;case S>0:c=S,f=h.month;break;case w>0:c=w,f=h.day;break;case x>0:c=x,f=h.hour;break;case y>0:c=y,f=h.minute;break;default:c=g,f=h.second;break}return"en"===i&&(1===c?c="a":f+="s"),h.template.replace(/{\s*num\s*}/g,c+"").replace(/{\s*unit\s*}/g,f).replace(/{\s*suffix\s*}/g,b)}},"20fe":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uIcon:n("7905").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{},[n("v-uni-view",{staticClass:"u-navbar",class:{"u-navbar-fixed":t.isFixed,"u-border-bottom":t.borderBottom},style:[t.navbarStyle]},[n("v-uni-view",{staticClass:"u-status-bar",style:{height:t.statusBarHeight+"px"}}),n("v-uni-view",{staticClass:"u-navbar-inner",style:[t.navbarInnerStyle]},[t.isBack?n("v-uni-view",{staticClass:"u-back-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{attrs:{name:t.backIconName,color:t.backIconColor,size:t.backIconSize}})],1),t.backText?n("v-uni-view",{staticClass:"u-icon-wrap u-back-text u-line-1",style:[t.backTextStyle]},[t._v(t._s(t.backText))]):t._e()],1):t._e(),t.title?n("v-uni-view",{staticClass:"u-navbar-content-title",style:[t.titleStyle]},[n("v-uni-view",{staticClass:"u-title u-line-1",style:{color:t.titleColor,fontSize:t.titleSize+"rpx",fontWeight:t.titleBold?"bold":"normal"}},[t._v(t._s(t.title))])],1):t._e(),n("v-uni-view",{staticClass:"u-slot-content"},[t._t("default")],2),n("v-uni-view",{staticClass:"u-slot-right"},[t._t("right")],2)],1)],1),t.isFixed&&!t.immersive?n("v-uni-view",{staticClass:"u-navbar-placeholder",style:{width:"100%",height:Number(t.navbarHeight)+t.statusBarHeight+"px"}}):t._e()],1)},r=[]},2387:function(t,e,n){"use strict";var i=n("d70a"),a=n.n(i);a.a},"27fe":function(t,e,n){"use strict";n.r(e);var i=n("4695"),a=n("caf6");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("8c77");var o,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"58435624",null,!1,i["a"],o);e["default"]=u.exports},"452c":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("4160"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=i(n("1da1")),r=i(n("5530")),o=n("26cb"),s=t.database(),u=(s.collection("jz-custom-systeminfo"),{data:function(){return{scrollTop:0,infos:[],showinfo:!1,message:"你的投稿视频【<span class='zyid' id='619ce4e1808fdd00017261d3'>蜀道难，难于上青天</span>】有宝子【】评论啦~~【啊啊啊啊啊啊啊这里是内容】"}},mounted:function(){var t=this;this.getinfos(),setTimeout((function(){var e=$("#all-system-info").height();t.scrollTop=e,t.showinfo=!0}),500)},computed:(0,r.default)({},(0,o.mapGetters)({userInfo:"user/info",hasLogin:"user/hasLogin"})),methods:{getinfos:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=uni.getStorageSync("userInfo"),e.next=3,s.collection("jz-custom-systeminfo").where({user_id:n._id,type:1}).field("comment,comment_date").get();case 3:i=e.sent,i.result.data&&i.result.data.length>0&&(t.infos=i.result.data,a=[],t.infos.forEach((function(t){a.push(t._id)})),uni.setStorageSync("systeminfo_"+t.userInfo._id,a.join(",")));case 5:case"end":return e.stop()}}),e)})))()}}});e.default=u}).call(this,n("a9ff")["default"])},4695:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uNavbar:n("e660").default,ydChatitem:n("ec6e").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"system-info"},[n("u-navbar",{attrs:{"is-back":!0,title:"系统消息"}}),n("v-uni-view",{staticClass:"jz-container"},[n("v-uni-scroll-view",{staticClass:"scroll-Y",attrs:{id:"scroll-Y","scroll-top":t.scrollTop,"scroll-y":"true"}},[n("v-uni-view",{staticClass:"all-system-info",style:{visibility:t.showinfo?"":"hidden"},attrs:{id:"all-system-info"}},t._l(t.infos,(function(t,e){return n("v-uni-view",{key:e,staticClass:"infos"},[n("yd-chatitem",{ref:"chatitem",refInFor:!0,attrs:{message:t.comment,leftTime:t.comment_date}})],1)})),1)],1)],1)],1)},r=[]},"50b6":function(t,e,n){var i=n("86b2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("20e3bcba",i,!0,{sourceMap:!1,shadowMode:!1})},"65de":function(t,e,n){"use strict";n("a9e3"),n("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("1903"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return"-"}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){this.refreshMark;var t=(new Date).getTime(),e=t-this.date;return!e||e<1e5?"刚刚":(0,i.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var t=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){t.refresh()}),parseInt(this.refreshRate)))}}};e.default=a},"6c2a":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{leftTime:{type:[String,Number],default:function(){return""}},isLeft:{type:Boolean,default:!0},nickname:{type:String,default:"系统通知"},message:{type:String,default:"你好呀"},icon:{type:String,default:"/static/center/system.png"},bubbleColor:{type:String,default:"#7275d3"},bgColor:{type:String,default:"#fff"},nameSize:{type:String,default:"32rpx"},messageSize:{type:String,default:"16px"},nameColor:{type:String,default:"#9b9b9b"},messageColor:{type:String,default:"#fff"},iconSize:{type:String,default:"90rpx"}},data:function(){return{}},mounted:function(){$(".zyid").each((function(){var t=this,e=this;$(e).on("click",(function(){var e=t,n=$(e).attr("id");uni.navigateTo({url:"/pages/detail/detail?id="+n})}))}))}};e.default=i},7226:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uniDateformat:n("ec2b").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"chatitem"},[t.isLeft?n("v-uni-view",{staticClass:"leftitem",style:{backgroundColor:t.bgColor}},[n("v-uni-image",{staticClass:"icon",style:{height:t.iconSize,width:t.iconSize,marginTop:"20rpx",borderRadius:"6px"},attrs:{src:t.icon}}),n("v-uni-view",{staticClass:"info"},[n("v-uni-text",{staticClass:"nickname",style:{fontSize:t.nameSize,color:t.nameColor}},[t._v(t._s(t.nickname))]),n("v-uni-text",{staticClass:"message",style:{backgroundColor:t.bubbleColor,fontSize:t.messageSize,color:t.messageColor}},[n("v-uni-view",{staticClass:"angle",style:{borderRightColor:t.bubbleColor}}),n("v-uni-view",{domProps:{innerHTML:t._s(t.message)}})],1)],1),n("v-uni-view",{staticClass:"time"},[n("uni-dateformat",{attrs:{threshold:[],date:t.leftTime}})],1)],1):n("v-uni-view",{staticClass:"rightitem"},[n("v-uni-view",{staticClass:"info"},[n("v-uni-text",{staticClass:"nickname",style:{fontSize:t.nameSize,color:t.nameColor}},[t._v(t._s(t.nickname))]),n("v-uni-text",{staticClass:"message",style:{backgroundColor:t.bubbleColor,fontSize:t.messageSize,color:t.messageColor}},[n("v-uni-view",{staticClass:"angle",style:{borderLeftColor:t.bubbleColor}}),t._v(t._s(t.message))],1)],1),n("v-uni-image",{staticClass:"icon",style:{height:t.iconSize,width:t.iconSize,marginTop:"20rpx",borderRadius:"6px"},attrs:{src:t.icon}})],1)],1)},r=[]},"7eb9":function(t,e,n){"use strict";var i=n("b7d1"),a=n.n(i);a.a},"86b2":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".infos[data-v-58435624]{margin-top:%?20?%}.scroll-Y[data-v-58435624]{height:calc(100vh - 88px)}",""]),t.exports=e},"8c77":function(t,e,n){"use strict";var i=n("50b6"),a=n.n(i);a.a},a51b:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=uni.getSystemInfoSync(),a={},r={name:"u-navbar",props:{height:{type:[String,Number],default:""},backIconColor:{type:String,default:"#606266"},backIconName:{type:String,default:"nav-back"},backIconSize:{type:[String,Number],default:"44"},backText:{type:String,default:""},backTextStyle:{type:Object,default:function(){return{color:"#606266"}}},title:{type:String,default:""},titleWidth:{type:[String,Number],default:"250"},titleColor:{type:String,default:"#606266"},titleBold:{type:Boolean,default:!1},titleSize:{type:[String,Number],default:32},isBack:{type:[Boolean,String],default:!0},background:{type:Object,default:function(){return{background:"#ffffff"}}},isFixed:{type:Boolean,default:!0},immersive:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},zIndex:{type:[String,Number],default:""},customBack:{type:Function,default:null}},data:function(){return{menuButtonInfo:a,statusBarHeight:i.statusBarHeight}},computed:{navbarInnerStyle:function(){var t={};return t.height=this.navbarHeight+"px",t},navbarStyle:function(){var t={};return t.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.navbar,Object.assign(t,this.background),t},titleStyle:function(){var t={};return t.left=(i.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.right=(i.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.width=uni.upx2px(this.titleWidth)+"px",t},navbarHeight:function(){return this.height?this.height:44}},created:function(){"undefined"!=typeof plus&&(this.statusBarHeight=30)},methods:{goBack:function(){"function"===typeof this.customBack?this.customBack.bind(this.$u.$parent.call(this))():uni.navigateBack({delta:1})}}};e.default=r},a99a:function(t,e,n){"use strict";n.r(e);var i=n("6c2a"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},b7d1:function(t,e,n){var i=n("cbc2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("6a397846",i,!0,{sourceMap:!1,shadowMode:!1})},b942:function(t,e,n){"use strict";n.r(e);var i=n("a51b"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},bfc4:function(t,e,n){"use strict";n.r(e);var i=n("65de"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},caf6:function(t,e,n){"use strict";n.r(e);var i=n("452c"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},cbc2:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/.u-navbar[data-v-4e4852e4]{width:100%}.u-navbar-fixed[data-v-4e4852e4]{position:fixed;left:0;right:0;top:0;z-index:991}.u-status-bar[data-v-4e4852e4]{width:100%}.u-navbar-inner[data-v-4e4852e4]{display:flex;flex-direction:row;justify-content:space-between;position:relative;align-items:center}.u-back-wrap[data-v-4e4852e4]{display:flex;flex-direction:row;align-items:center;flex:1;flex-grow:0;padding:%?14?% %?14?% %?14?% %?24?%;z-index:999}.u-back-text[data-v-4e4852e4]{padding-left:%?4?%;font-size:%?30?%}.u-navbar-content-title[data-v-4e4852e4]{display:flex;flex-direction:row;align-items:center;justify-content:center;flex:1;position:absolute;left:0;right:0;height:%?60?%;text-align:center;flex-shrink:0}.u-navbar-centent-slot[data-v-4e4852e4]{flex:1}.u-title[data-v-4e4852e4]{line-height:%?60?%;font-size:%?32?%;flex:1}.u-navbar-right[data-v-4e4852e4]{flex:1;display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.u-slot-content[data-v-4e4852e4]{flex:1;display:flex;flex-direction:row;align-items:center}',""]),t.exports=e},d70a:function(t,e,n){var i=n("12ba");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("a284fb6a",i,!0,{sourceMap:!1,shadowMode:!1})},e660:function(t,e,n){"use strict";n.r(e);var i=n("20fe"),a=n("b942");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("7eb9");var o,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"4e4852e4",null,!1,i["a"],o);e["default"]=u.exports},ec2b:function(t,e,n){"use strict";n.r(e);var i=n("1117"),a=n("bfc4");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"e01a696c",null,!1,i["a"],o);e["default"]=u.exports},ec6e:function(t,e,n){"use strict";n.r(e);var i=n("7226"),a=n("a99a");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("2387");var o,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"01185871",null,!1,i["a"],o);e["default"]=u.exports}}]);