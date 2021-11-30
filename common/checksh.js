const db = uniCloud.database();
export default{
	data(){
		return {
			
		}
	},
	methods:{
		async no_istgzcsh(){
			// debugger;
			var istgzcsh = uni.getStorageSync("istgzcsh_success"); //是否通过登录注册审核
			if (!istgzcsh) {
				this.checkwbsftg().then((flag)=>{
					if(flag){
						uni.showModal({
							title: '提示',
							showCancel: false,
							confirmText: "确定",
							content: '你的微博审核已通过，请重新登陆',
							success: function(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: "/pages/ucenter/login-page/pwd-login/pwd-login"
									});
								}
							}
						});
					}else{
						uni.redirectTo({
							url: "/uview-ui/components/u-full-screen/u-full-screen-shts"
						});
					}
				});
			}else{
				// if(this.getgonggao){
				// 	this.getgonggao();
				// }
			}
		},
		// 检测微博审核是否通过
		checkwbsftg(){
			return new Promise(async (reslove)=>{
				// debugger;
				var username="";
				var userInfo=uni.getStorageSync("userInfo");
				if(userInfo){
					username = userInfo.username;
				}
				if(!username){
					reslove(false);
					return;
				}
				const collection = db.collection('uni-id-users');
				var result=await collection.where({
					username:username
				}).field("username,isbdwb,weiboname,weibocontent,nickname").get();
				if(result.result.data&&result.result.data.length>0){
					var data=result.result.data[0];
					if(data.isbdwb){
						reslove(true);
					}else{
						if(data.weiboname&&data.weibocontent){
							uni.redirectTo({
								url:"/uview-ui/components/u-full-screen/u-full-screen-tsfwb?content="+data.weibocontent
							});
							// uni.showModal({
							// 	title: '提示',
							// 	showCancel: false,
							// 	confirmText: "退出",
							// 	content: '您已提交微博验证【'+data.weibocontent+'】申请，如已发微博，请等待管理员审核',
							// 	success: function(res) {
							// 		if (res.confirm) {
							// 			console.log("在这里退出App");
							// 			// #ifdef APP-PLUS
							// 			plus.runtime.quit();
							// 			// #endif
							// 		}
							// 	}
							// });
						}else{
							reslove(false);
						}
					}
				}else{
					reslove(false);
				}
				console.log("result",result);
			});
		},
	}
}