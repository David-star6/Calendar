import React, { Component } from 'react';

import {
    View,
    ViewPropTypes,
    TouchableOpacity,
    Text,
} from 'react-native';

import { xdateToData, parseDate } from '../interface';

import LunarUtils from '../LunarUtils';

import moment from 'moment';

import XDate from 'xdate';

import Item from './calendarDay'

class calendarView extends Component {


    constructor(props) {
        super(props);
        let currentMonth;
        if (props.current) {
            currentMonth = parseDate(props.current);
        } else {
            currentMonth = XDate();
        }
        let select = this.props.selectDate ? this.props.selectDate.yeays == currentMonth.getFullYear() && this.props.selectDate.month == (currentMonth.getMonth() + 1) ? this.props.selectDate.day : '' : ''
        this.state = {
            currentMonth,
            select,
        };
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

    componentWillReceiveProps(props) {
        // console.log('aqss')
        // toSelectToday
        props.toSelectToday && this.backToday(props.toSelectToday)
        // alert(props.toSelectToday)
    }

    backToday(toSelectToday) {
        let today = new Date()
        if (today.getFullYear() == this.state.currentMonth.getFullYear() && today.getMonth() == this.state.currentMonth.getMonth()) {
            this.setState({
                select: today.getDate()
            })
        } else {
            this.setState({
                select: 1
            })
        }
    }

    todoSelectDay(date) {
        let today = new Date()
        let select = today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() ? date.getDate() : 1
        return select;
    }


    /** 设置天的key **/
    getViewKeyWithDay(day) {
        return 'time' + day
    }

    renderSelefDay(item, index) {
        return item.forEach((day, id) => {
            return this.renderItem(day, id)
        })
    }


    renderItem(item, id, index, size) {
        return <Item
            select={this.state.select}
            data={item}
            {...this.props}
            month={this.state.currentMonth.getMonth() + 1}
            years={this.state.currentMonth.getFullYear()}
            signData={this.props.signData}
            itemSizeWidth={size.width}
            itemSizeHeight={size.height}
            key={`day-${item}-${index}-${id}`}
            handleSelect={(value) => {
                this.setState({
                    select: value
                }, () => {
                    // onSelectDate: PropTypes.any
                    let date = this.state.currentMonth.getFullYear() + '-' + parseInt(this.state.currentMonth.getMonth() + 1) + '-' + value
                    this.props.onSelectDate && this.props.onSelectDate(xdateToData(new Date(date.replace(/-/g, "/"))))
                })
            }} />
    }

    renderSelfWeek(day, index, size) {
        const week = [];
        day[0].map((item, id) => {
            week.push(this.renderItem(item, id, index, size))
        })
        return (<View style={{ flexDirection: 'row', width: 375 }} key={index}>{week}</View>);
    }

    renderContain(e) {
        let selfweek = [];
        let selfdays = this.getWeeks(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() + 1).week
        size = { 'height': this.props.style.height / (selfdays.length), 'width': this.props.style.width / 7 }
        while (selfdays.length) {
            selfweek.push(this.renderSelfWeek(selfdays.splice(0, 1), selfweek.length, size))
        }
        return selfweek
    }

    render() {
        return <View {...this.props.style}>
            <View>{this.renderContain(this.state.select)}</View>
        </View>
    }
}

export default calendarView;