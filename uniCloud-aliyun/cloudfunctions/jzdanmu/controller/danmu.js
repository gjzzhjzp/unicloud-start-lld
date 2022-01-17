const {
	Controller
} = require('uni-cloud-router')
module.exports = class danmuController extends Controller {
	async getdanmu() {
		return await this.service.danmu.getdanmu()
	}
	async senddanmu() {
		return await this.service.danmu.senddanmu()
	}
}