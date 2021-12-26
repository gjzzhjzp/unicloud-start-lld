const {
	Controller
} = require('uni-cloud-router')
module.exports = class resourceController extends Controller {
	async addList() {
		return await this.service.resource.addList()
	}
	async deleteFile(){
		return await this.service.resource.deleteFile()
	}
	async getList(){
		return await this.service.resource.getList()
	}
	async getListByuser(){
		return await this.service.resource.getListByuser()
	}
	async getResource(){
		return await this.service.resource.getResource()
	}
	async toFavorite(){
		return await this.service.resource.toFavorite()
	}
	async add_like(){
		return await this.service.resource.add_like()
	}
	async cancel_like(){
		return await this.service.resource.cancel_like()
	}
	async getHistoryList(){
		return await this.service.resource.getHistoryList()
	}
	async getMyfavoriteList(){
		return await this.service.resource.getMyfavoriteList()
	}
}
