<script>
	import initApp from '@/common/appInit.js';
	import openApp from '@/common/openApp.js';
	import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
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
				openApp() //创建在h5端全局悬浮引导用户下载app的功能
			// #endif
			// #ifdef APP-PLUS
			//checkIsAgree(); APP端暂时先用原生默认生成的。目前，自定义方式启动vue界面时，原生层已经请求了部分权限这并不符合国家的法规
			// #endif

			// #ifdef H5
			// checkIsAgree(); // 默认不开启。目前全球，仅欧盟国家有网页端同意隐私权限的需要。如果需要
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
				uni.navigateTo({
					url:"/pages/question/question"
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
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
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './static/css/common.css';
	@import 'uview-ui/index.scss';
	/*每个页面公共css */
</style>
