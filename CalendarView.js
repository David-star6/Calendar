
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeModules, requireNativeComponent } from 'react-native';
var RCTCalendarView = requireNativeComponent('RCTCalendarView', CalendarView)

class CalendarView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [0]
        }
    }


    render() {
        return (
            <RCTCalendarView  {...this.props} />
        );
    }
}

export default CalendarView;