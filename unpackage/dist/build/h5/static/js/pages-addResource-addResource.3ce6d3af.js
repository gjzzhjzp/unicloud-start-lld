(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addResource-addResource"],{"7cbb":function(e,t,r){"use strict";r.r(t);var i=r("df07"),s=r.n(i);for(var a in i)"default"!==a&&function(e){r.d(t,e,(function(){return i[e]}))}(a);t["default"]=s.a},"89b6":function(e,t,r){"use strict";r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return i}));var i={uNavbar:r("e660").default,uForm:r("841e").default,uFormItem:r("572f").default,uInput:r("1d02").default,uniFilePicker:r("deda").default,uToast:r("b571").default,uButton:r("c7c3").default},s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"jz-container"},[r("u-navbar",{attrs:{"is-back":!0,title:"我要投稿"}}),r("u-form",{ref:"uForm",attrs:{model:e.form,"label-width":"140"}},[r("u-form-item",{attrs:{required:!0,label:"标题",prop:"title"}},[r("u-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("u-form-item",{attrs:{required:!0,label:"简介",prop:"excerpt"}},[r("u-input",{model:{value:e.form.excerpt,callback:function(t){e.$set(e.form,"excerpt",t)},expression:"form.excerpt"}})],1),r("u-form-item",{attrs:{required:!0,label:"投稿人",prop:"contributor"}},[r("u-input",{model:{value:e.form.contributor,callback:function(t){e.$set(e.form,"contributor",t)},expression:"form.contributor"}})],1),r("u-form-item",{attrs:{required:!0,label:"作者",prop:"author"}},[r("u-input",{model:{value:e.form.author,callback:function(t){e.$set(e.form,"author",t)},expression:"form.author"}})],1),r("u-form-item",{attrs:{required:!0,label:"分类",prop:"category_id"}},[r("u-input",{model:{value:e.form.category_id,callback:function(t){e.$set(e.form,"category_id",t)},expression:"form.category_id"}})],1),r("u-form-item",{attrs:{required:!0,label:"封面图片",prop:"avatar"}},[r("v-uni-view",{staticStyle:{width:"100%"}},[r("uni-file-picker",{ref:"filepicker1",attrs:{fileMediatype:"image",mode:"grid","auto-upload":!1,limit:1},on:{select:function(t){arguments[0]=t=e.$handleEvent(t),e.selectFile.apply(void 0,arguments)},success:function(t){arguments[0]=t=e.$handleEvent(t),e.successFile.apply(void 0,arguments)}},model:{value:e.avatar,callback:function(t){e.avatar=t},expression:"avatar"}})],1)],1),r("u-form-item",{attrs:{required:!0,label:"附件资源",prop:"resources"}},[r("v-uni-view",{staticStyle:{width:"100%"}},[r("uni-file-picker",{ref:"filepicker2",attrs:{fileMediatype:"all",mode:"grid","auto-upload":!1},on:{select:function(t){arguments[0]=t=e.$handleEvent(t),e.selectFile2.apply(void 0,arguments)},success:function(t){arguments[0]=t=e.$handleEvent(t),e.successFile2.apply(void 0,arguments)}},model:{value:e.resources,callback:function(t){e.resources=t},expression:"resources"}})],1)],1)],1),r("u-toast",{ref:"uToast"}),r("u-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submitbefore.apply(void 0,arguments)}}},[e._v("提交")]),r("u-button",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.deleteFile.apply(void 0,arguments)}}},[e._v("批量删除测试数据")])],1)},a=[]},a4ca:function(e,t,r){"use strict";r.r(t);var i=r("89b6"),s=r("7cbb");for(var a in s)"default"!==a&&function(e){r.d(t,e,(function(){return s[e]}))}(a);var u,o=r("f0c5"),n=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,"2ed4cf40",null,!1,i["a"],u);t["default"]=n.exports},df07:function(e,t,r){"use strict";(function(e){var i=r("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("96cf");var s=i(r("1da1")),a={data:function(){return{form:{title:"",excerpt:"",zy_gs:"",contributor:"",author:"",category_id:"",avatar:"",resources:[]},avatar:[],resources:[],rules:{title:[{required:!0,message:"请输入标题",trigger:["change","blur"]}],excerpt:[{required:!0,message:"请输入摘要",trigger:["change","blur"]}],zy_gs:[{required:!0,message:"请输入格式",trigger:["change","blur"]}],contributor:[{required:!0,message:"请输入投稿人",trigger:["change","blur"]}],author:[{required:!0,message:"请输入作者",trigger:["change","blur"]}],category_id:[{required:!0,message:"请输入分类",trigger:["change","blur"]}]},filesuccess1:0,filesuccess2:0}},methods:{selectFile:function(e){console.log("parames",e),this.avatar=e.tempFilePaths},successFile:function(e){this.$set(this.form,"avatar",e.tempFilePaths[0]),this.filesuccess1=1,1==this.filesuccess2&&this.submit()},selectFile2:function(e){this.resources=e.tempFilePaths},successFile2:function(e){this.$set(this.form,"resources",e.tempFilePaths);var t="";e.tempFiles.length>0&&(t=e.tempFiles[0].extname),this.$set(this.form,"zy_gs",t),this.filesuccess2=1,1==this.filesuccess1&&this.submit()},submitbefore:function(){var e=this;this.$refs.uForm.validate((function(t){if(t){if(0==e.avatar.length)return void e.$refs.uToast.show({title:"请选择封面图片",type:"warning"});if(0==e.resources.length)return void e.$refs.uToast.show({title:"请选择资源",type:"warning"});e.$refs.filepicker1.upload(),e.$refs.filepicker2.upload()}else console.log("验证失败")}))},submit:function(){var t=this;console.log("submit",JSON.stringify(this.form)),e.callFunction({name:"jzfunction",data:{action:"resource/addList",data:this.form}}).then((function(e){console.log("res",JSON.stringify(e));e=e.result;"0000"==e.state?t.$refs.uToast.show({title:e.msg,type:"success"}):t.$refs.uToast.show({title:e.msg,type:"error"})}))},deleteFile:function(){return(0,s.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.callFunction({name:"jzfunction",data:{action:"resource/deleteFile"}}).then((function(e){console.log("res",JSON.stringify(e))}));case 1:case"end":return t.stop()}}),t)})))()}},onReady:function(){this.$refs.uForm.setRules(this.rules)}};t.default=a}).call(this,r("a9ff")["default"])}}]);