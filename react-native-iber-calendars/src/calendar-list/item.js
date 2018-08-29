import React, { Component } from 'react';

import { Text, View } from 'react-native';

import styleConstructor from './style';

import CalendarView from './calendarView'

import { xdateToData, parseDate } from '../interface';


class CalendarListItem extends Component {
  static defaultProps = {
    hideArrows: true,
    hideExtraDays: true,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    const r1 = this.props.item;
    const r2 = nextProps.item;
    return r1.toString('yyyy MM') !== r2.toString('yyyy MM') || !!(r2.propbump && r2.propbump !== r1.propbump);
  }


  render() {
    const row = this.props.item;
    if (row.getTime) {
      return <CalendarView
        // {...this.props.style}
        {...this.props}
        current={row}
      />
    } else {
      const text = row.toString();
      return (
        <View style={[{ height: this.props.calendarHeight, width: this.props.calendarWidth }, this.style.placeholder]}>
          <Text allowFontScaling={false} style={this.style.placeholderText}>{text}</Text>
        </View>
      );
    }
  }
}

export default CalendarListItem;
