const {
	Controller
} = require('uni-cloud-router')
module.exports = class configController extends Controller {
	async getConfig() {
		return await this.service.config.getConfig()
	}
}
