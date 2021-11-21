<template>
	<view>
		<view class="wrapper">
			<view class="wrapper-headcontent">
				<view class="one">{{year}}</view>
				<view class="two">{{monthZw[month]}}月</view>
				<view class="three">{{monthYw[month]}}</view>
			</view>
		</view>
		<view class="riliWrapper">
			<view class="riliWrapperBox">
				<!-- 日历 -->
				<view class="signWrapperCalendar" v-if="true">
					<view class="signWrapperCalendarBox">
						<swiper @change="_onClickSlideApi" duration="200" :current="slideDataListIndex" circular
							style="height:265px">
							<swiper-item class="swiper-item" v-for="(calendar,indexa) in 3" :key="indexa">
								<view class="signWrapperCalendarBoxCenter">
									<view class="signWrapperCalendarBoxCenterBox">
										<view class="signWrapperCalendarBoxCenterBoxTop">
											<div class="week-number">
												<span v-for="(item,index) in weekList"
													:style="{color:(index==0||index==weekList.length-1)}"
													:key="index">{{item}}</span>
											</div>
										</view>
										<view class="signWrapperCalendarBoxCenterBoxFooter">
											<!-- dayList:{{dayList}} -->
											<view
												:class="['each-day',jianlainri_day.indexOf(dayTime)!=-1?'havemonth':'',clickSelected==dayTime?'clickSelected':'']"
												v-for="(dayTime,idx) in dayList" :key="idx" @click="clickDay(dayTime)">
												<view class="eachDayBox" v-if="day">
													<view :class="['eachDayBoxBox',dayTime.class?dayTime.class:'']"
														:style="dayTime==day&&curmonth==month?'color:red':''">
														{{dayTime.value||dayTime||''}}
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<!--  -->
					</view>
				</view>
			</view>
		</view>
		<view class="rili-bottom" v-if="jianlainri.length>0">
			<view class="one">
				<view class="one-1">
					{{jianlainri[0].rili_date}}
				</view>
				<view class="one-2">
					<!-- 农历七月十四 -->
				</view>
				<view class="one-3" @click="todetail">
					<u-icon name="arrow-right-double"></u-icon>
				</view>
			</view>
			<view class="two">
				{{jianlainri[0].rili_title}}
				<!-- ins发图卸载微博，配字清净 -->
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				weekList: ['日', '一', '二', '三', '四', '五', '六'],
				//	月份数组【2020-08-01	  2020-09-01   2020-10-01】
				slideDataList: [],
				//	月份数组的索引
				slideDataListIndex: 1,
				year: 2020,
				month: 10,
				curmonth: 10, ////当前月份，不随着滚动日历而改变
				day: 10,
				dayList: [],
				start_time: '', //	月初的时间戳
				end_time: '', //	月末的时间戳
				monthZw: {
					"1": "一",
					"2": "二",
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"7": "七",
					"8": "八",
					"9": "九",
					"10": "十",
					"11": "十一",
					"12": "十二"
				},
				monthYw: {
					"1": "January",
					"2": "February",
					"3": "March",
					"4": "April",
					"5": "May",
					"6": "June",
					"7": "July",
					"8": "August",
					"9": "September",
					"10": "October",
					"11": "November",
					"12": "December"
				},
				clickSelected: "", ///点击选中
				jianlainri: [],
				jianlainri_day: [],
				jianlainri_day_detail: []
			};
		},
		created() {
			this._onLoad();
			this.getjilianri_month();
		},
		methods: {
			getjilianri() {
				var day = this.clickSelected || this.day;
				this.jianlainri = [];
				this.jianlainri_day.forEach((item, index) => {
					if (item == day) {
						this.jianlainri = [this.jianlainri_day_detail[index]];
					}
				});
			},
			getjilianri_month() {
				const db = uniCloud.database();
				var rq = "-" + this.month + "-";
				if(this.month<10){
					rq = "-0" + this.month + "-";
				}
				console.log("rq", rq);
				db.collection('opendb-news-rili').where({
					"rili_date": new RegExp(rq, 'gi'),
				}).field("rili_date,rili_title").get().then((res) => {
					this.jianlainri_day.splice(0, this.jianlainri_day.length);
					this.jianlainri_day_detail.splice(0, this.jianlainri_day_detail.length);
					res.result.data.forEach((item) => {
						if (item.rili_date) {
							var _day = parseInt(item.rili_date.split("-")[2]);
							if (this.jianlainri_day.indexOf(_day) == -1) {
								this.jianlainri_day.push(_day);
								this.jianlainri_day_detail.push(item);
							}
						}
					});
					console.log("jianlainri_day", this.jianlainri_day);
					this.getjilianri();
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				});
			},
			// 点击当前日期
			clickDay(item) {
				console.log("clickDay", item);
				if (item.class) return;
				this.clickSelected = item;
				this.getjilianri();
			},
			todetail() {
				var rq = "";
				var day = this.clickSelected;
				if (day < 10) {
					day = '0' + day
				}
				rq = this.month + "-" + day;
				uni.navigateTo({
					url: "/pages/jilianri/detail?rq=" + rq
				});
			},
			async _onLoad() {
				//	获取当前时间 	赋值年，月
				await this.initTime()
				//	更新日历
				await this._runMonth()
			},
			//	初始化时间
			initTime() {
				var nowTimeData = this._getTimeNowApi()

				this.year = nowTimeData.year
				this.month = nowTimeData.month
				this.curmonth = nowTimeData.month
				this.day = nowTimeData.day
				// if (this.day < 10) {
				// 	this.day = '0' + this.day
				// }
				// if (this.month < 10) {
				// 	this.month = '0' + this.month
				// }
				// 今日时间为：2020-9-16
				console.log('今日时间为：' + this.year + '-' + this.month + '-' + this.day)
			},

			async _runMonth() {

				//	获取当前月的每一天的数据	1~31
				await this.initApi()

				//	根据当前选择的年月，更新start_time   end_time
				await this._timeApi()
				// await this.onClickSignLog()

				let dataWeek = await this.getweek(this._getNowApi());

				// console.log(this._getNowApi())
				this.slideDataList[0] = []
				this.slideDataList[1] = dataWeek
				this.slideDataList[2] = []
				this.getjilianri_month();

			},

			_getTimeNowApi() {
				//	初始化时间
				var date = new Date();

				var year = date.getFullYear();
				var month = parseInt(date.getMonth() + 1);
				var day = date.getDate();

				if (month < 10) {
					month = '0' + month
				}
				if (day < 10) {
					day = '0' + day
				}

				let returnData = {
					year: year,
					month: parseInt(month),
					day: day,
				}

				return returnData
			},

			//	滑动日历触发（左右滑动）
			_onClickSlideApi(e) {

				let current = e.detail.current

				let oldIndex = this.slideDataListIndex

				this.slideDataListIndex = current

				if (oldIndex - current == -1 || oldIndex - current == 2) {
					if (this.month == 12) {
						this.year = this.year + 1
						this.month = 1
					} else {
						this.month = this.month + 1
					}

				} else {
					if (this.month == 1) {
						this.year = this.year - 1
						this.month = 12
					} else {
						this.month = this.month - 1
					}
				}

				this._runMonth()
			},

			_getNowApi() {
				let data = {
					Day: 1,
					Month: this.month,
					Year: this.year
				}
				return data
			},
			//	获取当前月的每一天的数据
			initApi() {
				this.dayList = this.createDayList(this.month, this.year);
			},

			//创建每个月日历数据，传入月份1号前面用null填充
			createDayList(month, year) {
				// debugger;
				const count = this.getDayNum(month, year),
					_week = new Date(year + '/' + month + '/1').getDay();
				let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
					27, 28
				]
				var precount = this.getDayNum(month, year); //获取上一个月的天数
				for (let i = 29; i <= count; i++) {
					list.push(i)
				}
				for (let i = 0; i < _week; i++) {
					list.unshift({
						value: precount - i,
						class: "more"
					});
				}
				if (list.length < 35) {
					var length = list.length;
					for (var o = 0; o < 35 - length; o++) {
						list.push({
							value: o + 1,
							class: "more"
						});
					}
				}
				return list;
			},
			//计算传入月份有多少天
			getDayNum(month, year) {
				let dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

				if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
					dayNum[1] = 29;
				}
				return dayNum[month - 1]
			},
			//	传时间获取月初月末时间
			_timeApi() {

				let startDate = this.year + '-' + this.month + '-' + this.day

				let startData = this._timeMonthStartApi(startDate + ' 00:00:00')

				this.start_time = startData.time_int

				let endData = this._timeMonthEndApi(startDate + ' 00:00:00')

				this.end_time = endData.time_int
			},
			_timeMonthStartApi(timeDate) {
				var date = new Date(timeDate);

				date.setDate(1);

				var month = parseInt(date.getMonth() + 1);

				var day = date.getDate();
				if (month < 10) {
					month = '0' + month
				}
				if (day < 10) {
					day = '0' + day
				}

				let timeDateStart = date.getFullYear() + '-' + month + '-' + day;

				let returnData = {
					time_type: 'start_time',
					time_int: Date.parse(timeDateStart + ' 00:00:00') / 1000,
					time_date: timeDateStart,
					year: date.getFullYear(),
					month: month,
					day: day,
				}

				return returnData
			},
			_timeMonthEndApi(timeDate) {
				var endDate = new Date(timeDate);
				var currentMonth = endDate.getMonth();

				var nextMonth = ++currentMonth;
				var nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
				var oneDay = 1000 * 60 * 60 * 24;
				var lastTime = new Date(nextMonthFirstDay - oneDay);
				var endMonth = parseInt(lastTime.getMonth() + 1);
				var endDay = lastTime.getDate();
				if (endMonth < 10) {
					endMonth = '0' + endMonth
				}
				if (endDay < 10) {
					endDay = '0' + endDay
				}

				let timeDateEnd = endDate.getFullYear() + '-' + endMonth + '-' + endDay

				let returnData = {
					time_type: 'end_time',
					time_int: Date.parse(timeDateEnd + ' 00:00:00') / 1000,
					time_date: timeDateEnd,
					year: endDate.getFullYear(),
					month: endMonth,
					day: endDay,
				}

				return returnData
			},
			//	2020-08-01
			getweek(date) {
				let weeks = [];
				let dates = this.getDates(date);
				// let len = Math.ceil(dates.weeks.length / 7);
				// for (let i = 0; i < len; i++) {
				// weeks.push(dates.weeks.slice(i * 7, 7 + (i * 7)));
				// }
				// dates.weeks = weeks
				return dates;
			},
			getDates(date) {
				let dates = {
					year: date.Year,
					month: date.Month,
					firstDay: new Date(date.Year, date.Month, 1).getDay(),
					lastDay: new Date(date.Year, date.Month + 1, 0).getDay(),
					endDate: new Date(date.Year, date.Month + 1, 0).getDate(),
					weeks: []
				}

				//计算上月日期
				for (let i = dates.firstDay; i > 0; i--) {
					let dateinfo = {};
					dateinfo.date = new Date(date.Year, date.Month, -i + 1).getDate();
					dateinfo.isClick = false;
					dates.weeks.push(dateinfo);
				}
				//计算本月日期
				for (let i = 1; i <= new Date(date.Year, date.Month + 1, 0).getDate(); i++) {
					let nowisClick = true;
					let dateinfo = {};
					dateinfo.date = i;
					if (this.dateType == 'dateCustom') {
						nowisClick = false;
						if (this.dateCustom[dates.year] && this.dateCustom[dates.year][dates.month]) {
							for (let j = 0; j < this.dateCustom[dates.year][dates.month].length; j++) {
								if (this.dateCustom[dates.year][dates.month][j] == i) {
									nowisClick = true;
								}
							}
						}
					}
					dateinfo.isClick = nowisClick;
					dates.weeks.push(dateinfo);
				}
				//计算下月日期
				let len = 7 - dates.lastDay;
				if ((42 - dates.weeks.length) >= 7) {
					len += 7;
				}
				for (let i = 1; i < len; i++) {
					let dateinfo = {};
					dateinfo.date = i;
					dateinfo.isClick = false;
					dates.weeks.push(dateinfo);
				}
				return dates;

			},

		}

	}
</script>

<style lang="scss">
	.rili-bottom {
		border-top: 1px solid #8C92AC;
		margin-top: 20px;

		.one {
			display: flex;
			margin: 10px 30px;
			color: #7F88D3;
			font-size: 20px;
			justify-content: space-between;
		}

		.two {
			margin: 20px;
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

	.riliWrapper {
		width: 100%;
		// height: 499rpx;
		// background-color: #9bf;
		// padding: 0 5%;
		display: flex;
		justify-content: center;

		.riliWrapperBox {
			width: 100%;
			// height: 499rpx;
			// background-color: #9bf;
		}

		//	日历
		.signWrapperCalendar {

			// margin-top: 30rpx;
			.havemonth ::after {
				content: "";
				height: 4px;
				width: 4px;
				color: red;
				position: absolute;
				display: block;
				top: 100%;
				background: red;
				border-radius: 50%;
			}

			.havemonth ::after {
				color: #9FDCF5;
				background: #9FDCF5;
			}

			.clickSelected ::after {
				background: red !important;
			}

			.clickSelected .eachDayBoxBox {
				color: #fff !important;
				background: red;
			}

			.eachDayBoxBox.more {
				color: #e5e5e5 !important;
			}

			width: 100%;

			// border: 3rpx solid #9bf;
			.signWrapperCalendarBox {
				width: 100%;
				// height: 499rpx;
				background: #FFFFFF;
				border-radius: 10rpx;

				// background-color: #9bf;
				.signWrapperCalendarBoxTop {
					width: 100%;
					height: 72rpx;
					// background-color: red;
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 2rpx solid #EFEFEF;
				}

				.signWrapperCalendarBoxBit {
					width: 100%;
					height: 2rpx;
					border: 2rpx solid #EFEFEF;

				}

				.signWrapperCalendarBoxCenter {
					width: 100%;
					height: 425rpx;
					// background-color: #fff;
					// padding: 30rpx 30rpx;
					padding: 30rpx 0rpx;
					display: flex;
					justify-content: center;

					.signWrapperCalendarBoxCenterBox {
						width: 100%;
						height: 100%;
						// background-color: #9000FF;

						.signWrapperCalendarBoxCenterBoxTop {
							.week-number {
								background: #fff;
								padding: 0 1%;

								span {
									display: inline-block;
									text-align: center;
									height: 40px;
									line-height: 40px;
									width: 14.2857143%;
									color: #7F88D3;
									font-size: 20px;
								}
							}
						}

						.signWrapperCalendarBoxCenterBoxFooter {
							width: 100%;

							// hei
							// background-color: red;
							.each-day {
								position: relative;
								display: inline-block;
								// display: flex;
								// justify-content: flex-start;
								text-align: center;
								vertical-align: middle;
								width: 14.2%;
								font-size: 25rpx;
								height: 40px;
								padding-top: 4rpx;

								.eachDayBox {
									width: 100%;
									height: 100%;
									display: flex;
									align-items: center;
									justify-content: center;

									.eachDayBoxBox {
										width: 30px;
										height: 30px;
										/* border-radius: 50%; */
										display: flex;
										align-items: center;
										justify-content: center;
										color: #9FDCF5;
										font-size: 18px;
										font-weight: bold;
										border-radius: 6px;
									}

								}

								//
								.eachDayBoxCheck {
									width: 100%;
									height: 100%;
									display: flex;
									align-items: center;
									justify-content: center;

									.eachDayBoxBox {
										width: 36rpx;
										height: 36rpx;
										background: #FCEEE0;
										border-radius: 50%;
										display: flex;
										align-items: center;
										justify-content: center;
										color: red;
									}

								}

								//
							}
						}
					}
				}



			}

		}
	}

	.wrapper {
		width: 100%;
		height: 400rpx;
		background-image: linear-gradient(#D0EDFF, #73B7EF);
		color: #fff;
		font-size: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.wrapper-headcontent {
		background-color: #7883D2;
		width: 80%;
		height: 150px;
		margin-top: 50px;
		border-radius: 6px;
		text-align: center;
		padding-top: 10px;
		overflow: hidden;
	}

	.wrapper-headcontent .one {
		font-size: 34px;
		font-weight: bold;
		margin-top: 10px;
	}

	.wrapper-headcontent .two {
		margin-top: 20px;
	}
</style>
