<template>
	<view class="operator">
		<u-action-sheet :actions="list" @select="click" :show="show" cancelText="取消" @close="show=false"></u-action-sheet>
		<u-modal title="提示" :show="showmodel" @confirm="confirm" @cancel="showmodel=false" :content="content" :show-cancel-button="true"></u-modal>
		<u-modal :show="showjubao" title="请输入举报原因" @cancel="showjubao=false" @confirm="confirmjubao" :show-cancel-button="true">
			<view style="padding: 10px;">
				<u--textarea v-model="jubaocontent" placeholder="请输入内容" ></u--textarea>
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				jubaocontent: "",
				operator: "del",
				list: [],
				show: false,
				showmodel: false,
				showjubao: false,
				content: "",
				curcomment: {}
			}
		},
		methods: {
			open() {
				this.show = true;
			},
			close() {
				this.show = false;
			},
			click(item) {
				// debugger;
				if (item.name == "删除") {
					this.operator = "del";
					this.content = "你确认删除该评论吗？";
					this.showmodel = true;
				} else {
					this.operator = "jubao";
					this.showjubao = true;
				}
			},
			async confirm() {
				// debugger;
				await db.collection("opendb-news-comments").where({
					_id: this.curcomment._id
				}).remove();
				this.$refs.uToast.show({
					message: '已删除'
				});
				this.showmodel=false;
				this.$emit("reload");
			},
			async confirmjubao() {
				// debugger;
				var that=this;
				if (!that.jubaocontent) {
					that.$refs.uToast.show({
						type: 'default',
						message: '请输入举报原因'
					});
					return;
				}
				await db.collection("opendb-news-jubaopl").add({
					article_id: that.curcomment._id,
					comment_id: that.curcomment._id,
					jubao_content: that.jubaocontent
				});
				that.$refs.uToast.show({
					type: 'default',
					message: '你的举报已提交，待管理员审核通过后会进行处理，谢谢你的反馈'
				});
				this.showjubao=false;
			}
		}
	}
</script>

<style>
</style>
