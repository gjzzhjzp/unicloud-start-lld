(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jz-custom-yqm-detail"],{"11d2":function(t,e,n){"use strict";n.r(e);var i=n("9b17"),o=n("9a4a"),a=n("52fd"),s=n("e0e4"),r=n("68f3");e["default"]={en:i,es:o,fr:a,"zh-Hans":s,"zh-Hant":r}},"4af1":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("4160"),n("c975"),n("fb6a"),n("a434"),n("a9e3"),n("b64b"),n("d3b7"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("2909")),a=n("37dc"),s=i(n("11d2")),r=(0,a.initVueI18n)(s.default),u=r.t,c={load:"load",error:"error"},d={add:"add",replace:"replace"},l={auto:"auto",onready:"onready",manual:"manual"},f=["pageCurrent","pageSize","spaceInfo","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],h={name:"UniClouddb",props:{options:{type:[Object,Array],default:function(){return{}}},spaceInfo:{type:Object,default:function(){return{}}},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1}},data:function(){return{loading:!1,hasMore:!1,dataList:this.getone?void 0:[],paginationInternal:{},errorMessage:""}},computed:{collectionArgs:function(){return Array.isArray(this.collection)?this.collection:[this.collection]},isLookup:function(){return Array.isArray(this.collection)&&this.collection.length>1||"string"===typeof this.collection&&this.collection.indexOf(",")>-1},mainCollection:function(){if("string"===typeof this.collection)return this.collection.split(",")[0];var t=JSON.parse(JSON.stringify(this.collection[0]));return t.$db[0].$param[0]}},created:function(){var t=this;this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var e=[];return f.forEach((function(n){e.push(t[n])})),e}),(function(e,n){if(t.paginationInternal.size=t.pageSize,e[0]!==n[0]&&(t.paginationInternal.current=t.pageCurrent),t.loadtime!==l.manual){for(var i=!1,o=2;o<e.length;o++)if(e[o]!==n[o]){i=!0;break}i&&(t.clear(),t.reset()),t._execLoadData()}})),this.manual||this.loadtime!==l.auto||this.loadData()},beforeDestroy:function(){},methods:{loadData:function(t,e){var n=null,i=!1;"object"===typeof t?(t.clear&&(this.pageData===d.replace?this.clear():i=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"===typeof e&&(n=e)):"function"===typeof t&&(n=t),this._execLoadData(n,i)},loadMore:function(){this._isEnded||this.loading||(this.pageData===d.add&&this.paginationInternal.current++,this._execLoadData())},refresh:function(){this.clear(),this._execLoadData()},clear:function(){this._isEnded=!1,this.dataList=[]},reset:function(){this.paginationInternal.current=1},add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,o=n.showToast,a=void 0===o||o,s=n.toastTitle,r=n.success,c=n.fail,d=n.complete,l=n.needConfirm,f=void 0===l||l,h=n.needLoading,p=void 0===h||h,v=n.loadingTitle,g=void 0===v?"":v;p&&uni.showLoading({title:g});var m=t.database(this.spaceInfo);i&&(m=m.action(i)),m.collection(this.mainCollection).add(e).then((function(t){r&&r(t),a&&uni.showToast({title:s||u("uniCloud.component.add.success")})})).catch((function(t){c&&c(t),f&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){p&&uni.hideLoading(),d&&d()}))},remove:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,o=n.success,a=n.fail,s=n.complete,r=n.confirmTitle,c=n.confirmContent,d=n.needConfirm,l=void 0===d||d,f=n.needLoading,h=void 0===f||f,p=n.loadingTitle,v=void 0===p?"":p;t&&t.length&&(l?uni.showModal({title:r||u("uniCloud.component.remove.showModal.title"),content:c||u("uniCloud.component.remove.showModal.content"),showCancel:!0,success:function(n){n.confirm&&e._execRemove(t,i,o,a,s,l,h,v)}}):this._execRemove(t,i,o,a,s,l,h,v))},update:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.action,a=i.showToast,s=void 0===a||a,r=i.toastTitle,c=i.success,d=i.fail,l=i.complete,f=i.needConfirm,h=void 0===f||f,p=i.needLoading,v=void 0===p||p,g=i.loadingTitle,m=void 0===g?"":g;v&&uni.showLoading({title:m});var y=t.database(this.spaceInfo);return o&&(y=y.action(o)),y.collection(this.mainCollection).doc(e).update(n).then((function(t){c&&c(t),s&&uni.showToast({title:r||u("uniCloud.component.update.success")})})).catch((function(t){d&&d(t),h&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){v&&uni.hideLoading(),l&&l()}))},getTemp:function(){var e,n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],i=t.database(this.spaceInfo);this.action&&(i=i.action(this.action)),i=(e=i).collection.apply(e,(0,o.default)(this.collectionArgs)),this.where&&Object.keys(this.where).length&&(i=i.where(this.where)),this.field&&(i=i.field(this.field)),this.foreignKey&&(i=i.foreignKey(this.foreignKey)),this.groupby&&(i=i.groupBy(this.groupby)),this.groupField&&(i=i.groupField(this.groupField)),!0===this.distinct&&(i=i.distinct()),this.orderby&&(i=i.orderBy(this.orderby));var a=this.paginationInternal,s=a.current,r=a.size,u={};this.getcount&&(u.getCount=this.getcount);var c={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(u.getTree=c),this.gettreepath&&(u.getTreePath=c),i=i.skip(r*(s-1)).limit(r),n?(i=i.getTemp(u),i.udb=this):i=i.get(u),i},setResult:function(t){0===t.code?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData:function(t,e){var n=this;this.loading||(this.loading=!0,this.errorMessage="",this._getExec().then((function(i){n.loading=!1,n._execLoadDataSuccess(i.result,t,e)})).catch((function(e){n.loading=!1,n._execLoadDataFail(e,t)})))},_execLoadDataSuccess:function(t,e,n){var i=t.data,a=t.count;this._isEnded=void 0!==a?this.paginationInternal.current*this.paginationInternal.size>=a:i.length<this.pageSize,this.hasMore=!this._isEnded;var s,r=this.getone?i.length?i[0]:void 0:i;(this.getcount&&(this.paginationInternal.count=a),e&&e(r,this._isEnded,this.paginationInternal),this._dispatchEvent(c.load,r),this.getone||this.pageData===d.replace)?this.dataList=r:n?this.dataList=r:(s=this.dataList).push.apply(s,(0,o.default)(r))},_execLoadDataFail:function(t,e){this.errorMessage=t,e&&e(),this.$emit(c.error,t)},_getExec:function(){return this.getTemp(!1)},_execRemove:function(e,n,i,o,a,s,r,u){var c=this;if(this.collection&&e){var l=Array.isArray(e)?e:[e];if(l.length){r&&uni.showLoading({mask:!0,title:u});var f=t.database(this.spaceInfo),h=f.command,p=f;n&&(p=p.action(n)),p.collection(this.mainCollection).where({_id:h.in(l)}).remove().then((function(t){i&&i(t.result),c.pageData===d.replace?c.refresh():c.removeData(l)})).catch((function(t){o&&o(t),s&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){r&&uni.hideLoading(),a&&a()}))}}},removeData:function(t){for(var e=t.slice(0),n=this.dataList,i=n.length-1;i>=0;i--){var o=e.indexOf(n[i]._id);o>=0&&(n.splice(i,1),e.splice(o,1))}},_dispatchEvent:function(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}};e.default=h}).call(this,n("a9ff")["default"])},"52fd":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"58a8d":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={unicloudDb:n("960d").default,uniLoadMore:n("dffe").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("unicloud-db",{ref:"udb",attrs:{options:t.options,collection:"jz-custom-yqm",field:"user_name_type,user_name,value,status",where:t.queryWhere,getone:!0,manual:!0},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data,o=e.loading,a=e.error,s=e.options;return[a?n("v-uni-view",[t._v(t._s(a.message))]):o?n("v-uni-view",[n("uni-load-more",{attrs:{contentText:t.loadMore,status:"loading"}})],1):i?n("v-uni-view",[n("v-uni-view",[n("v-uni-text",[t._v("账号平台")]),n("v-uni-text",[t._v(t._s(s.user_name_type_valuetotext[i.user_name_type]))])],1),n("v-uni-view",[n("v-uni-text",[t._v("账号昵称")]),n("v-uni-text",[t._v(t._s(i.user_name))])],1),n("v-uni-view",[n("v-uni-text",[t._v("邀请码")]),n("v-uni-text",[t._v(t._s(i.value))])],1),n("v-uni-view",[n("v-uni-text",[t._v("生效状态")]),n("v-uni-text",[t._v(t._s(1==i.status?"✅":"❌"))])],1)],1):t._e()]}}])}),n("v-uni-view",{staticClass:"btns"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleUpdate.apply(void 0,arguments)}}},[t._v("修改")]),n("v-uni-button",{staticClass:"btn-delete",attrs:{type:"warn"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleDelete.apply(void 0,arguments)}}},[t._v("删除")])],1)],1)},a=[]},"68f3":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否刪除數據"}')},"845d":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._t("default",null,{options:t.options,data:t.dataList,pagination:t.paginationInternal,loading:t.loading,hasMore:t.hasMore,error:t.errorMessage})],2)},a=[]},"848e":function(t,e,n){"use strict";n.r(e);var i=n("4af1"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},8638:function(t,e,n){"use strict";n.r(e);var i=n("58a8d"),o=n("a3cc");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("e1fd");var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"15da4446",null,!1,i["a"],s);e["default"]=u.exports},"8f61":function(t,e,n){var i=n("bc84");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("5f0ad335",i,!0,{sourceMap:!1,shadowMode:!1})},"960d":function(t,e,n){"use strict";n.r(e);var i=n("845d"),o=n("848e");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=u.exports},"9a4a":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"9b17":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"Success","uniCloud.component.update.success":"Success","uniCloud.component.remove.showModal.title":"Tips","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},a3cc:function(t,e,n){"use strict";n.r(e);var i=n("f45d"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},bc84:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".container[data-v-15da4446]{padding:10px}.btns[data-v-15da4446]{margin-top:10px;\ndisplay:flex;\nflex-direction:row}.btns uni-button[data-v-15da4446]{flex:1}.btn-delete[data-v-15da4446]{margin-left:10px}",""]),t.exports=e},e0e4:function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},e1fd:function(t,e,n){"use strict";var i=n("8f61"),o=n.n(i);o.a},f45d:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("5530")),a=n("6d99"),s={data:function(){return{queryWhere:"",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:(0,o.default)({},a.enumConverter)}},onLoad:function(t){this._id=t.id},onReady:function(){this._id&&(this.queryWhere='_id=="'+this._id+'"')},methods:{handleUpdate:function(){var t=this;uni.navigateTo({url:"./edit?id="+this._id,events:{refreshData:function(){t.$refs.udb.loadData({clear:!0})}}})},handleDelete:function(){this.$refs.udb.remove(this._id,{success:function(t){uni.navigateTo({url:"./list"})}})}}};e.default=s}}]);