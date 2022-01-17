const {
	Controller
} = require('uni-cloud-router')
module.exports = class taolunController extends Controller {
	async getList() {
		return await this.service.taolun.getList()
	}
	async getResource() {
		return await this.service.taolun.getResource()
	}
	async toFavorite(){
		return await this.service.taolun.toFavorite()
	}
	async add_like(){
		return await this.service.taolun.add_like()
	}
	async cancel_like(){
		return await this.service.taolun.cancel_like()
	}
	async getHistoryList(){
		return await this.service.taolun.getHistoryList()
	}
	async getMyfavoriteList(){
		return await this.service.taolun.getMyfavoriteList()
	}
}
