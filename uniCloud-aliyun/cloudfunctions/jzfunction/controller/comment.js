const {
	Controller
} = require('uni-cloud-router')
module.exports = class commentController extends Controller {
	async getcomment() {
		return await this.service.comment.getcomment()
	}
	
}