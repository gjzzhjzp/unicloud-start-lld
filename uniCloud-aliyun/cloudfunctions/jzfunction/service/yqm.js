const {
	Service
} = require('uni-cloud-router')
module.exports = class yqmService extends Service {
	async updateYqmZt() {
		// console.log("this.ctx",this.ctx.context.CLIENTIP);
		const event=this.ctx.data;
		const yqmdb = this.db.collection("jz-custom-yqm");
		console.log("event",event.id);
		try {
			 await yqmdb.doc(event.id).update({
			   status:false
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
}
