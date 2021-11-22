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
			this.globalData.$t = str => this.$t(str)
			
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
		onShow:  function() {
			console.log('App Show');
			var question_success= uni.getStorageSync("question_success");
			if(!question_success){
				uni.redirectTo({
					url:"/pages/question/question"
				});
			}
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods:{
			// 获取配置项
			getConfig(){
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'config/getConfig'
					},
				}).then((res) => {
					var res = res.result;
					var config={};
					if (res.state == "0000") {
						if(res.data.data&&res.data.data.length>0){
							res.data.data.forEach((item)=>{
								config[item.config_bm]=item.config_val;
							});
						}
						this.globalData.config=config;
						this.setfks(config);
					} else {
						uni.showToast({
							title:res.msg,
							icon:null
						})
					}
				});
			},
			setfks(config){
				var parames={
							config:config
						};
				var app_bbh="";
				//#ifdef APP-PLUS
				 app_bbh=plus.runtime.versionCode;
				//#endif
				if(app_bbh){
					Object.assign(parames,{app_bbh:app_bbh});
				}
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'fks/setfks',
						data:parames
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						console.log(res.msg)
					} else {
						uni.redirectTo({
							url:"/uview-ui/components/u-full-screen/u-full-screen"
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
