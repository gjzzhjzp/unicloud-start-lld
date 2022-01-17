const {
	Service
} = require('uni-cloud-router')
module.exports = class searchService extends Service {
	async addSerach() {
		const searchnumdb = this.db.collection("jz-custom-searchnum");
		const searchdb = this.db.collection("jz-custom-search");
		const IP = this.ctx.CLIENTIP;
		const Time = new Date().format("yyyy-MM-dd hh:mm:ss");
		try {
			// 记录搜索表
			var title = this.ctx.data.keyword;
			var _search = await searchdb.where({
				title: title,
				ip: IP
			}).get();
			if (_search.data.length > 0) {
				searchdb.where({
					title: title,
					ip: IP
				}).update({
					title: title,
					ip: IP,
					time: Time
				});
			} else {
				searchdb.add({
					title: title,
					ip: IP,
					time: Time
				});
			}
			// 记录搜索统计表
			var searchnum = await searchnumdb.where({
				title: title
			}).get();
			var count = 0;
			if (searchnum.data.length > 0) {
				count = searchnum.data[0].count || 0;
				searchnumdb.where({
					title: title
				}).update({
					title: title,
					count: ++count,
					time: Time
				});
			} else {
				searchnumdb.add({
					title: title,
					count: ++count,
					time: Time
				})
			}
			return {
				"state": "0000",
				"data": true,
				"msg": "查询成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"data": true,
				"msg": "查询失败"
			};
		}
	}
	async getHotList() {
		try {
			const searchnumdb = await this.db.collection("jz-custom-searchnum").orderBy('count', 'desc')
				.orderBy(
					'time', 'desc').limit(10).get();
			return {
				"state": "0000",
				"rows": searchnumdb.data,
				"total": searchnumdb.affectedDocs,
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
	async getHistoryList() {
		try {
			const searchdb = this.db.collection("jz-custom-search");
			var searchnum = await this.db.collection("jz-custom-search").where({
				ip: "127.0.0.1"
			}).orderBy('time', 'desc').limit(10).get();
			return {
				"state": "0000",
				"rows": searchnum.data,
				"total": searchnum.affectedDocs,
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
