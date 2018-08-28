/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, NativeModules, requireNativeComponent } from 'react-native';

import { CalendarList } from 'react-native-iber-calendars';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  render() {
    return (
      // < Calendar />
      <View>
        <CalendarList
          current={'2018-08-28'}
          // signData={this.state.signData}
          pastScrollRange={24}
          futureScrollRange={24}
          onVisibleMonthsChange={(e) => {
            console.log('eeee', e)
          }}
          isShowLcd={true}
          horizontal
          pagingEnabled
          style={{ width: Dimensions.get('window').width, height: 375, borderBottomWidth: 1, borderBottomColor: 'black' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
