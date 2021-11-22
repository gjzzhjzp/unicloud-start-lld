 const db = uniCloud.database();
export default{
	data(){
		return {
			notTap:true,//一定要设置为true
			showmodel: false,
			yqm: "",
			curItem: {}
		}
	},
	methods:{
		toDetail(item) {
			// debugger;
			this.curItem = item;
			if (item.is_encryption == 1) {
				this.showmodel = true;
			} else {
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + item._id
				});
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
			db.collection('jz-custom-yqm').where({
				value: yqm,
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
					});
				}else{
					this.$refs.uToast.show({
						title: '邀请码错误',
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