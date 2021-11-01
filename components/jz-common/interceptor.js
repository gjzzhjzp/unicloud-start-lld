export default{
	created(){
	},
	mounted(){
		this.addInterceptor();
	},
	methods:{
		addInterceptor(){
			uniCloud.addInterceptor('callFunction', {
				invoke(param) {
					// console.log("接口拦截参数", param);
					// param为拦截Api的参数 例 {name: 'functionName', data: {'functionParam1': 1, 'functionParam2': 2}}
					// 此处返回错误可终止api执行
				},
				success(res) {
					// res为callFunction的返回值，此处可以对返回值进行修改
				},
				fail(err) {
					// err为callFunction抛出的错误
				},
				complete(res) {
					// complete内res为上面的res或err
				}
			});
		}
	}
}