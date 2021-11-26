<script>
	import initApp from '@/common/appInit.js';
	import openApp from '@/common/openApp.js';
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config: {},
			$i18n: {},
			$t: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str);

			this.getConfig();
			initApp();
			// #ifdef H5
			// openApp() //创建在h5端全局悬浮引导用户下载app的功能
			// #endif

			// #ifdef APP-PLUS
			//idfa有需要的用户在应用首次启动时自己获取存储到storage中
			//https://ask.dcloud.net.cn/article/36107
			/*if(~plus.storage.getItem('idfa')){
				plus.device.getInfo({//需要勾选IDFA
					success:function(e){  
						console.log('idfa =  '+JSON.stringify(e.idfa));  
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));  
					}  
				});
			}*/
			// #endif
		},
		onShow: function() {
			console.log('App Show');
			var question_success = uni.getStorageSync("question_success");
			var istgzcsh = uni.getStorageSync("istgzcsh_success"); //是否通过登录注册审核
			if (!question_success) {
				uni.redirectTo({
					url: "/pages/question/question"
				});
			} else {
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
				}
			}
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			// 检测微博审核是否通过
			checkwbsftg(){
				return new Promise(async (reslove)=>{
					debugger;
					const db = uniCloud.database();
					var uid="";
					try{
						uid = db.getCloudEnv('$cloudEnv_uid');
					}catch(e){
						reslove(false)
					}
					const collection = db.collection('uni-id-users');
					if(!uid){
						reslove(false);
						return;
					}
					var result=await collection.where({
						_id:uid
					}).get();
					if(result.result.data&&result.result.data.length>0){
						var data=result.result.data[0];
						if(data.isbdwb){
							reslove(true);
						}else{
							if(data.weiboname&&data.weibocontent){
								uni.showModal({
									title: '提示',
									showCancel: false,
									confirmText: "退出",
									content: '您已提交微博验证【'+data.weibocontent+'】申请，如已发微博，请等待管理员审核',
									success: function(res) {
										if (res.confirm) {
											console.log("在这里退出App");
										}
									}
								});
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
			// 获取配置项和微博内容
			getConfig() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'config/getConfig'
					},
				}).then((res) => {
					var res = res.result;
					var config = {};
					var weiboyz = [];
					console.log("res", res);
					if (res.state == "0000") {
						var configdata = res.data.config;
						var weiboyzdata = res.data.weiboyz;
						if (configdata.data && configdata.data.length > 0) {
							configdata.data.forEach((item) => {
								config[item.config_bm] = item.config_val;
							});
						}
						if (weiboyzdata.data && weiboyzdata.data.length > 0) {
							weiboyzdata.data.forEach((item) => {
								weiboyz.push(item.content);
							});
						}
						this.globalData.config = config;
						this.globalData.weiboyz = weiboyz;
						this.setfks(config);
					} else {
						uni.showToast({
							title: res.msg,
							icon: null
						})
					}
				});
			},
			setfks(config) {
				var parames = {
					config: config
				};
				var app_bbh = "";
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				if (app_bbh) {
					Object.assign(parames, {
						app_bbh: app_bbh
					});
				}
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'fks/setfks',
						data: parames
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						console.log(res.msg)
					} else {
						uni.redirectTo({
							url: "/uview-ui/components/u-full-screen/u-full-screen"
						})
						// uni.showToast({
						// 	title:res.msg,
						// 	icon:null
						// })
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './static/css/common.css';
	@import 'uview-ui/index.scss';
	// #ifdef APP-VUE 
	@import "uview-ui/index.scss";
	// #endif 
</style>
