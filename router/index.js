import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
Vue.use(Router)
//初始化
const router = new Router({
    routes:ROUTES //路由表
});
import me from "./methods.js"
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log("to",to);
	console.log("from",from);
	// debugger;
	me.getConfig().then(()=>{
		if(to.path.indexOf("login-page")!=-1||to.path.indexOf("u-full-screen")!=-1){
			next();
		}else{
			me.checkUserStatus().then((flag)=>{
				if(flag){
					me.initconfig();
				}
			});
			next();
		}
	});
});
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;