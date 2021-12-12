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
		// mixins:[checksh],
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str);
			initApp();
			// #ifdef H5
			// openApp() //创建在h5端全局悬浮引导用户下载app的功能
			// #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			
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
