import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './lang/i18n'
import uView from "uview-ui";
import notMoreTap from "@/common/notMoreTap.js";
import {router,RouterMount} from './router/index.js'  //路径换成自己的
Vue.use(router)
// import { RouterMount } from 'uni-simple-router'
Vue.use(uView);
Vue.prototype.$notMoreTap = notMoreTap.notMoreTap;
// 引入音频
import ZAudio from '@/components/uniapp-zaudio/index.js'

let zaudio = new ZAudio({
	continuePlay: true, //续播
	autoPlay: false, //自动播放 部分浏览器不支持
})
 
Vue.prototype.$zaudio = zaudio

// #ifndef VUE3
// import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
// app.$mount()
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	app.use(store)
	return {app}
}
// #endif
