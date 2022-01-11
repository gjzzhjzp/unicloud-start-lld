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
			const collection_resource = db.collection('jz-opendb-resources');
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
			const collection_resource = db.collection('jz-opendb-resources');
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
			const collection = db.collection('jz-opendb-resources');
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
		var zy_gs = data.zy_gs;
		var page = data.page;
		var rows = data.rows || 16;
		const collection = db.collection('opendb-news-favorite');
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
			}).end();
		}

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
		var zy_gs = data.zy_gs;
		var page = data.page;
		var rows = data.rows || 16;
		const collection = db.collection('opendb-news-history');
		const collectionconfig = db.collection('jz-opendb-resources');
		// var _resultdata = collection.where({

		// }).field('article_title,update_date,article_id{_id,title,avatar,author,resources,is_off,article_status}')
		// .orderBy('update_date','desc')
		// .skip(skip).limit(this.param.rows).get();

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
			}).end();
		}

		return {
			"state": "0000",
			"rows": resultdata.data,
			"total": resultdata.data.length,
			"msg": "查询成功"
		};

	}
	// 获取资源列表
	async getList() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			var type = data.type || "zx";
			var label = data.label; ///标签
			var rows = data.rows || 10;
			var page = data.page || 1;
			var ignore = data.ignore;
			var zy_gs = "";
			// return ;
			const collection = db.collection('jz-opendb-resources');
			const collectionconfig = db.collection('jz-custom-config');
			var config_800001 = await collectionconfig.where({
				config_bm: "800001"
			}).get();
			var config_800001_value = config_800001.data[0].config_val;
			var where_obj = {
				"article_status": 1,
				"is_off": db.command.neq(1)
			}
			// 如果是管理员，读取全部资源，包括下架资源
			var roles = await this.getUserRole(context);
			if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1)) {
				delete where_obj.is_off;
			}
			if (data.categories) {
				Object.assign(where_obj, {
					"categories": new RegExp(data.categories, 'gi')
				});
			}
			if (config_800001_value == '0') { ///=1读取未授权资源，=0只读取授权资源
				Object.assign(where_obj, {
					is_grant: 1
				});
			}
			if (typeof data.zy_gs != "object") {
				zy_gs = parseInt(data.zy_gs) || 0;
				Object.assign(where_obj, {
					zy_gs: zy_gs
				});
			} else {
				Object.assign(where_obj, {
					zy_gs: db.command.neq(2)
				});
			}
			if (ignore) {
				Object.assign(where_obj, {
					_id: db.command.neq(ignore)
				});
			}
			var where = {}; ///查询条件
			if (data.label) {
				where = db.command.or([Object.assign({
					"categorieszw": new RegExp(data.label, 'gi')
				}, where_obj), Object.assign({
					"labels": new RegExp(data.label, 'gi')
				}, where_obj), Object.assign({
					"title": new RegExp(data.label, 'gi')
				}, where_obj), Object.assign({
					"author": new RegExp(data.label, 'gi')
				}, where_obj)]);
			} else {
				where = where_obj;
			}
			var collection_query = null;
			if (type == "zx") {
				collection_query = collection.aggregate().match(where).sort({
					"publish_date": -1
				}).skip((page - 1) * rows).limit(rows);
			} else if (type == "rm") {
				collection_query = collection.aggregate().match(where).sort({
					"view_count": -1
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
			if (zy_gs == 2) {
				resultdata = await collection_query.lookup({
						from: 'uni-id-users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userinfo',
					}).lookup({
						from: 'jz-custom-gechi',
						localField: '_id',
						foreignField: 'resources_id',
						as: 'gechi',
					})
					.end();
			} else {
				resultdata = await collection_query.lookup({
						from: 'uni-id-users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userinfo',
					})
					.end();
			}
			var app_bbh = data.app_bbh;
			// if (type == "tj") {
			// 	if (app_bbh) {
			// 		return {
			// 			"state": "0000",
			// 			"rows": resultdata.data,
			// 			"total": resultdata.data.length,
			// 			"msg": "查询成功"
			// 		};
			// 	} else {
			// 		return {
			// 			"state": "0000",
			// 			"rows": [resultdata.data[0]],
			// 			"total": resultdata.data.length,
			// 			"msg": "查询成功"
			// 		};
			// 	}
			// } else {
			if (app_bbh >= 113) {
				return {
					"state": "0000",
					"rows": resultdata.data,
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
			// }
		} catch (e) {
			console.log("e", e);
			return {
				"state": "9999",
				"rows": [],
				"msg": "查询失败"
			};
		}
	}
	// 通过查询用户获取资源列表
	async getListByuser() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			var type = data.type || "zx";
			var label = data.label; ////用户名/昵称
			var rows = data.rows || 10;
			var page = data.page || 1;
			var zy_gs = "";
			const collection = db.collection('jz-opendb-resources');
			const collectionconfig = db.collection('jz-custom-config');
			var config_800001 = await collectionconfig.where({
				config_bm: "800001"
			}).get();
			var config_800001_value = config_800001.data[0].config_val;
			var where_obj = {
				"article_status": 1,
				"is_off": db.command.neq(1)
			}
			// 如果是管理员，读取全部资源，包括下架资源
			var roles = await this.getUserRole(context);
			if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1)) {
				delete where_obj.is_off;
			}
			if (data.categories) {
				Object.assign(where_obj, {
					"categories": new RegExp(data.categories, 'gi')
				});
			}
			if (config_800001_value == '0') { ///=1读取未授权资源，=0只读取授权资源
				Object.assign(where_obj, {
					is_grant: 1
				});
			}
			if (typeof data.zy_gs != "object") {
				zy_gs = parseInt(data.zy_gs) || 0;
				Object.assign(where_obj, {
					zy_gs: zy_gs
				});
			} else {
				Object.assign(where_obj, {
					zy_gs: db.command.neq(2)
				});
			}
			var where = {}; ///查询条件
			if (data.label) {
				const collection_user = db.collection('uni-id-users');
				var resultuser = await collection_user.aggregate().match(
					db.command.or([{
						"username": new RegExp(data.label, 'gi')
					}, {
						"nickname": new RegExp(data.label, 'gi')
					}])
				).end();
				var userdata = resultuser.data;
				var userids = [];
				userdata.forEach((item) => {
					userids.push(item._id);
				});
				var _where = [];
				userids.forEach((item1) => {
					_where.push(Object.assign({
						"user_id": item1
					}, where_obj));
				});
				where = db.command.or(_where);
			} else {
				where = where_obj;
			}
			var collection_query = null;
			if (type == "zx") {
				collection_query = collection.aggregate().match(where).sort({
					"publish_date": -1
				}).skip((page - 1) * rows).limit(rows);
			} else if (type == "rm") {
				collection_query = collection.aggregate().match(where).sort({
					"view_count": -1
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
			if (zy_gs == 2) {
				resultdata = await collection_query.lookup({
						from: 'uni-id-users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userinfo',
					}).lookup({
						from: 'jz-custom-gechi',
						localField: '_id',
						foreignField: 'resources_id',
						as: 'gechi',
					})
					.end();
			} else {
				resultdata = await collection_query.lookup({
						from: 'uni-id-users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userinfo',
					})
					.end();
			}
			var app_bbh = data.app_bbh;
			if (app_bbh >= 113) {
				return {
					"state": "0000",
					"rows": resultdata.data,
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
			const collection = db.collection('jz-opendb-resources').aggregate().match({
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
					from: 'opendb-news-favorite', ///获取当前用户是否收藏
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
				})
				.end();
			if (resultdata.data && resultdata.data.length > 0) {
				if (!resultdata.data[0].view_count) {
					resultdata.data[0].view_count = 0;
				}
				// // 浏览数+1
				resultdata.data[0].view_count += 1;
				await db.collection('jz-opendb-resources').where({
					_id: data._id
				}).update({
					view_count: resultdata.data[0].view_count
				});
				var resource_id = resultdata.data[0]._id;
				const danmulist = await db.collection('jz-opendb-danmu').where({
					resource_id: resource_id
				}).get();
				var danmu_list = [];
				danmulist.data.forEach((item) => {
					danmu_list.push({
						text: item.danmu_text,
						color: item.danmu_color,
						time: item.danmu_time
					})
				})
				resultdata.data[0].danmulist = danmu_list;
				return {
					"state": "0000",
					"rows": resultdata.data,
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
	async deleteFile() {
		const res = await uniCloud.httpclient.request(
			"https://unicloud-api.dcloud.net.cn/unicloud/api/file/list", {
				method: 'GET',
				headers: {
					token: "78742c45f9eb6323d794ce847d134e89"
				},
				data: {
					"appid": "",
					"provider": "aliyun",
					"spaceId": "3a72b088-8226-498e-a9cc-a695d0ed4ce7",
					"page": 1,
					"pageSize": 80,
					"folder": ""
				},
				contentType: 'json', // 指定以application/json发送data内的数据  
				dataType: 'json' // 指定返回值为json格式，自动进行parse  
			})
		var fileList = [];
		if (res.data && res.data.data.files) {
			for (let file of res.data.data.files) {
				fileList.push(file.url);
			}
			await uniCloud.deleteFile({
				fileList: fileList
			});
		}
		return {
			"state": "0000",
			"data": "",
			"msg": "删除成功"
		};
	}
	async toFavorite() {
		// try{
		// 	var db = this.db;
		// 	var context = this.ctx;
		// 	var data = this.ctx.data;
		// 	const db1 = uniCloud.database()
		// 	const collection = db.collection('opendb-news-favorite');
		// 	var resultdata=await collection.add(data);
		// 	return {
		// 		"state": "0000",
		// 		"data":"",
		// 		"msg": "收藏成功"
		// 	};
		// }catch(e){
		// 	return {
		// 		"state": "9999",
		// 		"rows": [],
		// 		"msg": "收藏失败"+e
		// 	};
		// }
	}
}
