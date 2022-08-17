export default{
	methods:{
		// 处理图片视频加载不出来的问题，暂时替换域名法
		 dealImgResource(data) {
			data.forEach((item) => {
				if(item.children&&item.children.length>0){
					this.dealImgResource(item.children);
				}else{
					for (var key in item) {
						if (Array.isArray(item[key]) && item[key].length > 0 && (item[key][0].path || item[key][0].url)) {
							item[key].forEach((item1) => {
								if (item1.path) {
									item1.path = item1.path.replace("vkceyugu.cdn.bspapp.com",
										"vkceyugu-backup.cdn.bspapp.com");
								}
								if (item1.url) {
									item1.url = item1.url.replace("vkceyugu.cdn.bspapp.com",
										"vkceyugu-backup.cdn.bspapp.com");
								}
							});
						}else if (Array.isArray(item[key]) && item[key].length > 0){
								item[key]= this.dealImgResource(item[key]);
						}else if(item[key]&&item[key].url){
							item[key].url = item[key].url.replace("vkceyugu.cdn.bspapp.com",
								"vkceyugu-backup.cdn.bspapp.com");
						}
					}
				}
			});
			return data;
		},
	}
}