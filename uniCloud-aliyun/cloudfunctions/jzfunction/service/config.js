const {
	Service
} = require('uni-cloud-router')
module.exports = class configService extends Service {
	async getConfig() {
		const configdb = this.db.collection("jz-custom-config");
		try {
			var rows= await configdb.get();
			return {
				"state": "0000",
				"data": rows,
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
