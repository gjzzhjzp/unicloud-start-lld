/**
 *  全局配置文件
 */

// 不同环境访问不同的路径
const NODE_ENV = 'development';
const ENV_BASE_URL = {
	development: 'http://localhost:8080/jzszd', //开发环境
	production: 'http://47.108.224.146/jzszd', //生产环境
}
const ENV_API_URL = {
	development: `${ENV_BASE_URL.development}/path/`, //开发环境
	production: `${ENV_BASE_URL.production}/path/`, //生产环境
}

export const BASE_URL = ENV_BASE_URL[NODE_ENV || 'development']; //后台根域名
export const API_URL = ENV_API_URL[NODE_ENV || 'development']; //后台接口域名
export const IMG_CACHE = '_images';
// 缓存配置
export const STORAGE_CONFIG = {
	debug: false, // 是否开启调试
	DS: '_', // 缓存分隔符
	group: 'default', // 默认分组名称
	prefix: 'test' ,// 存储前缀（前缀是为了区分环境）
	lists: 'test__lists', // 目录存储下标
}

