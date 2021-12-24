
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
import me from "./methods.js"
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log("to",to);
	console.log("from",from);
	// debugger;
	uni.showLoading({
		title:"加载中",
		icon:"none"
	})
	me.getConfig().then(()=>{
		if(to.path.indexOf("login-page")!=-1||to.path.indexOf("u-full-screen")!=-1||to.path.indexOf("/question/")!=-1){
			uni.hideLoading();
			next();
		}else{
			me.checkUserStatus().then((flag)=>{
				if(flag){
					me.initconfig();
				}
			});
			uni.hideLoading();
			next();
		}
	});
});
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export {
	router,
	RouterMount
}