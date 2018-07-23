import React, { Component } from 'react';

import {
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Animated,
    Easing,
    InteractionManager,
    FlatList,
    ViewPagerAndroid,
    ScrollView,
    PanResponder
} from 'react-native';

import LoadingComponent from './LoadingComponent'

import LunarUtils from './LunarUtils';

import moment from 'moment';

var Platform = require('Platform');

var Dimensions = require('Dimensions');

import CalendarView from './CalendarView'


class CalendarComponent extends Component {
    constructor(props) {
        super(props)
        this.itemSize = 375 / 7
        this.scrollBeginDrag = 0
        this.scrollEndDrag = 0
        this.state = {
            currentDate: new Date(),
            yeays: (new Date()).getFullYear(),
            month: (new Date()).getMonth() + 1,
            day: new Date().getDate()
        }
        this.initMonth = 4;
    }


    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         yeays: 2010
        //     }, () => {
        //         alert('reload')
        //     })
        // }, 2000);

    }
    /**输入不同的年月日更改**/
    getWeeks(mYears, mMonth) {
        this.todayX = undefined;
        this.todayY = undefined;
        let current = new Date();
        let today = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + (current.getDate() - 1);
        let strym = mYears + '-' + (mMonth < 10 ? '0' : '') + mMonth;    //2017-07
        let firstDate = moment(strym).startOf("month").date();            //月第一天日期
        let lastDate = moment(strym).endOf("month").date();               //月最後一天日期
        let firstWeekDay = moment(strym).day();                           //月第一天星期
        let weeks = [];                                                   //存放每月天數格式化成每行7個的二維數組
        let week = [];                                                    //每行7天，超出本月的‘’
        let allDay = [];                                                    //每天
        let yearMonth = { 'yeay': mYears, 'month': mMonth }
        for (i = 0; i < (lastDate + firstWeekDay); i++) {
            if (week.length == 7) {
                weeks = weeks.concat([week]);
                week = [];
            }
            if (i < firstWeekDay) {
                week[i % 7] = { data: '', day: '' };
            } else {
                var solarDate = new Date(mYears, mMonth, (i - firstWeekDay));
                let lunar = LunarUtils.solarToLunar(mYears, mMonth, (i - firstWeekDay) + 1);

                let festival = '';
                if (lunar.lunarFestival == '佛誕') {
                    festival = '佛誕'
                } else if (lunar.lunarFestival == '中秋節') {
                    festival = '中秋節'
                } else {
                    festival = lunar.solarFestival ? lunar.solarFestival : (lunar.lunarFestival ? lunar.lunarFestival : lunar.term)
                }

                week[i % 7] = {
                    day: (i - firstWeekDay + 1),
                    lcd: lunar.lunarDayName == '初一' ? lunar.lunarMonthName : lunar.lunarDayName,
                    time: solarDate.getTime(),
                    lcm: lunar.lunarMonthName,
                    festival: festival
                };
                if ((solarDate.getFullYear() + '-' + solarDate.getMonth() + '-' + solarDate.getDate()) == today) {
                    this.todayX = i % 7;
                    this.todayY = weeks.length;
                } else {
                    if (!this.todayX) {
                        this.todayX = undefined;
                        this.todayY = undefined;
                    }
                }
            }
        }
        for (i = week.length; i < 7; i++) {
            week[i] = { data: -1 }
        }
        weeks = weeks.concat([week]);
        // return weeks;
        yearMonth['week'] = weeks
        return yearMonth
    }

    /** 设置天的key **/
    getViewKeyWithDay(day) {
        return 'time' + day
    }

    /** 设置月的key **/
    getViewKeyWithMonth(num) {
        return 'month' + this.state.month + num
    }

    renderDay(item, row, index) {
        return item.data != -1 ? <TouchableOpacity activeOpacity={1} onPress={() => {
            alert('sss')
        }}
            key={this.getViewKeyWithDay(item.time + '' + row + '' + index)}
        >
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: this.itemSize, height: this.itemSize, backgroundColor: 'gray' }}>
                <Text style={{ fontSize: 14 }}>{item.day}</Text>
                <Text style={{ fontSize: 12 }}>{item.lcd}</Text>
            </View>
            {/* {this.isSigleDay(item.day, item.time) ? <View style={{ position: 'absolute', bottom: 0, left: (this.itemSize - this.siginItemSize) / 2, backgroundColor: '#FF506C', width: this.siginItemSize, height: this.siginItemSize, }}></View> : null} */}
            {/* {this.isCurrenDay(item.day, item.time) ? <View style={{ opacity: 0.2, position: 'absolute', top: 0, width: this.itemSize, height: this.itemSize, backgroundColor: 'red' }}></View> : null} */}
        </TouchableOpacity> : <View style={{ width: this.itemSize, height: this.itemSize, backgroundColor: 'gray' }} key={this.getViewKeyWithDay(index + 1)}></View>
    }

    renderWeek(items, row) {
        return items.map((item, index) => {
            return this.renderDay(item, row, index)
        })
    }

    renderIterm(item, index, key) {
        return <View key={this.getViewKeyWithMonth(key)} style={{ flexDirection: 'row' }}>
            {this.renderWeek(item, index)}
        </View>
    }

    renderItems(yeays, month, key) {
        if (month > 12) {
            yeays++
            month = 1
        } else if (month == 0) {
            month = 12
            yeays--
        }
        let weeks = this.getWeeks(yeays, month).week
        return <View key={yeays + '' + month + '' + key} style={{ width: 375, height: 357 }}>
            <Text>{yeays + '-' + month}</Text>
            <View style={{
                height: this.titleHeight, flexDirection: 'row',
                backgroundColor: '#ffffff', justifyContent: 'space-around', alignItems: 'center'
            }}>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1097D5', fontSize: 12, fontWeight: '100' }}>Sun</Text>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1A2023', fontSize: 12, fontWeight: '100' }}>Mon</Text>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1A2023', fontSize: 12, fontWeight: '100' }}>Tue</Text>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1A2023', fontSize: 12, fontWeight: '100' }}>Wed</Text>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1A2023', fontSize: 12, fontWeight: '100' }}>Thur</Text>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1A2023', fontSize: 12, fontWeight: '100' }}>Fri</Text>
                <Text style={{ width: this.itemSize, textAlign: 'center', color: '#1097D5', fontSize: 12, fontWeight: '100' }}>Sat</Text>
            </View>
            {weeks.map((item, index) => {
                return this.renderIterm(item, index, index + '' + key)
            })}
        </View>
    }

    renderItem(year, month) {
        return <View style={{ marginTop: 30, width: 375, height: 375 }}>
            <Text>texts</Text>
        </View>

    }

    isShowLoading() {
        this._dismissLoading()
    }
    /** 改变年月份**/
    changeYearMonth(index) {
        if (index > 0 && this.state.month == 12) {
            this.setState({
                yeays: this.state.yeays + 1,
                month: 1
            }, () => {
                this.isShowLoading()
            })
        } else if (index < 0 && this.state.month == 1) {
            this.setState({
                yeays: this.state.yeays - 1,
                month: 12
            }, () => {
                this.isShowLoading()
            })
        } else {
            this.setState({
                month: this.state.month + index
            }, () => {
                this.isShowLoading()
            })
        }
        this.scrollTo(1)
    }



    onScrollEndDrag(e) {
        this.scrollEndDrag = e.nativeEvent.contentOffset.x;
        // if (Math.abs(this.scrollEndDrag - this.scrollBeginDrag) > 100) {
        //     this._showLoading()
        // }
    }

    onScrollBeginDrag(e) {
        this.scrollBeginDrag = e.nativeEvent.contentOffset.x;
    }

    onScrollEnd(e) {
        if (e.nativeEvent.contentOffset.x < this.scrollBeginDrag) {
            this.changeYearMonth(-1)
        } else if (e.nativeEvent.contentOffset.x > this.scrollBeginDrag) {
            this.changeYearMonth(1)
        }
    }

    scrollTo(index, animation = false) {
        // Platform.OS == 'android' ? this.scrollView.setPageWithoutAnimation(1) : this.scrollView.scrollTo({ animated: animation, 'x': 375 * index, });
        this.scrollView.scrollTo({ animated: animation, 'x': 375 * index, });
    }

    _showLoading() {
        if (this.loadingComponent != null)
            this.loadingComponent.show();
    }

    _dismissLoading(callback) {
        if (this.loadingComponent != null)
            this.loadingComponent.dismiss(callback);
    }

    thisrenderAndroid() {
        let arr = []
        for (let i = 2009; i < 2029; i++) {
            for (let k = 1; k < 13; k++) {
                arr.push(this.renderItems(i, k, 0))
            }

        }
        return arr;

    }

    renderViewPagerAndroid(yeays, month) {
        // return <View{...this._gestureHandlers.panHandlers}>
        //     {this.renderItems(yeays, month, 1)}
        // </View>
        return <ViewPagerAndroid
            style={{ width: 375, height: 375, backgroundColor: 'red' }}
            ref={ref => this.scrollView = ref}
            initialPage={1} //初始化下标
            onPageScroll={(event) => {

            }}
            onPageScrollStateChanged={() => {

            }}
            onPageSelected={(event) => {

            }}
        >
            {/* {this.renderItems(yeays, month - 1, 0)}
            {this.renderItems(yeays, month, 1)}
            {this.renderItems(yeays, month + 1, 0)} */}

            {/* {this.renderItems(yeays, month - 1, 0)}
            {this.renderItems(yeays, month, 1)}
            {this.renderItems(yeays, month + 1, 2)} */}
            {this.thisrenderAndroid()}
        </ViewPagerAndroid>

    }



    //
    getDatasource(yeays, month) {
        if (month > 12) {
            yeays++
            month = 1
        } else if (month == 0) {
            month = 12
            yeays--
        }
        let weeks = this.getWeeks(yeays, month).week
        return weeks
    }

    getCalendar(yeays, month) {
        let arr = []
        arr.push(this.getDatasource(yeays, month - 1))
        arr.push(this.getDatasource(yeays, month))
        arr.push(this.getDatasource(yeays, month + 1))
        return arr
    }

    onRight(yeays, month) {
        if (month > 12) {
            yeays++
            month = 1
        } else if (month == 0) {
            month = 12
            yeays--
        }
        this.setState({
            month: month,
            yeays: yeays
        })
    }
    render() {
        return (
            <CalendarView dataSource={this.getCalendar(this.state.yeays, this.state.month)} style={{ width: 375, height: 375, backgroundColor: '#F5FCFF', }} onLeftScroll={() => {
                this.onRight(this.state.yeays, this.state.month + 1);
            }} onRightScroll={() => {
                this.onRight(this.state.yeays, this.state.month - 1);
            }} onSelectDay={(e) => {
                console.warn(e.nativeEvent);
            }} />

            // <View>
            //     {Platform.OS == 'android' ? this.renderViewPagerAndroid(this.state.yeays, this.state.month) : <ScrollView
            //         ref={ref => this.scrollView = ref}
            //         horizontal={true}
            //         initialPage={1}
            //         pagingEnabled={true}
            //         style={{ width: 375 }}
            //         onScrollBeginDrag={(e) => {
            //             this.onScrollBeginDrag(e)
            //         }}
            //         onScrollEndDrag={(e) => {
            //             this.onScrollEndDrag(e)
            //             //this.onScrollEnd(e)
            //         }}
            //         onMomentumScrollEnd={(e) => {
            //             this.onScrollEnd(e)
            //         }}
            //     >
            //         {this.renderItems(this.state.yeays, this.state.month - 1, 0)}
            //         {this.renderItems(this.state.yeays, this.state.month, 1)}
            //         {this.renderItems(this.state.yeays, this.state.month + 1, 2)}

            //         {/* {this.renderItems(this.state.yeays, this.state.month + 1, 2)} */}
            //     </ScrollView>
            //     }
            //     <LoadingComponent style={{
            //         position: 'absolute',
            //         width: parseInt(Dimensions.get('window').width), height: parseInt(Dimensions.get('window').height),
            //         justifyContent: 'center', alignItems: 'center', backgroundColor: 0x00000030,
            //     }} ref={ref => this.loadingComponent = ref} />
            // </View >
        );
    }
}

export default CalendarComponent;