/**
 * 动态缓存删除回调
 */
import {IMG_CACHE} from '@/env'

var delCallback = {};

delCallback[IMG_CACHE] = function(res) {
	if (res.data != '') {
		// #ifndef H5
		uni.removeSavedFile({filePath: res.data});
		// #endif
	}
}
	
export default {
	delCallback
}