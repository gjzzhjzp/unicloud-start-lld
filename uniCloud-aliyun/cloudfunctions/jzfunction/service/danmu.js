const {
	Service
} = require('uni-cloud-router')
module.exports = class bannerService extends Service {
	async getdanmu() {
		const event=this.ctx.data;
		try {
			var list=await this.db.collection("jz-opendb-danmu").where({
				resource_id:event.id
			}).get();
			return {
				"state": "0000",
				"rows": list.data,
				"total": list.affectedDocs,
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
	async senddanmu() {
		const event=this.ctx.data;
		try {
			var result=await this.db.collection("jz-opendb-danmu").add(event);
			return {
				"state": "0000",
				"rows": result.data,
				"total": result.affectedDocs,
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
