<template>
	<view class="gzquestion">
		<u-navbar :is-back="true" title="规则问题"></u-navbar>
		<u-form :model="form" ref="uForm" label-position="top">
			<u-form-item :label="('问题'+(index+1))+'：'+item.title" v-for="(item,index) in list" :key="index">
				<u-radio-group v-model="item.value">
					<u-radio v-for="(item1, index1) in item.radios" :key="index1" :name="item1.value">
						{{ item1.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
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
				list: []
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
								name:item1,
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
					console.log("this.list", this.list);
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
					})
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
