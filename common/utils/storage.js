/**
 * 动态缓存
 */

import {
	STORAGE_CONFIG
} from '@/env'
import delCallback from './storage-del.js';

// 获得时间戳（精确到秒）
function getTime() {
	return parseInt(Date.parse(new Date()) / 1000);
}
// 格式化 存储时间和 过期时间
function getEndTime(time) {
	time = time < 0 ? 0 : time;
	var endTime = time > 0 ? (getTime() + time) : 0;
	return {
		time,
		endTime
	};
}

// 打印错误信息
var logError = STORAGE_CONFIG.debug ? function(key, data, group, msg) {
	console.log(msg);
	console.log('group:' + group);
	console.log('key:' + key);
	console.log('data:');
	console.log(data);
} : null;


/**
 * 动态缓存目录
 * key 存储的下标 group 存储的组 time 存储时间
 */
function slists(key = false, group = false, time = 0) {
	try {
		var list = uni.getStorageSync(STORAGE_CONFIG.lists);
		if (list == '') {
			list = {};
		}
		if (key && group) {
			var tt = getEndTime(time);
			list[key + STORAGE_CONFIG.DS + group] = {
				prefix: STORAGE_CONFIG.prefix,
				key: key,
				group: group,
				time: tt.time,
				endTime: tt.endTime,
			};
			uni.setStorageSync(STORAGE_CONFIG.lists, list);
		} else {
			return list;
		}
		return true;
	} catch (e) {
		console.log('动态缓存出错！（目录）');
		console.log(e);
	}

}

/**
 * 刷新配置
 */
function hotWatch() {
	var sc = uni.getStorageSync('STORAGE_CONFIG');
	if (!sc) {
		uni.setStorageSync('STORAGE_CONFIG', STORAGE_CONFIG);
	} else if (sc != STORAGE_CONFIG) {
		var lists = slists();
		for (var i in lists) {
			var list = lists[i];
			if (list.endTime > 0 && list.endTime < getTime()) {
				if (Object.prototype.toString.call(lists) === '[object Array]') {
					lists.splice(i, 1);
				} else {
					delete lists[i];
				}
				clearKey(list.group, list.key);
				continue;
			}
			if (list.prefix != STORAGE_CONFIG.prefix || (list.group == sc.group && list.group != STORAGE_CONFIG.group)) {
				var group = (list.group == sc.group && list.group != STORAGE_CONFIG.group) ? STORAGE_CONFIG.group : list.group;

				if (Object.prototype.toString.call(lists) === '[object Array]') {
					lists.splice(i, 1);
				} else {
					delete lists[i];
				}
				lists[list.key + STORAGE_CONFIG.DS + group] = {
					prefix: STORAGE_CONFIG.prefix,
					key: list.key,
					group: group,
					time: list.time,
					endTime: list.endTime,
				};
				var data = uni.getStorageSync(list.prefix + sc.DS + list.key + sc.DS + list.group);
				uni.removeStorageSync(list.prefix + sc.DS + list.key + sc.DS + list.group);
				uni.setStorageSync(STORAGE_CONFIG.prefix + STORAGE_CONFIG.DS + list.key + STORAGE_CONFIG.DS + group, data);

			}
		}
		uni.setStorageSync('STORAGE_CONFIG', STORAGE_CONFIG);
	}
}

/**
 * 获取缓存目录的某个值的缓存信息
 * @param {Object} key
 */
function getCatalog(key, group) {
	var lists = slists();
	return lists[key + STORAGE_CONFIG.DS + group] ? lists[key + STORAGE_CONFIG.DS + group] : null;
}
/**
 * 判断缓存是否过期
 * @param {Object} key
 * @param {Object} group
 */
function isOver(key, group, isRefresh = false) {
	var val = getCatalog(key, group);
	if (val == null) {
		return false;
	}
	if (val.endTime === 0 || val.endTime >= getTime()) {
		if (isRefresh) {
			refresh(key, group);
		}
		return val;
	}
	return false;
}

/**
 * 刷新数据缓存时间
 * @param {Object} key
 * @param {Object} group
 */
function refresh(key, group, time = -1) {
	var lists = slists();
	var val = getCatalog(key, group);
	var ref = false;
	for (var i in lists) {
		var list = lists[i];
		if (list.key == key && list.group == group) {
			if (list.time > 0) {
				if (time > -1) {
					var tt = getEndTime(list.time);
				} else {
					var tt = getEndTime(time);
				}
				lists[i].endTime = tt.endTime;
			}
			ref = true;
			break;
		}
	}
	if (ref) {
		uni.setStorageSync(STORAGE_CONFIG.lists, lists);
	}
}

/**
 * 异步存储缓存
 * key: 下标
 * data: 数据
 * time: 过期时间 0 表示永久
 */
function set(key, data, time = 0, group = false) {
	group = group ?? STORAGE_CONFIG.group;
	return new Promise(function(resolve, reject) {
		uni.setStorage({
			key: STORAGE_CONFIG.prefix + STORAGE_CONFIG.DS + key + STORAGE_CONFIG.DS + group,
			data: data,
			success: function() {
				slists(key, group, time);
				resolve();
			},
			fail: function(e) {
				logError(key, data, group, '存储缓存失败！(uni.setStorage)');
				reject();
			}
		});
	})
}
/**
 * 同步存储缓存
 * key: 下标
 * data: 数据
 * time: 过期时间 0 表示永久
 */
function setSync(key, data, time = 0, group = false) {
	group = group ?? STORAGE_CONFIG.group;
	return new Promise(function(resolve, reject) {
		try {
			uni.setStorageSync(STORAGE_CONFIG.prefix + STORAGE_CONFIG.DS + key + STORAGE_CONFIG.DS + group, data);
			slists(key, !group ? STORAGE_CONFIG.group : group, time);
			resolve();
		} catch (e) {
			logError(key, data, group, '同步缓存（uni.setStorageSync）调用失败');
			reject();
		}
	})
}
/**
 * key 要获取的值 group 组名称 isRefresh 是否自动刷新
 */
function get(key, group = false, isRefresh = false) {
	group = group ?? STORAGE_CONFIG.group;
	return new Promise((resolve, reject) => {
		var val = isOver(key, group, isRefresh);
		if (!val) {
			// return null;
			resolve({
				data: ''
			});
			reject({
				msg: '值是null'
			}); //'key:' + key + ', group: ' + group + ', 值是null'
		} else {
			uni.getStorage({
				key: val.prefix + STORAGE_CONFIG.DS + val.key + STORAGE_CONFIG.DS + val.group,
				success: function(res) {
					resolve(res);
				},
				fail: function(e) {
					console.log('获取缓存失败（uni.getStorage）');
					console.log('key: ' + key);
					console.log('group: ' + group);
					reject(e);
				}
			});
		}
	})
}

/**
 * 同步获得缓存
 * key 存储名称
 * group 分组名
 * isRefresh 是否自动刷新
 */
function getSync(key, group = false, isRefresh = false) {
	group = group ?? STORAGE_CONFIG.group;
	var val = isOver(key, group, isRefresh);
	if (!val) {
		return null;
	}
	return uni.getStorageSync(val.prefix + STORAGE_CONFIG.DS + val.key + STORAGE_CONFIG.DS + val.group);
}

/**
 * 获得缓存列表
 * group 分组名
 */
function getLists(group = false) {
	var lists = slists();
	var list = [];
	for (var i in lists) {
		if (!group) {
			list[list.length] = lists[i];
		} else {
			if (group == lists[i].group) {
				list[list.length] = lists[i];
			}
		}
	}
	return list;
}

// 具体删除操作 分组可以定义删除回调在 storage-del.js
function delStorage(lists, list) {
	if (delCallback.delCallback[list.group]) {
		var back = delCallback.delCallback[list.group];
		if (typeof back == 'function') {
			back(uni.getStorageSync(list.prefix + STORAGE_CONFIG.DS + list.key + STORAGE_CONFIG.DS + list.group));
		}
	}
	if (Object.prototype.toString.call(lists) === '[object Array]') {
		lists.splice(list.key + STORAGE_CONFIG.DS + list.group, 1);
	} else {
		delete lists[list.key + STORAGE_CONFIG.DS + list.group];
	}
	uni.removeStorageSync(list.prefix + STORAGE_CONFIG.DS + list.key + STORAGE_CONFIG.DS + list.group);
}

// 清除缓存 默认清除过期缓存
function clear(group = false, key = false) {
	var lists = slists();
	var save = false;
	if (group && key) {
		if (lists[key + STORAGE_CONFIG.DS + group]) {
			lists = delStorage(lists, lists[key + STORAGE_CONFIG.DS + group]);
			save = true;
		}
	} else {
		for (var i in lists) {
			var list = lists[i];
			if ((group !== false && group == list.group) || list.endTime > 0 && list.endTime < getTime()) {
				lists = delStorage(lists, list);
				save = true;
			}
		}
	}
	if (save) {
		uni.setStorageSync(STORAGE_CONFIG.lists, lists);
	}
}
// 删除某个值
function clearKey(key = false, group = false) {
	if (!key) {
		return false;
	}
	group = group ?? STORAGE_CONFIG.group;
	clear(group, key);
	return true;
}
// 删除某个组
function clearGroup(group) {
	if (!group) {
		return false;
	}
	clear(group);
	return true;
}
// 清除所有缓存
function clearAll() {
	var lists = slists();
	for (var i in lists) {
		var list = lists[i];
		uni.removeStorageSync(list.prefix + STORAGE_CONFIG.DS + list.key + STORAGE_CONFIG.DS + list.group);
	}
	uni.removeStorageSync(STORAGE_CONFIG.lists);
	return true;
}

hotWatch(); // 更新配置

export default {
	set,
	setSync,
	get,
	getSync,
	getLists,
	slists,
	clearKey,
	clearGroup,
	clearAll,
	clear,
}
