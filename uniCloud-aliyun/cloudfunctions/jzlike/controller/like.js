const {
	Controller
} = require('uni-cloud-router')
module.exports = class likeController extends Controller {
	// like_count，收藏项字段（以前命名的，为了不防止冲突，依然保留）
	// like_count1，喜欢项字段
	
	
	// 获取资源喜欢项
	async getMylikeList(){
		return await this.service.like.getMylikeList()
	}
	// 获取讨论喜欢项
	async getMylikeTaolunList(){
		return await this.service.like.getMylikeTaolunList()
	}
	// 添加资源喜欢项
	async add_like(){
		return await this.service.like.add_like()
	}
	// 取消资源喜欢项
	async cancel_like(){
		return await this.service.like.cancel_like()
	}
	// 添加讨论喜欢项
	async add_likeTaolun(){
		return await this.service.like.add_likeTaolun()
	}
	// 取消讨论喜欢项
	async cancel_likeTaolun(){
		return await this.service.like.cancel_likeTaolun()
	}
}
