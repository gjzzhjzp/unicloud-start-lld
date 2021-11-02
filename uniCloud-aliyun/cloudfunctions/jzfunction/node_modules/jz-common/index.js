/*
记录操作日志
*/
require("./date.js")
function setRz(context,msg) {
	const db = uniCloud.database();
	const collection_log = db.collection('opendb-search-log');
	collection_log.add({
		"user_id": context.OS,
		"device_uuid": context.DEVICEID,
		"platform": context.PLATFORM,
		"content": msg,
		"ip": context.CLIENTIP,
		"create_date": new Date().format("yyyy-MM-dd hh:mm:ss")
	});
}
/*
以IP地址记录每天访问人数，超过1000人时限制访问
*/
async function setFks(context,flag) {
	const maxCount=1000;
	const db = uniCloud.database();
	const collection_fks = db.collection('jz-custom-fks');
	var count=await collection_fks.where({
			time:new Date().format("yyyy-MM-dd")
		}).count();
	
	if(count.total>maxCount){
		return {
			state:"9999",
			msg:"今日访问人数已达上线"
		}
	}else{
		var data= await collection_fks.where({
			ip:context.CLIENTIP,
			time:new Date().format("yyyy-MM-dd")
		}).get();
		var add_data={
			"ip": context.CLIENTIP,
			"isvisit":flag?'1':'0',
			"time": new Date().format("yyyy-MM-dd")
		}
		if(data.affectedDocs>0){
			collection_fks.update(add_data);
		}else{
			collection_fks.add(add_data);
		}
	}
}
module.exports = {
	setRz,
	setFks
}
