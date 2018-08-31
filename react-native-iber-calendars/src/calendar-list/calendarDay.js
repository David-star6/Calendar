
import React, { Component } from 'react';

import {
    View,
    ViewPropTypes,
    TouchableOpacity,
    Text,
} from 'react-native';

import { parseDateWithString } from '../interface';

import PropTypes from 'prop-types';

class calendarDay extends Component {

    static propTypes = {
        years: PropTypes.number,
        month: PropTypes.number,
        isShowLcd: PropTypes.bool,
        textSize: PropTypes.number,
        lcdSize: PropTypes.number,
    }

    static defaultProps = {
        isShowLcd: false,
        textSize: 15,
        lcdSize: 9,
        festivalColor: '#666666',
        selectDayColor: '#3364E4',
        signActionColor: '#FF3A3A',
        signInavalidColor: '#BABABA',
        textColor: '#2A2A2A',
        lcdColor: '#A5A5A5',
        textSelectColor: '#FFFFFF'
    }



    constructor(props) {
        super(props)
        this.itemSize = this.props.itemSizeHeight > this.props.itemSizeWidth ? this.props.itemSizeWidth - this.props.itemSizeWidth / 10 : this.props.itemSizeHeight - this.props.itemSizeHeight / 10
        this.state = {
            isSelect: this.judegeisSelect(this.props.select, this.props.data.day),
            signleColor: 'gray'
        }
    }

    isSigleDay(day, time) {
        let key = parseDateWithString(this.props.years, this.props.month, day)
        this.props.signData && this.props.signData.hasOwnProperty(key) ? this.props.signData[key].map((item, index) => {
            this.signleColor == 'gray' && parseInt(item.status) == 0 ? this.signleColor = 'red' : null
        }) : ''
        return this.props.signData && this.props.signData.hasOwnProperty(key) ? true : false
    }

    getSignColor(day, color) {
        let key = parseDateWithString(this.props.years, this.props.month, day)
        this.props.signData && this.props.signData.hasOwnProperty(key) ? this.props.signData[key].map((item, index) => {
            parseInt(item.status) == 0 && color == 'gray' ? color = 'red' : null
        }) : ''
        return color
    }

    judegeisSelect(select, data) {
        return select == data ? true : false
    }

    renderEmptyItem() {
        return <View style={{ height: this.props.itemSizeHeight, width: this.props.itemSizeWidth }} ></View>
    }

    renderTouchableItem(item) {
        return <TouchableOpacity style={{ height: this.props.itemSizeHeight, width: this.props.itemSizeWidth, justifyContent: 'center', alignItems: 'center', }} activeOpacity={1} onPress={() => {
            this.props.handleSelect && this.props.handleSelect(item.day)
        }}
        >
            {this.props.select == item.day ? <View style={{ opacity: this.props.isShowLcd ? 0.3 : 1, position: 'absolute', top: this.props.itemSizeHeight / 12, borderRadius: this.itemSize / 2, width: this.itemSize, height: this.itemSize, backgroundColor: this.props.selectDayColor }}></View> : null}
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: this.props.textSize, color: this.props.select == item.day ? this.props.textSelectColor : this.props.textColor }}>{item.day}</Text>
                {this.props.isShowLcd ? <Text numberOfLines={2} style={{ fontSize: this.props.lcdSize, color: this.props.select == item.day ? this.props.textSelectColor : item.festival ? this.props.festivalColor : this.props.lcdColor }}>{item.festival ? item.festival : item.lcd}</Text> : null}
                {this.props.isShowLcd && this.isSigleDay(item.day, item.time) ? <View style={{ marginTop: 4, borderRadius: 2, width: 4, height: 4, backgroundColor: this.getSignColor(item.day, this.state.signleColor) }}></View> : null}
            </View>
        </TouchableOpacity>
    }

    render() {
        const day = this.props.data.hasOwnProperty('data') ? this.renderEmptyItem() : this.renderTouchableItem(this.props.data)
        return <View style={{ height: this.props.itemSizeHeight, width: this.props.itemSizeWidth }}>{day}</View>
    }
}

export default calendarDay;