const {
	Controller
} = require('uni-cloud-router')
module.exports = class searchController extends Controller {
	async addSerach() {
		return await this.service.search.addSerach()
	}
	async getHotList() {
		return await this.service.search.getHotList()
	}
	async getHistoryList() {
		return await this.service.search.getHistoryList()
	}
}
