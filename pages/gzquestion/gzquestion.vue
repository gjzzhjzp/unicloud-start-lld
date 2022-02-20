<template>
	<view class="gzquestion">
		<u-navbar :is-back="true" title="社区公约"></u-navbar>
		<view >
			<u-alert-tips type="warning" :description="description"></u-alert-tips>			
		</view>
		<u-form :model="form" ref="uForm" label-position="top">
			<u-form-item :label="('问题'+(index+1))+'：'+item.title" v-for="(item,index) in list" :key="index">
				<u-radio-group v-model="item.value">
					<u-radio v-for="(item1, index1) in item.radios" :key="index1" :name="item1.value">
						{{ item1.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<view style="margin-bottom: 10px;">
			<u-alert-tips type="warning" :description="description1"></u-alert-tips>			
		</view>
		<u-button type="primary" @click="confirm">确定</u-button>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				form: {
					radio1: ""
				},
				list: [],
				description:"为维护APP的长期、稳定、安全的发展，在投稿/发帖前务必仔细阅读以下问题，需全部回答正确方能正常发帖",
				description1:"点击确定表示同意以上所有内容，若将来有违规，视影响范围严重情况将被禁言(7天、15天、30天)或直接封号"
			}
		},
		created() {
			this.getList();
		},
		methods: {
			async getList() {
				var res = await db.collection("jz-custom-gzquestion").where({
					status: true
				}).get()
				if (res.result && res.result.data.length > 0) {
					var list = res.result.data;
					list.forEach((item) => {
						var radios = [];
						item.options.split(";").forEach((item1)=>{
							radios.push({
								name:item1.split(":")[1],
								value:item1.split(":")[0]
							})
						})
						this.list.push({
							title: item.title,
							radios: radios,
							answer: item.answer,
							value: ""
						});
					});
				}
			},
			confirm() {
				// debugger;
				var flag = true;
				this.list.forEach((item) => {
					if (item.answer != item.value) {
						flag = false;
					}
				});
				if (flag) {
					uni.setStorageSync("gzquestion", "1");
					this.$refs.uToast.show({
						title: '答案正确',
						type: 'success'
					});
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/fabu/fabu"
						});
					},1000)
				} else {
					uni.removeStorageSync("gzquestion");
					this.$refs.uToast.show({
						title: '答案错误',
						type: 'error'
					})
				}
			}
		}
	}
</script>

<style>
	.gzquestion {
		background-color: #fff;
		padding: 10px;
	}
</style>
