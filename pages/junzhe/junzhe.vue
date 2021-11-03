<template>
	<view>
		<u-navbar title="俊哲"></u-navbar>
		<u-notice-bar mode="vertical" :list="list"></u-notice-bar>
		<u-card v-for="item in junzhes" :title="item.title" :sub-title="item.subTitle">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-6">{{item.content}}</view>
					<image
						src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						mode="aspectFill"></image>
				</view>
			</view>
		</u-card>
		<jz-tabbar></jz-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					'上辈子积大德，这辈子磕俊哲',
					'开开心心浪浪钉，长长久久走花路'
				],
				junzhes:[
					{
						title: "龚俊",
						subTitle: "1992-11-29",
						content:"我那命运般的一生要强不服输腰细腿长胸大臀翘才貌双全能可咸可甜温柔强大母仪天下能歌善舞还会rap篮球赛mvp高尔夫一杆进洞斗地主横店第一全国第七潜水骑行样样行上得厅堂下得健身房笑起来呵呵呵娇起来咿呀呀迪士尼猫咪公主的（西蒙）老婆"
					},
					{
						title: "张哲瀚",
						subTitle: "1991-05-11",
						content:"我那命运般的一生要强不服输腰细腿长胸大臀翘才貌双全能可咸可甜温柔强大母仪天下能歌善舞还会rap篮球赛mvp高尔夫一杆进洞斗地主横店第一全国第七潜水骑行样样行上得厅堂下得健身房笑起来呵呵呵娇起来咿呀呀迪士尼猫咪公主的（西蒙）老婆"
					}
				]
			}
		}
	}
</script>
<style scoped lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
