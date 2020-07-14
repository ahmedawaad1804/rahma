import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation';

 class MainCategoryItem extends React.Component {
  constructor(props) {
    super(props);
}
state={
  source:""
}
componentDidMount(){
  // this.props
  this.setState({source:this.props.src.icon})
}
// shouldComponentUpdate(){
//   console.log("amuy");
  
//   return false
// }

  // console.log(data);
render(){
  return (
    <View>
      <TouchableOpacity style={styles.gridCell} onPress={()=>{this.props.click()}}>
        <Image style={styles.imageThumbnail} source={{uri:`http://www.beemallshop.com/img/MainCatIcons/${this.state.source}`}}
        onError={()=>{this.setState({source:"Beauty"})}}/>
        <Text style={styles.smallText}>{this.props.src.nameEN}</Text>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 12 / 812 }}></View>
      </TouchableOpacity>
    </View>

  );}

}

const styles = StyleSheet.create({
  advStyle: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 94 / 812
  },
  imageThumbnail: {

    height: 50,
    width: 50,
    resizeMode:"contain"
    // , { width: 141 / 3, height: 118 / 3 }
},
gridCell: {
    width: Dimensions.get('window').width * 106 * .95 / 375,
    height: Dimensions.get('window').height * 95 * .95 / 812,
    borderRadius: 15,
    margin: 5,
    justifyContent: 'flex-end',
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
  smallText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14
  },


});
const mapStateToProps = state => ({
  www: state.www
})
export default MainCategoryItem
