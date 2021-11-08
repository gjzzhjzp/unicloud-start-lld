const {
	Service
} = require('uni-cloud-router')
const {
	setRz,
	setFks
} = require('jz-common')
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
			console.log("res", res);
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
	// 获取列表
	async getList() {
		try {
			var db = this.db;
			var context = this.ctx;
			var data = this.ctx.data;
			console.log("getList_data", data);
			var type = data.type || "zx";
			var label = data.label; ///标签
			const collection = db.collection('jz-opendb-resources');
			var where_obj = {
				"article_status": 1,
				"title": new RegExp(data.title, 'gi'),
				"categories": new RegExp(data.categories, 'gi')
			}
			var where = {}; ///查询条件
			if (data.label) {
				where = db.command.or([Object.assign({
					"categorieszw": new RegExp(data.label, 'gi')
				}, where_obj), Object.assign({
					"labels": new RegExp(data.label, 'gi')
				}, where_obj)])
			} else {
				where = where_obj;
			}
			var resultdata = {};
			if (type == "zx") {
				resultdata = await collection.where(where).orderBy("last_modify_date", "desc").get();
			} else if (type == "rm") {
				resultdata = await collection.where(where).orderBy("view_count", "desc").get();
			}
			return {
				"state": "0000",
				"rows": resultdata.data,
				"total": resultdata.data.length,
				"msg": "查询成功"
			};
		} catch (e) {
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
			const collection = db.collection('jz-opendb-resources').aggregate().match({
				_id: data._id
			});
			var resultdata = await collection.lookup({
					from: 'uni-id-users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'userinfo',
				})
				.end()
			console.log("resultdata", resultdata);

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
			return {
				"state": "0000",
				"rows": resultdata.data,
				"total": resultdata.data.length,
				"msg": "查询成功"
			};
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
					token: "c9cf420d3b88dda3e419a5130ab25dfc"
				},
				data: {
					"appid": "",
					"provider": "aliyun",
					"spaceId": "2db467a1-bbfa-474d-8795-4dbd19fb35cc",
					"page": 1,
					"pageSize": 10,
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
