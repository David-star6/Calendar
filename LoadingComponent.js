import React, { Component } from 'react';

import Spinner from 'react-native-spinkit';

import { View } from 'react-native';

class LoadingComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.current) {
            nextState.current = nextProps.current;
            return true;
        }
        return false;
    }

    show() {
        this.setState({ loading: true });
    }

    isShow() {
        return this.state && this.state.loading ? this.state.loading : false;
    }

    dismiss(callback) {
        this.setState({ loading: false }, callback && callback());
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState && nextState.loading != null) {
            return true;
        }
        return false;
    }

    render() {
        if (this.state && this.state.loading)
            return (
                <View style={{ ...this.props.style }}>
                    <Spinner isVisible={true} size={30} type={'Wave'} color={'#1097D5'} />
                </View>);
        return null;
    }
}
module.exports = LoadingComponent;