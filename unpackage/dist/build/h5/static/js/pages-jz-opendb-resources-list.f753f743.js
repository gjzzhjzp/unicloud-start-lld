(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jz-opendb-resources-list"],{"6ece":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".item[data-v-272dd23e]{display:flex;padding:%?20?%}uni-image[data-v-272dd23e]{width:%?120?%;flex:0 0 %?120?%;height:%?120?%;margin-right:%?20?%;border-radius:%?12?%}.title[data-v-272dd23e]{text-align:left;font-size:%?28?%;color:$u-content-color;margin-top:%?20?%}.u-icon[data-v-272dd23e]{margin:0 6px}",""]),t.exports=e},"97d8":function(t,e,n){"use strict";var a=n("f074"),o=n.n(a);o.a},"9ac5":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uNavbar:n("e660").default,uAlertTips:n("6cd8").default,unicloudDb:n("960d").default,uSwipeAction:n("8754").default,uIcon:n("7905").default,uniLoadMore:n("dffe").default,uniFab:n("3e82").default,uBackTop:n("4532").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container jz-opendb-resources-container"},[n("u-navbar",{attrs:{"is-back":!0,title:"我的投稿"}}),n("v-uni-view",{staticStyle:{margin:"4px 0px"}},[n("u-alert-tips",{attrs:{type:"warning",description:"向左滑动可编辑/删除投稿资源"}})],1),n("unicloud-db",{ref:"udb",attrs:{collection:"jz-opendb-resources","page-size":10,where:"user_id == $cloudEnv_uid",orderby:"last_modify_date desc",field:"categories,labels,author,title,article_status,comment_status,avatar,resources,zy_gs,excerpt,content"},on:{load:function(e){arguments[0]=e=t.$handleEvent(e),t.loadSuccess.apply(void 0,arguments)}},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data,o=(e.pagination,e.loading),i=e.hasMore,r=e.error;return[r?n("v-uni-view",[t._v(t._s(r.message))]):a?n("v-uni-view",t._l(a,(function(e,a){return n("u-swipe-action",{key:e._id,attrs:{show:e.show,index:a,options:t.options},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)},open:function(e){arguments[0]=e=t.$handleEvent(e),t.open.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"item u-border-bottom",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.$notMoreTap(t.todetail,"notTap",e)}}},[1==e.article_status?n("u-icon",{attrs:{size:"40",color:"#18b566",name:"checkmark"}}):n("u-icon",{attrs:{size:"40",name:"/static/lock.png"}}),n("v-uni-image",{attrs:{mode:"aspectFill",src:e.images}}),n("v-uni-view",{staticClass:"title-wrap"},[n("v-uni-text",{staticClass:"title u-line-2"},[t._v(t._s(e.title))])],1)],1)],1)})),1):t._e(),n("uni-load-more",{attrs:{status:o?"loading":i?"more":"noMore"}})]}}])}),t.openAdd?[n("uni-fab",{ref:"fab",attrs:{horizontal:"right",vertical:"bottom","pop-menu":!1},on:{fabClick:function(e){arguments[0]=e=t.$handleEvent(e),t.$notMoreTap(t.fabClick,"notTap")}}})]:t._e(),n("u-back-top",{attrs:{"scroll-top":t.scrollTop,top:"1000",mode:"square",icon:"arrow-up",tips:"顶部"}})],2)},i=[]},b5ac:function(t,e,n){"use strict";n.r(e);var a=n("ca69"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},ca69:function(t,e,n){"use strict";n("4160"),n("d81d"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{openAdd:!1,scrollTop:0,notTap:!0,loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:[{text:"编辑",style:{backgroundColor:"#7275D3"}},{text:"删除",style:{backgroundColor:"#dd524d"}}],list:[]}},onPullDownRefresh:function(){this.$refs.udb.loadData({clear:!0},(function(){uni.stopPullDownRefresh()}))},onReachBottom:function(){this.$refs.udb.loadMore()},onPageScroll:function(t){this.scrollTop=t.scrollTop},onShow:function(){this.reload()},created:function(){var t=getApp().globalData.systemconfig;1==t["800022"]?this.openAdd=!0:this.openAdd=!1},methods:{reload:function(){this.$refs.udb&&this.$refs.udb.loadData({clear:!0},(function(){}))},todetail:function(t){uni.navigateTo({url:"/pages/detail/detail?id="+t._id})},loadSuccess:function(t){var e=this;return t.forEach((function(t){var n="";t.avatar&&(n=Array.isArray(t.avatar)?t.avatar[0].url:t.avatar.url),e.$set(t,"images",n),e.$set(t,"show",!1)})),this.list=t,t},click:function(t,e){var n=this.list[t]._id;1==e?this.handleDelete(n):(this.handleItemClick(n),this.$set(this.list[t],"show",!1))},handleDelete:function(t){this.$refs.udb.remove(t,{success:function(t){uni.navigateTo({url:"./list"})}})},open:function(t){var e=this;this.list[t].show=!0,this.list.map((function(n,a){t!=a&&(e.list[a].show=!1)}))},handleItemClick:function(t){uni.navigateTo({url:"./edit?id="+t})},fabClick:function(){var t=this;uni.navigateTo({url:"./add",events:{refreshData:function(){t.$refs.udb.loadData({clear:!0})}}})}}};e.default=a},de83:function(t,e,n){"use strict";n.r(e);var a=n("9ac5"),o=n("b5ac");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("97d8");var r,s=n("f0c5"),u=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"272dd23e",null,!1,a["a"],r);e["default"]=u.exports},f074:function(t,e,n){var a=n("6ece");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("7d2f3502",a,!0,{sourceMap:!1,shadowMode:!1})}}]);