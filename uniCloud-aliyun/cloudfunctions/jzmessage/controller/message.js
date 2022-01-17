const {
	Controller
} = require('uni-cloud-router')
module.exports = class messageController extends Controller {
	async addMessage() {
		return await this.service.message.addMessage()
	}
}
