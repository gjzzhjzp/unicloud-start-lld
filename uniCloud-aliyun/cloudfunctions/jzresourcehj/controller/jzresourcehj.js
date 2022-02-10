const {
	Controller
} = require('uni-cloud-router')
module.exports = class jzresourcehjController extends Controller {
	async getList() {
		return await this.service.jzresourcehj.getList()
	}
	
}
