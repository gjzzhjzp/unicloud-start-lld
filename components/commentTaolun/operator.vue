<template>
	<view class="operator">
		<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
		<u-modal v-model="showmodel" @confirm="confirm" :content="content" :show-cancel-button="true"></u-modal>
		<u-modal v-model="showjubao" title="请输入举报原因" @confirm="confirmjubao" :show-cancel-button="true">
			<view style="padding: 10px;">
				<u-input v-model="jubaocontent" type="textarea" :border="true" />
			</view>
		</u-modal>
		<u-toast ref="uToast" />
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
			click(index) {
				if (this.list[index].text == "删除") {
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
				await db.collection("opendb-news-commentsTaolun").where({
					all_reply_comment_id: new RegExp(this.curcomment.comment_id, 'gi')
				}).remove();
				await db.collection("opendb-news-commentsTaolun").where({
					comment_id: this.curcomment.comment_id
				}).remove();
				this.$refs.uToast.show({
					title: '已删除'
				})
				this.$emit("delete",this.curcomment.comment_id);
			},
			async confirmjubao() {
				if (!this.jubaocontent) {
					this.$refs.uToast.show({
						title: '请输入举报原因'
					});
					return;
				}
				await db.collection("opendb-news-jubaoplTaolun").add({
					article_id: this.curcomment._id,
					comment_id: this.curcomment._id,
					jubao_content: this.jubaocontent
				});
				this.$refs.uToast.show({
					title: '你的举报已提交，待管理员审核通过后会进行处理，谢谢你的反馈'
				});
			}
		}
	}
</script>

<style>
</style>
