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
					if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/.test(value)){
						return true
					}else{
						callback('登录名由6-32位数字和字母组成')
					}
				}
			},
			{
				validateFunction:async function(rule,value,data,callback){
					const db = uniCloud.database();
					var res=await db.collection("uni-id-users").where({
						username:value
					}).field("username").get();
					console.log("res11111111111",res);
					if(res.result.data&&res.result.data.length>0){
						callback('该登录名已被占用');
					}else{
						return true;
					}
					// if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/.test(value)){
					// 	return true
					// }else{
					// 	callback('登录名由6-32位数字和字母组成')
					// }
				}
			}
		],
		"label": "登录名"
	},
	"weiboname": {
		"rules": [{
				required: true,
				errorMessage: '请输入微博主页链接地址',
			}
		],
		"label": "微博主页链接地址"
	},
	"resources": {
	  "rules": [
	    {
	      "format": "array"
	    },
	    {
	      "arrayType": "file"
	    }
	  ],
	  "label": "验证资料"
	},
	"yqm": {
		"rules": [{
				required: true,
				errorMessage: '请输入邀请码',
			}
		],
		"label": "邀请码"
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