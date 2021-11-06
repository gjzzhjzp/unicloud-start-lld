const {
	Controller
} = require('uni-cloud-router')
module.exports = class yqmController extends Controller {
	async updateYqmZt() {
		return await this.service.yqm.updateYqmZt()
	}
}
