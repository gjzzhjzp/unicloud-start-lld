const {
	Service
} = require('uni-cloud-router')
module.exports = class bannerService extends Service {
	async getList() {
		const event=this.ctx.data;
		try {
			const bannernumdb = await this.db.collection("opendb-banner").
			where({
				type:event.type,
				status:true
			}).orderBy('sort', 'asc').limit(10).get();
			var data=await this.dealImgResource(bannernumdb.data);
			return {
				"state": "0000",
				"rows": data,
				"total": bannernumdb.affectedDocs,
				"msg": "查询成功"
			};
		} catch (e) {
			console.log("e", e);
			return {
				"state": "0000",
				"rows": [],
				"total": 0,
				"msg": "查询失败," + e
			};
		}
	}
	// 处理图片视频加载不出来的问题，暂时替换域名法
	async dealImgResource(data) {
		data.forEach((item) => {
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
					})
				}
			}
		});
		return data;
	}
}
