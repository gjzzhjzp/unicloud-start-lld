(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-list-search-search"],{"00c8":function(t,e,n){"use strict";var i=n("dc57"),a=n.n(i);a.a},"0877":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/.status-bar[data-v-7479ba4e]{background-color:#fff}.container[data-v-7479ba4e]{height:100%;flex:1;background-color:#f7f7f7}.search-body[data-v-7479ba4e]{background-color:#fff;border-bottom-right-radius:10px;border-bottom-left-radius:10px}.flex-center[data-v-7479ba4e]{display:flex;justify-content:center;align-items:center}.flex-row[data-v-7479ba4e]{display:flex;flex-direction:row}[data-v-7479ba4e] .uni-searchbar__box{border-width:0}[data-v-7479ba4e] .uni-input-placeholder{font-size:%?28?%}.search-container[data-v-7479ba4e]{height:52px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;background-color:#fff}.search-container-bar[data-v-7479ba4e]{display:flex;flex-direction:row;justify-content:center;align-items:center;position:absolute;top:0;left:0;right:0}.search-associative[data-v-7479ba4e]{overflow-y:auto;position:absolute;top:52px;left:0;right:0;bottom:0;background-color:#fff;margin-top:%?10?%;padding-left:%?10?%;padding-right:%?10?%}.search-icons[data-v-7479ba4e]{padding:%?16?%}.word-display[data-v-7479ba4e]{font-size:%?26?%;color:#666}.word-container[data-v-7479ba4e]{padding:%?20?%}.word-container_header[data-v-7479ba4e]{display:flex;height:%?72?%;line-height:%?72?%;flex-direction:row;justify-content:space-between;align-items:center}.word-container_header-text[data-v-7479ba4e]{color:#3e3e3e;font-size:%?30?%;font-weight:700}.word-container_body[data-v-7479ba4e]{display:flex;flex-wrap:wrap;flex-direction:row}.word-container_body-text[data-v-7479ba4e]{display:flex;font-size:%?26?%;color:#666;justify-content:center;align-items:center;background-color:#f6f6f6;padding:%?10?% %?20?%;margin:%?20?% %?30?% 0 0;border-radius:%?30?%;box-sizing:border-box;text-align:center}.word-container_body-info[data-v-7479ba4e]{display:block;flex:1;text-align:center;font-size:%?26?%;color:grey;margin-top:%?20?%}.word-container_body-text[data-v-7479ba4e], .word-display[data-v-7479ba4e]{background-color:#e4e4f4;color:#7275d3}',""]),t.exports=e},"11d2":function(t,e,n){"use strict";n.r(e);var i=n("9b17"),a=n("9a4a"),o=n("52fd"),r=n("e0e4"),c=n("68f3");e["default"]={en:i,es:a,fr:o,"zh-Hans":r,"zh-Hant":c}},"227c":function(t,e,n){var i=n("0877");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("0e5fa534",i,!0,{sourceMap:!1,shadowMode:!1})},"2cf3":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-search",props:{shape:{type:String,default:"round"},bgColor:{type:String,default:"#f2f2f2"},placeholder:{type:String,default:"请输入关键字"},clearabled:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},showAction:{type:Boolean,default:!0},actionStyle:{type:Object,default:function(){return{}}},actionText:{type:String,default:"搜索"},inputAlign:{type:String,default:"left"},disabled:{type:Boolean,default:!1},animation:{type:Boolean,default:!1},borderColor:{type:String,default:"none"},value:{type:String,default:""},height:{type:[Number,String],default:64},inputStyle:{type:Object,default:function(){return{}}},maxlength:{type:[Number,String],default:"-1"},searchIconColor:{type:String,default:""},color:{type:String,default:"#606266"},placeholderColor:{type:String,default:"#909399"},margin:{type:String,default:"0"},searchIcon:{type:String,default:"search"}},data:function(){return{keyword:"",showClear:!1,show:!1,focused:this.focus}},watch:{keyword:function(t){this.$emit("input",t),this.$emit("change",t)},value:{immediate:!0,handler:function(t){this.keyword=t}}},computed:{showActionBtn:function(){return!(this.animation||!this.showAction)},borderStyle:function(){return this.borderColor?"1px solid ".concat(this.borderColor):"none"}},methods:{inputChange:function(t){this.keyword=t.detail.value},clear:function(){var t=this;this.keyword="",this.$nextTick((function(){t.$emit("clear")}))},search:function(t){this.$emit("search",t.detail.value);try{uni.hideKeyboard()}catch(t){}},custom:function(){this.$emit("custom",this.keyword);try{uni.hideKeyboard()}catch(t){}},getFocus:function(){this.focused=!0,this.animation&&this.showAction&&(this.show=!0),this.$emit("focus",this.keyword)},blur:function(){var t=this;setTimeout((function(){t.focused=!1}),100),this.show=!1,this.$emit("blur",this.keyword)},clickHandler:function(){this.disabled&&this.$emit("click")}}};e.default=i},"381c":function(t,e,n){"use strict";n.r(e);var i=n("65d4"),a=n("85d8");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("00c8"),n("c83c");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"7479ba4e",null,!1,i["a"],r);e["default"]=s.exports},"4af1":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("4160"),n("c975"),n("fb6a"),n("a434"),n("a9e3"),n("b64b"),n("d3b7"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("2909")),o=n("37dc"),r=i(n("11d2")),c=(0,o.initVueI18n)(r.default),s=c.t,l={load:"load",error:"error"},u={add:"add",replace:"replace"},d={auto:"auto",onready:"onready",manual:"manual"},f=["pageCurrent","pageSize","spaceInfo","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],h={name:"UniClouddb",props:{options:{type:[Object,Array],default:function(){return{}}},spaceInfo:{type:Object,default:function(){return{}}},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1}},data:function(){return{loading:!1,hasMore:!1,dataList:this.getone?void 0:[],paginationInternal:{},errorMessage:""}},computed:{collectionArgs:function(){return Array.isArray(this.collection)?this.collection:[this.collection]},isLookup:function(){return Array.isArray(this.collection)&&this.collection.length>1||"string"===typeof this.collection&&this.collection.indexOf(",")>-1},mainCollection:function(){if("string"===typeof this.collection)return this.collection.split(",")[0];var t=JSON.parse(JSON.stringify(this.collection[0]));return t.$db[0].$param[0]}},created:function(){var t=this;this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var e=[];return f.forEach((function(n){e.push(t[n])})),e}),(function(e,n){if(t.paginationInternal.size=t.pageSize,e[0]!==n[0]&&(t.paginationInternal.current=t.pageCurrent),t.loadtime!==d.manual){for(var i=!1,a=2;a<e.length;a++)if(e[a]!==n[a]){i=!0;break}i&&(t.clear(),t.reset()),t._execLoadData()}})),this.manual||this.loadtime!==d.auto||this.loadData()},beforeDestroy:function(){},methods:{loadData:function(t,e){var n=null,i=!1;"object"===typeof t?(t.clear&&(this.pageData===u.replace?this.clear():i=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"===typeof e&&(n=e)):"function"===typeof t&&(n=t),this._execLoadData(n,i)},loadMore:function(){this._isEnded||this.loading||(this.pageData===u.add&&this.paginationInternal.current++,this._execLoadData())},refresh:function(){this.clear(),this._execLoadData()},clear:function(){this._isEnded=!1,this.dataList=[]},reset:function(){this.paginationInternal.current=1},add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,a=n.showToast,o=void 0===a||a,r=n.toastTitle,c=n.success,l=n.fail,u=n.complete,d=n.needConfirm,f=void 0===d||d,h=n.needLoading,p=void 0===h||h,v=n.loadingTitle,g=void 0===v?"":v;p&&uni.showLoading({title:g});var b=t.database(this.spaceInfo);i&&(b=b.action(i)),b.collection(this.mainCollection).add(e).then((function(t){c&&c(t),o&&uni.showToast({title:r||s("uniCloud.component.add.success")})})).catch((function(t){l&&l(t),f&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){p&&uni.hideLoading(),u&&u()}))},remove:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,a=n.success,o=n.fail,r=n.complete,c=n.confirmTitle,l=n.confirmContent,u=n.needConfirm,d=void 0===u||u,f=n.needLoading,h=void 0===f||f,p=n.loadingTitle,v=void 0===p?"":p;t&&t.length&&(d?uni.showModal({title:c||s("uniCloud.component.remove.showModal.title"),content:l||s("uniCloud.component.remove.showModal.content"),showCancel:!0,success:function(n){n.confirm&&e._execRemove(t,i,a,o,r,d,h,v)}}):this._execRemove(t,i,a,o,r,d,h,v))},update:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=i.action,o=i.showToast,r=void 0===o||o,c=i.toastTitle,l=i.success,u=i.fail,d=i.complete,f=i.needConfirm,h=void 0===f||f,p=i.needLoading,v=void 0===p||p,g=i.loadingTitle,b=void 0===g?"":g;v&&uni.showLoading({title:b});var y=t.database(this.spaceInfo);return a&&(y=y.action(a)),y.collection(this.mainCollection).doc(e).update(n).then((function(t){l&&l(t),r&&uni.showToast({title:c||s("uniCloud.component.update.success")})})).catch((function(t){u&&u(t),h&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){v&&uni.hideLoading(),d&&d()}))},getTemp:function(){var e,n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],i=t.database(this.spaceInfo);this.action&&(i=i.action(this.action)),i=(e=i).collection.apply(e,(0,a.default)(this.collectionArgs)),this.where&&Object.keys(this.where).length&&(i=i.where(this.where)),this.field&&(i=i.field(this.field)),this.foreignKey&&(i=i.foreignKey(this.foreignKey)),this.groupby&&(i=i.groupBy(this.groupby)),this.groupField&&(i=i.groupField(this.groupField)),!0===this.distinct&&(i=i.distinct()),this.orderby&&(i=i.orderBy(this.orderby));var o=this.paginationInternal,r=o.current,c=o.size,s={};this.getcount&&(s.getCount=this.getcount);var l={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(s.getTree=l),this.gettreepath&&(s.getTreePath=l),i=i.skip(c*(r-1)).limit(c),n?(i=i.getTemp(s),i.udb=this):i=i.get(s),i},setResult:function(t){0===t.code?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData:function(t,e){var n=this;this.loading||(this.loading=!0,this.errorMessage="",this._getExec().then((function(i){n.loading=!1,n._execLoadDataSuccess(i.result,t,e)})).catch((function(e){n.loading=!1,n._execLoadDataFail(e,t)})))},_execLoadDataSuccess:function(t,e,n){var i=t.data,o=t.count;this._isEnded=void 0!==o?this.paginationInternal.current*this.paginationInternal.size>=o:i.length<this.pageSize,this.hasMore=!this._isEnded;var r,c=this.getone?i.length?i[0]:void 0:i;(this.getcount&&(this.paginationInternal.count=o),e&&e(c,this._isEnded,this.paginationInternal),this._dispatchEvent(l.load,c),this.getone||this.pageData===u.replace)?this.dataList=c:n?this.dataList=c:(r=this.dataList).push.apply(r,(0,a.default)(c))},_execLoadDataFail:function(t,e){this.errorMessage=t,e&&e(),this.$emit(l.error,t)},_getExec:function(){return this.getTemp(!1)},_execRemove:function(e,n,i,a,o,r,c,s){var l=this;if(this.collection&&e){var d=Array.isArray(e)?e:[e];if(d.length){c&&uni.showLoading({mask:!0,title:s});var f=t.database(this.spaceInfo),h=f.command,p=f;n&&(p=p.action(n)),p.collection(this.mainCollection).where({_id:h.in(d)}).remove().then((function(t){i&&i(t.result),l.pageData===u.replace?l.refresh():l.removeData(d)})).catch((function(t){a&&a(t),r&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){c&&uni.hideLoading(),o&&o()}))}}},removeData:function(t){for(var e=t.slice(0),n=this.dataList,i=n.length-1;i>=0;i--){var a=e.indexOf(n[i]._id);a>=0&&(n.splice(i,1),e.splice(a,1))}},_dispatchEvent:function(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}};e.default=h}).call(this,n("a9ff")["default"])},"52fd":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"57cc":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("c975"),n("baa5"),n("a434"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("841c"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("ade3")),o="opendb-search-log",r="jz-opendb-resources",c="title",s="_id,title",l="__local_search_history",u=function(t){for(var e=t.length-1;e>=0;e--){var n=t.indexOf(t[e]),i=t.lastIndexOf(t[e]);n!=i&&t.splice(i,1)}return t};function d(t,e,n){var i=t,a=null,o=!0;return n&&i(),function(){var t=arguments,n=this;o&&(o=!1,i.apply(n,t)),a&&clearTimeout(a),a=setTimeout((function(){clearTimeout(a),a=null,i.apply(n,t)}),e||200)}}var f={data:function(){return{mallGoodsDbName:r,searchLogDbName:o,statusBarHeight:"0px",localSearchList:uni.getStorageSync(l),localSearchListDel:!1,netHotListIsHide:!1,searchText:"",iconColor:"#999999",associativeList:[],keyBoardPopup:!1,hotWorld:"",focus:!0,speechEngine:"iFly"}},created:function(){this.db=t.database(),this.searchLogDb=this.db.collection(this.searchLogDbName),this.mallGoodsDb=this.db.collection(this.mallGoodsDbName),this.searchText=getApp().globalData.searchText},computed:{associativeShow:function(){return this.searchText&&this.associativeList.length}},onLoad:function(){},methods:{clear:function(t){console.log("res: ",t)},confirm:function(t){this.search(t.value)},cancel:function(t){uni.hideKeyboard(),this.searchText="",this.loadList()},search:function(){this.hotWorld&&(this.searchText=this.hotWorld),uni.hideKeyboard(),this.loadList(this.searchText)},localSearchListManage:function(t){var e=uni.getStorageSync(l);e.length?(this.localSearchList.unshift(t),u(this.localSearchList),this.localSearchList.length>10&&this.localSearchList.pop()):this.localSearchList=[t],uni.setStorageSync(l,this.localSearchList)},LocalSearchListClear:function(){var t=this;uni.showModal({content:"确认清空搜索历史吗",confirmText:"删除",confirmColor:"red",cancelColor:"#808080",success:function(e){e.confirm&&(t.localSearchListDel=!1,t.localSearchList=[],uni.removeStorageSync(l))}})},LocalSearchlistItemClick:function(t,e){if(this.localSearchListDel)return this.localSearchList.splice(e,1),uni.setStorageSync(l,this.localSearchList),void(this.localSearchList.length||(this.localSearchListDel=!1));this.search(t)},searchHotRefresh:function(){this.$refs.udb.refresh()},speech:function(){},searchLogDbAdd:function(t){var e=this;this.getDeviceId().then((function(n){e.searchLogDb.add({device_id:n,content:t,create_date:Date.now()})}))},getDeviceId:function(){return new Promise((function(t,e){var n=uni.getStorageSync("uni_id");t(n||uni.getSystemInfoSync().system+"_"+Math.random().toString(36).substr(2))}))},associativeClick:function(t){console.log("associativeClick: ",t),this.loadList(t.title)},loadList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";getApp().globalData.searchText=t,uni.navigateTo({url:"/pages/resource/list?title="+t})},backPage:function(){uni.navigateBack()}},watch:{searchText:d((function(t){var e=this;t?this.mallGoodsDb.where((0,a.default)({},c,new RegExp(t,"gi"))).field(s).get().then((function(t){e.associativeList=t.result.data})):(this.associativeList.length=0,getApp().globalData.searchText="")}),100)}};e.default=f}).call(this,n("a9ff")["default"])},"65d4":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uNavbar:n("e660").default,uSearch:n("7ed9").default,uniIcons:n("ff07").default,unicloudDb:n("960d").default,uniList:n("d6b5").default,uniListItem:n("c95d").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"search-container"},[n("v-uni-view",{staticClass:"search-container-bar"},[n("u-navbar",{attrs:{"is-back":!0,"back-icon-name":"arrow-leftward","back-icon-size":40}},[n("u-search",{attrs:{"border-color":"#7275D3","bg-color":"#fff",height:"60",placeholder:t.hotWorld,"show-action":!0},on:{search:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)},custom:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1)],1)],1),n("v-uni-view",{staticClass:"search-body"},[t.localSearchList.length?n("v-uni-view",{staticClass:"word-container"},[n("v-uni-view",{staticClass:"word-container_header"},[n("v-uni-text",{staticClass:"word-container_header-text"},[t._v("历史搜索")]),t.localSearchListDel?n("v-uni-view",{staticClass:"flex-center flex-row",staticStyle:{"font-weight":"500","justify-content":"space-between"}},[n("v-uni-text",{staticStyle:{"font-size":"22rpx",color:"#666","padding-top":"4rpx","padding-bottom":"4rpx","padding-right":"20rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.LocalSearchListClear.apply(void 0,arguments)}}},[t._v("全部删除")]),n("v-uni-text",{staticStyle:{"font-size":"22rpx",color:"#c0402b","padding-top":"4rpx","padding-bottom":"4rpx","padding-left":"20rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.localSearchListDel=!1}}},[t._v("完成")])],1):n("uni-icons",{staticClass:"search-icons",staticStyle:{"padding-right":"0"},attrs:{color:t.iconColor,size:"18",type:"trash"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.localSearchListDel=!0}}})],1),n("v-uni-view",{staticClass:"word-container_body"},t._l(t.localSearchList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"flex-center flex-row word-container_body-text",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.LocalSearchlistItemClick(e,i)}}},[n("v-uni-text",{key:e,staticClass:"word-display"},[t._v(t._s(e))]),t.localSearchListDel?n("uni-icons",{attrs:{size:"12",type:"closeempty"}}):t._e()],1)})),1)],1):t._e(),n("v-uni-view",{staticClass:"word-container"},[n("v-uni-view",{staticClass:"word-container_header"},[n("v-uni-view",{staticClass:"flex-center flex-row"},[n("v-uni-text",{staticClass:"word-container_header-text"},[t._v("热门搜索")]),t.netHotListIsHide?t._e():n("uni-icons",{staticClass:"search-icons",attrs:{color:t.iconColor,size:"14",type:"reload"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.searchHotRefresh.apply(void 0,arguments)}}})],1),n("uni-icons",{staticClass:"search-icons",staticStyle:{"padding-right":"0"},attrs:{color:t.iconColor,size:"18",type:t.netHotListIsHide?"eye-slash":"eye"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.netHotListIsHide=!t.netHotListIsHide}}})],1),n("unicloud-db",{ref:"udb",attrs:{field:"content",collection:"opendb-search-hot",orderby:"create_date desc,count desc","page-data":"replace","page-size":10},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data,a=e.loading,o=e.error;e.options;return[a&&!t.netHotListIsHide?n("v-uni-text",{staticClass:"word-container_body-info"},[t._v("正在加载...")]):n("v-uni-view",{staticClass:"word-container_body"},[t.netHotListIsHide?n("v-uni-view",{staticStyle:{flex:"1"}},[n("v-uni-text",{staticClass:"word-container_body-info"},[t._v("当前搜索发现已隐藏")])],1):[o?n("v-uni-text",{staticClass:"word-container_body-info"},[t._v(t._s(o.message))]):t._l(i,(function(e,i){return n("v-uni-text",{key:i,staticClass:"word-container_body-text",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.search(e.content)}}},[t._v(t._s(e.content))])}))]],2)]}}])})],1)],1),t.associativeShow?n("v-uni-view",{staticClass:"search-associative"},[n("uni-list",[t._l(t.associativeList,(function(e,i){return[n("uni-list-item",{key:e._id,attrs:{ellipsis:1,title:e.title,"show-extra-icon":!0,clickable:!0,"extra-icon":{size:18,color:t.iconColor,type:"search"}},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.associativeClick(e)}}})]}))],2)],1):t._e()],1)},o=[]},"68f3":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否刪除數據"}')},"6c5a":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/.u-navbar[data-v-131741e6]{width:100%}.u-navbar-fixed[data-v-131741e6]{position:fixed;left:0;right:0;top:0;z-index:991}.u-status-bar[data-v-131741e6]{width:100%}.u-navbar-inner[data-v-131741e6]{\r\ndisplay:flex;flex-direction:row;\r\njustify-content:space-between;position:relative;align-items:center}.u-back-wrap[data-v-131741e6]{\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center;flex:1;flex-grow:0;padding:%?14?% %?14?% %?14?% %?24?%;z-index:999}.u-back-text[data-v-131741e6]{padding-left:%?4?%;font-size:%?30?%}.u-navbar-content-title[data-v-131741e6]{\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center;justify-content:center;flex:1;position:absolute;left:0;right:0;height:%?60?%;text-align:center;flex-shrink:0}.u-navbar-centent-slot[data-v-131741e6]{flex:1}.u-title[data-v-131741e6]{line-height:%?60?%;font-size:%?32?%;flex:1}.u-navbar-right[data-v-131741e6]{flex:1;\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center;justify-content:flex-end}.u-slot-content[data-v-131741e6]{flex:1;\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center}',""]),t.exports=e},"723f":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,"\nuni-page-body[data-v-7479ba4e]{height:100%;flex:1}\n",""]),t.exports=e},"7ed9":function(t,e,n){"use strict";n.r(e);var i=n("a7d3"),a=n("9a5a");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("a483");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"13f672b9",null,!1,i["a"],r);e["default"]=s.exports},"832e":function(t,e,n){"use strict";var i=n("c3fe"),a=n.n(i);a.a},"845d":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._t("default",null,{options:t.options,data:t.dataList,pagination:t.paginationInternal,loading:t.loading,hasMore:t.hasMore,error:t.errorMessage})],2)},o=[]},"848e":function(t,e,n){"use strict";n.r(e);var i=n("4af1"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"85d8":function(t,e,n){"use strict";n.r(e);var i=n("57cc"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"8aab":function(t,e,n){var i=n("af79");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("50e0c986",i,!0,{sourceMap:!1,shadowMode:!1})},"960d":function(t,e,n){"use strict";n.r(e);var i=n("845d"),a=n("848e");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=s.exports},"96e3":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("7905").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{},[n("v-uni-view",{staticClass:"u-navbar",class:{"u-navbar-fixed":t.isFixed,"u-border-bottom":t.borderBottom},style:[t.navbarStyle]},[n("v-uni-view",{staticClass:"u-status-bar",style:{height:t.statusBarHeight+"px"}}),n("v-uni-view",{staticClass:"u-navbar-inner",style:[t.navbarInnerStyle]},[t.isBack?n("v-uni-view",{staticClass:"u-back-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{attrs:{name:t.backIconName,color:t.backIconColor,size:t.backIconSize}})],1),t.backText?n("v-uni-view",{staticClass:"u-icon-wrap u-back-text u-line-1",style:[t.backTextStyle]},[t._v(t._s(t.backText))]):t._e()],1):t._e(),t.title?n("v-uni-view",{staticClass:"u-navbar-content-title",style:[t.titleStyle]},[n("v-uni-view",{staticClass:"u-title u-line-1",style:{color:t.titleColor,fontSize:t.titleSize+"rpx",fontWeight:t.titleBold?"bold":"normal"}},[t._v(t._s(t.title))])],1):t._e(),n("v-uni-view",{staticClass:"u-slot-content"},[t._t("default")],2),n("v-uni-view",{staticClass:"u-slot-right"},[t._t("right")],2)],1)],1),t.isFixed&&!t.immersive?n("v-uni-view",{staticClass:"u-navbar-placeholder",style:{width:"100%",height:Number(t.navbarHeight)+t.statusBarHeight+"px"}}):t._e()],1)},o=[]},"9a4a":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"9a5a":function(t,e,n){"use strict";n.r(e);var i=n("2cf3"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"9b17":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"Success","uniCloud.component.update.success":"Success","uniCloud.component.remove.showModal.title":"Tips","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},a483:function(t,e,n){"use strict";var i=n("8aab"),a=n.n(i);a.a},a51b:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=uni.getSystemInfoSync(),a={},o={name:"u-navbar",props:{height:{type:[String,Number],default:""},backIconColor:{type:String,default:"#606266"},backIconName:{type:String,default:"nav-back"},backIconSize:{type:[String,Number],default:"44"},backText:{type:String,default:""},backTextStyle:{type:Object,default:function(){return{color:"#606266"}}},title:{type:String,default:""},titleWidth:{type:[String,Number],default:"250"},titleColor:{type:String,default:"#606266"},titleBold:{type:Boolean,default:!1},titleSize:{type:[String,Number],default:32},isBack:{type:[Boolean,String],default:!0},background:{type:Object,default:function(){return{background:"#ffffff"}}},isFixed:{type:Boolean,default:!0},immersive:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},zIndex:{type:[String,Number],default:""},customBack:{type:Function,default:null}},data:function(){return{menuButtonInfo:a,statusBarHeight:i.statusBarHeight}},computed:{navbarInnerStyle:function(){var t={};return t.height=this.navbarHeight+"px",t},navbarStyle:function(){var t={};return t.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.navbar,Object.assign(t,this.background),t},titleStyle:function(){var t={};return t.left=(i.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.right=(i.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.width=uni.upx2px(this.titleWidth)+"px",t},navbarHeight:function(){return this.height?this.height:44}},created:function(){},methods:{goBack:function(){"function"===typeof this.customBack?this.customBack.bind(this.$u.$parent.call(this))():uni.navigateBack({delta:1})}}};e.default=o},a7d3:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("7905").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-search",style:{margin:t.margin},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickHandler.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-content",style:{backgroundColor:t.bgColor,borderRadius:"round"==t.shape?"100rpx":"10rpx",border:t.borderStyle,height:t.height+"rpx"}},[n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{staticClass:"u-clear-icon",attrs:{size:30,name:t.searchIcon,color:t.searchIconColor?t.searchIconColor:t.color}})],1),n("v-uni-input",{staticClass:"u-input",style:[{textAlign:t.inputAlign,color:t.color,backgroundColor:t.bgColor},t.inputStyle],attrs:{"confirm-type":"search",value:t.value,disabled:t.disabled,focus:t.focus,maxlength:t.maxlength,"placeholder-class":"u-placeholder-class",placeholder:t.placeholder,"placeholder-style":"color: "+t.placeholderColor,type:"text"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.blur.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.getFocus.apply(void 0,arguments)}}}),t.keyword&&t.clearabled&&t.focused?n("v-uni-view",{staticClass:"u-close-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[n("u-icon",{staticClass:"u-clear-icon",attrs:{name:"close-circle-fill",size:"34",color:"#c0c4cc"}})],1):t._e()],1),n("v-uni-view",{staticClass:"u-action",class:[t.showActionBtn||t.show?"u-action-active":""],style:[t.actionStyle],on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.custom.apply(void 0,arguments)}}},[t._v(t._s(t.actionText))])],1)},o=[]},af79:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/***字体大小规范***/\r\n/***颜色定义***/\r\n/***行间距***/.u-search[data-v-13f672b9]{\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center;flex:1}.u-content[data-v-13f672b9]{\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center;padding:0 %?18?%;flex:1}.u-clear-icon[data-v-13f672b9]{\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center}.u-input[data-v-13f672b9]{flex:1;font-size:%?28?%;line-height:1;margin:0 %?10?%;color:#909399}.u-close-wrap[data-v-13f672b9]{width:%?40?%;height:100%;\r\ndisplay:flex;flex-direction:row;\r\nalign-items:center;justify-content:center;border-radius:50%}.u-placeholder-class[data-v-13f672b9]{color:#909399}.u-action[data-v-13f672b9]{font-size:%?28?%;color:#303133;width:0;overflow:hidden;transition:all .3s;white-space:nowrap;text-align:center}.u-action-active[data-v-13f672b9]{width:%?80?%;margin-left:%?10?%}',""]),t.exports=e},b942:function(t,e,n){"use strict";n.r(e);var i=n("a51b"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},c3fe:function(t,e,n){var i=n("6c5a");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("ad62e6b2",i,!0,{sourceMap:!1,shadowMode:!1})},c83c:function(t,e,n){"use strict";var i=n("227c"),a=n.n(i);a.a},dc57:function(t,e,n){var i=n("723f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("59e863e1",i,!0,{sourceMap:!1,shadowMode:!1})},e0e4:function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},e660:function(t,e,n){"use strict";n.r(e);var i=n("96e3"),a=n("b942");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("832e");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"131741e6",null,!1,i["a"],r);e["default"]=s.exports}}]);