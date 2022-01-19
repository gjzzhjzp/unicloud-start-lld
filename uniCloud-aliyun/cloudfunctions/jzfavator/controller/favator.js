const {
	Controller
} = require('uni-cloud-router')
module.exports = class favatorController extends Controller {
	// like_count，收藏项字段（以前命名的，为了不防止冲突，依然保留）
	// like_count1，喜欢项字段
	
	// 获取资源收藏项
	async getMyFavatorList(){
		return await this.service.favator.getMyFavatorList()
	}
	// 获取讨论收藏项
	async getMyFavatorTaolunList(){
		return await this.service.favator.getMyFavatorTaolunList()
	}
	// 添加资源收藏项
	async add_favator(){
		return await this.service.favator.add_favator()
	}
	// 取消资源收藏项
	async cancel_favator(){
		return await this.service.favator.cancel_favator()
	}
	// 添加讨论收藏项
	async add_favatorTaolun(){
		return await this.service.favator.add_favatorTaolun()
	}
	// 取消讨论收藏项
	async cancel_favatorTaolun(){
		return await this.service.favator.cancel_favatorTaolun()
	}
}
