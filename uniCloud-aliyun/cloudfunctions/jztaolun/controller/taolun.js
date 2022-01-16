const {
	Controller
} = require('uni-cloud-router')
module.exports = class taolunController extends Controller {
	async getList() {
		return await this.service.taolun.getList()
	}
	async getResource() {
		return await this.service.taolun.getResource()
	}
}
