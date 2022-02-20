<template>
	<view class="rili-detail">
		<jz-navbar :issy="false" :showlogo="false" :isBack="true">
			<view class="jz-navbar-title">纪念日详情</view>
		</jz-navbar>
		<u-collapse>
		<u-collapse-item :length="jianlainri.length" :open="index==0?true:false" :title="item.rili_date" v-for="(item, index) in jianlainri" :key="index" >
			<view class="rili-bottom">
				<view class="two">
					{{item.rili_title}}
				</view>
			</view>
			<view class="rili-images">
				<view class="detail-image-item" v-for="(item,index) in item.rili_images" :key="index">
					<u-lazy-load threshold="300" border-radius="20" :image="item.url" :index="index"></u-lazy-load>
				</view>
			</view>
			<view class="rili-content">
				{{item.rili_content}}
			</view>
		</u-collapse-item>
		</u-collapse>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				jianlainri: [],
				rq:""
			}
		},
		created(){
			this.rq=this.$Route.query.rq;
			this.getjilianri();
		},
		methods: {
			getjilianri() {
				const db = uniCloud.database();
				var rq ="";
				if(!this.rq){
					var date = new Date();
					var month = parseInt(date.getMonth() + 1);
					var day = date.getDate();
					if (month < 10) {
						month = '0' + month
					}
					if (day < 10) {
						day = '0' + day
					}
					 rq = month+"-"+day;
				}else{
					rq=this.rq;
				}
				if (rq) {
					// debugger;
					db.collection('opendb-news-rili').where({
						"rili_date": new RegExp(rq, 'gi'),
					}).get().then((res) => {
						this.jianlainri = res.result.data;
						// console.log("this.jianlainri", this.jianlainri);
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					});
				}

			},
		}
	}
</script>
<style lang="scss">
	.rili-detail{
		background-color: #fff;
	}
	.rili-bottom {
		margin-top: 4px;
		.one {
			display: flex;
			padding: 10px 30px;
			color: #7F88D3;
			font-size: 20px;
			justify-content: space-between;
			border-bottom: 1px solid #8C92AC;
		}
		.two {
			margin: 10px 20px;
			color: #36c6e8;
			font-size: 18px;
			position: relative;
		}

		.two::before {
			content: "";
			height: 25px;
			width: 4px;
			color: #D84058;
			position: absolute;
			display: block;
			top: 0%;
			left: -10px;
			background: #D84058;
			border-radius: 4px;
		}
	}
	.rili-images {
		padding: 0px 10px;
	}
	.rili-content{
		padding: 10px;
		color: #7F88D3;
	}
	.detail-image-item{
		    margin-bottom: 4px;
	}
</style>
