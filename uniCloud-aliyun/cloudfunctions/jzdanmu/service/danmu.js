const {
	Service
} = require('uni-cloud-router')
module.exports = class bannerService extends Service {
	async getdanmu() {
		const event = this.ctx.data;
		try {
			// 获取总数
			let res_count = await this.db.collection('jz-opendb-danmu').aggregate()
				.match({
					resource_id: event.id
				})
				.count('count')
				.end()
			var count = res_count.data[0].count;
			var nowcount=0;
			var res_list=[];
			var f_c=Math.ceil(count/500);
			for(var i=0;i<f_c;i++){
				var list = await this.db.collection("jz-opendb-danmu").where({
					resource_id: event.id
				}).skip(500*i).limit(500).get();
				res_list=res_list.concat(list.data)
			}
			return {
				"state": "0000",
				"rows": res_list,
				"total": res_count,
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
		const event = this.ctx.data;
		try {
			var result = await this.db.collection("jz-opendb-danmu").add(event);
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
