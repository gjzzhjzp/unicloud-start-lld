const {
	Service
} = require('uni-cloud-router')
module.exports = class yqmService extends Service {
	async updateYqmZt() {
		const event = this.ctx.data;
		const yqmdb = this.db.collection("jz-custom-yqm");
		try {
			await yqmdb.doc(event.id).update({
				status: false
			});
			return {
				"state": "0000",
				"data": true,
				"msg": "更新成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"data": false,
				"msg": "更新失败"
			};
		}
	}
	async addYqm() {
		const event = this.ctx.data;
		var number = event.number;
		var addvalues = [];
		for (var i = 0; i < number; i++) {
			var value = {
				status: true,
				value: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
			};
			addvalues.push(value);
		}
		const yqmdb = this.db.collection("jz-custom-yqm");
		try {
			await yqmdb.add(addvalues);
			return {
				"state": "0000",
				"data": true,
				"msg": "新增成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"data": false,
				"msg": "新增失败" + e
			};
		}
	}
}
