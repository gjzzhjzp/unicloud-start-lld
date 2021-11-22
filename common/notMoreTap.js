function notMoreTap(means,clickName, ...data) {
// means是点击后需要执行的方法
// clickName是一个变量的名字控制是否是第一次点击
// data是点击需要传的参数:用逗号隔开就可以，...为剩余运算符，除去前两位传的参数，剩下的传的参数都会留在data里
		let that = this;
		if (that[clickName]) {
				// 第一次点击
				that[clickName]= false;
				if(data && data.length>0) {
					if(data.length != 0 && data[0] != ''){
						means(...data);
					}
				} else {
						means();
				}
				setTimeout(()=> {
						that[clickName] = true;
				}, 1000)
		} else {
				uni.showToast({
					title:'请不要重复点击',
					icon:'none'
				})
		}
}

export default {
		notMoreTap
}