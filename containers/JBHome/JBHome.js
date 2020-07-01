import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions, Text } from 'react-native';
/* colors */
import colors from '../../colors'

import { refreshtProducts, firstGetProducts } from '../../actions/product'
import store from '../../store'
import { connect } from 'react-redux'

import dataService from '../../services/dataService'

class JBHome extends React.Component {

  componentDidMount() {

setTimeout(() => {
 
      this.props.navigation.navigate("MainStack")
     

   
}, 3000);


  }


  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View style={styles.mainImageView}>

        </View>
        <Text style={{ fontSize: 50, marginLeft: 40, fontFamily: "Cairo-Regular" }}>Welcome ...</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 30, marginLeft: 60,marginRight: 40, fontFamily: "Cairo-Regular" }}>Ahmed Awaad</Text>
          <ActivityIndicator size={50} color={colors.white} />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight
  },
});
const mapDispatchToProps = {
  refreshtProducts,
  firstGetProducts
};
const mapStateToProps = state => ({
  productsReducer: state.productsReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(JBHome)

