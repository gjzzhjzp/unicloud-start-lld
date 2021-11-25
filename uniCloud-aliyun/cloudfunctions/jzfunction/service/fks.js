const {
	Service
} = require('uni-cloud-router')
module.exports = class fksService extends Service {
	async setfks() {
		var ctx = this.ctx;
		const data = this.ctx.data;
		var ip=ctx.context.CLIENTIP;
		var maxCount = 1000000;
		var openxz = false;
		const db = uniCloud.database();
		var app_bbh=data.app_bbh;
		const collection_fks = db.collection('jz-custom-fks');
		var count = await collection_fks.where({
			time:new RegExp(new Date().format("yyyy-MM-dd"), 'gi')  
		}).count();
		if (data.config["800002"] == '1') { /////开启访问人数限制
			openxz = true;
			maxCount = data.config["800003"]; ////最大访问人数
		}
		if (app_bbh&&app_bbh<data.config["800004"]) { /////开启访问人数限制
			return {
				state: "9999",
				msg: "今日访问人数已达上线"
			}
		}
		if (openxz&&count.total > parseInt(maxCount)) {
			return {
				state: "9999",
				msg: "今日访问人数已达上线"
			}
			// return {
			// 	state:"0000"
			// }
		} else {
			var add_data = {
				"ip": ip,
				"time": new Date().format("yyyy-MM-dd hh:mm:ss")
			}
			await collection_fks.add(add_data);
			return {
				state: "0000",
				msg: "成功"
			}
		}
	}
}
