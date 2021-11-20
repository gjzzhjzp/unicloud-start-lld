const {
	Controller
} = require('uni-cloud-router')
module.exports = class fksController extends Controller {
	async setfks() {
		return await this.service.fks.setfks()
	}
}
