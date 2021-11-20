const {
	Service
} = require('uni-cloud-router')

module.exports = class messageService extends Service {
	async addMessage() {
		//event为客户端上传的参数
		const db=this.db;
		const context=this.ctx;
		const event=this.ctx.data;
		try{
			const dbCmd = db.command;
			const collection = db.collection('jz-custom-message');
			collection.add({
						"ip": context.CLIENTIP,
						"message":event.message,
						"time": new Date().format("yyyy-MM-dd")
					});
			return {
				"state": "0000",
				"data": true,
				"msg": "留言成功啦~"
			};
		}catch(e){
			return {
				"state": "9999",
				"data": true,
				"msg": "留言失败"
			};
		}
	}
}
