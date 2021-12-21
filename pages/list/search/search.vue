<template>
	<view class="container jz-search">
		<u-navbar :is-back="true" back-icon-name="arrow-leftward" :back-icon-size="40">
			<template slot="right">
			<u-search border-color="#7275D3" bg-color="#fff" v-model="searchText" height="60" :placeholder="hotWorld"
				@search="confirm" @custom="confirm" :show-action="true"></u-search>
				</template>
		</u-navbar>
		<view class="search-body">
			<!-- 搜索历史 -->
			<view class="word-container" v-if="localSearchList.length">
				<view class="word-container_header">
					<text class="word-container_header-text">历史搜索</text>
					<uni-icons v-if="!localSearchListDel" @click="localSearchListDel = true" class="search-icons"
						style="padding-right: 0;" :color="iconColor" size="18" type="trash"></uni-icons>
					<view v-else class="flex-center flex-row" style="font-weight: 500;justify-content: space-between;">
						<text
							style="font-size: 22rpx;color: #666;padding-top:4rpx;padding-bottom:4rpx;padding-right:20rpx;"
							@click="LocalSearchListClear">全部删除</text>
						<text
							style="font-size: 22rpx;color: #c0402b;padding-top:4rpx;padding-bottom:4rpx;padding-left:20rpx;"
							@click="localSearchListDel = false">完成</text>
					</view>
				</view>
				<view class="word-container_body">
					<view class="flex-center flex-row word-container_body-text" v-for="(word,index) in localSearchList"
						:key="index" @click="LocalSearchlistItemClick(word,index)">
						<text class="word-display" :key="word">{{word}}</text>
						<uni-icons v-if="localSearchListDel" size="12" type="closeempty" />
					</view>
				</view>
			</view>
			<!-- 搜索发现 -->
			<view class="word-container">
				<view class="word-container_header">
					<view class="flex-center flex-row">
						<text class="word-container_header-text">热门搜索</text>
						<uni-icons v-if="!netHotListIsHide" class="search-icons" :color="iconColor" size="14"
							type="reload" @click="searchHotRefresh"></uni-icons>
					</view>
					<uni-icons class="search-icons" style="padding-right: 0;" :color="iconColor" size="18"
						:type="netHotListIsHide ? 'eye-slash' : 'eye'" @click="netHotListIsHide = !netHotListIsHide">
					</uni-icons>
				</view>

				<unicloud-db ref="udb" #default="{data, loading, error, options}" field="content"
					collection="opendb-search-hot" orderby="create_date desc,count desc" page-data="replace"
					:page-size="10">
					<text v-if="loading && !netHotListIsHide" class="word-container_body-info">正在加载...</text>
					<view v-else class="word-container_body">
						<template v-if="!netHotListIsHide">
							<text v-if="error" class="word-container_body-info">{{error.message}}</text>
							<template v-else>
								<text v-for="(word,index) in data" class="word-container_body-text" :key="index"
									@click="search(word.content)">{{word.content}}</text>
							</template>
						</template>
						<view v-else style="flex:1;">
							<text class="word-container_body-info">当前搜索发现已隐藏</text>
						</view>
					</view>
				</unicloud-db>
			</view>
		</view>
		<!-- 搜索联想 -->
		<view class="search-associative" v-if="associativeShow">
			<uni-list>
				<template v-for="(item,index) in associativeList">
					<uni-list-item :key="item._id" :ellipsis="1" :title="item.title" @click="associativeClick(item)"
						show-extra-icon clickable :extra-icon="{size:18,color:iconColor,type:'search'}" />
				</template>
			</uni-list>
		</view>
	</view>
</template>

<script>
	/**
	 * 云端一体搜索模板
	 * @description uniCloud云端一体搜索模板，自带下拉候选、历史搜索、热搜。无需再开发服务器代码
	 */

	const mallGoodsDbName = 'jz-opendb-resources'; // 文章数据库
	const associativeSearchField = 'title'; // 联想时，搜索框值检索数据库字段名
	const associativeField = '_id,title'; // 联想列表每一项携带的字段
const localSearchListKey = '__local_search_history'; //	本地历史存储字段名
const searchLogDbName = 'opendb-search-log'; // 搜索记录数据库
	import search from "./search.js"
	// 防抖
	function debounce(fn, interval, isFirstAutoRun) {
		/**
		 * 
		 * @param {要执行的函数} fn 
		 * @param {在操作多长时间后可再执行，第一次立即执行} interval 
		 */
		var _self = fn;
		var timer = null;
		var first = true;

		if (isFirstAutoRun) {
			_self();
		}

		return function() {
			var args = arguments;
			var _me = this;
			if (first) {
				first = false;
				_self.apply(_me, args);
			}

			if (timer) {
				clearTimeout(timer)
				// return false;
			}

			timer = setTimeout(function() {
				clearTimeout(timer);
				timer = null;
				_self.apply(_me, args);
			}, interval || 200);
		}
	}

	export default {
		data() {
			return {
				mallGoodsDbName,
				searchLogDbName,
				statusBarHeight: '0px',
				localSearchListDel: false,
				netHotListIsHide: false,
				searchText: '',
				iconColor: '#999999',
				associativeList: [],
				keyBoardPopup: false,
				hotWorld: '', //	搜索热词，如果没有输入即回车，则搜索热词，但是不会加入搜索记录
				focus: true, //	是否自动聚焦
				speechEngine: 'iFly' //	语音识别引擎 iFly 讯飞 baidu 百度
			}
		},
		mixins: [search],
		created() {
			this.db = uniCloud.database();
			this.mallGoodsDb = this.db.collection(this.mallGoodsDbName);
			// #ifndef H5
			uni.onKeyboardHeightChange((res) => {
				this.keyBoardPopup = res.height !== 0;
			})
			// #endif

			this.searchText = getApp().globalData.searchText;
		},
		computed: {
			associativeShow() {
				return this.searchText && this.associativeList.length;
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			this.statusBarHeight = `${uni.getSystemInfoSync().statusBarHeight}px`;
			//#endif
		},
		methods: {
			clear(res) {
				console.log("res: ", res);
			},
			confirm(res) {
				// 键盘确认
				this.search(res.value);
			},
			cancel(res) {
				uni.hideKeyboard();
				this.searchText = '';
				this.loadList();
			},
			search(word) {
				// debugger;
				// if (!this.searchText && !this.hotWorld) {
				// 	return;
				// }
				// if (value) {
				// 	if (this.searchText !== value) {
				// 		this.searchText = value
				// 	}


				// } else 
				if (word) {
					this.searchText = word;
				}
				if (!this.searchText && this.hotWorld) {
					this.searchText = this.hotWorld
				}
				if(this.searchText){
					this.localSearchListManage(this.searchText);
					this.searchLogDbAdd(this.searchText)
				}
				
				uni.hideKeyboard();
				this.loadList(this.searchText);
			},

			LocalSearchListClear() {
				uni.showModal({
					content: "确认清空搜索历史吗",
					confirmText: "删除",
					confirmColor: 'red',
					cancelColor: '#808080',
					success: res => {
						if (res.confirm) {
							this.localSearchListDel = false;
							this.localSearchList = [];
							uni.removeStorageSync(localSearchListKey)
						}
					}
				});
			},
			LocalSearchlistItemClick(word, index) {
				if (this.localSearchListDel) {
					this.localSearchList.splice(index, 1);
					uni.setStorageSync(localSearchListKey, this.localSearchList);
					if (!this.localSearchList.length) {
						this.localSearchListDel = false;
					}
					return;
				}
				this.search(word);
			},
			searchHotRefresh() {
				this.$refs.udb.refresh();
			},
			speech() {
				// #ifdef APP-PLUS
				plus.speech.startRecognize({
					engine: this.speechEngine,
					punctuation: false, // 标点符号 
					timeout: 10000
				}, word => {
					word = word instanceof Array ? word[0] : word;
					this.search(word)
				}, err => {
					console.error("语音识别错误: ", err);
				});
				// #endif
			},

			associativeClick(item) {
				/**
				 * 注意：这里用户根据自己的业务需要，选择跳转的页面即可
				 */
				console.log("associativeClick: ", item);
				this.loadList(item.title);
			},
			// 搜索词
			loadList(text = '') {
				getApp().globalData.searchText = text;
				uni.navigateTo({
					url: '/pages/resource/list?title=' + text
				})
			},
			backPage() {
				uni.navigateBack();
			}
		},
		watch: {
			searchText: debounce(function(value) {
				if (value) {
					this.mallGoodsDb.where({
						[associativeSearchField]: new RegExp(value, 'gi'),
					}).field(associativeField).get().then(res => {
						this.associativeList = res.result.data;
					})
				} else {
					this.associativeList.length = 0;
					getApp().globalData.searchText = '';
				}
			}, 100)
		}
	}
</script>
<style lang="scss" scoped>
	$search-bar-height:52px;
	$word-container_header-height:72rpx;

	.status-bar {
		background-color: #fff;
	}

	.container {
		height: 100%;
		flex: 1;
		background-color: #f7f7f7;
	}

	.search-body {
		background-color: #fff;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	@mixin uni-flex {
		display: flex;
	}

	@mixin words-display {
		font-size: 26rpx;
		color: #666;
	}

	.flex-center {
		@include uni-flex;
		justify-content: center;
		align-items: center;
	}

	.flex-row {
		@include uni-flex;
		flex-direction: row;
	}


	/deep/ .uni-searchbar {
		padding-left: 0;
	}


	/deep/ .uni-searchbar__box {
		border-width: 0;
	}

	/deep/ .uni-input-placeholder {
		font-size: 28rpx;
	}

	.search-container {
		height: $search-bar-height;
		@include uni-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #fff;

		@at-root {
			#{&}-bar {
				@include uni-flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}
		}
	}

	.search-associative {
		overflow-y: auto;
		position: absolute;
		top: $search-bar-height;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		margin-top: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	// #ifdef APP-PLUS
	.search-associative {
		top: 80px;
	}

	// #endif
	.search-icons {
		padding: 16rpx;
	}

	.word-display {
		@include words-display;
	}

	.word-container {
		padding: 20rpx;

		@at-root {
			#{&}_header {
				@include uni-flex;
				height: $word-container_header-height;
				line-height: $word-container_header-height;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				@at-root {
					#{&}-text {
						color: #3e3e3e;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}

			#{&}_body {
				@include uni-flex;
				flex-wrap: wrap;
				flex-direction: row;

				@at-root {
					#{&}-text {
						@include uni-flex;
						@include words-display;
						justify-content: center;
						align-items: center;
						background-color: #f6f6f6;
						padding: 10rpx 20rpx;
						margin: 20rpx 30rpx 0 0;
						border-radius: 30rpx;
						box-sizing: border-box;
						text-align: center;
					}

					#{&}-info {

						display: block;
						flex: 1;
						text-align: center;
						font-size: 26rpx;
						color: #808080;
						margin-top: 20rpx;
					}
				}
			}
		}
	}

	.word-container_body-text,
	.word-display {
		background-color: #E4E4F4;
		color: #7275D3;
	}
</style>
