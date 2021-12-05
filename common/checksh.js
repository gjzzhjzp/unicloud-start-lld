const db = uniCloud.database();
export default{
	data(){
		return {
			
		}
	},
	methods:{
		async no_istgzcsh(type){
			// debugger;
			var istgzcsh = uni.getStorageSync("istgzcsh_success"); //是否通过登录注册审核
			if (!istgzcsh) {
				this.checkwbsftg().then((flag)=>{
					if(flag){
						uni.reLaunch({
							url: "/uview-ui/components/u-full-screen/u-full-screen-shtg"
						});
					}else{
						uni.reLaunch({
							url: "/uview-ui/components/u-full-screen/u-full-screen-shts"
						});
					}
				});
			}else{
				if(type=="question"){
					uni.reLaunch({
						url: "/pages/ucenter/login-page/pwd-login/pwd-login"
					});
				}else{
					var userInfo=uni.getStorageSync("userInfo");
					if(!userInfo){
						uni.reLaunch({
							url: "/pages/ucenter/login-page/pwd-login/pwd-login"
						});
					}
				}
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
							uni.reLaunch({
								url:"/uview-ui/components/u-full-screen/u-full-screen-tsfwb?content="+data.weibocontent
							});
						}else{
							reslove(false);
						}
					}
				}else{
					reslove(false);
				}
			});
		},
	}
}