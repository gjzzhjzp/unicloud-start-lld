export default{
	data(){
		return {
			isoriginal:false///是否原创
		}
	},
	created() {
		// if(typeof this.userInfo.original=="undefined"){
			this.getUserinfo();
		// }
	},
	methods:{
		async getUserinfo() {
			// const db = uniCloud.database();
			// const usersTable = db.collection('uni-id-users')
			// var userdata = await usersTable.where('_id==$env.uid').get();
			// console.log("userdata", userdata);
			// var userinf=userdata.result.data[0];
			if(this.userInfo.original==1){
				this.isoriginal=true;
			}else{
				this.isoriginal=false;
			}
		},
	}
}