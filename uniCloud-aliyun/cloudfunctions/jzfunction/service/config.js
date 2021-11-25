const {
	Service
} = require('uni-cloud-router')
module.exports = class configService extends Service {
	async getConfig() {
		// 获取配置项
		const configdb = this.db.collection("jz-custom-config");
		// 获取微博内容
		const weiboyzdb = this.db.collection("jz-custom-weiboyz");
		try {
			var rows= await configdb.get();
			var weiboyz= await weiboyzdb.where({
				status:true
			}).get();
			return {
				"state": "0000",
				"data": {
					config:rows,
					weiboyz:weiboyz
				},
				"msg": "获取成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"data": [],
				"msg": "获取失败"
			};
		}
	}
}
