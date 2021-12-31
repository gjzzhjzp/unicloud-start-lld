const {
	Service
} = require('uni-cloud-router')
module.exports = class bannerService extends Service {
	async getList() {
		const event=this.ctx.data;
		try {
			const bannernumdb = await this.db.collection("opendb-banner").
			where({
				type:event.type,
				status:true
			}).orderBy('sort', 'asc').limit(10).get();
			return {
				"state": "0000",
				"rows": bannernumdb.data,
				"total": bannernumdb.affectedDocs,
				"msg": "查询成功"
			};
		} catch (e) {
			console.log("e", e);
			return {
				"state": "0000",
				"rows": [],
				"total": 0,
				"msg": "查询失败," + e
			};
		}
	}
}
