const {
	Controller
} = require('uni-cloud-router')
module.exports = class checkquestionController extends Controller {
	async check() {
		return await this.service.checkquestion.check()
	}
	async checkisvisit(){
		return await this.service.checkquestion.checkisvisit()
	}
	async getquestion(){
		return await this.service.checkquestion.getquestion()
	}
}
