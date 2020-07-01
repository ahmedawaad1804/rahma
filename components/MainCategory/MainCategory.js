import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation';

export default MainCategory = (data) => {

    console.log(data);

    return (
        <View>
       <TouchableOpacity style={styles.gridCell}  >
                <Image style={styles.imageThumbnail, { width: 126 / 3, height: 108 / 3 }} source={require("../../assets/categories/supermarket.png")} />
                <Text style={styles.smallText}>Supermarket</Text>

              </TouchableOpacity>
      </View>
     
    );

}

const styles = StyleSheet.create({
    advStyle: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 94 / 812
      },
      gridCell: {
        width: Dimensions.get('window').width * 106 / 375,
        height: Dimensions.get('window').height * 95 / 812,
        borderRadius: 15,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    
        elevation: 2,
      },
      imageThumbnail: {

        height: 50,
        width: 50,
      },
      smallText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14
      },
     

});
const mapStateToProps = state => ({
    www: state.www
})

