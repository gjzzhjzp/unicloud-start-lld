const {
	Controller
} = require('uni-cloud-router')
module.exports = class bannerController extends Controller {
	async getList() {
		return await this.service.banner.getList()
	}
}
