const db = uniCloud.database();
export default{
	data(){
		return {
			filesuccess1: 0,
			filesuccess2: 0,
			is_submit:false,
			file1_change:false,
			file2_change:false,
			old_zy:{}
		}
	},
	watch:{
		"formData.avatar":{
			deep:true,
			handler(n,o){
				if(this.old_zy.avatar){
					if(this.formData.avatar.url!=this.old_zy.avatar.url){
						this.file1_change=true;
					}
				}
			}
		},
		"formData.resources":{
			deep:true,
			handler(n,o){
				if(this.old_zy.resources){
					if(this.formData.resources.length!=this.old_zy.resources.length){
						this.file2_change=true;
					}
				}
				
			}
		}
	},
	onReady() {
		this.$refs.form.setRules(this.rules);
		this.getcategories();
	},
	methods:{
		selectFile(parames) {
			this.$set(this.formData, "avatar", parames.tempFiles[0])
		},
		successFile(parames) {
			this.$set(this.formData, "avatar", parames.tempFiles[0]);
			this.filesuccess1 = 1;
			if (this.filesuccess2 == 1||!this.file2_change) {
				this.submit();
			}
		},
		selectFile2(parames) {
			debugger;
			this.$set(this.formData, "resources", parames.tempFiles);
			var zy_gs = "";
			if (parames.tempFiles.length > 0) {
				zy_gs = parames.tempFiles[0].extname;
			}
			this.$set(this.formData, "zy_gs", zy_gs);
		},
		successFile2(parames) {
			this.$set(this.formData, "resources", parames.tempFiles);
			this.filesuccess2 = 1;
			if (this.filesuccess1 == 1||!this.file1_change) {
				this.submit();
			}
		},
		// 获取分类
		async getcategories() {
			var categories = await db.collection("opendb-news-categories").get({
				getTree: {
					startWith: "flbm=='100000'" ////分类顶级编码
				}
			});
			console.log("categories", categories);
			if (categories.result && categories.result.data.length > 0) {
				this.cascaderData = categories.result.data;
			}
		},
		cascaderConfirem(e) {
			var select_names = e.select_names;
			var select_ids = e.select_ids;
			this.$set(this.formData, "categories", select_ids.join(","));
			this.$set(this.formData, "categorieszw", select_names.join(","));
		},
		opencategories() {
			this.$refs.cascader.show();
		},
		submitBefore() {
			uni.showLoading({
				mask: true,
				title:"正在操作，请稍后..."
			})
			if (!this.formData.title) {
				uni.showToast({
					icon: 'none',
					title: '请输入标题'
				});
				return;
			}
			if (!this.formData.author) {
				uni.showToast({
					icon: 'none',
					title: '请输入作者'
				})
				return;
			}
			if (!this.formData.categories) {
				uni.showToast({
					icon: 'none',
					title: '请选择分类'
				})
				return;
			}
			if (!this.formData.avatar) {
				uni.showToast({
					icon: 'none',
					title: '请上传封面'
				})
				return;
			}
			// if (!this.formData.resources || this.formData.resources.length == 0) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '请上传资源'
			// 	})
			// 	return;
			// }
			if(this.formData.resources && this.formData.resources.length>0){
				if(this.file1_change||this.file2_change){
					if(this.file1_change){
						this.$refs.filepicker1.upload();
					}if(this.file2_change){
						this.$refs.filepicker2.upload();
					}
				}else{
					this.submit();
				}
				// setTimeout(()=>{
				// 	console.log("this.is_submit",this.is_submit);
				// 	if(!this.is_submit){
				// 		this.submit();
				// 	}
				// },1000)
			}else{
				this.submit();
			}
		},
	}
}