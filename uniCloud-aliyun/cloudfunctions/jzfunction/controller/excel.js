const {
	Controller
} = require('uni-cloud-router')
module.exports = class excelController extends Controller {
	async importExcel() {
		return await this.service.excel.importExcel()
	}
}
