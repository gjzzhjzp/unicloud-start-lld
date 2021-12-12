const localSearchListKey = '__local_search_history'; //	本地历史存储字段名
const searchLogDbName = 'opendb-search-log'; // 搜索记录数据库
// 数组去重
const arrUnique = arr => {
	for (let i = arr.length - 1; i >= 0; i--) {
		const curIndex = arr.indexOf(arr[i]);
		const lastIndex = arr.lastIndexOf(arr[i])
		curIndex != lastIndex && arr.splice(lastIndex, 1)
	}
	return arr
} // 节流
export default {
	data() {
		return {
			searchLogDbName,
			localSearchList: uni.getStorageSync(localSearchListKey),
		}
	},
	created() {
		this.db = uniCloud.database();
		this.searchLogDb = this.db.collection(this.searchLogDbName);
	},
	methods: {
		localSearchListManage(word) {
			// debugger;
			let list = uni.getStorageSync(localSearchListKey);
			if (list.length) {
				this.localSearchList.unshift(word);
				arrUnique(this.localSearchList);
				if (this.localSearchList.length > 10) {
					this.localSearchList.pop();
				}
			} else {
				this.localSearchList = [word];
			}
			uni.setStorageSync(localSearchListKey, this.localSearchList);
		},
		searchLogDbAdd(value) {
			var that=this;
			/*
				在此处存搜索记录，如果登录则需要存 user_id，若未登录则存device_id
			 */
			this.getDeviceId().then(device_id => {
				that.searchLogDb.add({
					// user_id: device_id,
					device_id,
					content: value,
					create_date: Date.now()
				})
			})
		},

		getDeviceId() {
			return new Promise((resolve, reject) => {
				const uniId = uni.getStorageSync('uni_id');
				if (!uniId) {
					// #ifdef APP-PLUS
					plus.device.getInfo({
						success: (deviceInfo) => {
							resolve(deviceInfo.uuid)
						},
						fail: () => {
							resolve(uni.getSystemInfoSync().system + '_' + Math.random().toString(
								36).substr(2))
						}
					});
					// #endif
					// #ifndef APP-PLUS
					resolve(uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2))
					// #endif
				} else {
					resolve(uniId)
				}
			})
		},
	}
}
