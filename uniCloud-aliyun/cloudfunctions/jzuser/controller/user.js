const {
	Controller
} = require('uni-cloud-router')
module.exports = class userController extends Controller {
	async updateuser() {
		return await this.service.user.updateuser()
	}
}
