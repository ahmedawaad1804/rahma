import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation';

import FastImage from 'react-native-fast-image'




export default PleaseLogIn = (data) => {
    let imageSource
    switch (data.src.status) {
        case "prepared":
            imageSource = require('../../assets/icons/preparing.png')
            break;
        case "deliviered":
            imageSource = require('../../assets/icons/toHome.png')
            break;
        default:
            imageSource = require('../../assets/icons/toHome.png')
            break;
    }

    return (

        <View style={styles.orderOpacity}>
            <View style={styles.topHorizontal}>
                <Image
                    source={imageSource}
                    style={styles.iconStyle}
                />
                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>{data.src.status}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 12, fontFamily: "Cairo-SemiBold" }}>{data.src.status}</Text>
                </View>
            </View>
            <View style={styles.bootomHorizontal}>
                <View style={styles.fixedText}>
                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", flex: 1, opacity: .5 }}>Order Number</Text>

                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", flex: 1, opacity: .5 }}>Items</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", flex: 1, opacity: .5 }}>Total Price</Text>

                </View>
                <View style={styles.variableText}>
                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", flex: 1 }}>{data.src.orderNumber}</Text>

                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", flex: 1 }}>{data.src.items}</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", flex: 1 }}><Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" }}>{data.src.price}</Text> EGP</Text>

                </View>
            </View>
        </View>


    );

}

const styles = StyleSheet.create({

    productImage: {
        width: Dimensions.get('window').width * 9 / 20,
        height: Dimensions.get('window').width * 9 / 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: "contain",

    },
    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 160 / 812,
        borderRadius: 15,
        margin: Dimensions.get('window').width * 0.4 / 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
        padding: 15,
        paddingTop: 5
    },
    topHorizontal: {
        flexDirection: 'row',
        height: "30%",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 3,
        borderBottomColor: colors.grey
    },
    iconStyle: {
        resizeMode: "contain",
        height: "80%"

    },
    bootomHorizontal: {
        flexDirection: 'row',
        width: '100%',
        flex: 1
    },
    fixedText: {
        width: "33%",
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 5,
        paddingRight: 5

    },
    variableText: {
        width: "33%",
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 5,
        paddingLeft: 5
    }

});
const mapStateToProps = state => ({
    www: state.www
})
