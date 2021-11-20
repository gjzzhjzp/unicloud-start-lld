export default{
	methods:{
		uploadAvatarImg(res) {
			const crop = {
				quality: 100,
				width: 600,
				height: 600,
				resize: true
			};
			if(this.avimage){
				Object.assign(crop,this.avimage);
			}
			uni.chooseImage({
				count: 1,
				crop,
				success: async (res) => {
					console.log(res);
					let tempFile = res.tempFiles[0],
						avatar_file = {
							// #ifdef H5
							extname: tempFile.name.split('.')[tempFile.name.split('.').length - 1],
							// #endif
							// #ifndef H5
							extname: tempFile.path.split('.')[tempFile.path.split('.').length - 1]
							// #endif
						},
						filePath = res.tempFilePaths[0]
					// #ifndef APP-PLUS
					//非app端用前端组件剪裁头像，app端用内置的原生裁剪
					filePath = await new Promise((callback) => {
						uni.navigateTo({
							url: '/pages/ucenter/userinfo/cropImage?path=' + filePath +
								`&options=${JSON.stringify(crop)}`,
							animationType: "fade-in",
							events: {
								success: url => {
									callback(url)
								}
							}
						});
					})
					// #endif
					console.log(this.userInfo);
					let cloudPath = "";
					if(this.userInfo){
						 cloudPath = this.userInfo._id + '' + Date.now()
					}else{
						cloudPath= "zyimage"+Date.now();
					}
					avatar_file.name = cloudPath
					uni.showLoading({
						title: this.$t('userinfo.uploading'),
						mask: true
					});
					let {
						fileID
					} = await uniCloud.uploadFile({
						filePath,
						cloudPath,
						fileType: "image"
					});
					// console.log(result)
					avatar_file.url = fileID
					console.log({
						avatar_file
					});
					uni.hideLoading()
		
					this.setAvatarFile(avatar_file)
				}
			})
		}
	}
}