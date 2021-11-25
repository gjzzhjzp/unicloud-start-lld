export default {
	"username": {
		"rules": [{
				required: true,
				errorMessage: '请输入登录名',
			},
			// {
			// 	minLength: 6,
			// 	maxLength: 32,
			// 	errorMessage: '登录名长度在 {minLength} 到 {maxLength} 个字符',
			// },
			{
				validateFunction:function(rule,value,data,callback){
					console.log(value);
					// if(/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)){
					// 	callback('登录名不能是：手机号或邮箱')
					// };
					if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/.test(value)){
						return true
					}else{
						callback('登录名由6-32位数字和字母组成')
					}
				}
			}
		],
		"label": "登录名"
	},
	"weiboname": {
		"rules": [{
				required: true,
				errorMessage: '请输入微博昵称',
			}
		],
		"label": "微博昵称"
	},
	"password":{
		"rules": [{
				required: true,
				errorMessage: '请输入密码',
			},
			{
				minLength: 6,
				maxLength: 20,
				errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		"label": "密码"
	},
	"pwd2":{
		"rules": [{
		
				required: true,
				errorMessage: '再次输入密码',
		
			},
			{
				minLength: 6,
				maxLength: 20,
				errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction:function(rule,value,data,callback){
					console.log(value);
					if(value!=data.password){
						callback('两次输入密码不一致')
					};
					return true
				}
			}
		],
		"label": "确认密码"
	}
}