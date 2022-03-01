const {
	Service
} = require('uni-cloud-router')
module.exports = class jzresourcehjService extends Service {
	async getList() {
		var db = this.db;
		var context = this.ctx;
		var data = this.ctx.data;
		var parent_id = data.parent_id;
		var page = data.page;
		var rows = data.rows || 12;
		const collection = db.collection('jz-opendb-resourceshj');
		var collection_query = collection.aggregate().match({
			parent_id: parent_id
		}).sort({
			"sort": 1,
			"create_date":1
		}).skip((page - 1) * rows).limit(rows);
		var resultdata = {};
		resultdata = await collection_query.lookup({
			from: 'jz-opendb-resources',
			localField: 'article_id',
			foreignField: '_id',
			as: 'article_id',
		}).end();
		return {
			"state": "0000",
			"rows": resultdata.data,
			"total": resultdata.data.length,
			"msg": "查询成功"
		};

	}
}
