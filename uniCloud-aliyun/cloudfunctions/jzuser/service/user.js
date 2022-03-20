const {
	Service
} = require('uni-cloud-router')
let uniID = require('uni-id')
module.exports = class yqmService extends Service {
	async updateuser() {
		const event = this.ctx.data;
		const userdb = this.db.collection("uni-id-users");
		var id=event.id;
		var data=event.data;
		// console.log("event",event);
		if(data.password){
			const encResult = await uniID.encryptPwd(data.password);
			if(encResult.passwordHash){
				data.password=encResult.passwordHash;
			}
		}
		data.update_date=new Date().getTime();
		try {
			await userdb.where({
				_id:id
			}).update(data);
			return {
				"state": "0000",
				"data": true,
				"msg": "修改成功"+JSON.stringify(event)
			};
		} catch (e) {
			return {
				"state": "9999",
				"data": false,
				"msg": "修改失败"+e
			};
		}
	}
}
