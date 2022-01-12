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
	console.log("to", to);
	console.log("from", from);
	if (navigator.userAgent && navigator.userAgent.indexOf('Mobile') === -1) { //pc端
		if (to.path.indexOf("/pc/pc") != -1) {
			next();
		} else {
			uni.navigateTo({
				url: "/pages/pc/pc"
			});
		}
	} else {
		me.getConfig().then(() => {
			if (to.path.indexOf("login-page") != -1 || to.path.indexOf("u-full-screen") != -1 || to.path
				.indexOf("/question/") != -1) {
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
});
// 全局路由后置守卫
router.afterEach((to, from) => {})

export {
	router,
	RouterMount
}
