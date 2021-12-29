 const db = uniCloud.database();
export default{
	data(){
		return {
			notTap:true,//一定要设置为true
			showmodel: false,
			yqm: "",
			curItem: {},
			curdate:""
		}
	},
	created(){
		this.curdate=this.getcurdate();
	},
	methods:{
		getcurdate(){
			//	初始化时间
			var date = new Date();
			var year = date.getFullYear();
			var month = parseInt(date.getMonth() + 1);
			var day = date.getDate();
			if (month < 10) {
				month = '0' + month
			}
			if (day < 10) {
				day = '0' + day
			}
			return year+"-"+month+"-"+day;
			
		},
		toDetail(item) {
			// debugger;
			this.curItem = item;
			if (item.is_encryption == 1) {
				this.showmodel = true;
			} else {
				// uni.navigateTo({
				// 	url: "/pages/detail/index"
				// });
				// if(item.zy_gs==1){
				// 	uni.navigateTo({
				// 		url: "/pages/detail/detailvideo?id=" + item._id
				// 	});
				// }else{
					uni.navigateTo({
						url: "/pages/detail/detail?id=" + item._id
					});
				// }
				
			}
		},
		confirm() {
			// debugger;
			this.showmodel = true;
			if(!this.yqm){
				this.$refs.uToast.show({
					title: '请输入邀请码',
					type: 'warning'
				});
				return;
			}
			var yqm = this.yqm;
			const user_id = db.getCloudEnv('$cloudEnv_uid');
			// debugger;
			db.collection('jz-custom-yqm').where({
				value: yqm,
				date:this.curdate,
				user_id:user_id,
				status: true
			}).get().then(async (res) => {
				if(res.result&&res.result.data.length>0){
					this.showmodel = false;
					this.yqm="";
					uniCloud.callFunction({
						name: 'jzfunction',
						data: {
							action: 'yqm/updateYqmZt',
							data: {
								id:res.result.data[0]._id
							}
						},
					}).then((res1) => {
						var res1 = res1.result;
						if (res1.state == "0000") {
							console.log("成功");
							uni.navigateTo({
								url: "/pages/detail/detail?id=" + this.curItem._id
							});
						} 
					}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
				}else{
					this.$refs.uToast.show({
						title: '邀请码无效',
						type: 'error'
					});
				}
			}).catch((err) => {
				uni.showModal({
					content: err.message || '请求服务失败',
					showCancel: false
				})
			});
		}
	}
}