const {
	Service
} = require('uni-cloud-router')

module.exports = class checkquestionService extends Service {
	async check() {
		//event为客户端上传的参数
		var db=this.db;
		var context=this.ctx;
		var event=this.ctx.data;
		const dbCmd = db.command;
		const collection = db.collection('jz-custom-question');
		var datalist = await collection.where(
			dbCmd.or({
				_id: event[0]._id,
				status:true
			},{
				_id: event[1]._id,
				status:true
			},{
				_id: event[2]._id,
				status:true
			})
		).get();
		var result = datalist.data;
		var flag = true;
		result.forEach((item, index) => {
			if (item.answer != event[index].answer) {
				flag = false
			}
		});
		if (flag) {
			return {
				"state": "0000",
				"data": flag,
				"msg": "验证成功"
			};
		} else {
			return {
				"state": "9999",
				"data": flag,
				"msg": "答案错误"
			};
		}
	}
	async checkisvisit() {
		//event为客户端上传的参数
		var db=this.db;
		var context=this.ctx;
		var event=this.ctx.data;
		const collection_fks = db.collection('jz-custom-fks');
		var data= await collection_fks.where({
			ip:context.CLIENTIP,
			time:new Date().format("yyyy-MM-dd")
		}).get();
		if(data.data>0){
			var _data=data.data[0];
			if(_data&&_data.isvisit=="1"){
				return {
					"state": "0000",
					"data": "",
					"msg": "通过访问验证"
				};
			}else{
				return {
					"state": "9999",
					"data": "",
					"msg": "没有通过访问验证"
				};
			}
		}else{
			return {
				"state": "9999",
				"data": "",
				"msg": "没有通过访问验证"
			};
		}
	}
	async getquestion() {
		//event为客户端上传的参数
		var db=this.db;
		var context=this.ctx;
		var event=this.ctx.data;
		const collection_que = db.collection('jz-custom-question');
		var data= await collection_que.field({ 'title': true }).get();
		if(data.affectedDocs>0){
			var _r = [];
			var i = 0;
			var returndata=[];
			do {
				var num1 = parseInt(Math.random() * data.data.length);
				if (_r.indexOf(num1) == -1) {
					_r.push(num1);
					i++;
				}
			} while (i < 3);
			data.data.forEach((item, index) => {
				if (_r.indexOf(index) != -1) {
					returndata.push(item);
				} 
			});
			return {
				"state": "0000",
				"data": returndata,
				"msg": "成功"
			};
		}else{
			return {
				"state": "9999",
				"data": [],
				"msg": "失败"
			};
		}
	}
}
