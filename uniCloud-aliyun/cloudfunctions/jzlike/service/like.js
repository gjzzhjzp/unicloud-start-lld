const {
	Service
} = require('uni-cloud-router');
// like_count，收藏项字段（以前命名的，为了不防止冲突，依然保留）
// like_count1，喜欢项字段

module.exports = class likeService extends Service {
	// 添加讨论喜欢/点赞项
	async add_likeTaolun() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection_resource = db.collection('jz-opendb-taolun');
			var like_count1 = data.like_count1 || 0;
			if(data.type!="1"){
			like_count1 += 1;
			}
			await collection_resource.where({
				_id: data._id
			}).update({
				like_count1: like_count1,
				last_modify_date:new Date().getTime()
			});
			return {
				"state": "0000",
				"data": "",
				"msg": "更新成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"rows": [],
				"msg": "更新失败"
			};
		}
	}
	// 取消讨论喜欢/点赞项
	async cancel_likeTaolun() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection_resource = db.collection('jz-opendb-taolun');
			var like_count1 = data.like_count1 || 0;
			if(data.type!="1"){
				like_count1 -= 1;
			}
			await collection_resource.where({
				_id: data._id
			}).update({
				like_count1: like_count1
			});
			return {
				"state": "0000",
				"data": "",
				"msg": "更新成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"rows": [],
				"msg": "更新失败"
			};
		}
	}
	// 添加资源喜欢项
	async add_like() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection_resource = db.collection('jz-opendb-resources');
			
			var like_count1 = data.like_count1 || 0;
			if(data.type!="1"){
			like_count1 += 1;
			}
			await collection_resource.where({
				_id: data._id
			}).update({
				like_count1: like_count1,
				last_modify_date:new Date().getTime()
			});
			return {
				"state": "0000",
				"data": "",
				"msg": "更新成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"rows": [],
				"msg": "更新失败"
			};
		}
	}
	// 取消讨论喜欢/点赞收藏项
	async cancel_like() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection_resource = db.collection('jz-opendb-resources');
			var like_count1 = data.like_count1 || 0;
			if(data.type!="1"){
				like_count1 -= 1;
			}
			await collection_resource.where({
				_id: data._id
			}).update({
				like_count1: like_count1
			});
			return {
				"state": "0000",
				"data": "",
				"msg": "更新成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"rows": [],
				"msg": "更新失败"
			};
		}
	}
	async getMylikeList() {
		var db = this.db;
		var context = this.ctx;
		var data = this.ctx.data;
		var uid = data.uid;
		var zy_gs = data.zy_gs;
		var page = data.page;
		var rows = data.rows || 16;
		const collection = db.collection('opendb-news-like');
		const collectionconfig = db.collection('jz-opendb-resources');
		var collection_query = collection.aggregate().match({
			user_id: uid,
			zy_gs: zy_gs
		}).sort({
			"update_date": -1
		}).skip((page - 1) * rows).limit(rows);
		var resultdata = {};
		if (zy_gs == 2) {
			const dbCmd = db.command;
			const $ = dbCmd.aggregate;
			resultdata = await collection_query.lookup({
					from: 'jz-opendb-resources',
					let: {
						article_id: '$article_id'
					},
					pipeline: $.pipeline()
						.match(
							dbCmd.expr($.eq(['$_id', '$$article_id']))
						)
						.lookup({
							from: 'jz-custom-gechi',
							let: {
								resources_id: '$_id'
							},
							pipeline: $.pipeline()
								.match(dbCmd.expr($.eq(['$resources_id', '$$resources_id'])))
								.done(),
							as: 'gechi'
						})
						.done(),
					as: 'article_id',
				})
				.end();
		} else {
			resultdata = await collection_query.lookup({
				from: 'jz-opendb-resources',
				localField: 'article_id',
				foreignField: '_id',
				as: 'article_id',
			}).lookup({
			from: 'uni-id-users',
			localField: 'user_id',
			foreignField: '_id',
			as: 'userinfo',
		}).end();
		}
		resultdata.data.forEach(async (item1)=>{
			if(item1.article_id&&item1.article_id.length>0){
				item1.article_id=await this.dealImgResource(item1.article_id);
				item1.userinfo=await this.dealImgResource(item1.userinfo);
			}
		});
		return {
			"state": "0000",
			"rows": resultdata.data,
			"total": resultdata.data.length,
			"msg": "查询成功"
		};
	}
	async getMylikeTaolunList() {
		var db = this.db;
		var context = this.ctx;
		var data = this.ctx.data;
		var uid = data.uid;
		var page = data.page;
		var rows = data.rows || 16;
		const collection = db.collection('opendb-news-likeTaolun');
		const collectionconfig = db.collection('jz-opendb-taolun');
		var collection_query = collection.aggregate().match({
			user_id: uid
		}).sort({
			"update_date": -1
		}).skip((page - 1) * rows).limit(rows);
		var resultdata = {};
		const dbCmd = db.command;
		const $ = dbCmd.aggregate;
		resultdata = await collection_query.lookup({
			from: 'jz-opendb-taolun',
			localField: 'article_id',
			foreignField: '_id',
			as: 'article_id',
		}).lookup({
			from: 'uni-id-users', ///获取当前用户信息
			let: {
				buser_id: '$buser_id'
			},
			pipeline: $.pipeline()
				.match(
					dbCmd.expr($.and([
						$.eq(['$_id', '$$buser_id'])
					]))
				)
				.done(),
			as: 'userinfo',
			
			// from: 'uni-id-users',
			// localField: 'user_id',
			// foreignField: '_id',
			// as: 'userinfo',
		}).end();
		resultdata.data.forEach(async (item1)=>{
			if(item1.article_id&&item1.article_id.length>0){
				item1.article_id=await this.dealImgResource(item1.article_id);
				item1.userinfo=await this.dealImgResource(item1.userinfo);
			}
		});
		return {
			"state": "0000",
			"rows": resultdata.data,
			"total": resultdata.data.length,
			"msg": "查询成功"
		};
	}
	// 处理图片视频加载不出来的问题，暂时替换域名法
	async dealImgResource(data) {
		data.forEach(async (item) => {
			for (var key in item) {
				if (Array.isArray(item[key]) && item[key].length > 0 && (item[key][0].path || item[key][0].url)) {
					item[key].forEach((item1) => {
						if (item1.path) {
							item1.path = item1.path.replace("vkceyugu.cdn.bspapp.com",
								"vkceyugu-backup.cdn.bspapp.com");
						}
						if (item1.url) {
							item1.url = item1.url.replace("vkceyugu.cdn.bspapp.com",
								"vkceyugu-backup.cdn.bspapp.com");
						}
					});
				}else if (Array.isArray(item[key]) && item[key].length > 0){
						item[key]=await this.dealImgResource(item[key]);
				}else if(item[key]&&item[key].url){
					item[key].url = item[key].url.replace("vkceyugu.cdn.bspapp.com",
						"vkceyugu-backup.cdn.bspapp.com");
				}
			}
		});
		return data;
	}
}
