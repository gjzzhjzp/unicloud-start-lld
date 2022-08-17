const {
	Service
} = require('uni-cloud-router')
const BASE64 = require("./common/base64.js")
module.exports = class resourceService extends Service {
	async add_like() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection_resource = db.collection('jz-opendb-taolun');
			var like_count = data.like_count || 0;
			like_count += 1;
			await collection_resource.where({
				_id: data._id
			}).update({
				like_count: like_count
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
	async cancel_like() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection_resource = db.collection('jz-opendb-taolun');
			var like_count = data.like_count || 0;
			like_count -= 1;
			await collection_resource.where({
				_id: data._id
			}).update({
				like_count: like_count
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
	async addList() {
		//event为客户端上传的参数
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			const collection = db.collection('jz-opendb-taolun');
			var data_fj = [];
			if (!Array.isArray(data)) {
				data = [data];
				data.forEach((item) => {
					item.article_status = 0;
					item.view_count = 0;
					item.like_count = 0;
					item.last_modify_date = new Date().format("yyyy-MM-dd hh:mm:ss")
				});
			}
			var res = await collection.add(data);
			// console.log("res", res);
			return {
				"state": "0000",
				"data": "",
				"msg": "添加成功"
			};
		} catch (e) {
			return {
				"state": "9999",
				"data": "",
				"msg": "添加失败"
			};
		}
	}
	async getUserRole(ctx) {
		var _token = ctx.event.uniIdToken;
		var __token = {};
		if (_token) {
			_token = _token.split(".")[1];
			var __token = BASE64.decode(_token);
			__token = JSON.parse(__token.split("}")[0] + "}");
		}
		return __token.role;
	}
	async getMyfavoriteList() {
		var db = this.db;
		var context = this.ctx;
		var data = this.ctx.data;
		var uid = data.uid;
		var page = data.page;
		var rows = data.rows || 16;
		const collection = db.collection('opendb-news-favoriteTaolun');
		// const collectionconfig = db.collection('jz-opendb-taolun');

		var collection_query = collection.aggregate().match({
			user_id: uid
		}).sort({
			"update_date": -1
		}).skip((page - 1) * rows).limit(rows);
		var resultdata = {};

		resultdata = await collection_query.lookup({
			from: 'jz-opendb-taolun',
			localField: 'article_id',
			foreignField: '_id',
			as: 'article_id',
		}).lookup({
			from: 'uni-id-users',
			localField: 'user_id',
			foreignField: '_id',
			as: 'userinfo',
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
	async getHistoryList() {
		var db = this.db;
		var context = this.ctx;
		var data = this.ctx.data;
		var uid = data.uid;
		var page = data.page;
		var rows = data.rows || 16;
		const collection = db.collection('opendb-news-historyTaolun');
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
			as: 'userinfo'
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
	// 获取发帖列表
	async getList() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			var type = data.type || "zxpl";
			var rows = data.rows || 10;
			var page = data.page || 1;
			var categories = data.categories;
			// return ;
			const collection = db.collection('jz-opendb-taolun');
			// const collectionconfig = db.collection('jz-custom-config');

			var where_obj = {
				"article_status": 1,
				"is_off": db.command.neq(1)
			}
			// 如果是管理员，读取全部资源，包括下架资源
			var roles = await this.getUserRole(context);
			if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1)) {
				delete where_obj.is_off;
			}
			var where = {}; ///查询条件
			if (categories) {
				if (categories == '9') { ///精华帖
					where = db.command.or([Object.assign({
						"is_good": 1
					}, where_obj)]);
				} else {
					where = db.command.or([Object.assign({
						"categories": parseInt(categories)
					}, where_obj)]);
				}

			} else {
				where = Object.assign(where_obj, {
					is_recommend: data.is_recommend || 0
				});
			}
			var collection_query = null;
			if (type == "zx") {
				collection_query = collection.aggregate().match(where).sort({
					"publish_date": -1
				}).skip((page - 1) * rows).limit(rows);
			} else if (type == "zxpl") {
				collection_query = collection.aggregate().match(where).sort({
					"last_modify_date": -1
				}).skip((page - 1) * rows).limit(rows);
			} else if (type == "rm") {
				collection_query = collection.aggregate().match(where).sort({
					"like_count1": -1
				}).skip((page - 1) * rows).limit(rows);
			} else if (type == "sc") {
				collection_query = collection.aggregate().match(where).sort({
					"like_count": -1
				}).skip((page - 1) * rows).limit(rows);
			} else if (type == "tj") {
				Object.assign(where, {
					is_recommend: 1
				});
				collection_query = collection.aggregate().match(where).sort({
					"last_modify_date": -1
				}).skip((page - 1) * rows).limit(rows);
			}
			var resultdata = {};
			var uid = data.uid;
			const dbCmd = db.command;
			const $ = dbCmd.aggregate;
			resultdata = await collection_query.lookup({
				from: 'uni-id-users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'userinfo',
			}).lookup({
				from: 'opendb-news-favoriteTaolun', ///获取当前用户是否收藏
				let: {
					article_id: '$_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.and([
							$.eq(['$article_id', '$$article_id']),
							$.eq(['$user_id', uid])
						]))
					)
					.done(),
				as: 'favorite',
			}).lookup({
				from: 'opendb-news-likeTaolun', ///获取当前用户是否收藏
				let: {
					article_id: '$_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.and([
							$.eq(['$article_id', '$$article_id']),
							$.eq(['$user_id', uid])
						]))
					)
					.done(),
				as: 'like',
			}).end();
			// .lookup({
			// 	from: 'opendb-news-guanzhu', ///获取当前用户是否收藏
			// 	let: {
			// 		user_id: '$user_id'
			// 	},
			// 	pipeline: $.pipeline()
			// 		.match(
			// 			dbCmd.expr($.and([
			// 				$.eq(['$buser_id', '$$user_id']),
			// 				$.eq(['$user_id', uid])
			// 			]))
			// 		)
			// 		.done(),
			// 	as: 'guanzhu',
			// })
			var app_bbh = data.app_bbh;
			if (app_bbh >= 113) {
				// 获取置顶帖子
				// if(type=="zx"){
				// var tjdata=await collection.where({
				// 	is_recommend:1
				// }).limit(1).get()
				// console.log("tjdata",tjdata);
				// if(tjdata.data&&tjdata.data.length>0){
				// 	resultdata.data.unshift(tjdata.data[0]);
				// }
				// }
				var data=await this.dealImgResource(resultdata.data);
				return {
					"state": "0000",
					"rows": data,
					"total": resultdata.data.length,
					"msg": "查询成功"
				};
			} else {
				return {
					"state": "0000",
					"rows": [],
					"total": 0,
					"msg": "查询成功"
				};
			}
		} catch (e) {
			console.log("e", e);
			return {
				"state": "9999",
				"rows": [],
				"msg": "查询失败"
			};
		}
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
	async getgzList() {
		// 1、先查询当前用户关注的所有人
		// 2、在这些人中按时间查询发帖信息
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			var rows = data.rows || 10;
			var page = data.page || 1;
			var uid = data.uid;
			var gzlistwhere = [];
			const collectiongz = db.collection('opendb-news-guanzhu');
			const collection = db.collection('jz-opendb-taolun');
			var where_obj = {
				"article_status": 1,
				// "is_recommend":0,
				"is_off": db.command.neq(1)
			}
			// 如果是管理员，读取全部资源，包括下架资源
			var roles = await this.getUserRole(context);
			if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1)) {
				delete where_obj.is_off;
			}
			// 获取关注人发帖列表
			var resgz = await collectiongz.where({
				user_id: uid
			}).get();
			console.log("resgz", resgz);
			if (resgz && resgz.data.length > 0) {
				resgz.data.forEach((item) => {
					gzlistwhere.push(Object.assign({
						user_id: item.buser_id
					}, where_obj));
				});
			}
			if (gzlistwhere && gzlistwhere.length == 0) {
				return {
					"state": "0000",
					"rows": [],
					"total": 0,
					"msg": "查询成功"
				};
			}
			var where = db.command.or(gzlistwhere); ///查询条件

			var collection_query = null;
			collection_query = collection.aggregate().match(where).sort({
				"publish_date": -1
			}).skip((page - 1) * rows).limit(rows);
			var resultdata = {};

			const dbCmd = db.command;
			const $ = dbCmd.aggregate;
			resultdata = await collection_query.lookup({
				from: 'uni-id-users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'userinfo',
			}).lookup({
				from: 'opendb-news-favoriteTaolun', ///获取当前用户是否收藏
				let: {
					article_id: '$_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.and([
							$.eq(['$article_id', '$$article_id']),
							$.eq(['$user_id', uid])
						]))
					)
					.done(),
				as: 'favorite',
			}).lookup({
				from: 'opendb-news-likeTaolun', ///获取当前用户是否收藏
				let: {
					article_id: '$_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.and([
							$.eq(['$article_id', '$$article_id']),
							$.eq(['$user_id', uid])
						]))
					)
					.done(),
				as: 'like',
			}).end();
			var app_bbh = data.app_bbh;
			if (app_bbh >= 113) {
				var data=await this.dealImgResource(resultdata.data);
				
				return {
					"state": "0000",
					"rows": data,
					"total": resultdata.data.length,
					"msg": "查询成功"
				};
			} else {
				return {
					"state": "0000",
					"rows": [],
					"total": 0,
					"msg": "查询成功"
				};
			}
		} catch (e) {
			console.log("e", e);
			return {
				"state": "9999",
				"rows": [],
				"msg": "查询失败"
			};
		}
	}
	// 查询单条资源
	async getResource() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			var uid = data.uid;
			const collection = db.collection('jz-opendb-taolun').aggregate().match({
				_id: data._id
			});
			const dbCmd = db.command;
			const $ = dbCmd.aggregate;
			var resultdata = await collection.lookup({
					from: 'uni-id-users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'userinfo',
				}).lookup({
					from: 'opendb-news-favoriteTaolun', ///获取当前用户是否收藏
					let: {
						article_id: '$_id'
					},
					pipeline: $.pipeline()
						.match(
							dbCmd.expr($.and([
								$.eq(['$article_id', '$$article_id']),
								$.eq(['$user_id', uid])
							]))
						)
						.done(),
					as: 'favorite',
				}).lookup({
					from: 'opendb-news-likeTaolun', ///获取当前用户是否收藏
					let: {
						article_id: '$_id'
					},
					pipeline: $.pipeline()
						.match(
							dbCmd.expr($.and([
								$.eq(['$article_id', '$$article_id']),
								$.eq(['$user_id', uid])
							]))
						)
						.done(),
					as: 'like',
				})
				.lookup({
					from: 'opendb-news-guanzhu', ///获取当前用户是否收藏
					let: {
						user_id: '$user_id'
					},
					pipeline: $.pipeline()
						.match(
							dbCmd.expr($.and([
								$.eq(['$buser_id', '$$user_id']),
								$.eq(['$user_id', uid])
							]))
						)
						.done(),
					as: 'guanzhu',
				})
				.end();
			if (resultdata.data && resultdata.data.length > 0) {
				if (!resultdata.data[0].view_count) {
					resultdata.data[0].view_count = 0;
				}
				// // 浏览数+1
				resultdata.data[0].view_count += 1;
				await db.collection('jz-opendb-taolun').where({
					_id: data._id
				}).update({
					view_count: resultdata.data[0].view_count
				});
				var data=await this.dealImgResource(resultdata.data);
				return {
					"state": "0000",
					"rows": data,
					"total": resultdata.data.length,
					"msg": "查询成功"
				};
			} else {
				return {
					"state": "0000",
					"rows": [],
					"total": 0,
					"msg": "查询成功"
				};
			}
		} catch (e) {
			return {
				"state": "9999",
				"rows": [],
				"msg": "查询失败" + e
			};
		}
	}
}
