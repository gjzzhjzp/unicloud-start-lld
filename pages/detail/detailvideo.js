import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import detail from "./detail.js"
export default{
	data() {
		return {
			imgs: [],
			danmuValue: "",
			danmubtn: true,
			enabledanmu: true,
			// danmulist: [],
			showdanmu: true, ///显示弹幕
			showsenddanmu: false,
			videoContext: null,
			currentTime: "", ///当前播放时间
			plNumber: 0,
			detaildata:{},
			data:{}////当前资源
		}
	},
	mixins:[detail],
	computed: {
		...mapGetters({
			userInfo: 'user/info',
			hasLogin: 'user/hasLogin'
		})
	},
	onLoad(e){
		this.id=e.id;
	},
	created() {
		if(this.$Route){
			this.id=this.$Route.query.id;
		}
		this.getResource(this.id);
		var config = getApp().globalData.systemconfig;
		var t_800018 = config["800018"]; //、显示弹幕
		if (t_800018 == 1) {
			this.danmubtn = true;
			this.enabledanmu = true;
		} else {
			this.danmubtn = false;
			this.enabledanmu = false;
		}
	},
	mounted() {
		this.initImage();
		// this.videoContext = uni.createVideoContext('myVideo');
	
	},
	watch: {
		"data.resources"() {
			this.initImage();
		}
	},
	methods: {
		// 获取资源
		getResource(id) {
			// debugger;
			var that=this;
			uni.showLoading({
				title: "加载中"
			})
			uniCloud.callFunction({
				name: 'jzfunction',
				data: {
					action: 'resource/getResource',
					data: {
						_id: id
					}
				},
			}).then((res) => {
				var res = res.result;
				if (res.state == "0000") {
					for(var key in res.rows[0]){
						that.$set(that.detaildata,key,res.rows[0][key]);
					}
					that.title = that.detaildata.title;
					that.zy_gs = that.detaildata.zy_gs;
					that.data=that.detaildata;
					var labels = that.data.labels;
					if (labels) {
						that.labels = labels.split("，");
					}
					
					var srcurl="";
					if(that.detaildata.resources&&that.detaildata.resources.length>0){
						srcurl=that.detaildata.resources[0].url;
					}else{
						srcurl=that.detaildata.aliyun_dz||"";
					}
					var videoList=[{
						srcList: [{
							title: '',
							src: srcurl
						}],
						danmuList: that.detaildata.danmulist||[],
						title: that.detaildata.title,
						initialTime: 0,
						gDuration: 0, //大概总时长
						download: false
					}];
					this.videoList=videoList;
					that.tohistory();
					uni.hideLoading()
				} else {
					console.log("res", res.msg);
				}
			}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
		},
		// 历史记录
		async tohistory() {
			if (this.hasLogin) {
				const db = uniCloud.database()
				const uid = db.getCloudEnv('$cloudEnv_uid');
				const collection = db.collection('opendb-news-history');
				var rows = await collection.where({
					article_id: this.detaildata._id,
					user_id: db.getCloudEnv('$cloudEnv_uid')
				}).get();
				if (rows.result && rows.result.data.length > 0) {
					await collection.where({
						_id: rows.result.data[0]._id
					}).update({
						update_date: db.getCloudEnv('$cloudEnv_now')
					});
				} else {
					await collection.add({
						article_id: this.detaildata._id,
						article_title: this.detaildata.title,
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						create_date: db.getCloudEnv('$cloudEnv_now'),
						zy_gs: this.detaildata.zy_gs
					});
				}
			}
		},
		changenumber(plNumber) {
			this.plNumber = plNumber;
		},
		openDanmu() {
			this.showdanmu = true;
		},
		closedanmu() {
			this.showdanmu = false;
		},
		opensendDanmu() {
			// debugger;
			this.showsenddanmu = true;
			// this.$refs.mp4[0].videoContext.pause();
		},
		closesendDanmu() {
			this.showsenddanmu = false;
			// this.$refs.mp4[0].videoContext.play();
		},
		timeupdate(event) {
			this.currentTime = event.detail.currentTime;
		},
		// 发送弹幕
		async sendDanmu() {
			if (this.userInfo.forbiddenwords) {
				this.$refs.uToast.show({
					title: '你已被禁言，请联系管理员',
					type: 'error'
				});
				return;
			}
			this.$refs.mp4[0].videoContext.sendDanmu({
				text: this.danmuValue,
				color: "#7275D3"
			});
			await db.collection('jz-opendb-danmu').add({
				resource_id: this.data._id,
				danmu_text: this.danmuValue,
				danmu_color: '#fff',
				danmu_time: this.currentTime || 0
			});
			this.danmuValue = '';
			this.closesendDanmu();
		},
		initImage() {
			this.imgs.splice(0, this.imgs.length);
			if (this.data && this.data.resources) {
				this.data.resources.forEach((item) => {
					this.imgs.push(item.url);
				})
			}
		},
		previewOpen(item) {
			this.$refs.previewImage.open(item.url);
		},
	}
}