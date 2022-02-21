import {
	RouterMount,
	createRouter
} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
import me from "./methods.js"
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	var platform = uni.getSystemInfoSync().platform;
	if (platform) {
		getApp().globalData.platform = platform;
	}
	var ua = window.navigator.userAgent.toLowerCase();
	var windowWidth = uni.getSystemInfoSync().windowWidth;
	var screenWidth = uni.getSystemInfoSync().screenWidth;
	// debugger;
	// if (ua.match(/MicroMessenger/i) == 'micromessenger' || typeof plus != "undefined" || to.path.indexOf(
	// 		"/browser/browser") != -1 || screenWidth > 1200) {
	if (to.path.indexOf("/browser/browser") != -1) {
		next();
	} else {
		me.getConfig().then(() => {
			if (to.path.indexOf("login-page") != -1 || to.path.indexOf("u-full-screen") != -1 ||
				to.path.indexOf("/question/") != -1) {
				next();
			} else {
				me.checkUserStatus().then((flag) => {
					if (flag) {
						me.initconfig();
					}
				});
				next();
			}
		});
	}
	// } else {
	// 	uni.navigateTo({
	// 		url: "/pages/browser/browser"
	// 	});
	// 	next();
	// 	// return false; // 普通浏览器中打开
	// }
});
// 全局路由后置守卫
router.afterEach((to, from) => {})

export {
	router,
	RouterMount
}
