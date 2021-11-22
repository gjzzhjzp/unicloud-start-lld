import App from './App'
import store from './store'
import i18n from './lang/i18n'
import uView from "uview-ui";
import notMoreTap from "@/common/notMoreTap.js";
// import interceptor from "@/components/jz-common/interceptor.js"
Vue.use(uView);
Vue.prototype.$notMoreTap = notMoreTap.notMoreTap;
// Vue.mixin(interceptor);
// 引入音频
import ZAudio from '@/components/uniapp-zaudio/index.js'
// import ZAudio from 'uniapp-zaudio' // npm引用方式

console.log(`ZAudio当前版本`,ZAudio.version)
let zaudio = new ZAudio({
	continuePlay: true, //续播
	autoPlay: false, //自动播放 部分浏览器不支持
})
 
Vue.prototype.$zaudio = zaudio

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
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
