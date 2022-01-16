const {
	Service
} = require('uni-cloud-router')
const excelTojson = require('ml-excel-to-json');
module.exports = class excelService extends Service {
	async importExcel() {
		var event = this.ctx.data;
		var id = event.id;
		let data = excelTojson({
			data: event.base,
			sheetList: [{
				index: 0,
				keys: ['danmu_text', 'danmu_time'],
				keysIndex: 0,
				startIndex: 1,
				endIndex: 100000
			}]
		});
		try {
			const danmu = this.db.collection("jz-opendb-danmu");
			data.forEach((item) => {
				if (item.danmu_text && item.danmu_text.substring(0, 1) == "[") {
					item.danmu_text = JSON.parse(item.danmu_text)[4];
				}
				item.danmu_time = item.danmu_time.split(",")[0];
				item.resource_id = id;
				item.danmu_color = "#fff";
			});
			console.log("data2",data);
			await danmu.add(data);
			return {
				"state": "0000",
				"data": true,
				"msg": "导入成功"
			}
		} catch (e) {
			console.log("data1",data);
			return {
				"state": "9999",
				"data": true,
				"msg": "导入失败"+e+data
			}
		}
	}
}
